function addTask() {
  const taskContainer = document.getElementById("innerdiv");
  const taskinput = document.getElementById("input");
  const taskText = taskinput.value.trim(); // Trim spaces

  if (taskText === "") {
      alert("Please enter a task!!");
      return;
  }

  const taskdiv = document.createElement("div");
  taskdiv.className = "taskdiv";
  taskdiv.setAttribute("draggable", "true"); 


  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "input";
  taskdiv.appendChild(checkbox);

  // Modified: Changed from text node to a span element for task text
  const tasktextnode = document.createElement("span");
  tasktextnode.textContent = taskText;
  taskdiv.appendChild(tasktextnode);

  // Container for the Edit and Delete buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  taskdiv.appendChild(buttonContainer);

  const Editbutton = document.createElement("button");
  Editbutton.innerText = "Edit";
  Editbutton.className = "edit-button";
  buttonContainer.appendChild(Editbutton);

  const deletebutton = document.createElement("button");
  deletebutton.innerText = "Delete";
  deletebutton.className = "delete-button";
  buttonContainer.appendChild(deletebutton);

  taskContainer.appendChild(taskdiv);
  taskinput.value = "";

  // Added: Edit functionality
  Editbutton.addEventListener("click", function () {
      editTask(tasktextnode);
  });

  // Added: Double-click to edit functionality
  tasktextnode.addEventListener("dblclick", function () {
      editTask(tasktextnode);
  });

  deletebutton.addEventListener("click", function () {
      taskContainer.removeChild(taskdiv);
      saveTasks();
  });

  checkbox.addEventListener("change", function () {
      saveTasks();
  });

  saveTasks();
}

// Added: Function to handle editing the task
function editTask(tasktextnode) {
  const currentText = tasktextnode.textContent;
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentText;
  inputField.className = "edit-input";

  // Replace the task text with the input field
  tasktextnode.replaceWith(inputField);
  inputField.focus();

  // Save the new value on pressing Enter or losing focus
  inputField.addEventListener("blur", () => {
      saveNewTaskText(inputField, tasktextnode);
  });

  inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          saveNewTaskText(inputField, tasktextnode);
      }
  });
}
// Added: Function to save the edited task text
function saveNewTaskText(inputField, tasktextnode) {
  const newText = inputField.value.trim();
  if (newText === "") {
      alert("Task cannot be empty!");
      inputField.focus();
      return;
  }
  tasktextnode.textContent = newText;
  inputField.replaceWith(tasktextnode);
  saveTasks();
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
  