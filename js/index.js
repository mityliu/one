import '../styles/main.scss';
import { h, render } from 'preact';
import Router from 'preact-router';
import Home from './Home';
import Play from './Play';
import './stats';

render(<Home />, document.body);

const Main = () => (
  <Router>
    <Home path="/" />
    <Play path="/play" />
  </Router>
);

render(<Main />, document.body);
