function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
  
  function writeToStorage(inputTasks) {
    let tempArray = [];
    if (storageAvailable("localStorage")) {
        console.log("inputtasks",inputTasks);
        inputTasks.forEach(element => {
        const taskName = element[0].textContent;
        const taskDate = element[1].textContent;
        const taskProject = element[2].textContent;
        tempArray.push([taskName,taskDate,taskProject]);
    });

    const tasksString = JSON.stringify(tempArray);
    localStorage.setItem("oldTasks",tasksString);

    } else {
        console.warn("LocalStorage not available");
    }
    console.log(tempArray);
}

function readFromStorage() {
    if (storageAvailable("localStorage")) {
        const tasksString = localStorage.getItem("oldTasks");
        const parsedTasks = tasksString ? JSON.parse(tasksString) : [];
        return parsedTasks;
    }
    return [];
}
  export {writeToStorage, readFromStorage};