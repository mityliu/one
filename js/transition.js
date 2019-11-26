var PageTransitions = (function() {
  var $main = $('#main'),
    $pages = $main.children('div.page'),
    $iterate = $('#iterateEffects'),
    animcursor = 1,
    pagesCount = $pages.length,
    current = 0,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    // animation end event name
    animEndEventName = 'animationend';

  function init() {
    $pages.each(function() {
      var $page = $(this);
      $page.data('originalClassList', $page.attr('class'));
    });

    $pages.eq(current).addClass('page-current');

    $('#dl-menu').dlmenu({
      animationClasses: { in: 'dl-animate-in-2', out: 'dl-animate-out-2' },
      onLinkClick: function(el, ev) {
        ev.preventDefault();
        nextPage(el.data('animation'));
      }
    });

    $iterate.on('click', function() {
      if (isAnimating) {
        return false;
      }
      if (animcursor > 67) {
        animcursor = 1;
      }
      nextPage(animcursor);
      ++animcursor;
    });
  }

  function nextPage() {
    if (isAnimating) {
      return false;
    }

    isAnimating = true;

    var $currPage = $pages.eq(current);

    if (current < pagesCount - 1) {
      ++current;
    } else {
      current = 0;
    }

    var $nextPage = $pages.eq(current).addClass('page-current'),
      outClass = '',
      inClass = '';

    outClass = 'page-rotateFall page-ontop';
    inClass = 'page-scaleUp';

    $currPage.addClass(outClass).on(animEndEventName, function() {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if (endNextPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function() {
      $nextPage.off(animEndEventName);
      endNextPage = true;
      if (endCurrPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });
  }

  function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    resetPage($outpage, $inpage);
    isAnimating = false;
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' page-current');
  }

  init();

  return { init: init };
})();
