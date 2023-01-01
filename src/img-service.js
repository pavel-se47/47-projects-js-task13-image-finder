export default class ImgApiService {
  constructor() {
    (this.searchQuery = ''), (this.page = 1);
  }

  fetchImages() {
    const KEY = '30307738-59afbcdeb2729193aa806c9ae';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        // console.log(data.hits);
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
