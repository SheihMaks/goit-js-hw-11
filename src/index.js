import './sass/main.scss';
import Notiflix from 'notiflix';
import { SearchPictures } from './onSearchPictures';
import markupPictureCard from './templates/markupPictureCard';
const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadButtonRef = document.querySelector('.load-more');
const searchPictures = new SearchPictures();
loadButtonRef.classList.add('hiden');

function onSubmitSearch(ev) {
  ev.preventDefault();
  galleryRef.innerHTML = '';
  searchPictures.searched = ev.target.elements.searchQuery.value.trim();
  if (!searchPictures.searched) {
    Notiflix.Notify.failure('Enter something for search!');
    return;
  }
  searchPictures.resetPage();
  searchPictures.onSearchPictures().then(pictures => {
    galleryRef.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits));
    totalhits(pictures);
    loadButtonRef.classList.remove('hiden');
  });
}

function onLoadBtnClick(ev) {
  ev.preventDefault();
  searchPictures.onSearchPictures().then(pictures => {
    galleryRef.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits)),
      inTheEndOfGallery(pictures);
  });
}

function totalhits(pictures) {
  if (pictures.data.hits.length > 0) {
    Notiflix.Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`);
  }
  return;
}

function inTheEndOfGallery(pictures) {
  if (searchPictures.page > pictures.data.totalHits / 200) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    loadButtonRef.classList.add('hiden');
  }
}

formRef.addEventListener('submit', onSubmitSearch);
loadButtonRef.addEventListener('click', onLoadBtnClick);
