export default function FormData(props) {
  return(
    <form className="encryption__form" method="post" name="encryption">
      <div className="encryption__container">
        <fieldset className="encrypt__actions">
          <h2 className="encryption__title">Действия</h2>
          <label className="encryption__radio-name">
            <input className="encryption__radio" type="radio" name="method" value="encrypt" id="encrypt" checked />
              шифрование
          </label>
          <label className="encryption__radio-name">
            <input className="encryption__radio" type="radio" name="method" value="descrypt" id="descrypt" />
              расшифрование
          </label>
        </fieldset>
        <fieldset className="encryption__key">
          <input type="text" className="encrypt__key-input" name="key" placeholder="ключ" value="" />
          <button className="encryption__save-btn" type="button"></button>
        </fieldset>
        <button className="encrypt__send-btn" name="send-btn">выполнить</button>
      </div>
      <div className="encryption__text-container">
        <select className="encryption__select" name="objects" id="objects">
          <option className="encryption__select-choice" value="text" selected>Текст</option>
          <option className="encryption__select-choice" value="file">Файл</option>
        </select>
        {/* <textarea className="encryption__text" name="text" autofocus placeholder="Введите текст для шифрования" required></textarea> */}
        <input className="encryption__file-input" type="file" id="file" />
        <label className="encryption__file-cover" for="file">
          <span className="encryption__file-caption">выберите файл</span>
        </label>
        <button className="encryption__swap-btn" type="button" disabled></button>
      </div>
    </form>
  );
}
