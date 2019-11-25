import { h, Component } from 'preact';
import { useRef } from 'preact/hooks';

export default class Home extends Component {
  input = useRef(null);
  state = { isSearchActive: false };

  toggleSearch = () => {
    const isSearchActive = !this.state.isSearchActive;

    this.setState({
      isSearchActive
    });

    if (isSearchActive) {
      this.input.current.focus();
    } else {
      this.input.current.value = '';
    }
  };

  render(_, { isSearchActive }) {
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
            />
          </div>

          <div class="O-content">
            <div class="O-column">
              <h2>分组名</h2>
              <a class="O-media-object" href="http://twitter.com/SaraSoueidan">
                <img
                  class="round"
                  src="https://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&amp;d=identicon&amp;r=G"
                  alt="Sara Soueidan"
                />
                <h3>Sara Soueidan</h3>
              </a>
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
