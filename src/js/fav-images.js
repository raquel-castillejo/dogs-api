import { dogFavImgsContainerElement, dogImageElement } from './dom';
import { updateLS } from './local-storage';
import { favouriteDogs } from './variants';

const deleteFavImage = i => {
	favouriteDogs.splice(i, 1);
	updateLS();
};

const addDeleteEvent = () => {
	const deleteItems = [...document.querySelectorAll('.dog-images__delete-fav')];
	deleteItems.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			deleteFavImage(index);
		});
	});
};

export const printFavImages = () => {
	const fragment = document.createDocumentFragment();

	dogFavImgsContainerElement.textContent = '';
	favouriteDogs.forEach(fav => {
		const newFavImageContainer = document.createElement('div');
		newFavImageContainer.classList.add('dog-images__single-fav');

		const deleteFavImage = document.createElement('button');
		deleteFavImage.textContent = 'x';
		deleteFavImage.classList.add('dog-images__delete-fav');
		/* 
		// esto no me funciona, apaño más abajo
		deleteFavImage.addEventListener('click', () => {
			deleteFavImage(index);
		}); 
		*/

		const newFavImage = document.createElement('img');
		newFavImage.src = fav;
		newFavImage.classList.add('dog-images__img-fav');

		newFavImageContainer.append(deleteFavImage);
		newFavImageContainer.append(newFavImage);
		fragment.append(newFavImageContainer);
	});
	dogFavImgsContainerElement.append(fragment);

	addDeleteEvent();
};

export const saveFavImage = async () => {
	const imgSrc = dogImageElement.src;
	favouriteDogs.push(imgSrc);

	alert('Image saved to favourites.');
	updateLS();
};
