import { h, Component } from 'preact';
import { useRef } from 'preact/hooks';
import linkState from 'linkstate';
import $ from 'cash-dom';
import store2 from 'store2';
import loadingSvg from '../static/one-loading.svg';

const VERSION = 'v0.1.1128';
const STORE_PREFIX = 'One';

const store = store2.namespace(STORE_PREFIX);

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

const defaultSearches = `多吉 https://www.dogedoge.com/results?q=
https://magi.com/search?q=
https://www.google.com/search?q=`;

const defaultLinks = `知乎
https://www.zhihu.com
https://www.zhihu.com/favicon.ico

哔哩
https://m.bilibili.com
https://www.bilibili.com/favicon.ico

豆瓣
https://m.douban.com
https://www.douban.com/favicon.ico

https://www.iqiyi.com`;

const defaultHtmlTitle = '🐱 One';
const defaultSearchHint = '搜索';

const defaults = {
  searches: defaultSearches,
  links: defaultLinks,
  htmlTitle: defaultHtmlTitle,
  searchHint: defaultSearchHint
};

let tmpTaker;

function getUrlName(url) {
  const matches = url.match(/\/\/([^\/]+)\/?/);
  return matches
    ? matches[1]
        .split('.')
        .slice(-2, -1)[0]
        .replace(/^(\w)/, function(v) {
          return v.toUpperCase();
        })
    : url;
}

const defaultsKey = ['searches', 'links', 'htmlTitle', 'searchHint'];
const hasSearchKeyRegex = /%s|\*\*/;

export default class Home extends Component {
  input = useRef(null);
  textarea = useRef(null);

  state = {
    activePanel: 'home',
    q: '',
    appBarColor: '#e3e3e3',
    panelColor: '#9e9e9e',
    isApp: false,
    searches: '',
    links: '',
    htmlTitle: '',
    searchHint: '',
    isEditorActive: false,
    editorTitle: '',
    editorKey: '',
    isFirstChecked: false,
    isReseted: false,
    isLoaded: false
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

    const $actionsNav = $('.actions-nav');

    $currPage.addClass('hide');
    $nextPage.addClass('is-half-active');
    $actionsNav.addClass('is-hide');

    setTimeout(function() {
      $actionsNav.removeClass('is-hide');
    }, 350);

    setTimeout(function() {
      $currPage.removeClass('is-active hide');
      $nextPage.removeClass('is-half-active').addClass('is-active');
    }, 700);

    if (this.state.activePanel === 'home') {
      if (panelName === 'search') {
        this.openSearchPanel();
      } else if (panelName === 'shortcut') {
        this.openShortcutPanel();

        if (!$('.shortcuts').data('loaded')) {
          $('.shortcuts .avatar').each(function(i, el) {
            if ($(el).attr('data-style')) {
              $(el)
                .attr('style', $(el).attr('data-style'))
                .removeClass('is-text');
            }
          });

          $('.shortcuts').data('loaded', true);
        }
      } else if (panelName === 'setting') {
        this.openSettingPanel();

        if (!$('.top-avatar img').data('loaded')) {
          $('.top-avatar img')
            .attr('src', $('.top-avatar img').attr('data-src'))
            .data('loaded', true);
        }
      }
    } else {
      this.closePanel();
    }
  };

  searchGo = s => {
    // TODO enter default
    location.href = hasSearchKeyRegex.test(s.url)
      ? s.url.replace(this.state.q)
      : s.url + this.state.q;
  };

  setAppBarColor = color => {
    if (this.state.isApp) {
      window.fy_bridge_app.setAppBarColor(color || this.state.appBarColor);
    }
  };

  closeEditor = () => {
    this.setState({
      isEditorActive: false
    });
  };

  openEditor = (key, title) => {
    this.setState({
      isEditorActive: true,
      editorKey: key,
      editorTitle: title,
      isReseted: false
    });

    $('.long-press.is-reset')
      .removeClass('is-info')
      .addClass('is-danger')
      .removeAttr('disabled');
  };

  editorInput = (e, key) => {
    const value = e.target.value;

    this.setState({ [key]: value });

    store(key, value);
  };

  tickResetConfirm = e => {
    tmpTaker = setTimeout(() => {
      store.clearAll();
      this.syncStore();

      $(e.target)
        .removeClass('is-danger')
        .addClass('is-info')
        .attr('disabled', '');

      this.setState({
        isReseted: true
      });
    }, 1900);
  };

  syncStore = () => {
    defaultsKey.forEach(key => {
      const value = store(key) || defaults[key];

      this.setState({
        [key]: value
      });

      if (key === 'htmlTitle') {
        document.title = value;
      }
    });
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

    $(() => {
      this.setState({
        isLoaded: true
      });
    });
  }

