const imageUrls = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
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
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('download-images-button').addEventListener('click', () => {
        downloadImages(imageUrls)
            .then(images => {
                const outputDiv = document.getElementById('output');
                outputDiv.innerHTML = ''; // Clear previous images
                images.forEach(img => {
                    outputDiv.appendChild(img);
                });
            })
            .catch(error => {
                console.error(error.message);
                const outputDiv = document.getElementById('output');
                outputDiv.innerHTML = error.message; // Display error message
            });
    });
});
