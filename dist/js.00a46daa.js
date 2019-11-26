// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel/src/builtins/bundle-url.js"}],"node_modules/normalize.css/normalize.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel/src/builtins/css-loader.js"}],"node_modules/preact/dist/preact.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = E;
exports.hydrate = H;
exports.h = exports.createElement = h;
exports.Fragment = d;
exports.createRef = p;
exports.Component = y;
exports.cloneElement = I;
exports.createContext = L;
exports.toChildArray = b;
exports._unmount = A;
exports.options = exports.isValidElement = void 0;
var n,
    l,
    u,
    t,
    i,
    o,
    r,
    f = {},
    e = [],
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
exports.isValidElement = l;
exports.options = n;

function s(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function a(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function h(n, l, u) {
  var t,
      i,
      o,
      r,
      f = arguments;
  if (l = s({}, l), arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) u.push(f[t]);
  if (null != u && (l.children = u), null != n && null != n.defaultProps) for (i in n.defaultProps) void 0 === l[i] && (l[i] = n.defaultProps[i]);
  return r = l.key, null != (o = l.ref) && delete l.ref, null != r && delete l.key, v(n, l, r, o);
}

function v(l, u, t, i) {
  var o = {
    type: l,
    props: u,
    key: t,
    ref: i,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: null,
    __c: null,
    constructor: void 0
  };
  return n.vnode && n.vnode(o), o;
}

function p() {
  return {};
}

function d(n) {
  return n.children;
}

function y(n, l) {
  this.props = n, this.context = l;
}

function m(n, l) {
  if (null == l) return n.__ ? m(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? m(n) : null;
}

function w(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return w(n);
  }
}

function g(l) {
  (!l.__d && (l.__d = !0) && 1 === u.push(l) || i !== n.debounceRendering) && ((i = n.debounceRendering) || t)(k);
}

function k() {
  var n, l, t, i, o, r, f;

  for (u.sort(function (n, l) {
    return l.__v.__b - n.__v.__b;
  }); n = u.pop();) n.__d && (t = void 0, i = void 0, r = (o = (l = n).__v).__e, (f = l.__P) && (t = [], i = T(f, o, s({}, o), l.__n, void 0 !== f.ownerSVGElement, null, t, null == r ? m(o) : r), $(t, o), i != r && w(o)));
}

function _(n, l, u, t, i, o, r, c, s) {
  var h,
      v,
      p,
      d,
      y,
      w,
      g,
      k = u && u.__k || e,
      _ = k.length;
  if (c == f && (c = null != o ? o[0] : _ ? m(u, 0) : null), h = 0, l.__k = b(l.__k, function (u) {
    if (null != u) {
      if (u.__ = l, u.__b = l.__b + 1, null === (p = k[h]) || p && u.key == p.key && u.type === p.type) k[h] = void 0;else for (v = 0; v < _; v++) {
        if ((p = k[v]) && u.key == p.key && u.type === p.type) {
          k[v] = void 0;
          break;
        }

        p = null;
      }

      if (d = T(n, u, p = p || f, t, i, o, r, c, s), (v = u.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, u), g.push(v, u.__c || d, u)), null != d) {
        if (null == w && (w = d), null != u.__d) d = u.__d, u.__d = null;else if (o == p || d != c || null == d.parentNode) {
          n: if (null == c || c.parentNode !== n) n.appendChild(d);else {
            for (y = c, v = 0; (y = y.nextSibling) && v < _; v += 2) if (y == d) break n;

            n.insertBefore(d, c);
          }

          "option" == l.type && (n.value = "");
        }
        c = d.nextSibling, "function" == typeof l.type && (l.__d = d);
      }
    }

    return h++, u;
  }), l.__e = w, null != o && "function" != typeof l.type) for (h = o.length; h--;) null != o[h] && a(o[h]);

  for (h = _; h--;) null != k[h] && A(k[h], k[h]);

  if (g) for (h = 0; h < g.length; h++) z(g[h], g[++h], g[++h]);
}

function b(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var t = 0; t < n.length; t++) b(n[t], l, u);else u.push(l ? l("string" == typeof n || "number" == typeof n ? v(null, n, null, null) : null != n.__e || null != n.__c ? v(n.type, n.props, n.key, null) : n) : n);
  return u;
}

function x(n, l, u, t, i) {
  var o;

  for (o in u) o in l || P(n, o, null, u[o], t);

  for (o in l) i && "function" != typeof l[o] || "value" === o || "checked" === o || u[o] === l[o] || P(n, o, l[o], u[o], t);
}

function C(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
}

function P(n, l, u, t, i) {
  var o, r, f, e, c;
  if (i ? "className" === l && (l = "class") : "class" === l && (l = "className"), "key" === l || "children" === l) ;else if ("style" === l) {
    if (o = n.style, "string" == typeof u) o.cssText = u;else {
      if ("string" == typeof t && (o.cssText = "", t = null), t) for (r in t) u && r in u || C(o, r, "");
      if (u) for (f in u) t && u[f] === t[f] || C(o, f, u[f]);
    }
  } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, N, e), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, N, e)) : "list" !== l && "tagName" !== l && "form" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
}

function N(l) {
  this.l[l.type](n.event ? n.event(l) : l);
}

function T(l, u, t, i, o, r, f, e, c) {
  var a,
      h,
      v,
      p,
      m,
      w,
      g,
      k,
      x,
      C,
      P = u.type;
  if (void 0 !== u.constructor) return null;
  (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (k = u.props, x = (a = P.contextType) && i[a.__c], C = a ? x ? x.props.value : a.__ : i, t.__c ? g = (h = u.__c = t.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(k, C) : (u.__c = h = new y(k, C), h.constructor = P, h.render = D), x && x.sub(h), h.props = k, h.state || (h.state = {}), h.context = C, h.__n = i, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = s({}, h.__s)), s(h.__s, P.getDerivedStateFromProps(k, h.__s))), p = h.props, m = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && null == h.__e && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, C), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, C)) {
          for (h.props = k, h.state = h.__s, h.__d = !1, h.__v = u, u.__e = t.__e, u.__k = t.__k, h.__h.length && f.push(h), a = 0; a < u.__k.length; a++) u.__k[a] && (u.__k[a].__ = u);

          break n;
        }

        null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, C), null != h.componentDidUpdate && h.__h.push(function () {
          h.componentDidUpdate(p, m, w);
        });
      }
      h.context = C, h.props = k, h.state = h.__s, (a = n.__r) && a(u), h.__d = !1, h.__v = u, h.__P = l, a = h.render(h.props, h.state, h.context), u.__k = b(null != a && a.type == d && null == a.key ? a.props.children : a), null != h.getChildContext && (i = s(s({}, i), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (w = h.getSnapshotBeforeUpdate(p, m)), _(l, u, t, i, o, r, f, e, c), h.base = u.__e, h.__h.length && f.push(h), g && (h.__E = h.__ = null), h.__e = null;
    } else u.__e = j(t.__e, u, t, i, o, r, f, c);

    (a = n.diffed) && a(u);
  } catch (l) {
    n.__e(l, u, t);
  }

  return u.__e;
}

