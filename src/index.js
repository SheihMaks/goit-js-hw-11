import './sass/main.scss';
import Notiflix from 'notiflix';
import { onSearchPictures } from './onSearchPictures';
import markupPictureCard from './templates/markupPictureCard';
const formRef = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
formRef.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(ev) {
  ev.preventDefault();
  galleryContainer.innerHTML = '';
  const userSearch = ev.target.elements.searchQuery.value.trim();
  if (!userSearch) {
    Notiflix.Notify.failure('Qui timide rogat docet negare');
    return;
  }
  onSearchPictures(userSearch)
    .then(searched => {
      if (searched.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      }
      const data = searched.data.hits;
      galleryContainer.insertAdjacentHTML('beforeend', markupPictureCard(data));
    })
    .catch(error => Notiflix.Notify.failure('Sorry, error!'));

  //   console.log(search);
}
