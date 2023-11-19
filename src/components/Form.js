import { useState } from 'react';

export default function Form(props) {
  const [formValue, setFormValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState('выберите файл');
  const reader = new FileReader();
  const link = document.querySelector('.encryption__link');

  function onMethodClick(e) {
    props.onMethodClick(e.target.value);
    setIsDisabled(true);
  }

  function onSelect(e) {
    props.onTypeSelect(e.target.value);
    setFormValue('');
    setIsDisabled(true);
  }

  function handleChange(e) {
    if (props.type === 'file') {
      setText(e.target.files[0].name);
      reader.readAsText(e.target.files[0]);
      reader.onloadend = function() {
        setFormValue(reader.result);
      }

    } else {
      setFormValue(e.target.value);
    }
    setIsDisabled(true);
  }

  function handleSave() {
    props.onKeySave();
    setTimeout(() => {
      link.click();
    }, 0);
  }

  function handleKeyChange(e) {
    props.onKeyChange(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (props.option === 'encrypt') {
      setFormValue(props.onEncrypt(formValue));
    } else {
      setFormValue(props.onDecrypt(formValue));
    }
    if (props.type === 'file') {
      setTimeout(() => {
        link.click();
      }, 0);
      props.onTypeSelect('text');
    }
    setIsDisabled(false);
  }

  function handleSwapBtnClick() {
    setFormValue(props.swap);
    props.onSwap(formValue);
  }

  return(
    <form className="encryption__form" method="post" name="encryption" onSubmit = {handleSubmit}>
      <div className="encryption__container">
        <fieldset className="encrypt__actions">
          <h2 className="encryption__title">Действия</h2>
          <label className="encryption__radio-name">
            <input className="encryption__radio" type="radio" name="method" value="encrypt" id="encrypt"
            checked={props.option === 'encrypt'}  onChange = {onMethodClick} />
              шифрование
          </label>
          <label className="encryption__radio-name">
            <input className="encryption__radio" type="radio" name="method" value="decrypt" id="decrypt"
            checked={props.option === 'decrypt'} onChange = {onMethodClick} />
              расшифрование
          </label>
        </fieldset>
        <fieldset className="encryption__key">
          <input type="text" className="encrypt__key-input" name="key" placeholder="ключ" value = {props.keyValue} onChange = {handleKeyChange} />
          <button className="encryption__save-btn" type="button" onClick={handleSave}></button>
        </fieldset>
        <button className="encrypt__send-btn" name="send-btn">выполнить</button>
      </div>
      <div className="encryption__text-container">
        <select className="encryption__select" name="objects" id="objects" value={props.type} onChange={onSelect}>
          <option className="encryption__select-choice" value="text">Текст</option>
          <option className="encryption__select-choice" value="file">Файл</option>
        </select>
        {
          props.type === 'file'
            ? (
              <>
                <input className="encryption__file-input" type="file" id="file"
                  onChange = {handleChange} />
                <label className="encryption__file-cover" for="file">
                  <span className="encryption__file-caption">{text}</span>
                </label>
              </>
            )
            : <textarea className="encryption__text" name="text" value = {formValue}
                autoFocus placeholder="Введите текст для шифрования" required
                onChange = {handleChange} ></textarea>
        }
        <button className="encryption__swap-btn" type="button" disabled={isDisabled} onClick = {handleSwapBtnClick} ></button>
        <a className="encryption__link" href={props.path} download >download</a>
      </div>
    </form>
  );
}
