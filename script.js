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
    let data = await response.json();

    // If data is wrapped in a 'body' field as a string, parse it again
    if (typeof data.body === "string") {
      data = JSON.parse(data.body);
    }

    // Display the result based on the API response
    if (data.status && data.message) {
      resultDiv.innerHTML = `<div class="alert alert-success">Status Code: ${data.status}<br>${data.message}</div>`;
    } else if (data.error) {
      resultDiv.innerHTML = `<div class="alert alert-danger">Error: ${data.error}</div>`;
    } else {
      resultDiv.innerHTML = `<div class="alert alert-danger">Error: Unexpected response format.</div>`;
    }
  } catch (error) {
    // Display an error message if there is an issue with the fetch request
    resultDiv.innerHTML = `<div class="alert alert-danger">Error: Unable to reach the server.</div>`;
  }
}
