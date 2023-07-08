type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = {
            value: item,
        };

        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;

        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error(`Can't insert at position ${idx}`);
        } else if (idx === this.length) {
            this.append(item);
        } else if (idx === 0) {
            this.prepend(item);
        }

        this.length++;
        let curr = this.getAt(idx);

        const node: Node<T> = { value: item };
        if (curr) {
            node.next = curr;
            node.prev = curr?.prev;

            curr.prev = node;
            if (curr.prev) {
                curr.prev.next = node;
            }
        }
    }
    append(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }

            curr = curr.next;
        }
        if (!curr) {
            return;
        }
        return this.removeNode(curr);
    }
    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        return node?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return;
        }

        return this.removeNode(node);
    }

    private getAt(idx: number): Node<T> | undefined {
        if (idx > this.length) {
            throw new Error(`Can't get item at index ${idx}`);
        }
        let curr = this.head;

        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
    private removeNode(node: Node<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            node.next = node.prev = undefined;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        node.next = node.prev = undefined;
        return node.value;
    }
}
