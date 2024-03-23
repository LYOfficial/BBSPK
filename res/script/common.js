const regUrlBlackList = generateRegexFromArray(db_url_black_list);

$('#forum-list').html(DOMForumList.list(
    db_forums.filter((e) => {
        return e.url.search(regUrlBlackList) == -1;
    })
    , 'forum-list'
));
$('#forum-list-ex').html(DOMForumList.listEx(db_forums_ex, 'forum-list-ex'));

$('#forum-list').append(DOMForumList.item({
    title: "BBS Minesweeper",
    url: "game/bbs-minesweeper/index.html",
    state: "up",
    createdAt: "0000/00/00",
    updatedAt: "0000/00/00",
    hasICP: "no",
    hasNetSec: "no",
    note: `<p>论坛扫雷小游戏！</p><br>
        <p><b>游戏规则：</b></p>
        <p>- 地图上存在怪物、宝箱和楼梯。</p>
        <p>- 当玩家未持有武器时，探索怪物方格将会受到怪物攻击，探索宝箱方格可以开启宝箱。</p>
        <p>- 当玩家持有武器时，探索怪物方格将会与怪物战斗，探索宝箱方格会破坏宝箱。</p>
        <p>- 探索到楼梯方格时，再次点击楼梯方格可前往下一层。</p>
        <p>- 探索到空方格时，会显示周围八个方格有多少怪物、宝箱和楼梯。部分楼层有特殊属性，不会显示数量。</p>
        <p>- 玩家总共 6 点生命。当玩家受到大于 1 且与玩家当前生命值相等的伤害时保留 1 点生命值。当玩家生命值归零后，游戏结束。</p>
        <p>- 此游戏为无尽游戏，可以不断生成新的楼层，直到游戏结束，不支持保存游戏进度。</p><br>
        <p><b>战斗规则：</b></p>
        <p>- 如果玩家的武器攻击力大于等于怪物生命值，则判定为击败怪物。</p>
        <p>- 反之，则判定未击败怪物，进行防御。</p>
        <p>- 如果玩家的武器防御力大于等于怪物攻击力，则防御成功，不扣除玩家生命值。</p>
        <p>- 反之，则使用抵消防御力后的伤害扣除玩家生命值。</p><br>
        <p><b>操作方法：</b></p>
        <p>- 1 ~ 2：快捷栏位</p>
        <p>- E：打开物品栏</p>
        <p>- 快捷栏 1 中的放大镜表示仅探索而不进行攻击。</p>
        <p>- 点击地图上的方格可进行探索，点击已探索的楼梯可前往下一层。</p>
        <p>- 点击物品栏中的武器（如 “防火墙”）可进行装备，与快捷栏 2 中的物品替换。</p>
        <p>- 点击物品栏中的药水可以饮用。</p><br>
        <p><b>怪物数值：</b></p>
        <p>- <span class="text-heimu">安全漏洞</span>：血 1 攻 1</p>
        <p>- <span class="text-heimu">DDoS</span>：血 2 攻 2</p>
        <p>- <span class="text-heimu">危险发言</span>：血 3 攻 3</p><br>
        <p><b>武器数值：</b></p>
        <p>- 自己去游戏里看。</p>`,
    reference: [],
    __domClass: "aic-burst-check",
}));

createTimer('2024/02/27 00:00:00 GMT+0800', '#timer-bbspk-created');

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

function generateRegexFromArray(strings) {
    const escapedStrings = strings.map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const joinedString = escapedStrings.join('|');
    const regex = new RegExp(joinedString, 'i');
    return regex;
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

$(document).on('click', '.list-controller-item.open', function() {
    $('#' + $(this).data('target') + ' .forum-item-content').addClass('active');
});

$(document).on('click', '.list-controller-item.close', function() {
    $('#' + $(this).data('target') + ' .forum-item-content').removeClass('active');
});

$(document).on('click', '.forum-item-content summary', function() {
    this.style.display = 'none';
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
