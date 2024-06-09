chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "open_popup") {
        const productReviews = request.reviews;
        const productUrl = request.productUrl; // Assuming productUrl is also passed in the request

        //https://chewienaria-roberta-sentimentanalysis.hf.space/analyze_reviews // hostedOnline
        //http://127.0.0.1:5000/analyze_reviews // localHost
        fetch('https://chewienaria-roberta-sentimentanalysis.hf.space/analyze_reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reviews: productReviews })
        })
        .then(response => response.json())
        .then(data => {
            // Store both productReviews and analysisResults
            chrome.storage.local.set({ 
                analysisResults: data,
                productReviews: productReviews,
                productUrl: productUrl // Storing productUrl as well
            }, function() {
                chrome.tabs.create({ url: "popup2Big.html" });
            });
        })
        .catch(error => console.error('Error:', error));
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Check if the message contains reviews data
    if (message.reviews) {
        //console.log("Received reviews data:", message.reviews);
        const messageReviews = JSON.parse(message.reviews);

        //https://chewienaria-roberta-sentimentanalysis.hf.space/analyze_reviews //hostedOnline
        //http://127.0.0.1:5000/analyze_reviews // localHost
        fetch('https://chewienaria-roberta-sentimentanalysis.hf.space/analyze_reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reviews: messageReviews })
        })
        .then(response => response.json())
        .then(data => {
            // Store both productReviews and analysisResults
            chrome.storage.local.set({ 
                analysisResults2: data,
                messageReviews: messageReviews,
            },
        );
        chrome.runtime.sendMessage({action: "done"});
        })
        .catch(error => console.error('Error:', error));
    }
});