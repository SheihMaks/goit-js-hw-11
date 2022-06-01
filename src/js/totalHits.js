import Notiflix from 'notiflix';
export default function totalhits(pictures) {
  if (pictures.data.hits.length > 0) {
    Notiflix.Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`);
  }
  return;
}
