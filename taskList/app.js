// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadAllEventListeners();

function loadAllEventListeners(){
 // Add task event
 form.addEventListener('submit', addTask);
 // Remove task event
 taskList.addEventListener('click', removeTask);
 // Clear task event
 clearBtn.addEventListener('click', clearTasks);
 // Filter tasks event
 filter.addEventListener('keyup', filterTasks);
 document.addEventListener('DOMContentLoaded', getTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}
//Add task

function addTask(e){
  if(taskInput.value==''){
    alert('add some task');
  }else{
    //create li element
  const li= document.createElement('li');

  li.className = 'collection-item';
  
  li.appendChild(document.createTextNode(taskInput.value));
  
  const link  = document.createElement('a');
  
  link.className='delete-item secondary-content';
  
  link.innerHTML='<i class="fa fa-remove"></i>';
  
  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);
  }
  taskInput.value="";
  
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure')){
      e.target.parentElement.parentElement.remove() ;   
    }
  }
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks

function clearTasks(){
  taskList.innerHTML="";
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
