function addTask() {
    const taskContainer = document.getElementById("innerdiv");
    const taskinput = document.getElementById("input");
    const taskText = taskinput.value.trim(); // Trim spaces

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskdiv = document.createElement('div');
    taskdiv.className = "taskdiv";

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    taskdiv.appendChild(checkbox);

    const tasktextnode = document.createTextNode(taskText); // Create text node
    taskdiv.appendChild(tasktextnode);

    const deletebutton = document.createElement('button');
    deletebutton.innerText = "Delete";
    deletebutton.className = "delete-button";
    taskdiv.appendChild(deletebutton);

    taskContainer.appendChild(taskdiv);
    taskinput.value = "";

    deletebutton.addEventListener('click', function() {
        taskContainer.removeChild(taskdiv);
    });




}
function Deletetasks(){
    const taskContainer = document.getElementById("innerdiv");
    const tasks=taskContainer.querySelectorAll('.taskdiv')

    tasks.forEach(task => {
        task.remove();
    })
  
}

const mainsubmit = document.getElementById("mainsubmit");
mainsubmit.addEventListener('click', function() {
    addTask();
});





const Deletetask = document.getElementById("delete");
Deletetask.addEventListener('click',function(){
    Deletetasks();
})


