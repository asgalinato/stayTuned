var backButton = document.getElementById('back-button');
var contentContainer = document.getElementById('content-container');

function goBack() {
    window.location.href = "popup.html";
}

function showReviews(productReviews, analysisResults) {
    var htmlContent = `
    <div class="default-text-font popup2">
    <div class="reviews-text25"> </div>
    `;
    var totalPositive = 0;
    var totalNegative = 0;
    var totalNeutral = 0;

    console.log(productReviews);
    productReviews.forEach((review, index) => {
        var sentiment = analysisResults[index];
        var sentimentText = '';
        var sentimentEmoji = '';

        // Determine sentiment text and emoji
        if (sentiment.Positive > sentiment.Negative && sentiment.Positive > sentiment.Neutral) {
            sentimentText = 'Positive';
            sentimentEmoji = '&#x1F60A;'; // Smiling face emoji
        } else if (sentiment.Negative > sentiment.Positive && sentiment.Negative > sentiment.Neutral) {
            sentimentText = 'Negative';
            sentimentEmoji = '&#x1F61E;'; // Disappointed face emoji
        } else {
            sentimentText = 'Neutral';
            sentimentEmoji = '&#x1F610;'; // Neutral face emoji
        }

        // Add sentiment scores to total
        totalPositive += sentiment.Positive;
        totalNegative += sentiment.Negative;
        totalNeutral += sentiment.Neutral;

        htmlContent += `
        <div class = reviews-container>
            <p class = reviews-text><strong>Review ${index + 1}</strong>:</p>
            <p class = reviews-text>"${review}"</p>
            <p class="reviews-text">Positive Feedback Rate: <strong>${(sentiment.Positive * 100).toFixed(2)}%</strong></p>
            <p class="reviews-text">Negative Feedback Rate: <strong>${(sentiment.Negative * 100).toFixed(2)}%</strong></p>
            <p class="reviews-text">Neutral Feedback Rate: <strong>${(sentiment.Neutral * 100).toFixed(2)}%</strong></p>
            <p class="reviews-text4">Sentiment: <strong>${sentimentText} ${sentimentEmoji}</strong></p>
        <div/>
        `;
    });

    // Calculate average sentiment scores
    var avgPositive = totalPositive / analysisResults.length;
    var avgNegative = totalNegative / analysisResults.length;
    var avgNeutral = totalNeutral / analysisResults.length;

    // Determine overall sentiment text and emoji
    var overallSentimentEmojiPositive = '';
    var overallSentimentEmojiNegative = '';
    var overallSentimentEmojiNeutral = '';
    var overallSentimentScore = Math.max(avgPositive, avgNegative, avgNeutral);

    if (overallSentimentScore === avgPositive) {
        overallSentimentEmojiPositive = '&#8226 Great news! Most people liked this product &#x1F60A;'; // Smiling face emoji
    } else if (overallSentimentScore === avgNegative) {
        overallSentimentEmojiNegative = '&#8226 Unfortunately, most people didn\'t like this product &#x1F61E;'; // Disappointed face emoji
    } else {
        overallSentimentEmojiNeutral = '&#8226 This product received mixed reviews &#x1F610;'; // Neutral face emoji
    }

    htmlContent += `
    </div>
    <div>
    <p class = overall-big><strong>Overall Sentiment Scores:</strong></p>
    <p class = overall-big>Positive: <strong>${(avgPositive * 100).toFixed(2)}% ${overallSentimentEmojiPositive}</strong></p>
    <p class = overall-big>Negative: <strong>${(avgNegative * 100).toFixed(2)}% ${overallSentimentEmojiNegative}</strong></p>
    <p class = overall-big>Neutral: <strong>${(avgNeutral * 100).toFixed(2)}% ${overallSentimentEmojiNeutral}</strong></p>
    </div>
    `;
    contentContainer.innerHTML = htmlContent;
}

function noReviews() {
    var htmlContent = `
    <div>
        <p>Kindly input your reviews into the provided textbox. The extension will analyze them automatically.</p>
    </div>
    `;
    contentContainer.innerHTML = htmlContent;
}

function initializePopup() {
    chrome.storage.local.get(['messageReviews', 'analysisResults2'], function(result) {
        const productReviews = result.messageReviews;
        const analysisResults = result.analysisResults2;
        console.log(productReviews)

        if (productReviews && productReviews.length > 0 && analysisResults && analysisResults.length > 0) {
            showReviews(productReviews, analysisResults);
        } else {
            noReviews();
        }
    });
}

backButton.addEventListener('click', goBack);

document.addEventListener('DOMContentLoaded', initializePopup);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (message.reviews) {
        initializePopup();
    }
});