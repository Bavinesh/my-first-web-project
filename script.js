// Display current date
document.getElementById("date").innerText =
    new Date().toDateString();

// Load saved data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("goals", JSON.stringify(goals));
}

// Update dashboard statistics
function updateStats() {
    let completed = tasks.filter(t => t.done).length;

    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText = completed;
    document.getElementById("goalCount").innerText = goals.length;

    let percent = tasks.length ?
        Math.round(completed / tasks.length * 100) : 0;

    document.getElementById("productivity").innerText = percent + "%";
}

// Display tasks
function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.done ? "done" : "";

        let name = document.createElement("span");
        name.textContent = task.text;
        name.onclick = () => {
            tasks[index].done = !tasks[index].done;
            saveData();
            showTasks();
        };

        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => {
            tasks.splice(index, 1);
            saveData();
            showTasks();
        };

        li.append(name, btn);
        list.appendChild(li);
    });

    updateStats();
}

// Add task
function addTask() {
    let input = document.getElementById("taskInput");

    if (!input.value.trim()) return alert("Enter a task!");

    tasks.push({ text: input.value.trim(), done: false });
    input.value = "";

    saveData();
    showTasks();
}

// Display goals
function showGoals() {
    let list = document.getElementById("goalList");
    list.innerHTML = "";

    goals.forEach((goal, index) => {
        let li = document.createElement("li");
        li.textContent = goal;

        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => {
            goals.splice(index, 1);
            saveData();
            showGoals();
        };

        li.appendChild(btn);
        list.appendChild(li);
    });

    updateStats();
}

// Add goal
function addGoal() {
    let input = document.getElementById("goalInput");

    if (!input.value.trim()) return alert("Enter a goal!");

    goals.push(input.value.trim());
    input.value = "";

    saveData();
    showGoals();
}

// Focus timer
let seconds = 1500;
let timerInterval = null;

function displayTimer() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    document.getElementById("timer").innerText =
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0");
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            displayTimer();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session completed! Great work!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 1500;
    displayTimer();
}

// Save notes
let notes = document.getElementById("notesInput");

notes.value = localStorage.getItem("notes") || "";

function saveNotes() {
    localStorage.setItem("notes", notes.value);
    document.getElementById("savedMessage").innerText =
        "✓ Notes saved successfully!";
}

// Initial display
showTasks();
showGoals();
displayTimer();