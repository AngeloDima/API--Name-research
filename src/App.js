


import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [ricerca, setRicerca] = useState('');
  const [checkItem, setCheckItem] = useState({});

  useEffect(() => {
    fetch('https://raintonic.com/careers/es5_dataset.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const ricercaUtente = event => {
    setRicerca(event.target.value);
  };

  const filtroData = data.filter(item => {
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    return fullName.includes(ricerca.toLowerCase());
  });




  
  // inizializza lo stato delle checkbox con i valori salvati nel localStorage solo la prima volta che l'app viene caricata
  useEffect(() => {
    const initStore = JSON.parse(localStorage.getItem('checkItem')) || {};
    if (Object.keys(initStore).length > 0) {
      setCheckItem(initStore);
    }
  }, []);

  // salva lo stato delle checkbox nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem('checkItem', JSON.stringify(checkItem));
  }, [checkItem]);

  // gestisce il cambio di stato della checkbox
  const changeState = event => {
    const { id, checked } = event.target;
    setCheckItem(prevState => ({ ...prevState, [id]: checked }));
  };





  // filtra i contatti preferiti
  const favoritiFilter = filtroData.filter(item => checkItem[item.id]);

  return (
    <div>
      <input type="text" value={ricerca} onChange={ricercaUtente} />
      <ol>
        {filtroData.map(item => (
          <li key={item.id}>
            {item.first_name} {item.last_name}
            <input
              type="checkbox"
              name=""
              id={item.id}
              checked={checkItem[item.id]}
              onChange={changeState}
            />
          </li>
        ))}
      </ol>
      <h2>Preferiti:</h2>
      <ol>
        {favoritiFilter.map(item => (
          <li key={item.id}>
            {item.first_name} {item.last_name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;


