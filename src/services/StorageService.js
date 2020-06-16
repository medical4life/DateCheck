import AsyncStorage from '@react-native-community/async-storage';

export const store = (key, value) => {
  return new Promise((resolve,reject) => {
    AsyncStorage.setItem(key, value).then(() => {
      resolve();
    }).catch(() => {
      reject();
    })
  });
}

export const get = (key, defaultValue) => {
  return new Promise((resolve,reject) => {
    AsyncStorage.getItem(key).then((value) => {
      if(value === null) {
        resolve(defaultValue)
        return;      
      }
      resolve(value);
      return;
    }).catch(() => {
      reject();
    })
  });
}

export const storeEncrypted = (key, value, encryptionKey) => {

}

export const getEncrypted = (key, value, decryptionKey) => {

}

export const remove = key => {
  return new Promise((resolve,reject) => {
    AsyncStorage.removeItem(key).then(() => {
      resolve();
    }).catch(() => {
      reject();
    })
  });
}

export default {store, get, storeEncrypted, getEncrypted, remove}