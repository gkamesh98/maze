/* eslint-disable prettier/prettier */
const mazeGenerator = (height, width) => {
    let current = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
    let visited = new Array(height);
    let veritcalWall = new Array(height);
    let horizontalWall = new Array(width);
    for (let i = 0; i < visited.length; i++){
        visited[i] = new Array(width).fill(false);
        veritcalWall[i] = new Array(height).fill(true);
        horizontalWall[i] = new Array(width).fill(true);
    }
    const path = new Array(0);
    const stack = Array(0);
    stack.push(current);
    // console.log(current);
    visited[current[0]][current[1]] = true;
    while (stack.length){
        current = stack.pop();
        // path.push(current);
        // console.log(path,stack);
        const unVisitedNeighbor = new Array(0);
        let unVisited = [];
        if ((current[0] - 1) >= 0 && !visited[current[0] - 1][current[1]]){
            unVisited = [current[0] - 1,current[1]];
            unVisitedNeighbor.push(unVisited);
        }
        if ((current[0] + 1) < height && !visited[current[0] + 1][current[1]]){
            unVisited = [current[0] + 1,current[1]];
            unVisitedNeighbor.push(unVisited);
        }
        if ((current[1] - 1) >= 0 && !visited[current[0]][current[1] - 1]){
            unVisited = [current[0],current[1] - 1];
            unVisitedNeighbor.push(unVisited);
        }
        if ((current[1] + 1) < width && !visited[current[0]][current[1] + 1]){
            unVisited = [current[0],current[1] + 1];
            unVisitedNeighbor.push(unVisited);
        }
        if (unVisitedNeighbor.length){
            path.push(current);
            stack.push(current);
            const selectedNeighbor = unVisitedNeighbor[Math.floor(Math.random() * unVisitedNeighbor.length)];
            visited[selectedNeighbor[0]][selectedNeighbor[1]] = true;
            if (current[0] - selectedNeighbor[0] === 0){
                veritcalWall[current[0]][Math.min(current[1],selectedNeighbor[1])] = false;
            }
            else {
                horizontalWall[Math.min(current[0],selectedNeighbor[0])][current[1]] = false;
            }
            // console.log(visited);
            stack.push(selectedNeighbor);
            // console.log('stack', stack);
            // console.log(current, unVisitedNeighbor);
        }
    }
    // console.log('path',path);
    // console.log('visited',visited);
    // console.log('veriticalwall',veritcalWall)
    // console.log('horizontal', horizontalWall);
    return {veritcalWall: veritcalWall, horizontalWall: horizontalWall};
};

export default mazeGenerator;
