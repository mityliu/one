import { h, Component } from 'preact';
import logo from '../static/logo.svg';

export default class Home extends Component {
  render() {
    return <img class="image is-24x24 mr-2" src={logo} />;
  }
}
