import 'normalize.css';
import 'milligram';
import '../styles/main.scss';
import { h, render } from 'preact';
import Home from './Home';
import './stats';

render(<Home />, document.body);
