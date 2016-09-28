import axios from 'axios';

function clearApiSettings() {
  localStorage.removeItem('flashcard:apiSettings');
}

function saveApiSettings(apiUrl, apiKey, apiSecret) {
  localStorage.setItem('flashcard:apiSettings', JSON.stringify({ apiUrl, apiKey, apiSecret }));
}

function readApiSettings() {
  const apiSettings = { apiUrl: '', apiKey: '', apiSecret: '' };
  Object.assign(apiSettings, JSON.parse(localStorage.getItem('flashcard:apiSettings')));
  return apiSettings;
}

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    const { apiUrl, apiKey, apiSecret } = readApiSettings();

    if (!apiUrl) {
      reject(new Error('Invalid API URL'));
      return;
    }

    const options = {
      method,
      url: apiUrl + path,
    };

    if (data) {
      options.data = data;
    }

    if (apiKey && apiSecret) {
      options.headers = { Authorization: `Basic ${btoa(apiKey + ':' + apiSecret)}` };
    }

    axios(options).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function testApi() {
  return request('GET', '?limit=0');
}

export function getCards() {
  return request('GET', '');
}

export function postCard(data) {
  return request('POST', '', data);
}

export function deleteCard(id) {
  return request('DELETE', `/id/${id}`);
}

export function auth(apiUrl, apiKey, apiSecret) {
  saveApiSettings(apiUrl, apiKey, apiSecret);
  return testApi();
}

export function deauth(apiUrl, apiKey, apiSecret) {
  clearApiSettings();
}
