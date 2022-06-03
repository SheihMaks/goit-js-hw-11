import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { SearchPictures } from './js/onSearchPictures';
import totalHits from './js/totalHits';
import markupPictureCard from './templates/markupPictureCard';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  orientirBuoy: document.querySelector('.observer_buoy'),
};

let observer = null;
let lightbox = new SimpleLightbox('.gallery a');
const searchPictures = new SearchPictures();

function onSubmitSearch(ev) {
  ev.preventDefault();
  refs.gallery.innerHTML = '';
  searchPictures.searched = ev.target.elements.searchQuery.value.trim();
  if (!searchPictures.searched) {
    Notiflix.Notify.failure('Enter something for search!');
    return;
  }
  if (observer) {
    observer.unobserve(refs.orientirBuoy);
  }
  searchPictures.resetPage();
  searchPictures.onSearchPictures().then(pictures => {
    validationOfArray(pictures);
    refs.gallery.insertAdjacentHTML('beforeend', markupPictureCard(pictures.data.hits));
    registrationObserver();
    lightbox.refresh();
    totalHits(pictures);
  });
}

const validationOfArray = pictures => {
  if (pictures.data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }
};

function inTheEndOfGallery(pictures) {
  if (
    searchPictures.page > pictures.data.totalHits / searchPictures.per_page &&
    pictures.data.hits.length !== 0
  ) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
}

function registrationObserver() {
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

  observer = new IntersectionObserver(OnEntries, options);
  observer.observe(refs.orientirBuoy);
}

refs.form.addEventListener('submit', onSubmitSearch);
