const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment').value.trim();

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to add comment.');
        document
            .querySelector('.comment-form')
            .style.display = 'block'; 
    }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);