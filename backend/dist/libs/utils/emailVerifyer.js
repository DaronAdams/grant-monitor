"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidEmail = void 0;
const checkValidEmail = (email) => {
    const regex = new RegExp(
    // eslint-disable-next-line no-control-regex
    '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\' +
        '.[a-zA-Z0-9-]+)*$');
    if (!regex.test(email)) {
        return false;
    }
    return true;
};
exports.checkValidEmail = checkValidEmail;
