export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        const out = this.data[0];
        if (this.length === 1) {
            this.data = [];
            this.length = 0;
            return out;
        }
        // Insert the last element at the top
        this.data[0] = this.data[this.length - 1];
        //
        this.length--;
        this.heapifyDown(0);
        return out;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const p = this.parent(idx);
        const parentValue = this.data[p];
        const value = this.data[idx];
        if (parentValue > value) {
            this.data[idx] = parentValue;
            this.data[p] = value;
            this.heapifyUp(p);
        }
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        // If it's the last element
        if (leftIdx >= this.length) {
            return;
        }
        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];
        if (leftValue > rightValue && value > rightValue) {
            this.data[idx] = rightValue;
            this.data[rightIdx] = value;
            this.heapifyDown(rightIdx);
        } else if (rightValue > leftValue && value > leftValue) {
            this.data[idx] = leftValue;
            this.data[leftIdx] = value;
            this.heapifyDown(leftIdx);
        }
    }
}
