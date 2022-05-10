"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textContains = void 0;
function textContains(text, subtext) {
    const M = text.length;
    const N = subtext.length;
    if (N > M)
        return false;
    let i = 0;
    let j = 0;
    while (i < M && j < N) {
        if (text[i] === subtext[j]) {
            j++;
        }
        i++;
    }
    return j === N;
}
exports.textContains = textContains;
