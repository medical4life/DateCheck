import Configuration from './api/Configuration';

export const getData = (uid, apiToken) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_GUESTLIST_DATA, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+apiToken,
        CitizenUid: uid,
      }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else {
        console.log(response);
        throw "Für diesen Benutzer sind keine Daten hinterlegt";
      }
    })
    .then(json => resolve(json))
    .catch(error => reject(error))
  })
};

export const updateData = (uid, name, lastname, address, phone, email, apiToken) => {
  return new Promise((resolve, reject) => {
    /*fetch(Configuration.API_GUESTLIST_DATA, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+apiToken,
        CitizenUid: uid,
      }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else {
        console.log(response);
        throw "Für diesen Benutzer sind keine Daten hinterlegt";
      }
    })
    .then(json => resolve(json))
    .catch(error => reject(error))*/
  })
};

export default {getData};