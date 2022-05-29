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
  searchPictures.resetPage();
  searchPictures.searched = ev.target.elements.searchQuery.value.trim();
  if (!searchPictures.searched) {
    Notiflix.Notify.failure('Qui timide rogat docet negare');
    return;
  }
  searchPictures
    .onSearchPictures()
    .then(
      pictures => galleryRef.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits)),
      loadButtonRef.classList.remove('hiden'),
    );
}

function onLoadBtnClick(ev) {
  ev.preventDefault();
  searchPictures
    .onSearchPictures()
    .then(pictures =>
      galleryRef.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits)),
    );
}
formRef.addEventListener('submit', onSubmitSearch);
loadButtonRef.addEventListener('click', onLoadBtnClick);
