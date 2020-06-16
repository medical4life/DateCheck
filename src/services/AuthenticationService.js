import Configuration from './api/Configuration';

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_LOGIN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      } else {
        throw "Benutzername oder Passwort nicht korrekt. Bitte überprüfen Sie Ihre Zugangsdaten.";
      }
    })
    .then(json => {
      resolve(json.token)
    })
    .catch(error => reject(error))
  })
}

export default {login}