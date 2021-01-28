
    var mineArray;

    function generateMineArray() {
       mineArray = [...new Array(10)].map(elem => new Array(10));
      // add 20 mines to the 10X10 array
      for (var i=0; i<20; i++) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        mineArray[row][col] = -1;
      }
    }

    function onCellClick(row, col, cell) {
      if(row> 9 || col > 9) return;
      // game over if bomb found
      if(mineArray[row][col] === -1) {
        alert("Game Over");
      } else {
        // if no mines arround open adjecent cell else show count of mines around the cell
        let mineCount=0;
        const cellRow = cell.parentNode.rowIndex;
        const cellCol = cell.cellIndex;
        cell.className="clicked";
        for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {
          for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
            if (mineArray[i][j] === -1) mineCount++;
          }
        }
        cell.innerHTML=mineCount;
        const clicked = document.createAttribute("cell-clicked");       
        clicked.value = "false";             
        cell.setAttributeNode(clicked);
        if (mineCount==0) { 
          //Reveal all adjacent cells as they do not have any mine
          for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {
            for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
              //Recursive Call
              const tableGrid = document.getElementById("tableGrid");
              if (mineArray[i][j] !== -1 && !tableGrid.rows[i].cells[j].getAttribute("cell-clicked")) {
                const tableGrid = document.getElementById("tableGrid");
                onCellClick(i, j, tableGrid.rows[i].cells[j]);
              }
            }
          }
        }
      }
    }

    //todo
    //1. check completion
    //2. reveal all bombs if clicked on a bomb.

    function render() {
      const tableGrid = document.getElementById("tableGrid");
      generateMineArray();

      tableGrid.innerHTML="";
      // render the grid layout
      for (let i=0; i<mineArray.length; i++) {
        row = tableGrid.insertRow(i);
        for (let j=0; j<mineArray[i].length; j++) {
          cell = row.insertCell(j);
          cell.onclick = function() { 
            onCellClick(i, j, this); 
          };

        }
      }
    }

    render();
