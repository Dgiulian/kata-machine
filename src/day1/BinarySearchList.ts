export default function bs_list(haystack: number[], needle: number): boolean {
    if (haystack.length < 1) {
        return false;
    }
    let low = 0;
    let high = haystack.length;
    while (low < high) {
        let mid = Math.floor(high - (high - low) / 2);
        if (needle === haystack[mid]) {
            return true;
        } else if (haystack[mid] > needle) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return false;
}
