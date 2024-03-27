let timerList = [];

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        let timerList2 = timerList;
        timerList = [];
        timerList2.forEach((e) => {
            createTimer(e.targetDate, e.sel, e.rate, e.zero, e.overflow, e.overflowCallback);
        });
    } else {
        timerList.forEach((e) => {
            clearInterval(e.index);
        });
    }
});

function getDateDiff(targetDate, rate = 1) {
    const now = new Date().getTime();
    const timeRemaining = Math.abs((new Date(targetDate).getTime() - now) * rate);

    const days    = Math.floor( timeRemaining / (1000 * 60 * 60 * 24)                    );
    const hours   = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60     )) / (1000 * 60     ));
    const seconds = Math.floor((timeRemaining % (1000 * 60          )) /  1000           );

    return {
        t: timeRemaining,
        d: days,
        h: hours,
        m: minutes,
        s: seconds
    };
}

function clearTimer(sel) {
    let i = timerList.findIndex((e) => {
        return e.sel == sel;
    });
    if (i >= 0) {
        let t = timerList.splice(i, 1)[0];
        clearInterval(t.index);
    }
}

function createTimer(targetDate, sel, rate = 1, zero = false, overflow = true, overflowCallback = function() {}) {
    updateTimer(targetDate, sel, rate, zero, overflow);
    let i = setInterval(function() { updateTimer(targetDate, sel, rate, zero, overflow, overflowCallback); }, 50);
    timerList.push({
        sel: sel,
        targetDate: targetDate,
        rate: rate,
        zero: zero,
        overflow: overflow,
        overflowCallback: overflowCallback,
        index: i
    });
    return i;
}

function updateTimer(targetDate, sel, rate, zero = false, overflow = true, overflowCallback = function() {}) {
    const r = getDateDiff(targetDate, rate);
    $(sel + ' .days'   ).text(r.d);
    $(sel + ' .hours'  ).text(zero ? timeZero(r.h) : r.h);
    $(sel + ' .minutes').text(zero ? timeZero(r.m) : r.m);
    $(sel + ' .seconds').text(zero ? timeZero(r.s) : r.s);

    let tn = new Date();
    let td = new Date(targetDate);
    if (!overflow && tn.getTime() > td.getTime()) {
        clearTimer(sel);
        $(sel + ' .days'   ).text(0);
        $(sel + ' .hours'  ).text(zero ? timeZero(0) : 0);
        $(sel + ' .minutes').text(zero ? timeZero(0) : 0);
        $(sel + ' .seconds').text(zero ? timeZero(0) : 0);
        overflowCallback();
    }
}

function timeZero(value) {
    if (value >= 10) return value;
    return `0${value}`;
}