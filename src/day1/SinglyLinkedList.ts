type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            return this.prepend(item);
        }
        if (idx === this.length) {
            return this.append(item);
        }
        this.length++;
        const curr = this.getAt(idx);
        const node: Node<T> = { value: item };
        if (curr) {
            node.next = curr;
        }
    }
    append(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
        this.debug();
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
            throw new Error(`Can't insert at position ${idx}`);
        }
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }

    private removeNode(node: Node<T>) {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        node.next = undefined;
        return node.value;
    }
    public debug() {
        if (!this.head) {
            return;
        }
        const items = [];
        let curr: Node<T> | undefined = this.head;
        while (curr) {
            items.push(curr.value);
            curr = curr.next;
        }
        console.log(items.join("=>"));
    }
}
