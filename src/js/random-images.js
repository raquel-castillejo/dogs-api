import {
	addToFavImagesButton,
	dogBreedsSelectElement,
	dogImageElement,
	dogSubBreedsSelectElement,
	generateImgButtonElement
} from './dom';
import { saveFavImage } from './fav-images';
import { fetchData } from './utils';

const getImageSrc = async (breed, subBreed) => {
	if (breed === 'default') return;
	let getImage;

	if (subBreed === '' || subBreed === 'default') {
		getImage = await fetchData(
			`https://dog.ceo/api/breed/${breed}/images/random`
		);
	} else {
		getImage = await fetchData(
			`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
		);
	}

	return getImage.message;
};

export const generateImage = async () => {
	const selectedBreed = dogBreedsSelectElement.value;
	const selectedSubBreed = dogSubBreedsSelectElement.value;

	const imageSrc = await getImageSrc(selectedBreed, selectedSubBreed);

	if (imageSrc) {
		dogImageElement.src = imageSrc;
		dogImageElement.classList.remove('hidden');

		addToFavImagesButton.classList.remove('hidden');
	}

	addToFavImagesButton.addEventListener('click', saveFavImage);
};

export const activateGenerateButton = () => {
	generateImgButtonElement.disabled = false;
	generateImgButtonElement.addEventListener('click', generateImage);
};
