import { generateImgButtonElement } from './dom';
import { readLS } from './local-storage';
import { generateImage } from './random-images';
import { printDogBreeds } from './select';

printDogBreeds();
readLS();
generateImgButtonElement.addEventListener('click', generateImage);
