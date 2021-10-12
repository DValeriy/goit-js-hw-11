export const nodes = {
  galleryNode: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  inputSearchForm: document.querySelector('#search-form input'),
  likesNode: document.querySelectorAll('.info-item')[0],
  viewsNode: document.querySelectorAll('.info-item')[1],
  commentsNode: document.querySelectorAll('.info-item')[2],
  downloadsNode: document.querySelectorAll('.info-item')[3],
  loadMoreNode: document.querySelector('.load-more'),
};

export const showImages = arr => {
  const markup = arr
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      let markup = `<div class="photo-card">
      <a href="${largeImageURL}">
      <img
        class="img-style"
        src="${webformatURL}"
        alt="${tags}"
        loading="lazy"
      />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
      return markup;
    })
    .join('');
  nodes.galleryNode.insertAdjacentHTML('beforeend', markup);
};
