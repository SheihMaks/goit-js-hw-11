import axios from 'axios';
import Notiflix from 'notiflix';
const BASE_URL = `https://pixabay.com/api/?key=27705684-ea6ff4282bc06d8fe5ddb5326`;
export async function onSearchPictures(userSearch) {
  const params = {
    q: `${userSearch}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
  };
  try {
    const pictures = await axios.get(BASE_URL, { params });
    return pictures;
  } catch (error) {
    Notiflix.Notify.failure('Sorry, error!!!');
  }
}
