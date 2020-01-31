export const VERSION = 'v1.1.31';
export const OO_PLUGIN_VERSION = '20.2.7';
export const STORE_PREFIX = 'One';

export const defaultSearches = `多吉 https://www.dogedoge.com/results?q=
https://magi.com/search?q=
https://seeres.com/search?q=`;

export const defaultLinks = `
哔哩哔哩
https://m.bilibili.com
https://p.pstatp.com/origin/ffa200007bef770c2173

腾讯
https://m.v.qq.com
https://p.pstatp.com/origin/fe8d0000e12947753279

爱奇艺
https://m.iqiyi.com
https://p.pstatp.com/origin/ffb200022befd7546cf9

优酷
https://www.youku.com
https://p.pstatp.com/origin/dc10000328a35c1783aa

豆瓣
https://movie.douban.com/tag/#/
https://p.pstatp.com/origin/fe400000ecc0fb4029b9

芒果
https://m.mgtv.com
https://p.pstatp.com/origin/ff92000118928677b44e

1905
https://vip.1905.com
https://p.pstatp.com/origin/fe490000f226d667ef4b

PPTV
https://m.pptv.com
https://p.pstatp.com/origin/fefc00012044c4b75e20

搜狐
https://m.tv.sohu.com
https://p.pstatp.com/origin/ffbd00011236bfb44f44

乐视
http://m.le.com
https://p.pstatp.com/origin/dc0d0005d77503c1b0d1

奈菲
https://www.nfmovies.com
#c3351b #fcc419

独播库
https://www.duboku.net
https://p.pstatp.com/origin/ffd000007bf4469ff18c

云播
https://m.yunbtv.com
https://p.pstatp.com/origin/fef600008b52c011488c

APP影院
https://app.movie
https://p.pstatp.com/origin/fe690000c9141955bbac

影迷窝
https://www.yingmiwo.com
https://p.pstatp.com/origin/fee70000e89c6d7c5fbc

残月
http://ys.23yue.cn
https://p.pstatp.com/origin/ff2c0000974edec72709

1090
https://1090ys.com`;

export const defaultHtmlTitle = '❀ One';
export const defaultSearchHint = '搜索';
export const defaultBgUrls = 'https://p.pstatp.com/origin/fed500016e75da70b04f';

export const defaults = {
  searches: defaultSearches,
  links: defaultLinks.trim(),
  htmlTitle: defaultHtmlTitle,
  searchHint: defaultSearchHint,
  bgUrls: defaultBgUrls,
  isYijuActive: false,
  isHomeShortcuts: true
};

export const defaultsKey = Object.keys(defaults);

export const ooPluginUrl =
  'https://gitee.com/ecruos/oo/raw/master/scripts/oo.movie.js';
