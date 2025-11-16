import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const element = <h1>Hello, world!</h1>;
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'juan',
  lastName: 'salazar'
};

const element2 = (
  <h1>
    Hello, {formatName(user)}! {2+3}
  </h1>
);

function getGreeting(user) {
  if (user) {
    return <h5>Hello, {formatName(user)}!</h5>;
  }
  return <h5>Hello, Stranger.</h5>;
}

const element3 = <div tabIndex="0"></div>;

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <div className="container">
      <div>
        {element3}
        {getGreeting( user)}
        {element2}
        {element}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Button  color = "btn-primary"/>
      <Button  color = "btn-secondary"/>
      <Button  color = "btn-success"/>
      <Button  color = "btn-danger"/>
      <Button  color = "btn-warning"/>
      <Button  color = "btn-info"/>
      <Button  color = "btn-light"/>
    </div>
  );
}
function Button(props) {
  const [countButton, setCountButton]= useState(0);
  const arreglo = ["btn-primary","btn-secondary","btn-success","btn-danger","btn-warning","btn-info","btn-light"];
  return (<button type="button" onClick={() => setCountButton((countButton) => countButton + 1) } className={`btn ${arreglo[countButton]}`}> {props.color} ({countButton}) </button> 
  );
}
export default App
  