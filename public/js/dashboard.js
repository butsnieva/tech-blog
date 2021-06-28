async function mouseOverHandler () {
    this.querySelector('.subtext').setAttribute('class', 'subtext display');
}

async function mouseOutHandler () {
    this.querySelector('.subtext').setAttribute('class', 'subtext no-display');
}

// When the user hovers over a post in the dashboard, the text "Edit post" will be displayed
document.querySelectorAll('.dashboard-button').forEach(item => {
    item.addEventListener('mouseover', mouseOverHandler);
    item.addEventListener('mouseout', mouseOutHandler);
});