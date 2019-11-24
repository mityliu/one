import 'normalize.css';
import '../styles/main.scss';
import { h, render } from 'preact';
import 'bubbly-bg';
import Home from './Home';

render(<Home />, document.body);

bubbly({
  colorStart: '#fff4e6',
  colorStop: '#ffe9e4',
  blur: 1,
  compose: 'source-over',
  bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
});
