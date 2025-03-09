fetch('https://data.gov.au/api/3/action/package_search?q=&rows=100')
  .then(response => response.json())
  .then(data => {
    const randomDataset = data.result.results[Math.floor(Math.random() * data.result.results.length)];
    displayDataset(randomDataset);
  });

function displayDataset(dataset) {
  const datasetLink = `https://data.gov.au/search?q=${dataset.title}`;
  const datasetTitle = dataset.title;
  const datasetDescription = dataset.notes || 'No description available';

  document.getElementById('dataset').innerHTML = `
    <a href="${datasetLink}" target="_blank" title="${datasetDescription}" class="dataset-link">${datasetTitle}</a>
  `;
}
