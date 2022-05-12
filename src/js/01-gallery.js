// Add imports above this line
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items';

// Change code below this line

console.log(galleryItems);

const divImgEl = document.querySelector('.gallery');

const makeGalleryItemMurkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
	`;
  })
  .join('');

divImgEl.insertAdjacentHTML('beforeend', makeGalleryItemMurkup);


let gallery = new SimpleLightbox('.gallery a', { captionsData:'alt', captionDelay: 250 });