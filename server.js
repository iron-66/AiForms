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
import Tesseract from 'tesseract.js';
import axios from 'axios';
import https from 'https';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(dirname, '/node_modules/govuk-frontend/dist/govuk/assets')));
nunjucks.configure(['app/views', 'node_modules/govuk-frontend/dist/'], {
  autoescape: true,
  express: app,
  noCache: true,
});
app.set('view engine', 'html');
app.use(express.json());
app.use(express.static('public'));

// Настройка хранилища для загружаемых файлов
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/results/');
  },
  filename: function (req, file, cb) {
    cb(null, 'form' + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const getBearerToken = async () => {
  const url = process.env.SBER_URL;
  const authData = process.env.SBER_AUTH_DATA;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'RqUID': uuidv4(),
    'Authorization': `Basic ${authData}`
  };

  const data = `scope=${process.env.SBER_SCOPE}`;

  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.post(url, data, {
      headers,
      httpsAgent: agent
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error in getting Bearer token:', error);
    throw new Error('Error in getting Bearer token');
  }
};

// Обработка загрузки файла
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

  // Создание JSON структуры формы
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

// Получение всех папок с результатами обработки
app.get('/api/folders', (req, res) => {
  const resultsPath = path.join(dirname, 'public/results');
  
  fs.readdir(resultsPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Не удалось получить список папок' });
    }

    const folders = files.filter(file => fs.statSync(path.join(resultsPath, file)).isDirectory());
    console.log(folders);
    res.json(folders);
  });
});

// Удаление формы
app.get('/delete/:formId', async (req, res) => {
  const formId = req.params.formId;
  fs.rmdirSync('./public/results/form-' + formId, {
    recursive: true,
  });
  res.redirect('/');
});

// Извлечение вопросов формы
app.get('/extractForm/:formId/:pageNum/', async (req, res) => {
  const llm = 'Ollama';
  //return sendToLLM(llm, req, res);
  return sendToGigaChat(req, res);
});

// Отправка данных в GigaChat API
async function sendToGigaChat(req, res) {
  const llm = 'GigaChat';
  const formId = req.params.formId;
  var savePath = './public/results/form-' + formId;
  const pageNum = Number(req.params.pageNum);

  try {
    console.log('Sending data to ' + llm);

    const imagePath = `${savePath}/page.${pageNum}.jpeg`;
    var startTime = performance.now();

    // Распознавание текста на изображении с помощью Tesseract
    const ocrResult = await recognizeText(imagePath);

    // Получение Bearer токена
    const bearerToken = await getBearerToken();

    // Чтение промпта
    const promptPath = path.join(dirname, 'data', 'gigachat_prompt.txt');
    const prompt = fs.readFileSync(promptPath, 'utf8');

    // Комбинирование содержимого промпта и распознанного текста
    const combinedContent = `${prompt}\n\n${ocrResult}`;

    // Передача распознанного текста в модель LLM
    let result;
    if (llm === 'GigaChat') {
      result = await callGigaChat(bearerToken, combinedContent);
    } else {
      throw new Error('Unsupported LLM');
    }

    var endTime = performance.now();

    console.log(`Process took ${(endTime - startTime) / 1000} seconds`);
    let ans = JSON.parse(result.choices[0].message.content);
    console.log(ans);

    const formJson = loadFileData(formId);

    var index = 0;
    for (let i = 0; i < pageNum - 1; i++) {
      index += formJson.formStructure[i];
    }

    var index = arraySum(formJson.formStructure, 0, pageNum - 1);
    formJson.pages.splice(index, 0, ...ans.pages);

    formJson.formStructure.splice(pageNum - 1, 1, ans.pages.length);

    fs.writeFileSync(savePath + '/form.json', JSON.stringify(formJson, null, 2));

    res.redirect('/results/form-' + formId + '/' + pageNum);
  } catch (error) {
    console.error('Error in GigaChat API call:', error);
    return res.status(500).send('Error processing the request');
  }
}

// Функция для распознавания текста на изображении с помощью Tesseract
async function recognizeText(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(imagePath, 'rus+eng', {
      logger: m => console.log(m),
    })
      .then(({ data: { text } }) => {
        resolve(text);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// Функция для вызова API GigaChat с распознанным текстом
async function callGigaChat(bearerToken, text) {
  const url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';
  const data = {
    model: 'GigaChat',
    messages: [
      {
        role: 'user',
        content: text
      }
    ],
    stream: false,
    repetition_penalty: 1
  };

  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
      },
      httpsAgent: agent
    });
    return response.data;
  } catch (error) {
    console.error('Error in GigaChat API call:', error);
    throw new Error('Error in GigaChat API call');
  }
}

// Отправка данных в LLM
async function sendToLLM(llm, req, res) {
  const formId = req.params.formId;
  var savePath = './public/results/form-' + formId;
  const pageNum = Number(req.params.pageNum);

  try {
    console.log('Sending data to ' + llm);

    const imagePath = `${savePath}/page.${pageNum}.jpeg`;
    var startTime = performance.now();

    // Распознавание текста на изображении с помощью Tesseract
    const ocrResult = await recognizeText(imagePath);

    // Передача распознанного текста в модель LLM
    let result;
    if (llm === 'Ollama') {
      result = await callOllama(ocrResult);
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

// Функция для вызова API Ollama с распознанным текстом
async function callOllama(text) {
  return new Promise((resolve, reject) => {
    const ollama = spawn('ollama', ['run', 'aya'], { shell: true });
    let output = '';

    console.log(`Ollama launched successfully`);

    ollama.stdout.on('data', (data) => {
      output += data.toString();
      console.log(output);
    });

    ollama.on('close', (code) => {
      console.log(`Ollama process exited with code ${code}`);
      try {
        const cleanedOutput = output.replace(/```json\n|```/g, '');
        const result = JSON.parse(cleanedOutput);
        resolve(result);
      } catch (error) {
        reject(new Error(`Ollama process error: ${error.message}`));
      }
    });

    const prompt = fs.readFileSync('data/ollama_prompt.txt', 'utf8');
    ollama.stdin.write(`${prompt} ${text}\n`);
    ollama.stdin.end();
  });
}

// === THE USER INTERFACE === //

/* FUNCTION: Sum the items between two indexes in a numerical array */
function arraySum(array, start, end) {
  var sum = 0;
  for (let i = start; i < end; i++) {
    sum += array[i];
  }
  return sum;
}

/* FUNCTION: Load file data  */
function loadFileData(formId) {
  try {
    return JSON.parse(fs.readFileSync('./public/results/form-' + formId + '/form.json'));
  } catch (err) {
    return err;
  }
}

const port = 3000;

/* Render home page */
app.get('/', (req, res) => {
  const formList = fs.readdirSync('./public/results').filter((item) => item.startsWith('form-'));
  res.locals.formList = formList;
  res.render('index.njk');
});

/* Render results pages */
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

/* Render pop-up check-answers pages */
app.get('/form-popup/:formId/:question/check-answers', (req, res) => {
  const formId = req.params.formId;
  const question = req.params.question;
  const fileData = loadFileData(formId);
  res.locals.formId = formId;
  res.locals.fileData = fileData;
  res.locals.question = question;
  res.render('check-answers-popup.njk');
});

/* Render check-answers pages */
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

/* Render form pages */
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

/* Render popup form pages */
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

/* Render list pages */
app.get('/lists/:formId/:pageNum', (req, res) => {
  const formId = req.params.formId;
  const fileData = loadFileData(formId);
  res.locals.fileData = fileData;
  res.render('list.njk');
});

/* Render JSON pages */
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
