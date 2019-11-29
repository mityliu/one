export const VERSION = 'v0.1.1128';
export const STORE_PREFIX = 'One';

export const defaultSearches = `多吉 https://www.dogedoge.com/results?q=
https://magi.com/search?q=
https://www.google.com/search?q=`;

export const defaultLinks = `知乎
https://www.zhihu.com
https://www.zhihu.com/favicon.ico

哔哩
https://m.bilibili.com
https://www.bilibili.com/favicon.ico

豆瓣
https://m.douban.com
https://www.douban.com/favicon.ico

腾讯
https://m.v.qq.com
http://v.qq.com/favicon.ico

https://www.iqiyi.com

https://www.youku.com

https://www.nfmovies.com

https://www.duboku.net

https://1090ys.com

云播
https://m.yunbtv.com`;

export const defaultHtmlTitle = '🐱 One';
export const defaultSearchHint = '搜索';
export const defaultBgUrls = 'https://ps.ssl.qhmsg.com/t012ef745c77d34b194.jpg';

export const defaults = {
  searches: defaultSearches,
  links: defaultLinks,
  htmlTitle: defaultHtmlTitle,
  searchHint: defaultSearchHint,
  bgUrls: defaultBgUrls,
  isYijuActive: false,
  isHomeShortcuts: true
};

export const defaultsKey = Object.keys(defaults);
