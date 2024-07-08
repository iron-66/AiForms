import 'dotenv/config';
import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import nunjucks from 'nunjucks';
import { fromPath } from 'pdf2pic';
import multer from 'multer';
import { performance } from 'perf_hooks';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/dist/govuk/assets')));
nunjucks.configure(['app/views', 'node_modules/govuk-frontend/dist/'], {
  autoescape: true,
  express: app,
  noCache: true,
});
app.set('view engine', 'html');
app.use(express.json());
app.use(express.static('public'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/results/');
  },
  filename: function (req, file, cb) {
    cb(null, 'form' + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('fileUpload'), async (req, res) => {
  const now = `${Date.now()}`;
  var savePath = './public/results/form-' + now;
  fs.mkdirSync(savePath);

  const filetype = req.file.mimetype;
  const tempFilePath = './public/results/' + req.file.filename;

  if (filetype === 'image/jpeg') {
    fs.renameSync(tempFilePath, savePath + '/page.1.jpeg');
    console.log('Saving image...');
  } else if (filetype === 'application/pdf') {
    fs.renameSync(tempFilePath, savePath + '/form.pdf');
    const options = {
      density: 300,
      saveFilename: 'page',
      savePath: savePath,
      format: 'jpeg',
      width: 600,
      preserveAspectRatio: true,
    };
    const convert = fromPath(savePath + '/form.pdf', options);
    console.log('Saving images of PDF pages...');
    await convert.bulk(-1);
  }

  console.log('Saved');

  var formJson = {
    filename: req.file.originalname,
    formStructure: [],
    pages: [],
  };

  let files = fs.readdirSync(savePath);
  const filePages = files.filter(file => file.match(new RegExp(`.*\.(.jpeg)`, 'ig'))).length;

  for (var i = 0; i < filePages; i++) {
    formJson.formStructure.push(0);
  }

  try {
    fs.writeFileSync(savePath + '/form.json', JSON.stringify(formJson, null, 2));
  } catch (err) {
    console.error(err);
  }

  res.redirect('/results/form-' + now + '/1');
});

app.get('/delete/:formId', async (req, res) => {
  const formId = req.params.formId;
  fs.rmdirSync('./public/results/form-' + formId, {
    recursive: true,
  });
  res.redirect('/');
});

app.get('/extractForm/:formId/:pageNum/', async (req, res) => {
  const llm = 'Ollama';
  return sendToLLM(llm, req, res);
});

async function sendToLLM(llm, req, res) {
  const formId = req.params.formId;
  var savePath = './public/results/form-' + formId;
  const pageNum = Number(req.params.pageNum);

  try {
    console.log('Sending data to ' + llm);

    const imagePath = `${savePath}/page.${pageNum}.jpeg`;
    var startTime = performance.now();

    let result;
    if (llm === 'Ollama') {
      result = await callOllama(imagePath);
    } else {
      throw new Error('Unsupported LLM');
    }

    var endTime = performance.now();

    console.log(`Process took ${((endTime - startTime) / 1000).toFixed(2)} seconds`);

    const formJson = loadFileData(formId);

    var index = 0;
    for (let i = 0; i < pageNum - 1; i++) {
      index += formJson.formStructure[i];
    }

    var index = arraySum(formJson.formStructure, 0, pageNum - 1);
    formJson.pages.splice(index, 0, ...result.pages);

    formJson.formStructure.splice(pageNum - 1, 1, result.pages.length);

    fs.writeFileSync(savePath + '/form.json', JSON.stringify(formJson, null, 2));

    res.redirect('/results/form-' + formId + '/' + pageNum);
  } catch (error) {
    console.error('Error in Ollama API call:', error);
    return res.status(500).send('Error processing the request');
  }
}

// Функция для вызова API Ollama с путем к изображению и получения извлеченных вопросов формы
async function callOllama(imagePath) {
  return new Promise((resolve, reject) => {

    const ollama = spawn('ollama', ['run', 'llava'], { shell: true });
    console.log(`Ollama launched successfully`);

    let stdout = '';
    let stderr = '';

    ollama.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    ollama.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    ollama.on('close', (code) => {
      console.log(`Ollama process exited with code ${code}`);
      if (code !== 0) {
        return reject(new Error(`Ollama process exited with code ${code}. stderr: ${stderr}`));
      }
      try {
        const cleanedOutput = stdout.replace(/```json\n|```/g, '');
        const result = JSON.parse(cleanedOutput);
        resolve(result);
      } catch (error) {
        console.error(`Failed to parse JSON: ${error.message}`);
        reject(new Error(`Failed to parse JSON: ${error.message}. stdout: ${stdout}`));
      }
    });

    ollama.on('error', (error) => {
      console.error(`Ollama process error: ${error.message}`);
      reject(new Error(`Ollama process error: ${error.message}`));
    });

    const prompt = fs.readFileSync('data/ollama_prompt.txt', 'utf8');
    ollama.stdin.write(`${prompt} ${imagePath}\n`);
    ollama.stdin.end();
  });
}

function arraySum(array, start, end) {
  var sum = 0;
  for (let i = start; i < end; i++) {
    sum += array[i];
  }
  return sum;
}

function loadFileData(formId) {
  try {
    return JSON.parse(fs.readFileSync('./public/results/form-' + formId + '/form.json'));
  } catch (err) {
    return err;
  }
}

const port = 3000;

app.get('/', (req, res) => {
  const formList = fs.readdirSync('./public/results').filter((item) => item.startsWith('form-'));
  res.locals.formList = formList;
  res.render('index.njk');
});

app.get('/results/form-:formId/:pageNum/:question?', (req, res) => {
  const formId = req.params.formId;
  const pageNum = Number(req.params.pageNum);
  const question = req.params.question ? Number(req.params.question) : 1;
  const fileData = loadFileData(formId);
  res.locals.formId = formId;
  res.locals.pageNum = pageNum;
  res.locals.question = question;
  res.locals.fileData = fileData;
  res.render('result.njk');
});

app.get('/form-popup/:formId/:question/check-answers', (req, res) => {
  const formId = req.params.formId;
  const question = req.params.question;
  const fileData = loadFileData(formId);
  res.locals.formId = formId;
  res.locals.fileData = fileData;
  res.locals.question = question;
  res.render('check-answers-popup.njk');
});

app.get('/forms/:formId/:pageNum/:question/check-answers', (req, res) => {
  const formId = req.params.formId;
  const pageNum = req.params.pageNum;
  const question = req.params.question;
  const fileData = loadFileData(formId);
  res.locals.formId = formId;
  res.locals.fileData = fileData;
  res.locals.pageNum = pageNum;
  res.locals.question = question;
  res.render('check-answers.njk');
});

app.get('/forms/:formId/:pageNum/:question', (req, res) => {
  const formId = req.params.formId;
  const fileData = loadFileData(formId);
  const pageNum = Number(req.params.pageNum);
  const question = Number(req.params.question);
  res.locals.formId = formId;
  res.locals.fileData = fileData;
  res.locals.pageNum = pageNum;
  res.locals.question = question;
  res.locals.questionIndex = arraySum(fileData.formStructure, 0, pageNum - 1) + question - 1;
  res.render('form.njk');
});

app.get('/form-popup/:formId/:questionIndex', (req, res) => {
  const formId = req.params.formId;
  const fileData = loadFileData(formId);
  const pageNum = Number(req.params.pageNum);
  const questionIndex = Number(req.params.questionIndex);
  res.locals.formId = formId;
  res.locals.fileData = fileData;
  res.locals.pageNum = Number(req.params.pageNum);
  res.locals.question = questionIndex;
  res.render('form-popup.njk');
});

app.get('/lists/:formId/:pageNum', (req, res) => {
  const formId = req.params.formId;
  const fileData = loadFileData(formId);
  res.locals.fileData = fileData;
  res.render('list.njk');
});

app.get('/json/:formId/:pageNum', (req, res) => {
  const formId = req.params.formId;
  const fileData = loadFileData(formId);
  res.locals.formId = formId;
  res.locals.fileData = fileData;
  res.render('json.njk');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
