// const axios = require('axios');
// import { baseUrl, apiKey } from '../json/config.json';
// // import SimpleLightbox from 'simplelightbox';
// // import 'simplelightbox/dist/simple-lightbox.min.css';
// export let page = 1;
// let limit = 40;
// export const totalPages = Math.ceil(500 / limit);

// export const getDataServer = async searchText => {
//   axios.defaults.baseURL = baseUrl;
//   const config = {};

//   config.key = '23806405-99649229521d5b9443986f071';
//   config.image_type = 'photo';
//   config.orientation = 'horizontal';
//   config.safesearch = 'true';
//   config.q = searchText;
//   config.per_page = 40;
//   config.page = 1;
//   page += 1;
//   const params = new URLSearchParams(config);
//   // how do await
//   return await axios(`?${params.toString()}`)
//     .then(response => {
//       if (response.status >= 200 && response.status <= 300) return response.data.hits;
//       return Promise.reject('error');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
