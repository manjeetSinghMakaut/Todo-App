function addTask() {
    const taskContainer = document.getElementById("innerdiv");
    const taskinput = document.getElementById("input");
    const taskText = taskinput.value.trim(); // Trim spaces
  
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }
  
    const taskdiv = document.createElement("div");
    taskdiv.className = "taskdiv";
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "input";
    taskdiv.appendChild(checkbox);
  
    const tasktextnode = document.createTextNode(taskText); // Create text node
    taskdiv.appendChild(tasktextnode);
  
    const deletebutton = document.createElement("button");
    deletebutton.innerText = "Delete";
    deletebutton.className = "delete-button";
    taskdiv.appendChild(deletebutton);
  
    taskContainer.appendChild(taskdiv);
    taskinput.value = "";
  
    deletebutton.addEventListener("click", function () {
      taskContainer.removeChild(taskdiv);
      saveTasks();
    });
  
    checkbox.addEventListener("change", function () {
      saveTasks(); // Save state when a checkbox is toggled
    });
  
    saveTasks(); // Save state after adding a new task
  }
  
  function Deletetasks() {
    const taskContainer = document.getElementById("innerdiv");
    taskContainer.innerHTML = ""; // Clear all tasks
  
    saveTasks(); // Update storage after deleting all tasks
  }
  
  function saveTasks() {
    const tasks = [];
    const taskContainer = document.getElementById("innerdiv");
    const taskdivs = taskContainer.querySelectorAll(".taskdiv");
  
    taskdivs.forEach(taskdiv => {
      const checkbox = taskdiv.querySelector(".input");
      const taskText = taskdiv.childNodes[1].textContent; // Get the text node value
  
      tasks.push({ text: taskText, checked: checkbox.checked });
    });
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const taskContainer = document.getElementById("innerdiv");
    taskContainer.innerHTML = ""; // Clear existing tasks
  
    tasks.forEach(task => {
      const taskdiv = document.createElement("div");
      taskdiv.className = "taskdiv";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "input";
      checkbox.checked = task.checked; // Restore checked state
      taskdiv.appendChild(checkbox);
  
      const tasktextnode = document.createTextNode(task.text); // Restore text
      taskdiv.appendChild(tasktextnode);
  
      const deletebutton = document.createElement("button");
      deletebutton.innerText = "Delete";
      deletebutton.className = "delete-button";
      taskdiv.appendChild(deletebutton);
  
      taskContainer.appendChild(taskdiv);
  
      deletebutton.addEventListener("click", function () {
        taskContainer.removeChild(taskdiv);
        saveTasks();
      });
  
      checkbox.addEventListener("change", function () {
        saveTasks(); // Save state when a checkbox is toggled
      });
    });
  }
  
  window.addEventListener("load", function () {
    loadTasks();
  });
  
  function SelectAll() {
    const taskContainer = document.getElementById("innerdiv");
    const checkboxes = taskContainer.querySelectorAll(".input");
  
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true; 
    });
  
    saveTasks(); 
  }
  
  const selectAllButton = document.getElementById("all");
  selectAllButton.addEventListener("click", function () {
    SelectAll();
  });
  
  const mainsubmit = document.getElementById("mainsubmit");
  mainsubmit.addEventListener("click", function () {
    addTask();
  });
  
  const Deletetask = document.getElementById("delete");
  Deletetask.addEventListener("click", function () {
    Deletetasks();
  });
  