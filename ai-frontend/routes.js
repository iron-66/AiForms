const serverURL = 'http://84.201.150.75:3000'; // http://localhost:3000

export const urls = {
  uploadFile: `${serverURL}/uploadFile`,
  getFolders: `${serverURL}/getFolders`,
  deleteForm: (formId) => `${serverURL}/delete/${formId}`,
  getImage: (pageId) => `${serverURL}/results/${pageId}/page.1.jpeg`,
  getFormJson: (pageId) => `${serverURL}/results/${pageId}/form.json`,
  extractForm: (uniqueId) => `${serverURL}/extractForm/${uniqueId}/1/`,
  getPrompt: `${serverURL}/getPrompt`,
  savePrompt: `${serverURL}/savePrompt`,
  saveAnswers: (id) => `${serverURL}/saveAnswers/${id}`,
};
