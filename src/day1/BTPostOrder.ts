function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) {
        return path;
    }
    // Pre

    // Recurse
    walk(curr.left, path);
    walk(curr.right, path);
    path.push(curr.value);

    // Post

    return path;
}
export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
