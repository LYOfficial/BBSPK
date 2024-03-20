class Log {
    constructor() {
        this.logs       = [];
        this.logTypes   = ['log', 'warn', 'error'];
        this.logFlags   = [       'warn', 'error'];

        this.logBefore  = {
            common: '[MAZE]',
            log:    '[LOG]',
            warn:   '[WARN]',
            error:  '[ERROR]',
        };

        this.boundEvent = {
            errorMessageOutput: function() {}
        }
    }

    log(type, message, from = '') {
        if (this.logTypes.indexOf(type) == -1) return;

        let msg = {
            type:    type,
            message: message,
            from:    from
        };

        this.logs.push(msg);

        if (this.logFlags.indexOf(type) != -1) {
            let str = `${this.logBefore.common}${this.logBefore[type]} ${message}${from != '' ? ` \n\tat ${from}` : ''}`;
            
            switch (type) {
                case 'log':   console.log(str);   break;
                case 'warn':  console.warn(str);  break;
                case 'error': console.error(str); break;
                default:                          break;
            }
        }

        return msg;
    }

    warn(message, from = '') {
        return this.log('warn', message, from);
    }

    error(message, from = '') {
        this.boundEvent.errorMessageOutput({
            message: message,
            from:    from
        });
        return this.log('error', message, from);
    }

    bind(event, action = function() {}) {
        return this.boundEvent[event] = action;
    }
}