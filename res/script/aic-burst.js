let keyState = {
    z: false,
    x: false
}

let timerIndex = 0;
let timerState = false;
let aicBurstLock = false;

$(document).keydown(function(e){
    if (e.keyCode == 90) {
        keyState.z = true;
    } else if (e.keyCode == 88) {
        keyState.x = true;
    }

    if (keyState.z && keyState.x && !timerState && !aicBurstLock) {
        timerState = true;
        $('#aic-burst').attr('class', 'ready');
        timerIndex = setTimeout(function() {
            $('#aic-burst').addClass('play');
            timerIndex = setTimeout(function() {
                $('#aic-burst').addClass('done');
                $('body').addClass('aic-burst');
                keyState = {
                    z: false,
                    x: false
                }
                timerState = false;
                aicBurstLock = true;

                $(document).scrollTop(0);
                $('#forum-list .forum-item').attr('class', 'forum-item forum-state-down');
                $('#forum-list .forum-item .state-box .state-icon').html(Icon.nuke());
                $('#forum-list .forum-item .state-box').attr('title', '爆啦！');
                $('#forum-list .forum-list-header .forum-count-item.survival .forum-count-value, #forum-list .forum-list-header .forum-count-item.up .forum-count-value, #forum-list .forum-list-header .forum-count-item.failure .forum-count-value, #forum-list .forum-list-header .forum-count-item.unknow .forum-count-value').text('0');
                $('#forum-list .forum-list-header .forum-count-item.down .forum-count-value').text($('#forum-list .forum-list-header .forum-count-item.total .forum-count-value').text());
                $('.aic-burst-check').removeClass('aic-burst-check');

                setTimeout(function() {
                    $('#aic-burst').attr('class', '');
                    $('body').removeClass('aic-burst');
                    setTimeout(function() {
                        aicBurstLock = false;
                    }, 2000);
                }, 1000);
            }, 1500);
        }, 300);
    }
});

$(document).keyup(function(e){
    if (e.keyCode == 90) {
        keyState.z = false;
    } else if (e.keyCode == 88) {
        keyState.x = false;
    }

    if (!(keyState.z && keyState.x) && timerState && !aicBurstLock) {
        timerState = false;
        clearTimeout(timerIndex);
        $('#aic-burst').attr('class', 'close');
        aicBurstLock = true;
        setTimeout(function() {
            $('#aic-burst').attr('class', '');
            setTimeout(function() {
                aicBurstLock = false;
            }, 1000);
        }, 500);
    }
});