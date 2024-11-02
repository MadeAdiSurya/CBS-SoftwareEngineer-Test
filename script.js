async function checkStatus() {
  const urlInput = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  // Clear previous result
  resultDiv.innerHTML = "";

  // Check if the URL input is empty
  if (!urlInput) {
    resultDiv.innerHTML = `<div class="alert alert-warning">Please enter a URL.</div>`;
    return;
  }

  try {
    // Fetch the status of the URL from the API Gateway endpoint
    const response = await fetch(
      `https://dnc6vzioh6.execute-api.ap-southeast-3.amazonaws.com/prod/status?url=${encodeURIComponent(
        urlInput
      )}`
    );

    // Parse the JSON response
    const data = await response.json();

    // Display the result based on the API response
    if (data.status) {
      resultDiv.innerHTML = `<div class="alert alert-success">Status Code: ${data.status}<br>${data.message}</div>`;
    } else {
      resultDiv.innerHTML = `<div class="alert alert-danger">Error: ${data.error}</div>`;
    }
  } catch (error) {
    // Display an error message if there is an issue with the fetch request
    resultDiv.innerHTML = `<div class="alert alert-danger">Error: Unable to reach the server.</div>`;
  }
}
