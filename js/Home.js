import { h, Component } from 'preact';
import { useRef } from 'preact/hooks';
import linkState from 'linkstate';

export default class Home extends Component {
  input = useRef(null);
  state = {
    isSearchActive: false,
    q: '',
    appBarColor: '#e3e3e3',
    panelColor: '#f1f1f1',
    isApp: false,
    searches: [
      '多吉 https://www.dogedoge.com/results?q=',
      'Magi https://magi.com/search?q=',
      'Google https://www.google.com/search?q='
    ]
  };

  toggleSearch = () => {
    const isSearchActive = !this.state.isSearchActive;
    const input = this.input.current;

    this.setState({
      isSearchActive
    });

    if (isSearchActive) {
      input.focus();

      this.setAppBarColor(this.state.panelColor);
    } else {
      input.value = '';
      this.setAppBarColor(this.state.appBarColor);
    }
  };

  searchGo = s => {
    location.href = s.url + this.state.q;
  };

  setAppBarColor = color => {
    if (this.state.isApp) {
      window.fy_bridge_app.setAppBarColor(color || this.state.appBarColor);
    }
  };

  componentDidMount() {
    console.log('One page loaded.');
    if (window.fy_bridge_app) {
      this.setState({
        isApp: true
      });

      setTimeout(() => {
        this.setAppBarColor();
      }, 500);
    }
  }

  render(_, { isSearchActive, searches, q }) {
    const SS = searches.map(s => {
      const ls = s.trim().split(/\s+/);
      const name =
        ls.length > 1
          ? ls[0]
          : s.match(/[\/\.]([^\.]+)\.\w+\//)[1].replace(/^(\w)/, function(v) {
              return v.toUpperCase();
            });

      return {
        name,
        url: ls.pop()
      };
    });

    return (
      <div class="app">
        <main
          class={(isSearchActive ? 'is-move ' : '') + 'hero is-fullheight home'}
        >
          <div class="hero-body"></div>
        </main>

        <div class={(isSearchActive ? 'is-active ' : '') + 'O-search'}>
          <div class="O-field">
            <input
              class="O-input hide-clear"
              type="search"
              placeholder="搜索"
              ref={this.input}
              value={q}
              onInput={linkState(this, 'q')}
            />
            <div class="buttons">
              {SS.map(s => (
                <button
                  onClick={() => this.searchGo(s)}
                  class="button is-info is-outlined"
                  disabled={!q}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div class="O-close-search">
            <span class="icon is-close" onClick={this.toggleSearch}>
              {isSearchActive ? (
                <svg viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
