import axios from 'axios';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { baseUrl, apiKey } from '../json/config.json';
import { nodes, showImages } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
let searchText;
let page = 1;
let limit = 20;
let totalPages = 0;

nodes.loadMoreNode.classList.add('hidden');

const getDataServer = async search => {
  axios.defaults.baseURL = baseUrl;
  const config = {};
  config.key = '23806405-99649229521d5b9443986f071';
  config.image_type = 'photo';
  config.orientation = 'horizontal';
  config.safesearch = 'true';
  config.q = search;
  config.per_page = limit;
  config.page = page;
  page += 1;
  const params = new URLSearchParams(config);
  // how do await
  try {
    const response = await axios.get(`?${params.toString()}`);
    if (response.status >= 200 && response.status < 300) {
      totalPages = Math.ceil(response.data.totalHits / limit);
      return response.data;
    }
    throw 'error';
  } catch (err) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return false;
  }
};

nodes.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  nodes.galleryNode.innerHTML = '';
  searchText = nodes.inputSearchForm.value.trim();
  page = 1;
  if (!searchText) {
    return false;
  } else {
    const data = await getDataServer(searchText);
    if (!data) return false;
    const { hits, totalHits } = data;
    if (hits.length) {
      nodes.galleryNode.innerHTML = '';
      showImages(hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      lightbox.refresh();
      if (page > totalPages) nodes.loadMoreNode.classList.add('hidden');
      else nodes.loadMoreNode.classList.remove('hidden');
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
  }
});

nodes.loadMoreNode.addEventListener('click', async e => {
  const { hits } = await getDataServer(searchText);
  if (hits.length) {
    showImages(hits);
  }
  if (page >= totalPages) {
    lightbox.refresh();
    page = 1;
    nodes.loadMoreNode.classList.add('hidden');
    return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
});

// for future work
// const { height = 2 } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
// console.log(height);
// window.scrollBy({
//   top: document.querySelector('.gallery').offsetHeight,
//   behavior: 'smooth',
// });
