export default function Popup(props) {
  return(
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <p className="popup__message">{/* Файл сохранен! */}{props.message}</p>
        <button className="popup__close-btn" onClick={props.onClose}></button>
      </div>
    </div>
  );
}
