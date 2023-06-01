import Notiflix from 'notiflix';
import axios from 'axios';
import './css/styles.css';

const API_KEY = '36915264-1bc99c0f230b228afa7d4d649';
const perPage = 40;
let page = 1;
let totalHits = 0;

const searchInput = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const galleryElement = document.getElementById('gallery');

searchForm.addEventListener('submit', async function(event) {
  event.preventDefault(); 
  await getImage();
});

loadMoreButton.addEventListener('click', async function() {
  page++;
  await getImage();
});

function getApiUrl(searchQuery, page) {
  const baseUrl = 'https://pixabay.com/api/';
  const queryParams = `?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
  return baseUrl + queryParams;
}

function clearGallery() {
  gallery.innerHTML = '';
}

function renderImageCard(image) {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';
  img.classList.add('img');

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes</b> <b>${image.likes}</b>`;

  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views</b> <b>${image.views}</b>`;

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments</b> <b>${image.comments}</b>`;

  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads</b> <b>${image.downloads}</b>`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  photoCard.appendChild(img);
  photoCard.appendChild(info);

  gallery.appendChild(photoCard);
}

async function getImage() {
  const searchQuery = searchInput.value;
  loadMoreButton.style.display = 'block';

  if (searchQuery) {
    try {
      const response = await axios.get(getApiUrl(searchQuery, page));
      const data = response.data;

       if (data.totalHits === 0) {
        showNotification('No images found');
        loadMoreButton.style.display = 'none';
      } else {
        totalHits = data.totalHits;
        clearGallery();
        data.hits.forEach(image => {
          renderImageCard(image);
        });
        galleryElement.scrollIntoView({ behavior: 'smooth' });
        if (page * perPage >= totalHits) {
          loadMoreButton.style.display = 'none';
          showNotification("We're sorry, but you've reached the end of search results.");
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  } else {
    showNotification('Empty search query');
  }
}

function showNotification(message) {
  Notiflix.Notify.info(message);
}