const imageContainer = document.getElementById('image-container');
const loading = document.getElementById('loading-spinner');

let photosArray = [];

const count = 10;
const apiKey = config.unsplash_key;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	photosArray.forEach((photo) => {
		// Creating anchor tag
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		// Creating Image tag
		const image = document.createElement('img');
		setAttributes(image, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		item.appendChild(image);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {}
}

getPhotos();
