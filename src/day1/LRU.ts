import { create } from "ts-node";

type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};
function createNode<V>(value: V): Node<V> {
    return { value };
}
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    private capacity: number;

    constructor(capacity: number = 10) {
        this.head = this.tail = undefined;
        this.capacity = capacity;
        this.length = 0;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // Does it exist?
        let node = this.lookup.get(key);

        // if it doesn't exist we need to insert
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
        //  - check capacity and evict if
    }
    get(key: K): V | undefined {
        // Check for existence
        // Update the value we found and move it to the front
        // Return out the value found or undefined if not exist
        const node = this.lookup.get(key);
        if (!node) {
            return;
        }

        this.detach(node);
        this.prepend(node);

        return node.value;
    }

    private detach(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        // if (this.length === 1) {
        //     this.head = this.head = undefined;
        // }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;

        this.head = node;
    }
    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }
        const tail = this.tail as Node<V>;
        this.detach(tail);
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
