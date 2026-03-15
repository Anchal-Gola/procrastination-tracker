const undoBox = document.getElementById("undoBox");
const undoBtn = document.getElementById("undoBtn");

let deletedTask = null;
let deletedIndex = null;

const progressFill = document.getElementById("progressFill");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

taskInput.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    addTaskBtn.click();
  }
});

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", function(){

const taskText = taskInput.value;

if(taskText === "") return;

tasks.push({text: taskText, done:false});

saveTasks();
renderTasks();

taskInput.value = "";

});

function renderTasks(){

taskList.innerHTML = "";

let completed = 0;

tasks.forEach((task,index)=>{

const li = document.createElement("li");

const span = document.createElement("span");
span.textContent = task.text;

if(task.done){
span.style.textDecoration = "line-through";
completed++;
}

const doneBtn = document.createElement("button");
doneBtn.textContent = "Done";

doneBtn.addEventListener("click",function(){

tasks[index].done = true;

saveTasks();
renderTasks();

});

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.addEventListener("click", function(){

deletedTask = tasks[index];
deletedIndex = index;

tasks.splice(index,1);

saveTasks();
renderTasks();

undoBox.style.display = "flex";

});

li.appendChild(span);
li.appendChild(doneBtn);
li.appendChild(deleteBtn);

taskList.appendChild(li);

});

totalTasks.textContent = "Tasks Added: " + tasks.length;
completedTasks.textContent = "Completed: " + completed;
pendingTasks.textContent = "Pending: " + (tasks.length - completed);


let percent = 0;

if(tasks.length > 0){
percent = (completed / tasks.length) * 100;
}

progressFill.style.width = percent + "%";
}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resetBtn = document.getElementById("resetTimer");

let time = 3300;
let timerInterval;

function updateTimer(){

let minutes = Math.floor(time/60);
let seconds = time % 60;

seconds = seconds < 10 ? "0"+seconds : seconds;

timerDisplay.textContent = minutes + ":" + seconds;

}

startBtn.addEventListener("click",function(){

if(timerInterval) return;

timerInterval = setInterval(function(){

if(time>0){
time--;
updateTimer();
}

},1000);

});

pauseBtn.addEventListener("click",function(){

clearInterval(timerInterval);
timerInterval = null;

});

resetBtn.addEventListener("click",function(){

clearInterval(timerInterval);
timerInterval = null;

time = 3300;
updateTimer();

});

updateTimer();

const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click",function(){

document.body.classList.toggle("dark-mode");

});

undoBtn.addEventListener("click", function(){

if(deletedTask !== null){

tasks.splice(deletedIndex,0,deletedTask);

saveTasks();
renderTasks();

undoBox.style.display = "none";

}

});