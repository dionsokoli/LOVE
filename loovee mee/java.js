const noButton = document.getElementById('runaway-btn');

function escape() {
    // 1. Force the button to fixed positioning the moment it's touched
    if (noButton.style.position !== 'fixed') {
        noButton.style.position = 'fixed';
    }

    // 2. The Safety Buffer (Margin from screen edges)
    const margin = 30; 

    // 3. Get exact dimensions of the button and the window
    const btnRect = noButton.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // 4. Calculate the 'Travel Range' (Total Screen - Component Size - Margin)
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;

    // 5. Generate coordinates restricted to the 'Safe Zone'
    // This math ensures the value never goes below 'margin' or above 'max'
    let newX = Math.floor(Math.random() * (maxX - margin)) + margin;
    let newY = Math.floor(Math.random() * (maxY - margin)) + margin;

    // 6. Final Clamp (The 'Software Limit Switches')
    // This prevents any rounding errors from pushing it off-screen
    newX = Math.min(Math.max(newX, margin), maxX);
    newY = Math.min(Math.max(newY, margin), maxY);

    // 7. Apply the clean pixel coordinates
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
}

function showLove() {
    // Hide original elements
    const video = document.getElementById('myVideo');
    if (video) video.style.display = 'none';
    
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('answer-screen').classList.remove('hidden');
    
    // Change Background (Change 'image.jpg' to your file name)
    document.body.style.background = "url('image.jpg') no-repeat center center/cover";
    
    // Safety: Remove the runaway button from the DOM
    noButton.remove();
}

// Event Listeners
noButton.addEventListener('mouseover', escape);
noButton.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    escape(); 
});