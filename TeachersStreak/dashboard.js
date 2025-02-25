document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'index.html';
    }

    const teacherName = document.getElementById('teacherName');
    const recentFeedback = document.getElementById('recentFeedback');
    const goalProgress = document.getElementById('goalProgress');
    const upcomingObservations = document.getElementById('upcomingObservations');
    const recommendedLearning = document.getElementById('recommendedLearning');

    teacherName.textContent = localStorage.getItem('username');

    // Populate dashboard with sample data
    sampleData.recentFeedback.forEach(feedback => {
        const li = document.createElement('li');
        li.textContent = feedback;
        recentFeedback.appendChild(li);
    });

    sampleData.goals.forEach(goal => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${goal.title}</strong>: ${goal.progress}%`;
        goalProgress.appendChild(div);
    });

    sampleData.upcomingObservations.forEach(observation => {
        const li = document.createElement('li');
        li.textContent = `${observation.date}: ${observation.observer}`;
        upcomingObservations.appendChild(li);
    });

    sampleData.recommendedLearning.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        recommendedLearning.appendChild(li);
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});