  render(_, state) {
    const {
      activePanel,
      searches,
      links,
      q,
      htmlTitle,
      searchHint,
      isEditorActive,
      editorTitle,
      editorKey,
      isFirstChecked,
      isReseted,
      isLoaded
    } = state;

    if (!isFirstChecked) {
      this.syncStore();

      this.setState({
        isFirstChecked: true
      });
    }

    const editorValue = state[editorKey];

    if (editorKey === 'htmlTitle') {
      document.title = editorValue;
    }

    const SS = searches
      .trim()
      .split(/\n+/)
      .map(s => {
        const ls = s.trim().split(/\s+/);
        const name = ls.length > 1 ? ls[0] : getUrlName(s);

        return {
          name,
          url: ls.pop()
        };
      });

    const shortcuts = links.split(/\n{2,}/).map(link => {
      const data = {};
      link
        .trim()
        .split(/\n/)
        .forEach(l => {
          if (/\.(ico|png|jpe?g|gif)/.test(l)) {
            data.image = l;
          } else if (/\/\/|\.\w+\./.test(l)) {
            data.url = l;
          } else {
            data.name = l;
          }
        });

      if (data.url && !data.name) {
        data.name = getUrlName(data.url);
      }

      return data;
    });

    const isHomePanelActive = activePanel === 'home';
    // const isSearchPanelActive = activePanel === 'search';
    // const isShortcutPanelActive = activePanel === 'shortcut';
    // const isSettingPanelActive = activePanel === 'setting';

    return (
      <div class="one">
        <section class="page is-search has-mask">
          <div class="search-row">
            <div class="buttons">
              {SS.map(s =>
                s ? (
                  <button
                    onClick={() => this.searchGo(s)}
                    class="button is-info is-outlined"
                    disabled={!q}
                  >
                    {s.name}
                  </button>
                ) : (
                  ''
                )
              )}
            </div>

            <div class="field">
              <input
                class="input hide-clear"
                type="search"
                placeholder={searchHint}
                ref={this.input}
                value={q}
                onInput={linkState(this, 'q')}
              />
            </div>
          </div>
        </section>

        <section class="page is-shortcut has-mask">
          <div class="shortcuts">
            {shortcuts.map(s =>
              s.url ? (
                <a class="shortcut" href={s.url}>
                  {s.image ? (
                    <span
                      class="avatar"
                      data-style={'background-image:url(' + s.image + ')'}
                    >
                      {s.name[0]}
                    </span>
                  ) : (
                    <span class="avatar is-text">{s.name[0]}</span>
                  )}
                  <span class="name">{s.name}</span>
                </a>
              ) : (
                ''
              )
            )}
          </div>
        </section>

        <section class="page is-setting has-mask">
          <div class="panel">
            <div class="top-avatar">
              <img data-src="https://ae01.alicdn.com/kf/H28e6b174bc904fc0bfad14aba7380b5dk.png" />
            </div>

            <div
              class="item"
              onClick={() => this.openEditor('htmlTitle', '标题')}
            >
              <div class="name">
                <span>标题</span>
              </div>
              <div class="value">
                <span>{htmlTitle}</span>
              </div>
            </div>

            <div
              class="item"
              onClick={() => this.openEditor('searchHint', '搜索提示语')}
            >
              <div class="name">
                <span>搜索提示语</span>
              </div>
              <div class="value">
                <span>{searchHint}</span>
              </div>
            </div>

            <div
              class="item"
              onClick={() => this.openEditor('searches', '搜索引擎')}
            >
              <div class="name">
                <span>搜索引擎</span>
              </div>
              <div class="value">
                <span>点击编辑</span>
              </div>
            </div>

            <div
              class="item"
              onClick={() => this.openEditor('links', '书签链接')}
            >
              <div class="name">
                <span>书签链接</span>
              </div>
              <div class="value">
                <span>点击编辑</span>
              </div>
            </div>

            <div class="item">
              <button
                class="button is-danger is-light is-fullwidth long-press is-reset"
                onMouseUp={() => {
                  clearTimeout(tmpTaker);
                }}
                onMouseDown={e => this.tickResetConfirm(e)}
                onTouchEnd={() => {
                  clearTimeout(tmpTaker);
                }}
                onTouchStart={e => this.tickResetConfirm(e)}
              >
                <span class="state"></span>
                {isReseted ? (
                  <span class="text success">重置成功 ✔</span>
                ) : (
                  <span class="text">长按 恢复默认</span>
                )}
              </button>
            </div>

            <div class="item">
              <div class="copyright">
                One<span>-</span>
                {VERSION}
                <span>-</span>(o˘◡˘o)
              </div>
            </div>
          </div>
        </section>

        <main class="page is-home is-active"></main>

        <div class={(isEditorActive ? 'is-active ' : '') + 'modal editor'}>
          <div
            class="modal-background"
            onClick={() => this.closeEditor()}
          ></div>
          <div class="modal-content">
            <div class="box">
              <div class="editor-title">
                {editorTitle}
                <span class="icon is-close" onClick={() => this.closeEditor()}>
                  {closeIcon}
                </span>
              </div>
              <textarea
                class="textarea"
                placeholder="One"
                ref={this.textarea}
                value={editorValue}
                onInput={e => this.editorInput(e, editorKey)}
              ></textarea>
            </div>
          </div>
        </div>

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

        <div class={(isLoaded ? 'is-loaded ' : '') + 'loading'}>
          <img src={loadingSvg} />
        </div>
      </div>
    );
  }
}
