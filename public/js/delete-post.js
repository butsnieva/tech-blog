const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        const error = `<p>*Failed to delete post</p>`;
        document.querySelector('.error-message').innerHTML = error;
    }
};

document.querySelector('#delete-post-button').addEventListener('click', deletePostFormHandler);