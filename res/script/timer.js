let timerList = [];

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        let timerList2 = timerList;
        timerList = [];
        timerList2.forEach((e) => {
            createTimer(e.targetDate, e.sel);
        });
    } else {
        timerList.forEach((e) => {
            clearInterval(e.index);
        });
    }
});

function getDateDiff(targetDate) {
    const now = new Date().getTime();
    const timeRemaining = Math.abs(new Date(targetDate).getTime() - now);

    const days    = Math.floor( timeRemaining / (1000 * 60 * 60 * 24)                    );
    const hours   = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60     )) / (1000 * 60     ));
    const seconds = Math.floor((timeRemaining % (1000 * 60          )) /  1000           );

    return {
        d: days,
        h: hours,
        m: minutes,
        s: seconds
    };
}

function createTimer(targetDate, sel) {
    updateTimer(targetDate, sel);
    timerList.push({
        sel: sel,
        targetDate: targetDate,
        index: setInterval(function() { updateTimer(targetDate, sel); }, 500)
    });
}

function updateTimer(targetDate, sel) {
    const r = getDateDiff(targetDate);
    $(sel + ' .days'   ).text(r.d);
    $(sel + ' .hours'  ).text(r.h);
    $(sel + ' .minutes').text(r.m);
    $(sel + ' .seconds').text(r.s);
}