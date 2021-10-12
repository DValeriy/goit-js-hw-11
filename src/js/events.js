const axios = require('axios');
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { baseUrl, apiKey } from '../json/config.json';
import { nodes, showImages } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {});
let searchText;
let page = 1;
let limit = 40;
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
  const response = await axios(`?${params.toString()}`);

  if (response.status >= 200 && response.status <= 300) {
    totalPages = Math.ceil(response.data.totalHits / limit);
    return response.data;
  }
  return Promise.reject('error');
};

nodes.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchText = nodes.inputSearchForm.value.trim();
  page = 1;
  if (!searchText) {
    nodes.galleryNode.innerHTML = '';
    return false;
  } else {
    const { totalHits, hits } = await getDataServer(searchText);
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
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
});
