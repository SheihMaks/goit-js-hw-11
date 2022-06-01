import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { SearchPictures } from './js/onSearchPictures';
import totalHits from './js/totalHits';
// import { observer } from './js/observer';
import markupPictureCard from './templates/markupPictureCard';
const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  orientirBuoy: document.querySelector('.observer_buoy'),
};

const searchPictures = new SearchPictures();
let lightbox = new SimpleLightbox('.gallery a');

function onSubmitSearch(ev) {
  ev.preventDefault();
  refs.gallery.innerHTML = '';
  searchPictures.searched = ev.target.elements.searchQuery.value.trim();
  if (!searchPictures.searched) {
    Notiflix.Notify.failure('Enter something for search!');
    return;
  }
  searchPictures.resetPage();
  searchPictures.onSearchPictures().then(pictures => {
    searchPictures.validationOfArray(pictures);
    refs.gallery.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits));
    lightbox.refresh();
    totalHits(pictures);
  });
}

function inTheEndOfGallery(pictures) {
  if (searchPictures.page > pictures.data.totalHits / searchPictures.per_page) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
}

refs.form.addEventListener('submit', onSubmitSearch);

const OnEntries = entries =>
  entries.forEach(entry => {
    if (entry.isIntersecting && searchPictures.searched !== '') {
      searchPictures.onSearchPictures().then(pictures => {
        refs.gallery.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits));
        lightbox.refresh();
        inTheEndOfGallery(pictures);
      });
    }
  });
const options = {
  rootmargin: '150px',
};
const observer = new IntersectionObserver(OnEntries, options);
observer.observe(refs.orientirBuoy);
