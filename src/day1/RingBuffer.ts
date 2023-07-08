export default class RingBuffer<T> {
    private head: number;
    private tail: number;
    private capacity: number;
    private size: number;
    private buffer: T[];

    constructor(capacity: number = 10) {
        this.size = 0;
        this.capacity = capacity;
        this.buffer = new Array(capacity) as T[];
        this.head = 0;
        this.tail = 0;
    }
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.size) {
            throw new Error("Invalid id");
        }

        const index = (this.head + idx) % this.capacity;
        return this.buffer[index];
    }
    push(item: T) {
        if (this.size === this.capacity) {
            throw new Error("RingBuffer is full");
        }
        this.buffer[this.tail] = item;

        this.tail = (this.tail + 1) % this.capacity;
        this.size++;
    }
    pop(): T | undefined {
        if (this.size === 0) {
            return;
        }
        const item = this.buffer[this.head];
        // this.buffer[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity;
        this.size--;
        return item;
    }
    peek() {
        if (this.size === 0) {
            throw new Error("RingBuffer is empty");
        }

        return this.buffer[this.head];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    getSize() {
        return this.size;
    }

    getCapacity() {
        return this.capacity;
    }

    clear() {
        this.buffer = new Array(this.capacity);
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }
}
