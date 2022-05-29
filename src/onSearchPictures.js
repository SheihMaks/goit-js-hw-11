import axios from 'axios';
import Notiflix from 'notiflix';
// import { render } from 'sass';
const URL = `https://pixabay.com/api/?key=27705684-ea6ff4282bc06d8fe5ddb5326`;
export class SearchPictures {
  constructor() {
    this.userSearch = '';
    this.page = 0;
    this.per_page = 40;
  }
  async onSearchPictures() {
    this.incrementPage();
    const params = {
      q: `${this.userSearch}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${this.per_page}`,
      page: `${this.page}`,
    };
    try {
      const pictures = await axios.get(URL, { params });
      this.validationOfArray(pictures);
      return pictures;
    } catch (error) {
      Notiflix.Notify.failure('Sorry, error!!!');
    }
  }
  validationOfArray(pictures) {
    if (pictures.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 0;
  }
  get searched() {
    return this.userSearch;
  }
  set searched(newUserSearch) {
    this.userSearch = newUserSearch;
  }
}
