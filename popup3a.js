document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the analyze button
    document.getElementById('analyze-button').addEventListener('click', function() {
        // Save input text to localStorage
        saveReviewsToLocalStorage();
        // Send reviews data to background script
        chrome.runtime.sendMessage({ reviews: localStorage.getItem('reviews') });
    });

    document.getElementById('see-previous').addEventListener('click', function() {
        window.location.href = 'popup3b.html';
    });
  
    // Event listener for the back to main page button
    document.getElementById('backMain-button').addEventListener('click', function() {
        // Redirect to popup.html
        window.location.href = 'popup.html';
    });
  
    // Function to save input text to localStorage
    function saveReviewsToLocalStorage() {
        var reviewTextbox = document.getElementById('review-textbox');
        // Split the text by new line and remove empty lines
        var reviews = reviewTextbox.value.split('\n').filter(function(review) {
            return review.trim() !== '';
        });
        // Store the reviews array in localStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
});

// Listen for the "done" message from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "done") {
        // Redirect to popup3b.html after receiving the "done" message
        window.location.href = 'popup3b.html';
    }
});
