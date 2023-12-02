import crypto from 'crypto';
import CryptoJS from 'crypto-js';

export function encryptData(value, type) {
  let encryptedData = '';
  let filePath = '';

  const secretKey = crypto.randomBytes(16).toString('hex');
  encryptedData = CryptoJS.Rabbit.encrypt(value, secretKey).toString();

  if (type === 'file') {
    let blob = new Blob([encryptedData], {type:'text/plain'});
    filePath = window.URL.createObjectURL(blob);
  }

  return ({ value: encryptedData, secretKey, filePath });
}

export function decryptData(value, key, type) {
  let decryptedData = '';
  let filePath = '';

  try {
    decryptedData = CryptoJS.Rabbit.decrypt(value, key).toString(CryptoJS.enc.Utf8);
  } catch(err) {
    return ({ error: `Ошибка: ${err}` });
  }


  if (type === 'file') {
    let blob = new Blob([decryptedData], {type:'text/plain'});
    filePath = window.URL.createObjectURL(blob);
  }

  return ({ value: decryptedData, filePath });
};

export function keySave(key) {
  let filePath = '';
  let blob = new Blob([key], {type:'text/plain'});

  filePath = window.URL.createObjectURL(blob);

  return(filePath);
}
