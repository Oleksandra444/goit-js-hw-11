import Notiflix from 'notiflix';
import './css/styles.css';
import NewApiServices from './new-api-service-2';

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer:document.querySelector('.gallery'),

}

const newApiService = new NewApiServices();

refs.searchForm.addEventListener('submit', onSearch);
function onSearch(event) { 
    event.preventDefault(); 
    newApiService.query = event.currentTarget.elements.searchQuery.value;

    if (newApiService.query === '') { 
        showNotification('Sorry, there was empty search query. Please try again.')
        return;
    }
    newApiService.resetPage;
    clearGalleryContainer();
    getImage();

}


function getImage() { 
    newApiService.getImage().then(images => {appendGalleryMarkup(images)})  
}
function appendGalleryMarkup(images) { 
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = images.hits[0].webformatURL;  
  img.alt = images.hits[0].tags;  
  img.loading = 'lazy';
  img.classList.add('img');
    
  const info = document.createElement('div');
  info.classList.add('info');

  const likes = document.createElement('p');
  likes.classList.add('info-item');
  likes.innerHTML = `<b>Likes</b> <b>${images.hits[0].likes}</b>`;  
  
  const views = document.createElement('p');
  views.classList.add('info-item');
  views.innerHTML = `<b>Views</b> <b>${images.hits[0].views}</b>`;  

  const comments = document.createElement('p');
  comments.classList.add('info-item');
  comments.innerHTML = `<b>Comments</b> <b>${images.hits[0].comments}</b>`;  
  
  const downloads = document.createElement('p');
  downloads.classList.add('info-item');
  downloads.innerHTML = `<b>Downloads</b> <b>${images.hits[0].downloads}</b>`;  
  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  photoCard.appendChild(img);
  photoCard.appendChild(info);

  refs.galleryContainer.appendChild(photoCard);
}

function clearGalleryContainer() { 
    refs.galleryContainer.innerHTML = '';
}















function showNotification(message) {
  Notiflix.Notify.info(message);
}
