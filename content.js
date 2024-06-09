let textContent = document.body.innerText;

if (textContent.includes("Musical Instrument")) {
  const currentUrl = window.location.href;
  const regex = /Verified Purchase\n([\s\S]+?)(Helpful|One person found this helpful|Two person found this helpful|2 people found this helpful|3 people found this helpful|4 people found this helpful|5 people found this helpful|people found this helpful|Read more|Report|$)/g;
  let match;
  let matches = [];
  while ((match = regex.exec(textContent)) !== null) {
    matches.push(match[1]);
  }
  
  if (matches.length > 0) {
    matches.forEach((review, index) => {
    });
    chrome.runtime.sendMessage({action: "open_popup", productUrl: currentUrl, reviews: matches});
  } else {
    console.log("No Reviews Found.");
  }
}