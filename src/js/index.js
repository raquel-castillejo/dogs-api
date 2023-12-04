/*
    - ✅ Crea un select vacío en tu HTML
    - ✅ Rellena las opciones con una petición de razas a la API
    - ✅ Si la raza tiene subrazas, deberá aparecer un segundo select con la lista de subrazas.
    - ✅ En el caso de que sólo tenga una subraza, aparecerá directamente seleccionada en el segundo select, si tuviera más de una subraza en el select aparecerá como primera opción "seleccione una subraza" y al desplegar veremos el resto de subrazas.
    - Añade un botón en el HTML que te permita generar una foto random de un perro de la raza que hayas seleccionado.
    - Añade un botón a cada imagen que te permita guardarla como favorita en el LocalStorage
    - Las imágenes favoritas siempre se mostrarán en la web y tendrán un botón de "quitar favorito" lo cual la eliminará del LocalStorage
*/

// DOM
// ===
const mainElement = document.getElementById('main');
const dogBreedsSelectElement = document.getElementById('dog-breeds-select');
const dogSubBreedSelect = document.createElement('select');

// API
// ===

const fetchData = async url => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const generateImage = (breed, subbreed) => {
	const breedOptions = [...dogBreedsSelectElement.children];
	const selectedBreed = breedOptions.find(breed => breed.selected).value;

	const subBreedOptions = [...dogSubBreedSelect.children];
	let selectedSubBreed;

	if (subBreedOptions.length > 0) {
		selectedSubBreed = subBreedOptions.find(
			subBreed => subBreed.selected
		).value;
	}

	console.log(selectedBreed);
	console.log(selectedSubBreed);
};

/*
// meter los select en un div para agruparlos
// añadir el boton directamente en el html
// colocarlo al final con css

const addGenerateImageButton = () => {
	const generateDogImageBtn = document.createElement('button');
	generateDogImageBtn.textContent = 'Generate dog image';
	mainElement.append(generateDogImageBtn);
};
*/

const printDogSubBreeds = subBreedsList => {
	const breedOptions = [...dogBreedsSelectElement.children];

	// resto 1 por el placeholder del select
	const selectedBreedIndex =
		breedOptions.findIndex(breed => breed.selected) - 1;
	const subBreeds = subBreedsList[selectedBreedIndex];

	dogSubBreedSelect.textContent = '';
	if (subBreeds.length === 0) {
		console.log('NO SUBRAZA');
	} else {
		const fragment = document.createDocumentFragment();

		if (subBreeds.length > 1) {
			const defaultSubBreedOption = document.createElement('option');
			defaultSubBreedOption.value = 'default';
			defaultSubBreedOption.textContent = 'select a sub-breed';
			defaultSubBreedOption.selected = true;
			defaultSubBreedOption.hidden = true;

			fragment.append(defaultSubBreedOption);
		}

		subBreeds.forEach(subBreed => {
			const newSubBreedOption = document.createElement('option');
			newSubBreedOption.value = subBreed;
			newSubBreedOption.textContent = subBreed;

			fragment.append(newSubBreedOption);
		});

		dogSubBreedSelect.append(fragment);
		mainElement.append(dogSubBreedSelect);
	}

	// dogSubBreedSelect.addEventListener('input', () => {generateDogImage(selectedBreed, )});
};

const printDogBreeds = async () => {
	const dogBreedsObj = await fetchData('https://dog.ceo/api/breeds/list/all');
	const dogBreeds = Object.keys(dogBreedsObj.message);
	const dogSubBreeds = Object.values(dogBreedsObj.message);

	const fragment = document.createDocumentFragment();
	dogBreeds.forEach(breed => {
		const newBreedOption = document.createElement('option');
		newBreedOption.value = breed;
		newBreedOption.textContent = breed;

		fragment.append(newBreedOption);
	});

	dogBreedsSelectElement.append(fragment);

	dogBreedsSelectElement.addEventListener('input', () => {
		printDogSubBreeds(dogSubBreeds);
		addGenerateImageButton();
	});
};
printDogBreeds();
