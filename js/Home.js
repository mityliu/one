import { h, Component } from 'preact';
import { useRef } from 'preact/hooks';
import linkState from 'linkstate';
import $ from 'cash-dom';

const searchIcon = (
  <svg
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="3"
    class="icon-svg"
  >
    <circle cx="14" cy="14" r="12"></circle>
    <path d="M23 23 L30 30"></path>
  </svg>
);

const shortcutIcon = (
  <svg
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="3"
    class="icon-svg"
  >
    <circle cx="24" cy="8" r="2"></circle>
    <path data-v-3480f8cd="" d="M2 18 L18 2 30 2 30 14 14 30 Z"></path>
  </svg>
);

const settingIcon = (
  <svg
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    class="icon-svg"
  >
    <path
      data-v-3480f8cd=""
      d="M13 2 L13 6 11 7 8 4 4 8 7 11 6 13 2 13 2 19 6 19 7 21 4 24 8 28 11 25 13 26 13 30 19 30 19 26 21 25 24 28 28 24 25 21 26 19 30 19 30 13 26 13 25 11 28 8 24 4 21 7 19 6 19 2 Z"
    ></path>
    <circle cx="16" cy="16" r="4"></circle>
  </svg>
);

const closeIcon = (
  <svg
    viewBox="0 0 32 32"
    width="24"
    height="24"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="3"
    class="icon-svg"
  >
    <path d="M2 30 L30 2 M30 30 L2 2"></path>
  </svg>
);

export default class Home extends Component {
  input = useRef(null);
  state = {
    activePanel: 'home',
    q: '',
    appBarColor: '#e3e3e3',
    panelColor: '#f1f1f1f9',
    isApp: false,
    searches: [
      '多吉 https://www.dogedoge.com/results?q=',
      'Magi https://magi.com/search?q=',
      'Google https://www.google.com/search?q='
    ]
  };

  closePanel = () => {
    this.setState({
      activePanel: 'home'
    });

    this.input.current.value = '';
    this.setAppBarColor(this.state.appBarColor);
  };

  openPanel = panelName => {
    this.setState({
      activePanel: panelName
    });
    this.setAppBarColor(this.state.panelColor);
  };

  openSearchPanel = () => {
    this.openPanel('search');

    this.input.current.focus();
  };

  openShortcutPanel = () => {
    this.openPanel('shortcut');
  };

  openSettingPanel = () => {
    this.openPanel('setting');
  };

  togglePanel = panelName => {
    const $currPage = $('.page.is-active');
    const $nextPage = $('.page.is-' + (panelName || 'home'));

    $currPage.addClass('hide');
    $nextPage.addClass('is-half-active');

    setTimeout(function() {
      $currPage.removeClass('is-active hide');
      $nextPage.removeClass('is-half-active').addClass('is-active');
    }, 1000);

    if (this.state.activePanel === 'home') {
      if (panelName === 'search') {
        this.openSearchPanel();
      } else if (panelName === 'shortcut') {
        this.openShortcutPanel();
      } else if (panelName === 'setting') {
        this.openSettingPanel();
      }
    } else {
      this.closePanel();
    }
  };

  searchGo = s => {
    // TODO enter default
    location.href = s.url + this.state.q;
  };

  setAppBarColor = color => {
    if (this.state.isApp) {
      window.fy_bridge_app.setAppBarColor(color || this.state.appBarColor);
    }
  };

  componentDidMount() {
    // TODO default bg -> lazy load new bg
    console.log('One page loaded  (o˘◡˘o)');
    if (window.fy_bridge_app) {
      this.setState({
        isApp: true
      });

      setTimeout(() => {
        this.setAppBarColor();
      }, 200);

      $('body').addClass('is-app');
    }
  }

  render(_, { activePanel, searches, q }) {
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

    const isHomePanelActive = activePanel === 'home';
    // const isSearchPanelActive = activePanel === 'search';
    // const isShortcutPanelActive = activePanel === 'shortcut';
    // const isSettingPanelActive = activePanel === 'setting';

    return (
      <div class="one">
        <main class="page is-home is-active"></main>

        <section class="page is-search">
          <div class="search-row">
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

            <div class="field">
              <input
                class="input hide-clear"
                type="search"
                placeholder="搜索"
                ref={this.input}
                value={q}
                onInput={linkState(this, 'q')}
              />
            </div>
          </div>
        </section>

        <section class="page is-shortcut">
          <div>shortcut</div>
        </section>

        <section class="page is-setting">
          <div>setting</div>
        </section>

        <nav class="actions-nav">
          {isHomePanelActive ? (
            <div class="actions">
              <span class="icon" onClick={() => this.togglePanel('search')}>
                {searchIcon}
              </span>

              <span class="icon" onClick={() => this.togglePanel('shortcut')}>
                {shortcutIcon}
              </span>

              <span class="icon" onClick={() => this.togglePanel('setting')}>
                {settingIcon}
              </span>
            </div>
          ) : (
            <span class="icon is-close" onClick={() => this.togglePanel()}>
              {closeIcon}
            </span>
          )}
        </nav>
      </div>
    );
  }
}
