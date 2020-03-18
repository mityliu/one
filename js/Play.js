import { h, Component } from 'preact';
import loadingSvg from '../static/one-loading.svg';
// import $ from 'cash-dom';

function loadCss(url) {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = url;
  css.type = 'text/css';

  document.getElementsByTagName('head')[0].appendChild(css);
}

function loadJs(url, cb) {
  const scriptTag = document.createElement('script');
  scriptTag.src = url;

  if (cb) {
    scriptTag.onload = cb;
    scriptTag.onreadystatechange = cb;
  }

  document.body.appendChild(scriptTag);
}

const PlayerCover = 'https://p.pstatp.com/origin/ff460000f53068309d77';

// TODO detect url change and refresh play
export default class Home extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    console.log('One-play page loaded  (o˘◡˘o)');

    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
      // TODO isHomeShortcuts
    }, 500);

    const q = new URLSearchParams(window.location.search);
    const url = q.get('url');

    if (/^http/.test(url)) {
      loadCss('https://cdn.bootcss.com/plyr/3.5.10/plyr.css');

      loadJs('https://cdn.bootcss.com/hls.js/0.13.2/hls.min.js', function() {
        loadJs('https://cdn.bootcss.com/plyr/3.5.10/plyr.min.js', function() {
          console.log('→ playing:', url);

          let video = document.querySelector('video');

          if (!video) {
            video = document.createElement('video');
            video.poster = PlayerCover;
            document.body.appendChild(video);
          }

          if (!window.ooPlyr && Plyr) {
            const player = new Plyr(video, {
              invertTime: false,
              autoplay: true,
              speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
            });

            window.ooPlyr = player;
          } else if (!Plyr) {
            // TODO hint
            console.warn('NO Plyr.');
          }

          if (/\.m3u8/.test(url) && Hls && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
              video.play();
            });
          } else {
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
              video.play();
            });
          }

          setTimeout(function() {
            if (ooPlyr.paused) {
              ooPlyr.play();
            }
          }, 500);
        });
      });
    }
  }

  render(_, state) {
    const { isLoaded } = state;
    return (
      <div class={(isLoaded ? 'is-loaded ' : '') + 'loading'}>
        <img src={loadingSvg} />
      </div>
    );
  }
}
