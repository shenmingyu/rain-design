import logo from './logo.svg';
import './App.css';
import { Popup } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          className="App-link"
          onClick={() => {
            Popup.show('Popup 面世了', { type: 'success', duration: 'infinite', position: 'top', animation: 'fade' })
          }}
        >
          Popup
        </div>
        <div
          className="App-link"
          onClick={() => {
            Popup.show('Popup 面世了', { type: 'success', duration: 'infinite', position: 'topLeft' })
          }}
        >
          Popup
        </div>
        <div
          className="App-link"
          onClick={() => {
            Popup.show('Popup 面世了', { type: 'success', duration: 'infinite', position: 'topRight' })
          }}
        >
          Popup
        </div>
        <div
          className="App-link"
          onClick={() => {
            Popup.show('Popup 面世了', { type: 'warning', duration: 'infinite', position: 'center' })
          }}
        >
          Popup
        </div><div
          className="App-link"
          onClick={() => {
            Popup.show('Popup 面世了', { type: 'danger', duration: 'infinite', position: 'bottom' })
          }}
        >
          Popup
        </div>
      </header>
    </div>
  );
}

export default App;
