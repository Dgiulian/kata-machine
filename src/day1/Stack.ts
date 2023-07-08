type Node<T> = {
    value: T;
    next?: Node<T>;
};
export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const newNode: Node<T> = {
            value: item,
        };

        this.length++;

        if (!this.head) {
            this.head = newNode;
            return;
        }
        newNode.next = this.head;
        this.head = newNode;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (!this.head) {
            return;
        }
        const node = this.head;
        this.head = this.head.next;
        node.next = undefined;
        return node.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
