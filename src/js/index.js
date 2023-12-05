import { dogBreedsSelectElement } from './dom';
import { readLS } from './local-storage';
import { activateGenerateButton } from './random-images';
import { printDogBreeds } from './select';

printDogBreeds();
readLS();
dogBreedsSelectElement.addEventListener('change', activateGenerateButton);
