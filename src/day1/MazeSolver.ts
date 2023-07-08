export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }
    walk(maze, wall, start, end, seen, path);

    return path;
}

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    if (curr.x < 0 || curr.x > maze[0].length) {
        return false;
    }
    if (curr.y < 0 || curr.y > maze.length) {
        return false;
    }

    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }
    if (seen[curr.y][curr.x]) {
        return false;
    }

    path.push(curr);
    seen[curr.y][curr.x] = true;

    for (const move of movements) {
        const next: Point = {
            x: curr.x + move[1],
            y: curr.y + move[0],
        };
        if (walk(maze, wall, next, end, seen, path)) {
            return true;
        }
    }
    path.pop();

    return false;
}

const movements = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];
