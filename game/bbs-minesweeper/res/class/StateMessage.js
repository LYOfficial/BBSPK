class StateMessage {
    constructor() {}

    static getSuccess(data = {}, value = 0) {
        return {
            state: 'success',
            value: value,
            data: data
        };
    }

    static getFail(failReason, data = {}, value = -1) {
        return {
            state: 'fail',
            value: -1,
            failReason: failReason,
            data: data
        };
    }
}