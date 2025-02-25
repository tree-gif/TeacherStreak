document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'index.html';
    }

    const forumPosts = document.getElementById('forumPosts');
    const forumPostForm = document.getElementById('forumPostForm');

    // Populate forum posts with sample data
    sampleData.forumPosts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Posted by: ${post.author}</small>
        `;
        forumPosts.appendChild(div);
    });

    // Handle new forum post submission
    forumPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const author = localStorage.getItem('username');

        const newPost = document.createElement('div');
        newPost.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <small>Posted by: ${author}</small>
        `;
        forumPosts.insertBefore(newPost, forumPosts.firstChild);

        // Reset form
        forumPostForm.reset();
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});