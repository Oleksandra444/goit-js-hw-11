import axios from 'axios';
const API_KEY = '36915264-1bc99c0f230b228afa7d4d649';
const perPage = 40;
const BASE_URL = 'https://pixabay.com/api/';

export default class NewApiServices { 
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    getImage() {
        const url = `${BASE_URL}/?key=${API_KEY}&q=${encodeURIComponent(this.searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${this.page}`;

        return axios.get(url).then(response => {
            this.incrementPage();
            const data = response.data;
            return data.hits;
        });
    }
    
    incrementPage() { this.page += 1; }

    resetPage() { this.page = 1; }

    get query() { return this.searchQuery }
    
    set query(newQuery) { this.searchQuery = newQuery; }
}