import React, { useState } from 'react';
import '../index.css';
import Choice from './Choice';
import Form from './Form';
import Popup from './Popup';
import { encryptData, decryptData, keySave } from './Crypt';

function App() {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [methodOpt, setMethodOpt] = useState('');
  const [selectType, setSelectType] = useState('text');
  const [keyValue, setKeyValue] = useState('');
  const [swapValue, setSwapValue] = useState('');
  const [path, setPath] = useState('');

  function handleMethodClick(chosenMethod) {
    setMethodOpt(chosenMethod);
  }

  function handleSelectClick(type) {
    setSelectType(type);
  }

  function handleKeyChange(key) {
    setKeyValue(key);
  }

  function handleKeySave() {
    if (!keyValue) {
      handlePopupOpen('Ключ не может быть пустым');
      return 'Ошибка';
    }
    setPath(keySave(keyValue));
    handlePopupOpen('Файл сохранен!');
  }

  function handleEncrypt(formValue) {
    setSwapText(formValue);
    const { value, secretKey, filePath } = encryptData(formValue, selectType);
    setKeyValue(secretKey);

    if (selectType === 'file') {
      setPath(filePath);
      handlePopupOpen('Файл сохранен!');
    }
    return value;
  }

  function handleDecrypt(formValue) {
    if (!keyValue) {
      handlePopupOpen('Ключ не может быть пустым');
      return 'Ошибка';
    }

    const result = decryptData(formValue, keyValue, selectType);
    if (result.error) {
      handlePopupOpen(result.error);
      return 'Ошибка' ;
    }

    setSwapText(formValue);
    const { value, filePath } = result;

    if (selectType === 'file') {
      setPath(filePath);
      handlePopupOpen('Файл сохранен!');
    }
    return value;
  }

  function setSwapText(text) {
    setSwapValue(text);
  }

  function handlePopupOpen(text) {
    setPopupMessage(text);
    setIsPopupOpened(true);
  }

  function handlePopupClose() {
    setIsPopupOpened(false);
    setPopupMessage('');
  }

  function handleReturn() {
    setMethodOpt('');
  }

  return (
    <div className="page">
    <main className="main">
      <section className="encryption">
        {methodOpt === ''
        ? <Choice onMethodClick = {handleMethodClick} />
        : <>
            <Form option = {methodOpt} onMethodClick = {handleMethodClick}
              onTypeSelect = {handleSelectClick} type = {selectType}
              onEncrypt = {handleEncrypt} onDecrypt = {handleDecrypt}
              keyValue = {keyValue} onKeyChange = {handleKeyChange} onKeySave = {handleKeySave}
              swap = {swapValue} onSwap = {setSwapText}
              path = {path} />
            <button className="encryption__return-btn" type="button" onClick={handleReturn}></button>
          </>
        }
      </section>
    </main>
    <Popup isOpen = {isPopupOpened} message={popupMessage} onClose = {handlePopupClose} />
  </div>
  );
}

export default App;
