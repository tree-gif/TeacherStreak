document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'index.html';
    }

    // Performance Over Time Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Performance Score',
                data: [65, 70, 75, 72, 78, 82],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Goal Completion Rate Chart
    const goalCompletionCtx = document.getElementById('goalCompletionChart').getContext('2d');
    new Chart(goalCompletionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384']
            }]
        },
        options: {
            responsive: true
        }
    });

    // Student Outcome Correlation Chart
    const studentOutcomeCtx = document.getElementById('studentOutcomeChart').getContext('2d');
    new Chart(studentOutcomeCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Teacher Performance vs Student Outcomes',
                data: [
                    {x: 65, y: 75},
                    {x: 70, y: 78},
                    {x: 75, y: 80},
                    {x: 72, y: 79},
                    {x: 78, y: 83},
                    {x: 82, y: 85}
                ],
                backgroundColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Teacher Performance'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Student Outcomes'
                    }
                }
            }
        }
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});