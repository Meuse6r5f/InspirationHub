const quoteElement = document.getElementById('quote');
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', fetchNewQuote);

function fetchNewQuote() {
  quoteElement.textContent = 'Loading...';

  fetch("https://api.quotable.io/random")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      quoteElement.textContent = data.content;
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error);
      quoteElement.textContent = 'Failed to fetch a new quote.';
    });
}

fetchNewQuote();