import Configuration from './api/Configuration';

export const checkin = (host, uid, apiToken) => {
  return new Promise((resolve, reject) => {
    let body = {
      hostUid: host,
      uid: uid,
      queuedTimestamp: new Date().getTime() / 1000,
      dispatchedTimestamp: new Date().getTime() / 1000
    };
    fetch(Configuration.API_CHECKIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 201) {
        return response.json()
      } else {
        console.log(response);
        throw "Konnte den Checkin nicht speichern";
      }
    })
    .then(json => resolve(json))
    .catch(error => reject(error))
  });
};
export const listCheckins = (apiToken) => {
  return new Promise((resolve, reject) => {
    fetch(Configuration.API_LIST_CHECKINS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else {
        console.log(response);
        throw "Konnte die Checkindaten nicht laden";
      }
    })
    .then(json => resolve(json))
    .catch(error => reject(error))
  });
};

export default {
  checkin,
  listCheckins
};