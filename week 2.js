let tasks = [];

const taskTitleInput = document.getElementById('taskTitle');
const taskDueTimeInput = document.getElementById('taskDueTime');
const taskPriorityInput = document.getElementById('taskPriority');
const addTaskButton = document.getElementById('addTaskButton');
const taskListElement = document.getElementById('taskList');
const sendRemindersButton = document.getElementById('sendRemindersButton');

function addTask() {
  const title = taskTitleInput.value.trim();
  const dueTime = parseInt(taskDueTimeInput.value.trim());
  const priority = parseInt(taskPriorityInput.value.trim());


  if (!title || isNaN(dueTime) || isNaN(priority)) {
    alert('Please provide valid task data.');
    return;
  }


  const task = {
    title,
    dueTime,
    priority,
    id: Date.now(),
  };


  tasks.push(task);
  renderTasks();
  clearInputs();
}

function clearInputs() {
  taskTitleInput.value = '';
  taskDueTimeInput.value = '';
  taskPriorityInput.value = 1;
}

function renderTasks() {
  taskListElement.innerHTML = '';

  tasks.sort((a, b) => a.priority - b.priority);


  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
      <span>${task.title} (Due in ${task.dueTime} minutes)</span>
      <span class="priority">Priority: ${getPriorityText(task.priority)}</span>
    `;
    taskListElement.appendChild(taskElement);
  });
}

function getPriorityText(priority) {
  switch (priority) {
    case 1: return 'High';
    case 2: return 'Medium';
    case 3: return 'Low';
    default: return 'Unknown';
  }
}

function sendReminders() {
  tasks.forEach(task => {
    const delay = task.dueTime * 60000; 
    setTimeout(() => {
      alert(`Reminder: ${task.title} is due now!`);
    }, delay);
  });
}

addTaskButton.addEventListener('click', addTask);
sendRemindersButton.addEventListener('click', sendReminders);

renderTasks();