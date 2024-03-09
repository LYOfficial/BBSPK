$('#forum-list').html(DOMForumList.list(db_forums));
$('#forum-list-ex').html(DOMForumList.listEx(db_forums_ex));
$('#forum-count').text(db_forums.length);
$('#forum-count-ex').text(db_forums_ex.length);

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