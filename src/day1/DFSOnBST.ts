function search(curr: BinaryNode<number> | null, needle: number): boolean {
    if (!curr) {
        return false;
    }

    if (curr.value === needle) {
        return true;
    }

    return search(curr.value < needle ? curr.left : curr.right, needle);
}
export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
