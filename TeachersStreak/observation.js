document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'index.html';
    }

    const observationList = document.getElementById('observationList');
    const observationForm = document.getElementById('observationForm');

    // Populate observation list with sample data
    sampleData.observations.forEach(observation => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${observation.date}</h3>
            <p>${observation.notes}</p>
        `;
        observationList.appendChild(div);
    });

    // Handle new observation submission
    observationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('observationDate').value;
        const notes = document.getElementById('observationNotes').value;

        const newObservation = document.createElement('div');
        newObservation.innerHTML = `
            <h3>${date}</h3>
            <p>${notes}</p>
        `;
        observationList.appendChild(newObservation);

        // Reset form
        observationForm.reset();
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});