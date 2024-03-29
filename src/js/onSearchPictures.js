import axios from 'axios';
import Notiflix from 'notiflix';
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
      return pictures;
    } catch (error) {
      Notiflix.Notify.failure('Sorry, error!!!');
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
