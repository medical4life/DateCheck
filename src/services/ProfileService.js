import Configuration from './api/Configuration';

export const get = (apiToken) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_USER_PROFILE_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      } else {
        throw "Fehler bei der Verarbeitung";
      }
    })
    .then(json => {
      resolve(json)
    })
    .catch(error => reject(error))
  })
};

const checkProfiles = (uid, ownUid, apiToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({uid, profileCompleted: true, ownProfileCompleted: false})
    }, 1000);
  })
};

export const update = (userObject, apiToken) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_UPDATE_USER_PROFILE, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      },
      body: JSON.stringify(userObject)
    })
    .then(response => {
      if(response.status === 202) {
        resolve();
        return
      } else {
        console.log(response);
        throw "Fehler beim Speichern des Profils";
      }
    })
    .catch(error => reject(error))
  })
};

export const deactivateAccount = (password, apiToken) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_DEACTIVATE_ACCOUNT, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      },
      body: JSON.stringify({password})
    })
    .then(response => {
      if(response.status === 201) {
        resolve();
        return
      } else {
        console.log(response);
        throw "Fehler beim Löschen des Profils";
      }
    })
    .catch(error => reject(error))
  })
};

export const forgotPassword = (username, token) => {
  let body = {
    username: username,
    email: token,
  }

  return new Promise((resolve, reject) => {
    fetch(Configuration.API_FORGOT_PASSWORD_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 202) {
        resolve();
        return
      } else {
        console.log(response);
        throw "Konnte Benutzer oder E-Mail nicht finden";
      }
    })
    .catch(error => reject(error))
  })
};

export const resendConfirmationEmail = (email) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_RESEND_CONFIRMATION_EMAIL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    .then(response => {
      if(response.status === 202) {
        resolve();
        return
      } else {
        console.log(response);
        throw "Konnte Benutzer oder E-Mail nicht finden";
      }
    })
    .catch(error => reject(error))
  })
};

export const register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const url = email !== null ? Configuration.API_REGISTER_URL : Configuration.API_REGISTER_ANO_URL;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })
    .then(response => {
      if(response.status === 201) {
        return response.json();
      } else {
        console.log(response);
        throw "Konnte Benutzer nicht erstellen";
      }
    })
    .then(response => resolve(response))
    .catch(error => reject(error))
  })
};

export const updatePassword = (oldPassword, newPassword, apiToken) => {
  return new Promise((resolve, reject) => {
    let body = {
      password: newPassword,
      oldPassword: oldPassword,
    }
    fetch(Configuration.API_UPDATE_USER_UPDATE_PASSWORD, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 202) {
        resolve();
        return
      } else {
        console.log(response);
        throw "Fehler beim Speichern des Profils";
      }
    })
    .catch(error => reject(error))
  })
};

export default {
  get,
  checkProfiles,
  update,
  deactivateAccount,
  forgotPassword,
  resendConfirmationEmail,
  register,
  updatePassword
};