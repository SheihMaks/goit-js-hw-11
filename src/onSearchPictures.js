import axios from 'axios';
import Notiflix from 'notiflix';
// import { render } from 'sass';
const URL = `https://pixabay.com/api/?key=27705684-ea6ff4282bc06d8fe5ddb5326`;
export class SearchPictures {
  constructor() {
    this.userSearch = '';
    this.page = 1;
  }
  async onSearchPictures() {
    const params = {
      q: `${this.userSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: `${this.page}`,
    };
    try {
      const pictures = await axios.get(URL, { params });
      console.log(pictures.data.hits.length);
      if (pictures.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      this.incrementPage();
      return pictures;
    } catch (error) {
      Notiflix.Notify.failure('Sorry, error!!!');
    }
  }
  totalhits(pictures) {
    if (pictures.data.hits.length > 0) {
      Notiflix.Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`);
    }
    return;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get searched() {
    return this.userSearch;
  }
  set searched(newUserSearch) {
    this.userSearch = newUserSearch;
  }
}
