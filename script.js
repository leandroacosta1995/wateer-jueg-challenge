console.log("Solution for water jug problem");
const x_capacity = parseInt(prompt("Enter Jug 1 capacity:"));
const y_capacity = parseInt(prompt("Enter Jug 2 capacity:"));
const end = parseInt(prompt("Enter target volume:"));

function bfs(start, end, x_capacity, y_capacity) {
    const path = [];
    const front = [];
    front.push(start);
    const visited = [];

    while (front.length > 0) {
        const current = front.pop();
        const x = current[0];
        const y = current[1];
        path.push(current);
        if (x === end || y === end) {
            console.log("Found!");
            return path;
        }

        // rule 1
        if (current[0] < x_capacity && !visited.some(v => v[0] === x_capacity && v[1] === current[1])) {
            front.push([x_capacity, current[1]]);
            visited.push([x_capacity, current[1]]);
        }

        // rule 2
        if (current[1] < y_capacity && !visited.some(v => v[0] === current[0] && v[1] === y_capacity)) {
            front.push([current[0], y_capacity]);
            visited.push([current[0], y_capacity]);
        }

        // rule 3
        if (current[0] > 0 && !visited.some(v => v[0] === 0 && v[1] === current[1])) {
            front.push([0, current[1]]);
            visited.push([0, current[1]]);
        }

        // rule 4
        if (current[1] > 0 && !visited.some(v => v[0] === x_capacity && v[1] === 0)) {
            front.push([x_capacity, 0]);
            visited.push([x_capacity, 0]);
        }

        // rule 5
        if (current[1] > 0) {
            const newX = Math.min(x + y, x_capacity);
            const newY = Math.max(0, x + y - x_capacity);
            if (!visited.some(v => v[0] === newX && v[1] === newY)) {
                front.push([newX, newY]);
                visited.push([newX, newY]);
            }
        }

        // rule 6
        if (current[0] > 0) {
            const newX = Math.max(0, x + y - y_capacity);
            const newY = Math.min(x + y, y_capacity);
            if (!visited.some(v => v[0] === newX && v[1] === newY)) {
                front.push([newX, newY]);
                visited.push([newX, newY]);
            }
        }
    }
    return "Not found";
}

function gcd(a, b) {
    if (a === 0) {
        return b;
    }
    return gcd(b % a, a);
}

// start state: x = 0 , y = 0
const start = [0, 0];

// condition for getting a solution:
if (end % gcd(x_capacity, y_capacity) === 0) {
    console.log(bfs(start, end, x_capacity, y_capacity));
} else {
    console.log("No solution possible for this combination.");
}

