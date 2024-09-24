const serverURL = 'http://84.201.147.208:3000'; // http://localhost:3000

export const urls = {
  uploadFile: `${serverURL}/uploadFile`,
  getImageUrl: (folder) => `${serverURL}/results/${folder}/page.1.jpeg`,
  getFolders: `${serverURL}/getFolders`,
  deleteForm: (formId) => `${serverURL}/delete/${formId}`,
  getImage: (pageId) => `${serverURL}/results/${pageId}/page.1.jpeg`,
  getFormJson: (pageId) => `${serverURL}/results/${pageId}/form.json`,
  extractForm: (uniqueId) => `${serverURL}/extractForm/${uniqueId}/1/`,
  getPrompt: `${serverURL}/getPrompt`,
  savePrompt: `${serverURL}/savePrompt`,
  saveAnswers: (id) => `${serverURL}/saveAnswers/${id}`,
  gigachatURL: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
};
