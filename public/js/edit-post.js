const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post_id: id,
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const error = `<p>*Failed to edit post</p>`;
            document.querySelector('.error-message').innerHTML = error;
        }
    } else {
        const titleRequirement = document.querySelector('#post-title').placeholder = 'A title is required before adding a post';
        const contentRequirement = document.querySelector('#post-content').placeholder = 'Content cannot be left empty before adding a post';

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

document.querySelector('#edit-post-button').addEventListener('click', editPostFormHandler);