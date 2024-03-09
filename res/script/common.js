$('#forum-list').html(DOMForumList.list(db_forums, 'forum-list'));
$('#forum-list-ex').html(DOMForumList.listEx(db_forums_ex, 'forum-list-ex'));

function scrollToTitle(id) {
    if (id == 'top') {
        updateView(function() {
            $(document).scrollTop(0);
        });
        return;
    }
    const top = $('#' + id).offset().top;
    const navHeight = $('#bbspk-nav').height();
    updateView(function() {
        $(document).scrollTop(top - navHeight);
    });
}

function updateView(action = function() {}) {
    if (!document.startViewTransition) {
        action();
        return;
    }
    document.startViewTransition(() => action());
}

$(document).on('click', '.forum-item-header', function(e) {
    if ($(e.target).closest('a').length) return;
    let $sel = $(this).parents('.forum-item').find('.forum-item-content');
    if ($sel.hasClass('active')) {
        $sel.removeClass('active');
    } else {
        $sel.addClass('active');
    }
});

$(document).on('click', '.list-controller-item.oepn', function() {
    $('#' + $(this).data('target') + ' .forum-item-content').addClass('active');
});

$(document).on('click', '.list-controller-item.close', function() {
    $('#' + $(this).data('target') + ' .forum-item-content').removeClass('active');
});

$(document).on('click', 'nav .nav-item', function() {
    const target = $(this).data('target');
    scrollToTitle(target);
});

$(document).scroll(function() {
    let top = $(document).scrollTop();
    if (top > $('header').offset().top + $('header').height()) {
        $('#bbspk-nav').addClass('in-sticky');
    } else {
        $('#bbspk-nav').removeClass('in-sticky');
    }
});