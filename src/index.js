import "./styles.css";
import { createTaskDivs } from "./newTask";
import {
  addToGrid,
  projectGrid,
  defaultGrid,
  buildTaskFromStorage,
} from "./addToGrid";
import { writeToStorage, readFromStorage } from "./checkStorage";

//adds event listeners for buttons
(function setup() {
  let gridArray = [];

  const oldGrid = readFromStorage();
  console.log(gridArray);

  //initial lists needed for setup
  const tasksGrid = document.querySelector("#Tasks");
  const optionsContainer = document.querySelector("#optionsContainer");
  const projectsList = document.querySelector("#projectsList");
  const uniqueProjects = new Set();
  let projectSelection = document.querySelectorAll(".projectChoice");

  oldGrid.forEach((taskGroup) => {
    //rebuild tasks
    let toDoFromOld = createTaskDivs(taskGroup[1], taskGroup[0], taskGroup[2]); //returns task div elements

    gridArray = addToGrid(tasksGrid, toDoFromOld, gridArray);
    writeToStorage(gridArray);

    //finds unique projects
    if (taskGroup[2] != "Default") {
      uniqueProjects.add(taskGroup[2]);
    }
  });

  // adds the project buttons

  uniqueProjects.forEach((project) => {
    addProject(project, optionsContainer, projectsList, tasksGrid, gridArray);
    projectSelection = document.querySelectorAll(".projectChoice");
  });

  //sidebar buttons and dialog
  const newTaskButton = document.querySelector("#NewTask");
  const newTaskDialog = document.querySelector("#createNewtask");

  newTaskButton.addEventListener("click", () => newTaskDialog.showModal());

  //dialog inputs
  const addButton = document.querySelector("#add");
  const dateInput = document.querySelector("#duedate");
  const descriptionInput = document.querySelector("#description");
  const cancelButton = document.querySelector("#cancel");
  const projectInput = document.querySelector("#projecsList");

  //close out of dialog
  cancelButton.addEventListener("click", () => newTaskDialog.close());
  //tasks grid

  //adds the new task
  addButton.addEventListener("click", () => {
    let newToDo = createTaskDivs(
      dateInput.value,
      descriptionInput.value,
      projectsList.value
    ); //returns task div elements
    gridArray = addToGrid(tasksGrid, newToDo, gridArray);
    descriptionInput.value = "To Do...";
    writeToStorage(gridArray);
    newTaskDialog.close();
  });

  //adding projects
  const newProjButton = document.querySelector("#newProject");
  const newProjDialog = document.querySelector("#createNewProject");
  newProjButton.addEventListener("click", () => newProjDialog.showModal());
  const addProjectButton = document.querySelector("#addProject");
  const newProjName = document.querySelector("#projectName");
  addProjectButton.addEventListener("click", () => {
    addProject(
      newProjName.value,
      optionsContainer,
      projectsList,
      tasksGrid,
      gridArray
    );
    newProjName.value = "Project Name";
    projectSelection = document.querySelectorAll(".projectChoice");
    newProjDialog.close();
  });

  //close out of dialog for project
  cancelProject = document.querySelector("#cancelProject");
  cancelProject.addEventListener("click", () => newProjDialog.close());

  //show all projects
  const showAllProjects = document.querySelector("#showAllProjects");
  showAllProjects.addEventListener("click", () =>
    defaultGrid(gridArray, tasksGrid)
  );

  //default project code
  const defaultProjButton = document.querySelector("#defaultProject");
  defaultProjButton.addEventListener("click", () =>
    projectGrid("Default", tasksGrid, gridArray)
  );
})();

function addProject(inputs, projects, projectsList, grid, gridArray) {
  let newProjectbutton = document.createElement("button");
  newProjectbutton.textContent = inputs;
  newProjectbutton.addEventListener("click", () =>
    projectGrid(inputs, grid, gridArray)
  );

  let newProjectOption = document.createElement("option");
  newProjectOption.textContent = inputs;
  newProjectOption.setAttribute("class", "projectChoice");
  projectsList.appendChild(newProjectOption);
  projects.appendChild(newProjectbutton);
}
