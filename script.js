const imageUrls = [
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/200" },
    { url: "https://via.placeholder.com/250" },
    { url: "https://via.placeholder.com/300" }
];

// Function to download a single image
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    });
}

// Function to download all images using Promise.all
function downloadImages(images) {
    const downloadPromises = images.map(downloadImage);
    return Promise.all(downloadPromises);
}

// Function to handle button click
document.getElementById('download-images-button').addEventListener('click', () => {
    downloadImages(imageUrls)
        .then(images => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = ''; // Clear previous images
            images.forEach(img => {
                document.getElementById('output').appendChild(img);
            });
        })
        .catch(error => {
            console.error(error.message);
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = error.message; // Display error message
        });
});
