let grid = []; //hold the map

// for (let y in grid)
// {
//     for (let x in grid[+y])
//     {

//     }
// }
function flood(x, y, d)
{
    for (let c = 0; c < 10; c++)
    {
      let row = []; //hold the estimated distances from the goal
      for (let r = 0; r < 10; r++)
      {
        row[r] = true;
        console.log(row);                   
      }
      grid[c] = row;    
    }  
}

grid[5][5] = "goal"
d = grid[0][0] - goal
console.log(flood(5, 5, 0));
console.log(grid); 
console.log(d)

