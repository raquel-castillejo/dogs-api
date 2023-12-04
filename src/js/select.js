import { dogBreedsSelectElement, dogSubBreedsSelectElement } from './dom';
import { fetchData } from './utils';

const fillSelect = (dogList, selectElement) => {
	const fragment = document.createDocumentFragment();

	dogList.forEach(breed => {
		const newBreedOption = document.createElement('option');
		newBreedOption.value = breed;
		newBreedOption.textContent = breed;

		fragment.append(newBreedOption);
	});

	selectElement.append(fragment);
};

export const printDogSubBreeds = subBreedsList => {
	const breedOptions = [...dogBreedsSelectElement.children];

	// resto 1 por el placeholder del select
	const selectedBreedIndex =
		breedOptions.findIndex(breed => breed.selected) - 1;
	const subBreeds = subBreedsList[selectedBreedIndex];

	dogSubBreedsSelectElement.textContent = '';
	if (subBreeds.length === 0) {
		dogSubBreedsSelectElement.classList.add('hidden');
	} else {
		dogSubBreedsSelectElement.classList.remove('hidden');

		if (subBreeds.length > 1) {
			const defaultSubBreedOption = document.createElement('option');
			defaultSubBreedOption.value = 'default';
			defaultSubBreedOption.textContent = 'select a sub-breed';
			defaultSubBreedOption.selected = true;
			defaultSubBreedOption.hidden = true;

			dogSubBreedsSelectElement.append(defaultSubBreedOption);
		}

		fillSelect(subBreeds, dogSubBreedsSelectElement);
	}
};

export const printDogBreeds = async () => {
	const dogBreedsObj = await fetchData('https://dog.ceo/api/breeds/list/all');
	const dogBreeds = Object.keys(dogBreedsObj.message);
	const dogSubBreeds = Object.values(dogBreedsObj.message);

	fillSelect(dogBreeds, dogBreedsSelectElement);

	dogBreedsSelectElement.addEventListener('change', () => {
		printDogSubBreeds(dogSubBreeds);
	});
};
