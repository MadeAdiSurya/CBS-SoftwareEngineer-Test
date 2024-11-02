async function checkStatus() {
  const urlInput = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  // Clear previous results
  resultDiv.innerHTML = "";

  if (!urlInput) {
    resultDiv.innerHTML =
      '<div class="alert alert-warning">Please enter a URL.</div>';
    return;
  }

  try {
    const response = await fetch(
      `https://YOUR_BACKEND_URL/status?url=${encodeURIComponent(urlInput)}`
    );
    const data = await response.json();

    if (data.status) {
      resultDiv.innerHTML = `<div class="alert alert-info">
                                      <strong>Status Code:</strong> ${data.status}<br>
                                      <strong>Message:</strong> ${data.message}
                                   </div>`;
    } else {
      resultDiv.innerHTML = `<div class="alert alert-danger"><strong>Error:</strong> ${data.error}</div>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<div class="alert alert-danger"><strong>Error:</strong> Unable to reach server.</div>`;
  }
}
