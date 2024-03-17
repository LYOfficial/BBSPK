class Messager {
    constructor($sel) {
        this.$sel          = $sel;
        this.lastMessageID = 0;
    }

    send(message = '', style = '') {
        let sel   = this.$sel,
            msgid = this.lastMessageID++;
        $(sel).append(`<div class="message-item" data-message-id="${msgid}" style="${style}"></div>`);
        $(`${sel} .message-item[data-message-id=${msgid}]`).text(message);
        setTimeout(function() {
            $(`${sel} .message-item[data-message-id=${msgid}]`).addClass('remove');
            setTimeout(function() {
                $(`${sel} .message-item[data-message-id=${msgid}]`).remove();
            }, 1000);
        }, 9000);
    }

    sendError(message = '') {
        this.send(
            message,
            '--ac-color: var(--ac-color-red); --ac-color-bg: var(--ac-color-red-bg);'
        );
    }
}