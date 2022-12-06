import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '@root/routes';

export default function client() {
  ReactDOM.hydrateRoot(
    document.getElementById('app'),
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
  );
}
