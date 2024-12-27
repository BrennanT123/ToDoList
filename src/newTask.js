import { Task } from "./tasks";
import { format } from "date-fns";
function createTaskDivs(dateInput,taskInput,projectInput)
{
    const newTask = new Task(new Date(dateInput),taskInput,projectInput);
    let newGridTask = document.createElement("div");
    newGridTask.textContent = newTask.description;
    let newGridDate = document.createElement("div");
    newGridDate.textContent = format(newTask.dueDate,'MM/dd/yyyy');
    let newGridProject = document.createElement("div");
    newGridProject.textContent = projectInput;

    let completeButton = document.createElement("button");
    completeButton.setAttribute("class",'completeButton')
    completeButton.textContent = "O";
    return{newGridDate,newGridTask,completeButton,newGridProject}
}

export {createTaskDivs}