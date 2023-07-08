export default function quick_sort(arr: number[]): void {
    return qs(arr, 0, arr.length - 1);
}
function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let idx = low - 1;
    for (let i = low; i < high; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const swap = arr[i];
            arr[i] = arr[idx];
            arr[idx] = swap;
        }
    }
    idx++;
    arr[high] = arr[idx];
    arr[idx] = pivot;
    return idx;
}
function qs(arr: number[], low: number, high: number) {
    if (low >= high) {
        return;
    }
    const pivotIdx = partition(arr, low, high);
    qs(arr, low, pivotIdx - 1);
    qs(arr, pivotIdx + 1, high);
}
