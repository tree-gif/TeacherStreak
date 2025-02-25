// Global variables
let currentDate = new Date();

// Helper functions
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getWeekRange(date) {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${formatDate(start)} - ${formatDate(end)}`;
}

function getMonthYear(date) {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

// Local Storage functions
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Timetable functions
function generateTimetable(date, containerId) {
    const timetable = document.createElement('div');
    timetable.className = 'timetable';
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(timetable);

    const savedData = loadData(formatDate(date)) || {};

    for (let hour = 8; hour < 18; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'timetable-time';
        timeSlot.textContent = `${hour}:00`;
        timetable.appendChild(timeSlot);

        const taskSlot = document.createElement('div');
        taskSlot.className = 'timetable-task';
        if (savedData[hour]) {
            taskSlot.textContent = savedData[hour].task;
            taskSlot.classList.add(`task-${savedData[hour].status}`);
        }
        timetable.appendChild(taskSlot);
    }
}

// Daily Timetable functions
function generateDailySchedule(date) {
    generateTimetable(date, 'daily-timetable');

    const dailySchedule = document.getElementById('daily-schedule');
    dailySchedule.innerHTML = '';

    const savedData = loadData(formatDate(date)) || {};

    for (let hour = 8; hour < 18; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.innerHTML = `
            <h3>${hour}:00 - ${hour + 1}:00</h3>
            <input type="text" class="task" placeholder="Task" value="${savedData[hour]?.task || ''}">
            <input type="text" class="objective" placeholder="Objective" value="${savedData[hour]?.objective || ''}">
            <select class="completion-status">
                <option value="not-started" ${savedData[hour]?.status === 'not-started' ? 'selected' : ''}>Not Started</option>
                <option value="in-progress" ${savedData[hour]?.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="completed" ${savedData[hour]?.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
            <textarea class="reflection" placeholder="Reflection">${savedData[hour]?.reflection || ''}</textarea>
            <input type="text" class="training-alignment" placeholder="Training Alignment" value="${savedData[hour]?.trainingAlignment || ''}">
        `;
        dailySchedule.appendChild(timeSlot);
    }

    // Add event listeners to save data
    dailySchedule.addEventListener('change', () => saveDailyData(date));
    dailySchedule.addEventListener('input', () => saveDailyData(date));
}

function saveDailyData(date) {
    const dailyData = {};
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach((slot, index) => {
        const hour = index + 8;
        dailyData[hour] = {
            task: slot.querySelector('.task').value,
            objective: slot.querySelector('.objective').value,
            status: slot.querySelector('.completion-status').value,
            reflection: slot.querySelector('.reflection').value,
            trainingAlignment: slot.querySelector('.training-alignment').value
        };
    });
    saveData(formatDate(date), dailyData);
    generateTimetable(date, 'daily-timetable');
}

// Weekly Overview functions
function generateWeeklyOverview(startDate) {
    const weeklyTimetable = document.getElementById('weekly-timetable');
    weeklyTimetable.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dayColumn = document.createElement('div');
        dayColumn.className = 'weekly-day-column';
        dayColumn.innerHTML = `<h3>${date.toLocaleDateString('default', { weekday: 'short' })} ${formatDate(date)}</h3>`;
        const dayTimetable = document.createElement('div');
        dayTimetable.id = `day-${i}-timetable`;
        dayColumn.appendChild(dayTimetable);
        weeklyTimetable.appendChild(dayColumn);
        generateTimetable(date, `day-${i}-timetable`);
    }

    const weeklyOverview = document.getElementById('weekly-overview');
    weeklyOverview.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dayData = loadData(formatDate(date)) || {};

        const daySummary = document.createElement('div');
        daySummary.className = 'day-summary';
        daySummary.innerHTML = `
            <h3>${date.toLocaleDateString('default', { weekday: 'long' })} (${formatDate(date)})</h3>
            <p>Tasks Completed: ${Object.values(dayData).filter(slot => slot.status === 'completed').length}</p>
            <p>Tasks In Progress: ${Object.values(dayData).filter(slot => slot.status === 'in-progress').length}</p>
            <p>Tasks Not Started: ${Object.values(dayData).filter(slot => slot.status === 'not-started').length}</p>
        `;
        weeklyOverview.appendChild(daySummary);
    }

    updateWeeklySummary(startDate);
}

function updateWeeklySummary(startDate) {
    const implementationMetrics = document.getElementById('implementation-metrics');
    const improvementAreas = document.getElementById('improvement-areas');
    const trainingSuccess = document.getElementById('training-success');

    let totalTasks = 0;
    let completedTasks = 0;
    let trainingAlignedTasks = 0;

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dayData = loadData(formatDate(date)) || {};

        Object.values(dayData).forEach(slot => {
            totalTasks++;
            if (slot.status === 'completed') completedTasks++;
            if (slot.trainingAlignment.trim() !== '') trainingAlignedTasks++;
        });
    }

    const completionRate = (completedTasks / totalTasks * 100).toFixed(2);
    const trainingAlignmentRate = (trainingAlignedTasks / totalTasks * 100).toFixed(2);

    implementationMetrics.innerHTML = `
        <p>Task Completion Rate: ${completionRate}%</p>
        <p>Training Alignment Rate: ${trainingAlignmentRate}%</p>
    `;

    improvementAreas.innerHTML = `
        <p>Focus on increasing task completion rate.</p>
        <p>Work on aligning more tasks with training objectives.</p>
    `;

    trainingSuccess.innerHTML = `
        <p>Overall Training Implementation Success: ${((parseFloat(completionRate) + parseFloat(trainingAlignmentRate)) / 2).toFixed(2)}%</p>
    `;
}

// Monthly Calendar functions
function generateMonthlyCalendar(date) {
    const monthlyCalendar = document.getElementById('monthly-calendar');
    monthlyCalendar.innerHTML = '';

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    while (startDate <= lastDay) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        if (startDate.getMonth() !== date.getMonth()) {
            dayElement.classList.add('other-month');
        }
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.textContent = startDate.getDate();
        dayElement.appendChild(dateSpan);

        const tasksDiv = document.createElement('div');
        tasksDiv.className = 'tasks';
        const dayData = loadData(formatDate(startDate)) || {};
        Object.values(dayData).forEach(slot => {
            if (slot.task) {
                const taskSpan = document.createElement('span');
                taskSpan.textContent = slot.task;
                taskSpan.className = `task-${slot.status}`;
                tasksDiv.appendChild(taskSpan);
            }
        });
        dayElement.appendChild(tasksDiv);

        const addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'add-task-btn';
        addTaskBtn.textContent = '+';
        addTaskBtn.onclick = () => openAddTaskModal(startDate);
        dayElement.appendChild(addTaskBtn);

        monthlyCalendar.appendChild(dayElement);
        startDate.setDate(startDate.getDate() + 1);
    }

    updateMilestones();
}

function openAddTaskModal(date) {
    const modal = document.getElementById('add-task-modal');
    const dateInput = document.getElementById('task-date');
    dateInput.value = formatDate(date);
    modal.style.display = 'block';
}

function closeAddTaskModal() {
    const modal = document.getElementById('add-task-modal');
    modal.style.display = 'none';
}

function addTask() {
    const date = new Date(document.getElementById('task-date').value);
    const task = document.getElementById('task-input').value;
    const status = document.getElementById('task-status').value;

    if (task.trim() === '') return;

    const dayData = loadData(formatDate(date)) || {};
    const hour = Object.keys(dayData).length + 8; // Assign to the next available hour
    dayData[hour] = { task, status, objective: '', reflection: '', trainingAlignment: '' };
    saveData(formatDate(date), dayData);

    generateMonthlyCalendar(currentDate);
    closeAddTaskModal();
}

function updateMilestones() {
    const milestoneList = document.getElementById('milestone-list');
    const milestones = loadData('milestones') || [];
    milestoneList.innerHTML = '';
    milestones.forEach((milestone, index) => {
        const li = document.createElement('li');
        li.textContent = milestone;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMilestone(index);
        li.appendChild(deleteButton);
        milestoneList.appendChild(li);
    });
}

function addMilestone(milestone) {
    const milestones = loadData('milestones') || [];
    milestones.push(milestone);
    saveData('milestones', milestones);
    updateMilestones();
}

function deleteMilestone(index) {
    const milestones = loadData('milestones') || [];
    milestones.splice(index, 1);
    saveData('milestones', milestones);
    updateMilestones();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'daytt.html') {
        const selectedDate = document.getElementById('selected-date');
        const prevDay = document.getElementById('prev-day');
        const nextDay = document.getElementById('next-day');

        selectedDate.value = formatDate(currentDate);
        generateDailySchedule(currentDate);

        selectedDate.addEventListener('change', (e) => {
            currentDate = new Date(e.target.value);
            generateDailySchedule(currentDate);
        });

        prevDay.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            selectedDate.value = formatDate(currentDate);
            generateDailySchedule(currentDate);
        });

        nextDay.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            selectedDate.value = formatDate(currentDate);
            generateDailySchedule(currentDate);
        });
    } else if (currentPage === 'weektt.html') {
        const weekRange = document.getElementById('week-range');
        const prevWeek = document.getElementById('prev-week');
        const nextWeek = document.getElementById('next-week');

        weekRange.textContent = getWeekRange(currentDate);
        generateWeeklyOverview(currentDate);

        prevWeek.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7);
            weekRange.textContent = getWeekRange(currentDate);
            generateWeeklyOverview(currentDate);
        });

        nextWeek.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7);
            weekRange.textContent = getWeekRange(currentDate);
            generateWeeklyOverview(currentDate);
        });
    } else if (currentPage === 'monthtt.html') {
        const currentMonthYear = document.getElementById('current-month-year');
        const prevMonth = document.getElementById('prev-month');
        const nextMonth = document.getElementById('next-month');
        const addMilestoneForm = document.getElementById('add-milestone-form');

        currentMonthYear.textContent = getMonthYear(currentDate);
        generateMonthlyCalendar(currentDate);

        prevMonth.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            currentMonthYear.textContent = getMonthYear(currentDate);
            generateMonthlyCalendar(currentDate);
        });

        nextMonth.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            currentMonthYear.textContent = getMonthYear(currentDate);
            generateMonthlyCalendar(currentDate);
        });

        addMilestoneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newMilestone = document.getElementById('new-milestone');
            if (newMilestone.value.trim() !== '') {
                addMilestone(newMilestone.value.trim());
                newMilestone.value = '';
            }
        });

        const closeModalBtn = document.querySelector('#add-task-modal .close');
        closeModalBtn.addEventListener('click', closeAddTaskModal);

        const addTaskForm = document.getElementById('add-task-form');
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addTask();
        });
    }
});