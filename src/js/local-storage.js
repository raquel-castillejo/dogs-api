import { LS } from './dom';
import { printFavImages } from './fav-images';
import { favouriteDogs } from './variants';

export const readLS = () => {
	const savedFavsLS = JSON.parse(LS.getItem('savedFavs'));
	if (!savedFavsLS) {
		LS.setItem('savedFavs', JSON.stringify(favouriteDogs));
	} else {
		favouriteDogs.length = 0;
		favouriteDogs.push(...savedFavsLS);
	}

	printFavImages();
};

export const updateLS = () => {
	LS.setItem('savedFavs', JSON.stringify(favouriteDogs));
	printFavImages();
};
