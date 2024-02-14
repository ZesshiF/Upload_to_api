// Function to display the extracted text
function displayResult(text) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `<p>Extracted Text:</p><pre>${text}</pre>`;
}

// Add event listener to the form
document.addEventListener("DOMContentLoaded", function () {
    const pdfForm = document.querySelector("form");
    pdfForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const pdfFileInput = document.querySelector('input[name="pdfFile"]');
        const pdfFile = pdfFileInput.files[0];

        if (!pdfFile) {
            alert("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdfFile", pdfFile);

        fetch("/extract-text", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(extractedText => {
            displayResult(extractedText);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
