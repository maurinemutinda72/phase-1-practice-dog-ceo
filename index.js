document.addEventListener("DOMContentLoaded", () => {
    // API URLs
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // DOM Elements
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    // Fetch and Render Images
    function fetchAndRenderImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                const images = data.message;
                images.forEach(imageUrl => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = "Dog Image";
                    img.style.width = "200px"; // Optional styling
                    imageContainer.appendChild(img);
                });
            });
    }

    // Fetch and Render Breeds
    function fetchAndRenderBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = data.message;
                renderBreedList(breeds);
            });
    }

    // Render Breeds to <ul>
    function renderBreedList(breeds) {
        breedList.innerHTML = ""; // Clear the list
        Object.keys(breeds).forEach(breed => {
            const li = document.createElement("li");
            li.innerText = breed;
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change font color on click
            });
            breedList.appendChild(li);
        });
    }

    // Filter Breeds by Selected Letter
    function filterBreeds(letter) {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = data.message;
                const filteredBreeds = Object.keys(breeds).filter(breed => breed.startsWith(letter));
                renderBreedList(filteredBreeds.reduce((acc, breed) => {
                    acc[breed] = breeds[breed];
                    return acc;
                }, {}));
            });
    }

    // Event Listener for Dropdown
    breedDropdown.addEventListener("change", (e) => {
        const selectedLetter = e.target.value;
        filterBreeds(selectedLetter);
    });

    // Initialize the Page
    fetchAndRenderImages();
    fetchAndRenderBreeds();
});
