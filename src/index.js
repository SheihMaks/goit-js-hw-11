import './sass/main.scss';
import Notiflix from 'notiflix';
import { onSearchPictures } from './onSearchPictures';
const formRef = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
formRef.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(ev) {
  ev.preventDefault();
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
    })
    .catch(error => Notiflix.Notify.failure('Sorry, error!'));

  //   console.log(search);
}
