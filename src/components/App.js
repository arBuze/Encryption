import React, { useEffect, useState } from 'react';
import '../index.css';
import Choice from './Choice';
import Form from './Form';
import Popup from './Popup';

function App() {
  const [method, setMethod] = useState('');
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [message, setMessage] = useState('');

  const handlePopupOpen = () => {
    setIsPopupOpened(true);
  }

  const handlePopupClose = () => {
    setIsPopupOpened(false);
  }

  return (
    <div className="page">
    <main className="main">
      <section className="encryption">
        {method === '' ? <Choice /> : <Form />}
        <button className="encryption__return-btn" type="button"></button>
      </section>
    </main>
    <Popup isOpen = {isPopupOpened} onClose = {handlePopupClose} message = {message} />
  </div>
  );
}

export default App;
