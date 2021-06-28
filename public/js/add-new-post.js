const addPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const error = `<p>*Failed to create post</p>`;
            document.querySelector('.error-message').innerHTML = error;
        }
    } else {
        const titleRequirement = document.querySelector('#post-title').placeholder = 'A title is required.';
        const contentRequirement = document.querySelector('#post-content').placeholder = 'Content cannot be left empty.';

        if (!title && !content) {
            titleRequirement;
            contentRequirement
        } else if (!title) {
            titleRequirement;
        } else if (!content) {
            contentRequirement
        }
    }
};

document.querySelector('#post-button').addEventListener('click', addPostFormHandler);