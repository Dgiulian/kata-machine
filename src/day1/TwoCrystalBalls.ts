export default function two_crystal_balls(breaks: boolean[]): number {
    let jmpAm = Math.floor(Math.sqrt(breaks.length));

    let i = jmpAm;
    for (; i < breaks.length; i += jmpAm) {
        if (breaks[i]) {
            break;
        }
    }

    // i -= jmpAm;

    for (let j = i - jmpAm; j <= i && j < breaks.length; ++j) {
        if (breaks[j]) {
            return j;
        }
    }
    return -1;
}