function $(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function j(n, l, u, t, i, o, r, c) {
  var s,
      a,
      h,
      v,
      p,
      d = u.props,
      y = l.props;
  if (i = "svg" === l.type || i, null == n && null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
    n = a, o[s] = null;
    break;
  }

  if (null == n) {
    if (null === l.type) return document.createTextNode(y);
    n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), o = null;
  }

  if (null === l.type) null != o && (o[o.indexOf(n)] = null), d !== y && (n.data = y);else if (l !== u) {
    if (null != o && (o = e.slice.call(n.childNodes)), h = (d = u.props || f).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, !c) {
      if (d === f) for (d = {}, p = 0; p < n.attributes.length; p++) d[n.attributes[p].name] = n.attributes[p].value;
      (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || ""));
    }

    x(n, y, d, i, c), l.__k = l.props.children, v || _(n, l, u, t, "foreignObject" !== l.type && i, o, r, f, c), c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked));
  }
  return n;
}

function z(l, u, t) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, t);
  }
}

function A(l, u, t) {
  var i, o, r;

  if (n.unmount && n.unmount(l), (i = l.ref) && z(i, null, u), t || "function" == typeof l.type || (t = null != (o = l.__e)), l.__e = l.__d = null, null != (i = l.__c)) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    i.base = i.__P = null;
  }

  if (i = l.__k) for (r = 0; r < i.length; r++) i[r] && A(i[r], u, t);
  null != o && a(o);
}

function D(n, l, u) {
  return this.constructor(n, u);
}

function E(l, u, t) {
  var i, r, c;
  n.__ && n.__(l, u), r = (i = t === o) ? null : t && t.__k || u.__k, l = h(d, null, [l]), c = [], T(u, (i ? u : t || u).__k = l, r || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : r ? null : e.slice.call(u.childNodes), c, t || f, i), $(c, l);
}

function H(n, l) {
  E(n, l, o);
}

function I(n, l) {
  return l = s(s({}, n.props), l), arguments.length > 2 && (l.children = e.slice.call(arguments, 2)), v(n.type, l, l.key || n.key, l.ref || n.ref);
}

function L(n) {
  var l = {},
      u = {
    __c: "__cC" + r++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var t,
          i = this;
      return this.getChildContext || (t = [], this.getChildContext = function () {
        return l[u.__c] = i, l;
      }, this.shouldComponentUpdate = function (l) {
        n.value !== l.value && t.some(function (n) {
          n.context = l.value, g(n);
        });
      }, this.sub = function (n) {
        t.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          t.splice(t.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Consumer.contextType = u, u;
}

exports.options = n = {
  __e: function (n, l) {
    for (var u; l = l.__;) if ((u = l.__c) && !u.__) try {
      if (u.constructor && null != u.constructor.getDerivedStateFromError) u.setState(u.constructor.getDerivedStateFromError(n));else {
        if (null == u.componentDidCatch) continue;
        u.componentDidCatch(n);
      }
      return g(u.__E = u);
    } catch (l) {
      n = l;
    }

    throw n;
  }
}, exports.isValidElement = l = function (n) {
  return null != n && void 0 === n.constructor;
}, y.prototype.setState = function (n, l) {
  var u;
  u = this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && s(u, n), null != n && this.__v && (this.__e = !1, l && this.__h.push(l), g(this));
}, y.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), g(this));
}, y.prototype.render = d, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = f, r = 0;
},{}],"node_modules/preact/hooks/dist/hooks.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useState = v;
exports.useReducer = m;
exports.useEffect = p;
exports.useLayoutEffect = l;
exports.useRef = d;
exports.useImperativeHandle = s;
exports.useMemo = y;
exports.useCallback = T;
exports.useContext = w;
exports.useDebugValue = A;

var _preact = require("preact");

var t,
    u,
    r,
    i = [],
    o = _preact.options.__r,
    f = _preact.options.diffed,
    c = _preact.options.__c,
    e = _preact.options.unmount;

function a(t) {
  _preact.options.__h && _preact.options.__h(u);
  var r = u.__H || (u.__H = {
    t: [],
    u: []
  });
  return t >= r.t.length && r.t.push({}), r.t[t];
}

function v(n) {
  return m(x, n);
}

function m(n, r, i) {
  var o = a(t++);
  return o.__c || (o.__c = u, o.i = [i ? i(r) : x(void 0, r), function (t) {
    var u = n(o.i[0], t);
    o.i[0] !== u && (o.i[0] = u, o.__c.setState({}));
  }]), o.i;
}

function p(n, r) {
  var i = a(t++);
  q(i.o, r) && (i.i = n, i.o = r, u.__H.u.push(i));
}

function l(n, r) {
  var i = a(t++);
  q(i.o, r) && (i.i = n, i.o = r, u.__h.push(i));
}

function d(n) {
  return y(function () {
    return {
      current: n
    };
  }, []);
}

function s(n, t, u) {
  l(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function y(n, u) {
  var r = a(t++);
  return q(r.o, u) ? (r.o = u, r.v = n, r.i = n()) : r.i;
}

function T(n, t) {
  return y(function () {
    return n;
  }, t);
}

function w(n) {
  var r = u.context[n.__c];
  if (!r) return n.__;
  var i = a(t++);
  return null == i.i && (i.i = !0, r.sub(u)), r.props.value;
}

function A(t, u) {
  _preact.options.useDebugValue && _preact.options.useDebugValue(u ? u(t) : t);
}

function F() {
  i.some(function (n) {
    n.__P && (n.__H.u.forEach(_), n.__H.u.forEach(g), n.__H.u = []);
  }), i = [];
}

function _(n) {
  n.m && n.m();
}

function g(n) {
  var t = n.i();
  "function" == typeof t && (n.m = t);
}

function q(n, t) {
  return !n || t.some(function (t, u) {
    return t !== n[u];
  });
}

function x(n, t) {
  return "function" == typeof t ? t(n) : t;
}

_preact.options.__r = function (n) {
  o && o(n), t = 0, (u = n.__c).__H && (u.__H.u.forEach(_), u.__H.u.forEach(g), u.__H.u = []);
}, _preact.options.diffed = function (t) {
  f && f(t);
  var u = t.__c;

  if (u) {
    var o = u.__H;
    o && o.u.length && (1 !== i.push(u) && r === _preact.options.requestAnimationFrame || ((r = _preact.options.requestAnimationFrame) || function (n) {
      var t,
          u = function () {
        clearTimeout(r), cancelAnimationFrame(t), setTimeout(n);
      },
          r = setTimeout(u, 100);

      "undefined" != typeof window && (t = requestAnimationFrame(u));
    })(F));
  }
}, _preact.options.__c = function (n, t) {
  t.some(function (n) {
    n.__h.forEach(_), n.__h = n.__h.filter(function (n) {
      return !n.i || g(n);
    });
  }), c && c(n, t);
}, _preact.options.unmount = function (n) {
  e && e(n);
  var t = n.__c;

  if (t) {
    var u = t.__H;
    u && u.t.forEach(function (n) {
      return n.m && n.m();
    });
  }
};
},{"preact":"node_modules/preact/dist/preact.module.js"}],"node_modules/linkstate/dist/linkstate.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function dlv(obj, key, def, p) {
  p = 0;
  key = key.split ? key.split('.') : key;

  while (obj && p < key.length) {
    obj = obj[key[p++]];
  }

  return obj === undefined ? def : obj;
}
/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 */


