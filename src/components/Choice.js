export default function Choice(props) {
  function handleClick(e) {
    const name = e.target.name;
    props.onMethodClick(name);
  }

  return(
    <div className="encryption__btn-container">
      <h1 className="encryption__name">Шифрование</h1>
      <button className="encryption__encrypt" type="button" name="encrypt" onClick={handleClick}>Зашифровать</button>
      <button className="encryption__encrypt" type="button" name="decrypt" onClick={handleClick}>Расшифровать</button>
    </div>
  );
}
