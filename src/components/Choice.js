export default function Choice(props) {
  return(
    <div className="encryption__btn-container">
      <h1 className="encryption__name">Шифрование</h1>
      <button className="encryption__encrypt" type="button" name="encrypt">Зашифровать</button>
      <button className="encryption__encrypt" type="button" name="decrypt">Расшифровать</button>
    </div>
  );
}