function linkState(component, key, eventPath) {
  var path = key.split('.'),
      cache = component.__lsc || (component.__lsc = {});
  return cache[key + eventPath] || (cache[key + eventPath] = function (e) {
    var t = e && e.target || this,
        state = {},
        obj = state,
        v = typeof eventPath === 'string' ? dlv(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e,
        i = 0;

    for (; i < path.length - 1; i++) {
      obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
    }

    obj[path[i]] = v;
    component.setState(state);
  });
}

var _default = linkState;
exports.default = _default;
},{}],"node_modules/cash-dom/dist/cash.js":[function(require,module,exports) {
/* MIT https://github.com/kenwheeler/cash */
(function(){
"use strict";

var doc = document,
    win = window,
    div = doc.createElement('div'),
    _a = Array.prototype,
    filter = _a.filter,
    indexOf = _a.indexOf,
    map = _a.map,
    push = _a.push,
    reverse = _a.reverse,
    slice = _a.slice,
    some = _a.some,
    splice = _a.splice;
var idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.ts

function find(selector, context) {
  if (context === void 0) {
    context = doc;
  }

  return !isDocument(context) && !isElement(context) ? [] : classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.ts
// @require ./variables.ts


var Cash =
/** @class */
function () {
  function Cash(selector, context) {
    if (context === void 0) {
      context = doc;
    }

    if (!selector) return;
    if (isCash(selector)) return selector;
    var eles = selector;

    if (isString(selector)) {
      var ctx = isCash(context) ? context[0] : context;
      eles = idRe.test(selector) ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
      if (!eles) return;
    } else if (isFunction(selector)) {
      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
    }

    if (eles.nodeType || eles === win) eles = [eles];
    this.length = eles.length;

    for (var i = 0, l = this.length; i < l; i++) {
      this[i] = eles[i];
    }
  }

  Cash.prototype.init = function (selector, context) {
    return new Cash(selector, context);
  };

  return Cash;
}();

var cash = Cash.prototype.init;
cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`

Cash.prototype.length = 0;
Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if (typeof Symbol === 'function') {
  Cash.prototype[Symbol['iterator']] = Array.prototype[Symbol['iterator']];
}

Cash.prototype.get = function (index) {
  if (index === undefined) return slice.call(this);
  return this[index < 0 ? index + this.length : index];
};

Cash.prototype.eq = function (index) {
  return cash(this.get(index));
};

Cash.prototype.first = function () {
  return this.eq(0);
};

Cash.prototype.last = function () {
  return this.eq(-1);
};

Cash.prototype.map = function (callback) {
  return cash(map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  }));
};

Cash.prototype.slice = function () {
  return cash(slice.apply(this, arguments));
}; // @require ./cash.ts


var dashAlphaRe = /-([a-z])/g;

function camelCaseReplace(match, letter) {
  return letter.toUpperCase();
}

function camelCase(str) {
  return str.replace(dashAlphaRe, camelCaseReplace);
}

cash.camelCase = camelCase;

function each(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback.call(arr[i], i, arr[i]) === false) break;
  }
}

cash.each = each;

Cash.prototype.each = function (callback) {
  each(this, callback);
  return this;
};

Cash.prototype.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[prop];
  });
}; // @require ./cash.ts


function extend(target) {
  var objs = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    objs[_i - 1] = arguments[_i];
  }

  var args = arguments,
      length = args.length;

  for (var i = length < 2 ? 0 : 1; i < length; i++) {
    for (var key in args[i]) {
      target[key] = args[i][key];
    }
  }

  return target;
}

Cash.prototype.extend = function (plugins) {
  return extend(cash.fn, plugins);
};

cash.extend = extend;
cash.guid = 1; // @require ./cash.ts

function matches(ele, selector) {
  var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['mozMatchesSelector'] || ele['msMatchesSelector'] || ele['oMatchesSelector']);
  return !!matches && matches.call(ele, selector);
}

cash.matches = matches; // @require ./variables.ts

function pluck(arr, prop, deep) {
  var plucked = [];

  for (var i = 0, l = arr.length; i < l; i++) {
    var val_1 = arr[i][prop];

    while (val_1 != null) {
      plucked.push(val_1);
      if (!deep) break;
      val_1 = val_1[prop];
    }
  }

  return plucked;
} // @require ./cash.ts


function isCash(x) {
  return x instanceof Cash;
}

function isWindow(x) {
  return !!x && x === x.window;
}

function isDocument(x) {
  return !!x && x.nodeType === 9;
}

function isElement(x) {
  return !!x && x.nodeType === 1;
}

function isFunction(x) {
  return typeof x === 'function';
}

function isString(x) {
  return typeof x === 'string';
}

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

var isArray = Array.isArray;
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isString = isString;
cash.isNumeric = isNumeric;
cash.isArray = isArray;

Cash.prototype.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
}; // @require ./matches.ts
// @require ./type_checking.ts


function getCompareFunction(comparator) {
  return isString(comparator) ? function (i, ele) {
    return matches(ele, comparator);
  } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
    return comparator.is(ele);
  } : function (i, ele) {
    return ele === comparator;
  };
}

Cash.prototype.filter = function (comparator) {
  if (!comparator) return cash();
  var compare = getCompareFunction(comparator);
  return cash(filter.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  }));
}; // @require collection/filter.ts


function filtered(collection, comparator) {
  return !comparator || !collection.length ? collection : collection.filter(comparator);
} // @require ./type_checking.ts


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
}

Cash.prototype.hasClass = function (cls) {
  return cls && some.call(this, function (ele) {
    return ele.classList.contains(cls);
  });
};

Cash.prototype.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  if (!attrs.length) return this;
  return this.each(function (i, ele) {
    each(attrs, function (i, a) {
      ele.removeAttribute(a);
    });
  });
};

function attr(attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0]) return;
      var value_1 = this[0].getAttribute(attr);
      return value_1 === null ? undefined : value_1;
    }

    if (value === undefined) return this;
    if (value === null) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}

Cash.prototype.attr = attr;

Cash.prototype.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = force !== undefined;
  if (!classes.length) return this;
  return this.each(function (i, ele) {
    each(classes, function (i, c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
};

Cash.prototype.addClass = function (cls) {
  return this.toggleClass(cls, true);
};

Cash.prototype.removeClass = function (cls) {
  return !arguments.length ? this.attr('class', '') : this.toggleClass(cls, false);
}; // @optional ./add_class.ts
// @optional ./attr.ts
// @optional ./has_class.ts
// @optional ./prop.ts
// @optional ./remove_attr.ts
// @optional ./remove_class.ts
// @optional ./remove_prop.ts
// @optional ./toggle_class.ts
// @require ./cash.ts
// @require ./variables


function unique(arr) {
  return arr.length > 1 ? filter.call(arr, function (item, index, self) {
    return indexOf.call(self, item) === index;
  }) : arr;
}

cash.unique = unique;

Cash.prototype.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @require core/type_checking.ts
// @require core/variables.ts


function computeStyle(ele, prop, isVariable) {
  if (!isElement(ele) || !prop) return;
  var style = win.getComputedStyle(ele, null);
  return prop ? isVariable ? style.getPropertyValue(prop) || undefined : style[prop] : style;
} // @require ./compute_style.ts


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.ts

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts


var prefixedProps = {},
    style = div.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC.charAt(0).toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (i, p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

;
cash.prefixedProp = getPrefixedProp; // @require core/type_checking.ts
// @require ./is_css_variable.ts

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
}

function css(prop, value) {
  if (isString(prop)) {
    var isVariable_1 = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable_1);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable_1);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;

      if (isVariable_1) {
        ele.style.setProperty(prop, value); //TSC
      } else {
        ele.style[prop] = value; //TSC
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}

;
Cash.prototype.css = css; // @optional ./css.ts
// @require core/camel_case.ts

function getData(ele, key) {
  var value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase(key)] : ele.getAttribute("data-" + key);

  try {
    return JSON.parse(value);
  } catch (_a) {}

  return value;
} // @require core/camel_case.ts


function setData(ele, key, value) {
  try {
    value = JSON.stringify(value);
  } catch (_a) {}

  if (ele.dataset) {
    ele.dataset[camelCase(key)] = value;
  } else {
    ele.setAttribute("data-" + key, value);
  }
}

var dataAttributeRe = /^data-(.+)/;

function data(name, value) {
  var _this = this;

  if (!name) {
    if (!this[0]) return;
    var datas_1 = {};
    each(this[0].attributes, function (i, attr) {
      var match = attr.name.match(dataAttributeRe);
      if (!match) return;
      datas_1[match[1]] = _this.data(match[1]);
    });
    return datas_1;
  }

  if (isString(name)) {
    if (value === undefined) return this[0] && getData(this[0], name);
    return this.each(function (i, ele) {
      return setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}

Cash.prototype.data = data; // @optional ./data.ts
// @require css/helpers/compute_style_int.ts

function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
}

each(['Width', 'Height'], function (i, prop) {
  Cash.prototype["inner" + prop] = function () {
    if (!this[0]) return;
    if (isWindow(this[0])) return win["inner" + prop];
    return this[0]["client" + prop];
  };
});
each(['width', 'height'], function (index, prop) {
  Cash.prototype[prop] = function (value) {
    if (!this[0]) return value === undefined ? undefined : this;

    if (!arguments.length) {
      if (isWindow(this[0])) return this[0][camelCase("outer-" + prop)];
      return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
    }

    var valueNumber = parseInt(value, 10); //TSC

    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[prop] = getSuffixedValue(prop, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
});
each(['Width', 'Height'], function (index, prop) {
  Cash.prototype["outer" + prop] = function (includeMargins) {
    if (!this[0]) return;
    if (isWindow(this[0])) return win["outer" + prop];
    return this[0]["offset" + prop] + (includeMargins ? computeStyleInt(this[0], "margin" + (!index ? 'Left' : 'Top')) + computeStyleInt(this[0], "margin" + (!index ? 'Right' : 'Bottom')) : 0);
  };
}); // @optional ./inner.ts
// @optional ./normal.ts
// @optional ./outer.ts
// @require css/helpers/compute_style.ts

var defaultDisplay = {};

function getDefaultDisplay(tagName) {
  if (defaultDisplay[tagName]) return defaultDisplay[tagName];
  var ele = doc.createElement(tagName);
  doc.body.appendChild(ele);
  var display = computeStyle(ele, 'display');
  doc.body.removeChild(ele);
  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
} // @require css/helpers/compute_style.ts


function isHidden(ele) {
  return computeStyle(ele, 'display') === 'none';
}

Cash.prototype.toggle = function (force) {
  return this.each(function (i, ele) {
    var show = force !== undefined ? force : isHidden(ele);

    if (show) {
      ele.style.display = '';

      if (isHidden(ele)) {
        ele.style.display = getDefaultDisplay(ele.tagName);
      }
    } else {
      ele.style.display = 'none';
    }
  });
};

Cash.prototype.hide = function () {
  return this.toggle(false);
};

Cash.prototype.show = function () {
  return this.toggle(true);
}; // @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces(ns1, ns2) {
  return !ns2 || !some.call(ns2, function (ns) {
    return ns1.indexOf(ns) < 0;
  });
}

var eventsNamespace = '__cashEvents',
    eventsNamespacesSeparator = '.',
    eventsFocus = {
  focus: 'focusin',
  blur: 'focusout'
},
    eventsHover = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
},
    eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; // @require ./variables.ts

function getEventNameBubbling(name) {
  return eventsHover[name] || eventsFocus[name] || name;
} // @require ./variables.ts


function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.ts
// @require events/helpers/get_events_cache.ts


function addEvent(ele, name, namespaces, selector, callback) {
  callback.guid = callback.guid || cash.guid++;
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, selector, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.ts


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
} // @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts


function removeEvent(ele, name, namespaces, selector, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    for (name in cache) {
      removeEvent(ele, name, namespaces, selector, callback);
    }

    delete ele[eventsNamespace];
  } else if (cache[name]) {
    cache[name] = cache[name].filter(function (_a) {
      var ns = _a[0],
          sel = _a[1],
          cb = _a[2];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
      ele.removeEventListener(name, cb);
    });
  }
}

Cash.prototype.off = function (eventFullName, selector, callback) {
  var _this = this;

  if (eventFullName === undefined) {
    this.each(function (i, ele) {
      return removeEvent(ele);
    });
  } else {
    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    each(getSplitValues(eventFullName), function (i, eventFullName) {
      var _a = parseEventName(getEventNameBubbling(eventFullName)),
          name = _a[0],
          namespaces = _a[1];

      _this.each(function (i, ele) {
        return removeEvent(ele, name, namespaces, selector, callback);
      }); //TSC

    });
  }

  return this;
};

function on(eventFullName, selector, callback, _one) {
  var _this = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, eventFullName[key]);
    }

    return this;
  }

  if (isFunction(selector)) {
    callback = selector;
    selector = '';
  }

  each(getSplitValues(eventFullName), function (i, eventFullName) {
    var _a = parseEventName(getEventNameBubbling(eventFullName)),
        name = _a[0],
        namespaces = _a[1];

    _this.each(function (i, ele) {
      var finalCallback = function finalCallback(event) {
        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            //TSC
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
          event.__delegate = true;
        }

        if (event.__delegate) {
          Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
              return thisArg;
            }
          });
        }

        var returnValue = callback.call(thisArg, event, event.data); //TSC

        if (_one) {
          removeEvent(ele, name, namespaces, selector, finalCallback); //TSC
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback['guid'] = callback['guid'] || cash.guid++; //TSC

      addEvent(ele, name, namespaces, selector, finalCallback); //TSC
    });
  });
  return this;
}

Cash.prototype.on = on;

function one(eventFullName, selector, callback) {
  return this.on(eventFullName, selector, callback, true); //TSC
}

;
Cash.prototype.one = one;

Cash.prototype.ready = function (callback) {
  var finalCallback = function finalCallback() {
    return callback(cash);
  };

  if (doc.readyState !== 'loading') {
    setTimeout(finalCallback);
  } else {
    doc.addEventListener('DOMContentLoaded', finalCallback);
  }

  return this;
};

Cash.prototype.trigger = function (eventFullName, data) {
  var evt;

  if (isString(eventFullName)) {
    var _a = parseEventName(eventFullName),
        name_1 = _a[0],
        namespaces = _a[1],
        type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';

    evt = doc.createEvent(type);
    evt.initEvent(name_1, true, true);
    evt.namespace = namespaces.join(eventsNamespacesSeparator);
  } else {
    evt = eventFullName;
  }

  evt.data = data;
  var isEventFocus = evt.type in eventsFocus;
  return this.each(function (i, ele) {
    if (isEventFocus && isFunction(ele[evt.type])) {
      ele[evt.type]();
    } else {
      ele.dispatchEvent(evt);
    }
  });
}; // @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts


function getValue(ele) {
  if (ele.multiple && ele.options) return pluck(filter.call(ele.options, function (option) {
    return option.selected && !option.disabled && !option.parentNode.disabled;
  }), 'value');
  return ele.value || '';
}

var queryEncodeSpaceRe = /%20/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value).replace(queryEncodeSpaceRe, '+');
} // @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts


var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

Cash.prototype.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (i, ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);
      if (value === undefined) return;
      var values = isArray(value) ? value : [value];
      each(values, function (i, value) {
        query += queryEncode(ele.name, value);
      });
    });
  });
  return query.substr(1);
};

function val(value) {
  if (value === undefined) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    if (ele.tagName === 'SELECT') {
      var eleValue_1 = isArray(value) ? value : value === null ? [] : [value];
      each(ele.options, function (i, option) {
        option.selected = eleValue_1.indexOf(option.value) >= 0;
      });
    } else {
      ele.value = value === null ? '' : value;
    }
  });
}

Cash.prototype.val = val;

Cash.prototype.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
};

Cash.prototype.detach = function () {
  return this.each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
}; // @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts


var fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
var containers;

function initContainers() {
  if (containers) return;
  var table = doc.createElement('table'),
      tr = doc.createElement('tr');
  containers = {
    '*': div,
    tr: doc.createElement('tbody'),
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
  };
}

function parseHTML(html) {
  initContainers();
  if (!isString(html)) return [];
  if (singleTagRe.test(html)) return [doc.createElement(RegExp.$1)];
  var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return cash(container.childNodes).detach().get();
}

cash.parseHTML = parseHTML;

Cash.prototype.empty = function () {
  return this.each(function (i, ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  });
};

function html(html) {
  if (html === undefined) return this[0] && this[0].innerHTML;
  return this.each(function (i, ele) {
    ele.innerHTML = html;
  });
}

Cash.prototype.html = html;

Cash.prototype.remove = function () {
  return this.detach().off();
};

function text(text) {
  if (text === undefined) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    ele.textContent = text;
  });
}

;
Cash.prototype.text = text;

Cash.prototype.unwrap = function () {
  this.parent().each(function (i, ele) {
    var $ele = cash(ele);
    $ele.replaceWith($ele.children());
  });
  return this;
}; // @require core/cash.ts
// @require core/variables.ts


var docEle = doc.documentElement;

Cash.prototype.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset - docEle.clientTop,
    left: rect.left + win.pageXOffset - docEle.clientLeft
  };
};

Cash.prototype.offsetParent = function () {
  return cash(this[0] && this[0].offsetParent);
};

Cash.prototype.position = function () {
  var ele = this[0];
  if (!ele) return;
  return {
    left: ele.offsetLeft,
    top: ele.offsetTop
  };
};

Cash.prototype.children = function (comparator) {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.children);
  });
  return filtered(cash(unique(result)), comparator);
};

Cash.prototype.contents = function () {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes);
  });
  return cash(unique(result));
};

Cash.prototype.find = function (selector) {
  var result = [];

  for (var i = 0, l = this.length; i < l; i++) {
    var found = find(selector, this[i]);

    if (found.length) {
      push.apply(result, found);
    }
  }

  return cash(unique(result));
}; // @require collection/filter.ts
// @require traversal/find.ts


var scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
    HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function evalScripts(node) {
  var collection = cash(node);
  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
    if (!ele.src && scriptTypeRe.test(ele.type)) {
      // The script type is supported
      if (ele.ownerDocument.documentElement.contains(ele)) {
        // The element is attached to the DOM // Using `documentElement` for broader browser support
        eval(ele.textContent.replace(HTMLCDATARe, ''));
      }
    }
  });
} // @require ./eval_scripts.ts


function insertElement(anchor, child, prepend, prependTarget) {
  if (prepend) {
    anchor.insertBefore(child, prependTarget);
  } else {
    anchor.appendChild(child);
  }

  evalScripts(child);
} // @require core/each.ts
// @require core/type_checking.ts
// @require ./insert_element.ts


function insertContent(parent, child, prepend) {
  each(parent, function (index, parentEle) {
    each(child, function (i, childEle) {
      insertElement(parentEle, !index ? childEle : childEle.cloneNode(true), prepend, prepend && parentEle.firstChild);
    });
  });
}

Cash.prototype.append = function () {
  var _this = this;

  each(arguments, function (i, selector) {
    insertContent(_this, cash(selector));
  });
  return this;
};

Cash.prototype.appendTo = function (selector) {
  insertContent(cash(selector), this);
  return this;
};

Cash.prototype.insertAfter = function (selector) {
  var _this = this;

  cash(selector).each(function (index, ele) {
    var parent = ele.parentNode;

    if (parent) {
      _this.each(function (i, e) {
        insertElement(parent, !index ? e : e.cloneNode(true), true, ele.nextSibling);
      });
    }
  });
  return this;
};

Cash.prototype.after = function () {
  var _this = this;

  each(reverse.apply(arguments), function (i, selector) {
    reverse.apply(cash(selector).slice()).insertAfter(_this);
  });
  return this;
};

Cash.prototype.insertBefore = function (selector) {
  var _this = this;

  cash(selector).each(function (index, ele) {
    var parent = ele.parentNode;

    if (parent) {
      _this.each(function (i, e) {
        insertElement(parent, !index ? e : e.cloneNode(true), true, ele);
      });
    }
  });
  return this;
};

Cash.prototype.before = function () {
  var _this = this;

  each(arguments, function (i, selector) {
    cash(selector).insertBefore(_this);
  });
  return this;
};

Cash.prototype.prepend = function () {
  var _this = this;

  each(arguments, function (i, selector) {
    insertContent(_this, cash(selector), true);
  });
  return this;
};

Cash.prototype.prependTo = function (selector) {
  insertContent(cash(selector), reverse.apply(this.slice()), true);
  return this;
};

Cash.prototype.replaceWith = function (selector) {
  return this.before(selector).remove();
};

Cash.prototype.replaceAll = function (selector) {
  cash(selector).replaceWith(this);
  return this;
};

Cash.prototype.wrapAll = function (selector) {
  if (this[0]) {
    var structure = cash(selector);
    this.first().before(structure);
    var wrapper = structure[0];

    while (wrapper.children.length) {
      wrapper = wrapper.firstElementChild;
    }

    this.appendTo(wrapper);
  }

  return this;
};

Cash.prototype.wrap = function (selector) {
  return this.each(function (index, ele) {
    var wrapper = cash(selector)[0];
    cash(ele).wrapAll(!index ? wrapper : wrapper.cloneNode(true));
  });
};

Cash.prototype.wrapInner = function (selector) {
  return this.each(function (i, ele) {
    var $ele = cash(ele),
        contents = $ele.contents();
    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
  });
};

Cash.prototype.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return !!find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
};

Cash.prototype.is = function (comparator) {
  if (!comparator || !this[0]) return false;
  var compare = getCompareFunction(comparator);
  var check = false;
  this.each(function (i, ele) {
    check = compare.call(ele, i, ele);
    return !check;
  });
  return check;
};

Cash.prototype.next = function (comparator, _all) {
  return filtered(cash(unique(pluck(this, 'nextElementSibling', _all))), comparator);
};

Cash.prototype.nextAll = function (comparator) {
  return this.next(comparator, true);
};

Cash.prototype.not = function (comparator) {
  if (!comparator || !this[0]) return this;
  var compare = getCompareFunction(comparator);
  return this.filter(function (i, ele) {
    return !compare.call(ele, i, ele);
  });
};

Cash.prototype.parent = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};

Cash.prototype.index = function (selector) {
  var child = selector ? cash(selector)[0] : this[0],
      collection = selector ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
};

Cash.prototype.closest = function (comparator) {
  if (!comparator || !this[0]) return cash();
  var filtered = this.filter(comparator);
  if (filtered.length) return filtered;
  return this.parent().closest(comparator);
};

Cash.prototype.parents = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentElement', true))), comparator);
};

Cash.prototype.prev = function (comparator, _all) {
  return filtered(cash(unique(pluck(this, 'previousElementSibling', _all))), comparator);
};

Cash.prototype.prevAll = function (comparator) {
  return this.prev(comparator, true);
};

Cash.prototype.siblings = function (comparator) {
  var result = [];
  this.each(function (i, ele) {
    push.apply(result, cash(ele).parent().children(function (ci, child) {
      return child !== ele;
    }));
  });
  return filtered(cash(unique(result)), comparator);
}; // @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./prev.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
// @require ./variables.ts


if (typeof exports !== 'undefined') {
  // Node.js
  module.exports = cash;
} else {
  // Browser
  win['cash'] = win['$'] = cash;
}
})();
},{}],"js/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _hooks = require("preact/hooks");

var _linkstate = _interopRequireDefault(require("linkstate"));

var _cashDom = _interopRequireDefault(require("cash-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var searchIcon = (0, _preact.h)("svg", {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentcolor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "3",
  class: "icon-svg"
}, (0, _preact.h)("circle", {
  cx: "14",
  cy: "14",
  r: "12"
}), (0, _preact.h)("path", {
  d: "M23 23 L30 30"
}));
var tagIcon = (0, _preact.h)("svg", {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentcolor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "3",
  class: "icon-svg"
}, (0, _preact.h)("circle", {
  cx: "24",
  cy: "8",
  r: "2"
}), (0, _preact.h)("path", {
  "data-v-3480f8cd": "",
  d: "M2 18 L18 2 30 2 30 14 14 30 Z"
}));
var settingIcon = (0, _preact.h)("svg", {
  viewBox: "0 0 32 32",
  width: "32",
  height: "32",
  fill: "none",
  stroke: "currentcolor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "3",
  class: "icon-svg"
}, (0, _preact.h)("path", {
  "data-v-3480f8cd": "",
  d: "M13 2 L13 6 11 7 8 4 4 8 7 11 6 13 2 13 2 19 6 19 7 21 4 24 8 28 11 25 13 26 13 30 19 30 19 26 21 25 24 28 28 24 25 21 26 19 30 19 30 13 26 13 25 11 28 8 24 4 21 7 19 6 19 2 Z"
}), (0, _preact.h)("circle", {
  cx: "16",
  cy: "16",
  r: "4"
}));
var closeIcon = (0, _preact.h)("svg", {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentcolor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "3",
  class: "icon-svg"
}, (0, _preact.h)("path", {
  d: "M2 30 L30 2 M30 30 L2 2"
}));

var Home =
/*#__PURE__*/
function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Home)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.input = (0, _hooks.useRef)(null), _this.state = {
      activePanel: 'home',
      q: '',
      appBarColor: '#e3e3e3',
      panelColor: '#f1f1f1f9',
      isApp: false,
      searches: ['多吉 https://www.dogedoge.com/results?q=', 'Magi https://magi.com/search?q=', 'Google https://www.google.com/search?q=']
    }, _this.closePanel = function () {
      _this.setState({
        activePanel: 'home'
      });

      _this.input.current.value = '';

      _this.setAppBarColor(_this.state.appBarColor);
    }, _this.openPanel = function (panelName) {
      _this.setState({
        activePanel: panelName
      });

      _this.setAppBarColor(_this.state.panelColor);
    }, _this.openSearchPanel = function () {
      _this.openPanel('search');

      _this.input.current.focus();
    }, _this.openShortcutPanel = function () {
      _this.openPanel('shortcut');
    }, _this.openSettingPanel = function () {
      _this.openPanel('setting');
    }, _this.togglePanel = function (panelName) {
      if (_this.state.activePanel === 'home') {
        if (panelName === 'search') {
          _this.openSearchPanel();
        } else if (panelName === 'shortcut') {
          _this.openShortcutPanel();
        } else if (panelName === 'setting') {
          _this.openSettingPanel();
        }
      } else {
        _this.closePanel();
      }
    }, _this.searchGo = function (s) {
      // TODO enter default
      location.href = s.url + _this.state.q;
    }, _this.setAppBarColor = function (color) {
      if (_this.state.isApp) {
        window.fy_bridge_app.setAppBarColor(color || _this.state.appBarColor);
      }
    }, _temp));
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log('One page loaded  (o˘◡˘o)');

      if (window.fy_bridge_app) {
        this.setState({
          isApp: true
        });
        setTimeout(function () {
          _this2.setAppBarColor();
        }, 200);
        (0, _cashDom.default)('body').addClass('is-app');
      }
    }
  }, {
    key: "render",
    value: function render(_, _ref) {
      var _this3 = this;

      var activePanel = _ref.activePanel,
          searches = _ref.searches,
          q = _ref.q;
      var SS = searches.map(function (s) {
        var ls = s.trim().split(/\s+/);
        var name = ls.length > 1 ? ls[0] : s.match(/[\/\.]([^\.]+)\.\w+\//)[1].replace(/^(\w)/, function (v) {
          return v.toUpperCase();
        });
        return {
          name: name,
          url: ls.pop()
        };
      });
      return (0, _preact.h)("div", {
        class: "app"
      }, (0, _preact.h)("main", {
        class: activePanel !== 'home' ? 'is-hide ' : ''
      }), (0, _preact.h)("div", {
        class: (activePanel === 'search' ? 'is-active ' : '') + 'O-panel is-search'
      }, (0, _preact.h)("div", {
        class: "O-field"
      }, (0, _preact.h)("input", {
        class: "O-input hide-clear",
        type: "search",
        placeholder: "\u641C\u7D22",
        ref: this.input,
        value: q,
        onInput: (0, _linkstate.default)(this, 'q')
      }), (0, _preact.h)("div", {
        class: "buttons"
      }, SS.map(function (s) {
        return (0, _preact.h)("button", {
          onClick: function onClick() {
            return _this3.searchGo(s);
          },
          class: "button is-info is-outlined",
          disabled: !q
        }, s.name);
      }))), (0, _preact.h)("div", {
        class: "O-close"
      }, (0, _preact.h)("span", {
        class: "icon is-close",
        onClick: function onClick() {
          return _this3.togglePanel('search');
        }
      }, activePanel === 'search' ? closeIcon : searchIcon))), (0, _preact.h)("div", {
        class: (activePanel === 'shortcut' ? 'is-active ' : '') + 'O-panel is-shortcut'
      }, (0, _preact.h)("div", null, "shortcut"), (0, _preact.h)("div", {
        class: "O-close"
      }, (0, _preact.h)("span", {
        class: "icon is-close",
        onClick: function onClick() {
          return _this3.togglePanel('shortcut');
        }
      }, activePanel === 'shortcut' ? closeIcon : tagIcon))), (0, _preact.h)("div", {
        class: (activePanel === 'setting' ? 'is-active ' : '') + 'O-panel is-setting'
      }, (0, _preact.h)("div", null, "setting"), (0, _preact.h)("div", {
        class: "O-close"
      }, (0, _preact.h)("span", {
        class: "icon is-close",
        onClick: function onClick() {
          return _this3.togglePanel('setting');
        }
      }, activePanel === 'setting' ? closeIcon : settingIcon))));
    }
  }]);

  return Home;
}(_preact.Component);

exports.default = Home;
},{"preact":"node_modules/preact/dist/preact.module.js","preact/hooks":"node_modules/preact/hooks/dist/hooks.module.js","linkstate":"node_modules/linkstate/dist/linkstate.es.js","cash-dom":"node_modules/cash-dom/dist/cash.js"}],"js/stats.js":[function(require,module,exports) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function () {
  if (location.host.includes('localhost')) return;
  var config = {
    itv: 1800000,
    url1: '//ia.51.la/go1?id=20235553',
    ekc: ''
  };
  !function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        exports: {},
        id: r,
        loaded: !1
      };
      return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
    }

    var n = {};
    return t.m = e, t.c = n, t.p = '', t(0);
  }([function (e, t, n) {
    'use strict';

    function r() {
      var e = void 0,
          t = /id=(\d+)/.exec(config.url1)[1] || '';

      try {
        e = u.get('__tins__' + t);
      } catch (t) {
        e = !1;
      }

      var n = e && i.isN(e.sid) && i.isN(e.expires) && g - e.sid < 18e5 ? 0 : 1,
          r = n ? 1 : e.vd + 1,
          o = n ? g : e.sid,
          c = g + 18e5;
      return u.set('__tins__' + t, s.stringify({
        sid: o,
        vd: r,
        expires: c
      }), null, '/'), [n, n ? o : u.get('__tins__' + t).sid, r];
    }

    function o() {
      var e = s.parse(s.stringify(i.extend({}, y, v))),
          t = i.obj2url(e),
          n = config.url1 + '&rt=' + g + '&' + t,
          r = new Image(1, 1);
      r.src = n;
    }

    var i = n(4),
        c = n(5),
        u = n(7).store,
        s = n(6),
        a = window,
        f = a.location,
        l = a.screen,
        p = a.navigator,
        g = i.now(),
        d = !0,
        m = r(),
        v = {
      ekc: config.ekc,
      sid: m[1],
      tt: c.getMeta.tt,
      kw: c.getMeta.kw,
      cu: f.href,
      pu: c.getRef()
    },
        y = {
      rl: l.width + '*' + l.height,
      lang: p.language || p.browserLanguage,
      ct: function () {
        var e = p.connection || p.mozConnection || p.webkitConnection || p.oConnection,
            t = i.hasIt(p.userAgent, 'mobile') && e ? e.type : 'unknow';
        return t;
      }(),
      pf: function () {
        var e = d ? 1 : 0;
        return d = 0, e;
      }(),
      ins: m[0],
      vd: m[2],
      ce: p.cookieEnabled ? 1 : 0,
      cd: l.colorDepth || l.pixelDepth,
      ds: c.getMeta.ds
    };
    o.version = '2.2.1.2', n(10)(y), o();
  },,,, function (e, t) {
    'use strict';

    function n(e, t) {
      return void 0 !== e && e.indexOf(t) !== -1;
    }

    function r(e) {
      return function (t) {
        return Object.prototype.toString.call(t) === '[object ' + e + ']';
      };
    }

    function o() {
      for (var e = 0, t = {}; e < arguments.length; e++) {
        var n = arguments[e];

        for (var r in n) {
          t[r] = n[r];
        }
      }

      return t;
    }

    function i(e) {
      return e.replace(/&/g, '~_~');
    }

    function c(e) {
      var t = '';

      for (var n in e) {
        '' !== t && (t += '&'), t += n + '=' + a(a(i(String(e[n]))));
      }

      return t;
    }

    function u(e) {
      return e.replace(/^\s+|\s+$/g, '');
    }

    function s() {
      return +new Date();
    }

    var a = encodeURIComponent,
        f = r('Object'),
        l = r('Number'),
        p = r('String'),
        g = r('Array'),
        d = r('Function'),
        m = r('RegExp');
    e.exports = {
      isO: f,
      isN: l,
      isF: d,
      isR: m,
      isS: p,
      isA: g,
      hasIt: n,
      extend: o,
      obj2url: c,
      trim: u,
      now: s
    };
  }, function (e, t, n) {
    'use strict';

    function r(e) {
      return u.getElementsByTagName(e.toLowerCase());
    }

    function o() {
      var e = '';

      try {
        e = c.top.document.referrer;
      } catch (t) {
        if (c.parent) try {
          e = c.parent.document.referrer;
        } catch (t) {
          e = '';
        }
      }

      return '' === e && (e = u.referrer), e;
    }

    var i = n(4),
        c = window,
        u = c.document,
        s = function () {
      var e = r('meta'),
          t = r('title'),
          n = {
        kw: '',
        ds: ''
      },
          o = void 0;
      n.tt = i.trim(t.length ? t[0].innerHTML : '');

      for (var c = 0; c < e.length; c++) {
        e[c].name && (o = e[c].name.toLowerCase(), i.hasIt('keywords', o) && (n.kw = e[c].content.slice(0, 100)), i.hasIt('description', o) && (n.ds = e[c].content.slice(0, 30)));
      }

      return n;
    }();

    e.exports = {
      getMeta: s,
      getRef: o
    };
  }, function (module, exports) {
    'use strict';

    var _typeof = 'function' == typeof Symbol && 'symbol' == _typeof2(Symbol.iterator) ? function (e) {
      return _typeof2(e);
    } : function (e) {
      return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : _typeof2(e);
    };

    module.exports = {
      parse: function parse(sJSON) {
        return eval('(' + sJSON + ')');
      },
      stringify: function () {
        function e(o) {
          if (null == o) return 'null';
          if ('number' == typeof o) return isFinite(o) ? o.toString() : 'null';
          if ('boolean' == typeof o) return o.toString();

          if ('object' === ('undefined' == typeof o ? 'undefined' : _typeof(o))) {
            if ('function' == typeof o.toJSON) return e(o.toJSON());

            if (r(o)) {
              for (var u = '[', s = 0; s < o.length; s++) {
                u += (s ? ', ' : '') + e(o[s]);
              }

              return u + ']';
            }

            if ('[object Object]' === t.call(o)) {
              var a = [];

              for (var f in o) {
                n.call(o, f) && a.push(e(f) + ': ' + e(o[f]));
              }

              return '{' + a.join(', ') + '}';
            }
          }

          return '"' + o.toString().replace(c, i) + '"';
        }

        var t = Object.prototype.toString,
            n = Object.prototype.hasOwnProperty,
            r = Array.isArray || function (e) {
          return '[object Array]' === t.call(e);
        },
            o = {
          '"': '\\"',
          '\\': '\\\\',
          '\b': '\\b',
          '\f': '\\f',
          '\n': '\\n',
          '\r': '\\r',
          '\t': '\\t'
        },
            i = function i(e) {
          return o[e] || "\\u" + (e.charCodeAt(0) + 65536).toString(16).substr(1);
        },
            c = /[\\"\u0000-\u001F\u2028\u2029]/g;

        return e;
      }()
    };
  }, function (e, t, n) {
    'use strict';

    var r = n(5),
        o = n(6),
        i = {
      get: function get(e) {
        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(e).replace(/[-.+*]/g, '\\$&') + '\\s*\\=s*([^;]*).*$)|^.*$'), '$1')) || null;
      },
      set: function set(e, t, n, r, o, i) {
        if (!e || /^(?:expires|max-age|path|domain|secure)$/i.test(e)) return !1;
        var c = '';
        if (n) switch (n.constructor) {
          case Number:
            c = n === 1 / 0 ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + n;
            break;

          case String:
            c = '; expires=' + n;
            break;

          case Date:
            c = '; expires=' + n.toUTCString();
        }
        return document.cookie = encodeURIComponent(e) + '=' + encodeURIComponent(t) + c + (o ? '; domain=' + o : '') + (r ? '; path=' + r : '') + (i ? '; secure' : ''), !0;
      }
    },
        c = {
      get: function get(e) {
        return o.parse((r.isMobi ? window.localStorage.getItem(e) : i.get(e)) || '{}');
      },
      set: function set(e, t, n, o) {
        return r.isMobi ? window.localStorage.setItem(e, t) : i.set(e, t, n, o);
      }
    };
    e.exports = {
      cookie: i,
      store: c
    };
  },,, function (e, t, n) {
    'use strict';

    var r = n(4),
        o = n(7);

    e.exports = function (e) {
      var t = o.store.get('__51laig__');
      t = r.isN(t) ? parseInt(t) + 1 : 1, o.cookie.set('__51cke__', config.ekc, null, '/'), e.ing = t, o.store.set('__51laig__', t, null, '/');
    };
  }]);
})();
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

require("normalize.css");

require("../styles/main.scss");

var _preact = require("preact");

var _Home = _interopRequireDefault(require("./Home"));

require("./stats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _preact.render)((0, _preact.h)(_Home.default, null), document.body);
},{"normalize.css":"node_modules/normalize.css/normalize.css","../styles/main.scss":"styles/main.scss","preact":"node_modules/preact/dist/preact.module.js","./Home":"js/Home.js","./stats":"js/stats.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46881" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map