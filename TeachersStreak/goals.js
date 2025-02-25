document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'index.html';
    }

    const goalList = document.getElementById('goalList');
    const goalForm = document.getElementById('goalForm');

    // Populate goal list with sample data
    sampleData.goals.forEach(goal => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description}</p>
            <p>Due: ${goal.dueDate}</p>
            <p>Progress: ${goal.progress}%</p>
        `;
        goalList.appendChild(div);
    });

    // Handle new goal submission
    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('goalTitle').value;
        const description = document.getElementById('goalDescription').value;
        const dueDate = document.getElementById('goalDueDate').value;

        const newGoal = document.createElement('div');
        newGoal.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Due: ${dueDate}</p>
            <p>Progress: 0%</p>
        `;
        goalList.appendChild(newGoal);

        // Reset form
        goalForm.reset();
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});