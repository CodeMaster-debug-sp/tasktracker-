let tasks = [];
let history = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const assignedTo = document.getElementById("assignedTo");
  const department = document.getElementById("department");

  if (
    taskInput.value === "" ||
    assignedTo.value === "" ||
    department.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title: taskInput.value,
    assignedTo: assignedTo.value,
    department: department.value,
    status: "Pending",
    createdAt: new Date()
  };

  tasks.push(task);
  renderTasks();

  taskInput.value = "";
  assignedTo.value = "";
  department.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong><br/>
        Dept: ${task.department} | Assigned: ${task.assignedTo}<br/>
        Status: <span class="badge pending">Pending</span>
      </div>
      <button onclick="completeTask(${task.id})">Complete</button>
    `;

    taskList.appendChild(li);
  });
}

function completeTask(id) {
  const taskIndex = tasks.findIndex(t => t.id === id);
  const task = tasks[taskIndex];

  task.status = "Completed";
  task.completedAt = new Date();

  const duration =
    Math.round((task.completedAt - task.createdAt) / 60000) + " mins";

  history.push({
    ...task,
    duration
  });

  tasks.splice(taskIndex, 1);

  renderTasks();
  renderHistory();
}

function renderHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  history.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong><br/>
        Dept: ${task.department} | Assigned: ${task.assignedTo}<br/>
        Completed in ${task.duration}
      </div>
      <span class="badge completed">Completed</span>
    `;

    historyList.appendChild(li);
  });
}
