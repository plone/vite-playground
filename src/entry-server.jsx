import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// import { App } from './App';
import { Routes } from './routes';

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <Routes />
    </StaticRouter>,
  );
}
