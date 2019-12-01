import { h, Component } from 'preact';
import { useRef } from 'preact/hooks';
import linkState from 'linkstate';
import $ from 'cash-dom';
import store2 from 'store2';
import { Arr } from 'suni';
import loadingSvg from '../static/one-loading.svg';
import { searchIcon, shortcutIcon, settingIcon, closeIcon } from './svgIcons';
import { VERSION, STORE_PREFIX, defaults, defaultsKey } from './config';

const store = store2.namespace(STORE_PREFIX);

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

function parseSearches(searches) {
  return searches
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
}

const isImageRegex = /\.(ico|png|jpe?g|gif)/;
const isUrlRegex = /\/\/|\.\w+\./;
const isColorRegex = /^(#\w+|rgb\()/;

function parseShortcuts(links) {
  return links.split(/\n{2,}/).map(link => {
    const data = {};
    link
      .trim()
      .split(/\s*\n\s*/)
      .forEach(l => {
        if (isImageRegex.test(l)) {
          data.image = l;
        } else if (isUrlRegex.test(l)) {
          data.url = l;
        } else if (isColorRegex.test(l)) {
          data.color = l.split(/\s+/).filter(v => isColorRegex.test(v));
        } else {
          data.name = l;
        }
      });

    if (data.url && !data.name) {
      data.name = getUrlName(data.url);
    }

    return data;
  });
}

const getShortcutStyle = function(s) {
  let style = '';

  if (s.color) {
    style += 'background-color:' + s.color[0] + ';';

    if (s.color[1]) {
      style += 'color:' + s.color[1] + ';';
    }
  }

  return style;
};

const renderShortcuts = (shortcuts, isLazy = false) =>
  shortcuts.map(s =>
    s.url ? (
      <a class="shortcut" href={s.url}>
        {s.image ? (
          isLazy ? (
            <span class="avatar" style={getShortcutStyle(s)}>
              <img data-src={s.image} />
            </span>
          ) : (
            <span class="avatar" style={getShortcutStyle(s)}>
              <img src={s.image} data-loaded />
            </span>
          )
        ) : (
          <span class="avatar is-text" style={getShortcutStyle(s)}>
            <span>{s.name[0]}</span>
          </span>
        )}
        <span class="name">{s.name}</span>
      </a>
    ) : (
      ''
    )
  );

const hasSearchKeyRegex = /%s|\*\*/;

export default class Home extends Component {
  input = useRef(null);
  textarea = useRef(null);

  state = {
    activePanel: 'home',
    q: '',
    appBarColor: '#e3e3e3',
    panelColor: '#9e9e9e',
    yijuPanelColor: '#535353',
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
    isLoaded: false,
    isYijuActive: defaults.isYijuActive,
    isHomeShortcuts: defaults.isHomeShortcuts,
    bgUrls: '',
    bgUrl: ''
  };

  closePanel = () => {
    this.setState({
      activePanel: 'home',
      isReseted: false
    });

    this.input.current.value = '';
    this.setAppBarColor();
    this.reset();
  };

  openPanel = panelName => {
    this.setState({
      activePanel: panelName
    });
    this.setAppBarColorInPanel();
  };

  openSearchPanel = () => {
    this.openPanel('search');

    setTimeout(() => {
      this.input.current.focus();
    }, 500);
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

    $currPage.addClass('is-hide');
    $nextPage.addClass('is-half-active');
    $actionsNav.addClass('is-hide');

    setTimeout(function() {
      $actionsNav.removeClass('is-hide');
    }, 250);

    setTimeout(function() {
      $currPage.removeClass('is-active is-hide');
      $nextPage.removeClass('is-half-active').addClass('is-active');
    }, 350);

    if (this.state.activePanel === 'home') {
      if (panelName === 'search') {
        this.openSearchPanel();
      } else if (panelName === 'shortcut') {
        this.openShortcutPanel();

        $('.is-shortcut .avatar img[data-src]').each(function(i, el) {
          $(el)
            .attr('src', $(el).attr('data-src'))
            .removeClass('is-text')
            .attr('data-loaded', '')
            .removeAttr('data-src');
        });
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
      if (!color) {
        color = this.state.isYijuActive
          ? this.state.yijuPanelColor
          : this.state.appBarColor;
      }
      window.fy_bridge_app.setAppBarColor(color);
    }
  };

  closeEditor = () => {
    this.setState({
      isEditorActive: false
    });

    this.syncStore();
  };

  openEditor = (key, title) => {
    this.setState({
      isEditorActive: true,
      editorKey: key,
      editorTitle: title,
      isReseted: false
    });

    this.reset();
  };

  reset = () => {
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
      let value = store(key);
      if (value === null) {
        value = defaults[key];
      }

      this.setState({
        [key]: value
      });

      if (key === 'htmlTitle') {
        document.title = value;
      }

      if (key === 'bgUrls' && !this.state.isLoaded) {
        let urls = value.trim().split(/\s*\n+\s*/);
        if (urls.length === 0) {
          urls = defaults.bgUrls.trim().split(/\s*\n+\s*/);
        }

        if (urls.length > 1) {
          Arr.shuffle(urls);
        }

        this.setState({
          bgUrl: urls[0]
        });
      }
    });
  };

  setAppBarColorInPanel = () => {
    this.setAppBarColor(
      this.state.isYijuActive
        ? this.state.yijuPanelColor
        : this.state.panelColor
    );
  };

  toggleYiju = () => {
    const isYijuActive = !this.state.isYijuActive;

    this.setState({
      isYijuActive
    });
    this.setAppBarColorInPanel();

    store('isYijuActive', isYijuActive);
  };

  toggleHomeShortcuts = () => {
    const isHomeShortcuts = !this.state.isHomeShortcuts;

    this.setState({
      isHomeShortcuts
    });
    this.setAppBarColorInPanel();

    store('isHomeShortcuts', isHomeShortcuts);
  };

  componentDidMount() {
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
      setTimeout(() => {
        this.setState({
          isLoaded: true
        });
        // TODO isHomeShortcuts
      }, 500);
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
      isLoaded,
      isYijuActive,
      isHomeShortcuts,
      bgUrl
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

    const SS = parseSearches(searches);

    const shortcuts = parseShortcuts(links);

    const isHomePanelActive = activePanel === 'home';
    const isSearchPanelActive = activePanel === 'search';
    // const isShortcutPanelActive = activePanel === 'shortcut';
    // const isSettingPanelActive = activePanel === 'setting';

    return (
      <div class={(isLoaded ? 'is-loaded ' : '') + 'one'}>
        <section
          class="page is-search has-mask"
          style={bgUrl ? 'background-image:url(' + bgUrl + ');' : ''}
        >
          {isSearchPanelActive ? (
            <div class="search-row">
              <div class="buttons has-addons">
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
          ) : (
            ''
          )}
        </section>

        <section
          class="page is-shortcut has-mask"
          style={bgUrl ? 'background-image:url(' + bgUrl + ');' : ''}
        >
          <div class="shortcuts">{renderShortcuts(shortcuts, true)}</div>
        </section>

        <section
          class="page is-setting has-mask"
          style={bgUrl ? 'background-image:url(' + bgUrl + ');' : ''}
        >
          <div class="panel">
            <div class="top-avatar">
              <img data-src="https://ae01.alicdn.com/kf/H28e6b174bc904fc0bfad14aba7380b5dk.png" />
            </div>

            <div
              class="item"
              onClick={() => this.openEditor('htmlTitle', '网页标题')}
            >
              <div class="name">
                <span>网页标题</span>
              </div>
              <div class="value">
                <span>{htmlTitle}</span>
              </div>
            </div>

            <div
              class="item"
              onClick={() => this.openEditor('searchHint', '搜索提示')}
            >
              <div class="name">
                <span>搜索提示</span>
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

            <div
              class="item"
              onClick={() =>
                this.openEditor('bgUrls', '背景图（可多图，需刷新）')
              }
            >
              <div class="name">
                <span>背景图片</span>
              </div>
              <div class="value">
                <span>点击编辑</span>
              </div>
            </div>

            <div class="item" onClick={() => this.toggleHomeShortcuts()}>
              <div class="name">
                <span>首页书签</span>
              </div>
              <div class="value">
                <span class={(isHomeShortcuts ? 'is-active ' : '') + 'switch'}>
                  <span class="switch-value">
                    {isHomeShortcuts ? '✔' : '×'}
                  </span>
                </span>
              </div>
            </div>

            <div class="item" onClick={() => this.toggleYiju()}>
              <div class="name">
                <span>今日诗词</span>
              </div>
              <div class="value">
                <span class={(isYijuActive ? 'is-active ' : '') + 'switch'}>
                  <span class="switch-value">{isYijuActive ? '✔' : '×'}</span>
                </span>
              </div>
            </div>

            <div class="item">
              <button
                class="button is-danger is-light is-fullwidth long-press is-reset is-small"
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

        <section
          class="page is-home is-active"
          style={bgUrl ? 'background-image:url(' + bgUrl + ');' : ''}
        >
          {isYijuActive ? (
            <div class="yiju">
              <img
                alt="今日诗词"
                src="https://v2.jinrishici.com/one.svg?font-size=18&color=whitesmoke"
              />
            </div>
          ) : (
            ''
          )}

          {isHomeShortcuts ? (
            <div class="shortcuts">
              {renderShortcuts(shortcuts.slice(0, 10), false)}
            </div>
          ) : (
            ''
          )}
        </section>

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
              <div class="editor-hint">
                <p>清空内容会恢复成默认值。</p>
                <p>
                  图床：<a href="http://aote.frqrjg.top/Ali">奥特曼</a> |{' '}
                  <a href="https://photo.benzhu.xyz/Ali">笨猪</a>
                </p>
              </div>
              <textarea
                class="textarea"
                placeholder={defaults[editorKey]}
                ref={this.textarea}
                value={editorValue}
                onInput={e => this.editorInput(e, editorKey)}
              ></textarea>
            </div>
          </div>
        </div>

        <nav class={(isEditorActive ? 'is-hide ' : '') + 'actions-nav'}>
          {isHomePanelActive ? (
            <div class="actions">
              <span
                class="icon is-medium"
                onClick={() => this.togglePanel('search')}
              >
                {searchIcon}
              </span>

              <span
                class="icon is-medium"
                onClick={() => this.togglePanel('shortcut')}
              >
                {shortcutIcon}
              </span>

              <span
                class="icon is-medium"
                onClick={() => this.togglePanel('setting')}
              >
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
