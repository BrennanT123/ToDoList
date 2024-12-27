import { compareAsc } from "date-fns";
import { writeToStorage } from "./checkStorage";

function initializeGridElements(inputs, gridArray,grid) {
  const fragment = document.createDocumentFragment();

  const taskDate = new Date(inputs.newGridDate.textContent);

    // sets background color to red if date has passed
  if (compareAsc(taskDate,new Date())!==1 ) {
    inputs.newGridDate.style.backgroundColor = 'rgba(255, 128, 128, 0.8)';

  }
  fragment.appendChild(inputs.newGridTask);
  fragment.appendChild(inputs.newGridDate);
  fragment.appendChild(inputs.newGridProject);
  fragment.appendChild(inputs.completeButton);

  const taskGroup = Array.from(fragment.childNodes);


    //adds event listener to the complete button to delete row when pressed
  inputs.completeButton.addEventListener("click", () =>
  {  completePressed(gridArray, taskGroup,grid)
    writeToStorage(gridArray);}
  );


  gridArray.push(taskGroup);

  return gridArray;
}

function buildGrid(gridArray, grid) {
    
  gridArray.forEach((taskGroup) => {
    taskGroup.forEach((item) => grid.appendChild(item));
  });
}
function clearGrid(grid) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function addToGrid(grid, inputs, gridArray) {
  let newGridArray = initializeGridElements(inputs, gridArray,grid);
  clearGrid(grid);
  console.log(newGridArray);
  buildGrid(newGridArray, grid);
  console.log(newGridArray);

  console.log(inputs);

  return newGridArray;
}

//deletes from array if complete is pressed
function completePressed(gridArray, taskGroup,grid) {
  const indexNum = gridArray.indexOf(taskGroup);
  if (indexNum > -1) {
    gridArray.splice(indexNum, 1);
  }
  taskGroup.forEach(item => {
    if(item.parentNode){
        item.parentNode.removeChild(item);
    }
  })
  clearGrid(grid);
  buildGrid(gridArray,grid);

}


//project specific grid building

function projectGrid(project,grid,gridArray)
{
    clearGrid(grid);
    const projectGrid = gridArray.filter(element => element[2].textContent ===project); 
    
    buildGrid(projectGrid,grid);
}
function defaultGrid(gridArray,grid)
{
    clearGrid(grid);
    buildGrid(gridArray,grid);
}

function buildTaskFromStorage(taskGroup, grid,newGrid) {
  if (!taskGroup || !taskGroup[0]?.textContent || !taskGroup[1]?.textContent || !taskGroup.project) {
      console.error("Invalid task data:", taskGroup);
      return;
  }
  const fragment = document.createDocumentFragment();

  const taskDiv = document.createElement("div");
  taskDiv.textContent = taskGroup[0].textContent;

  const dateDiv = document.createElement("div");
  dateDiv.textContent = taskGroup[1].textContent;

  if (compareAsc(dateDiv,new Date())!==1 ) {
    dateDiv.style.backgroundColor = 'rgba(255, 128, 128, 0.8)';
  
  }

  const projectDiv = document.createElement("div");
  projectDiv.textContent = taskGroup.project;

  const completeButton = document.createElement("button");
  completeButton.textContent = "O";
  completeButton.addEventListener("click", () => {
      completePressed(gridArray, taskGroup, grid);
      writeToStorage(gridArray);
  });

  fragment.appendChild(taskDiv);
  fragment.appendChild(dateDiv);
  fragment.appendChild(projectDiv);
  fragment.appendChild(completeButton);

  grid.appendChild(fragment);
  
  const returnTasksGroup = Array.from(fragment.childNodes);
  
}




export { addToGrid,projectGrid,defaultGrid, buildTaskFromStorage};
