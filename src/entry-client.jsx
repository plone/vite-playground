import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';

ReactDOM.hydrateRoot(
  document.getElementById('app'),
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
);
