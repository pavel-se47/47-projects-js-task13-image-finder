export default class ImgApiService {
  constructor() {
    (this.searchQuery = ''), (this.page = 1);
  }

  fetchImages() {
    const BASE_URL = 'https://pixabay.com/api';

    const searchParams = new URLSearchParams({
      key: '30307738-59afbcdeb2729193aa806c9ae',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: 40,
    });

    const url = `${BASE_URL}/?${searchParams}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
