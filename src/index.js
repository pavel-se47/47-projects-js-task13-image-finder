import ImgApiService from './img-service';
import photoCardTpl from './templates/photo-card.hbs';
// import bigImgTpl from './templates/big-img.hbs';

import {
  notificationSuccess,
  notificationFailure,
  notificationSuccessLoadMore,
  notificationGoUp,
} from './notification.js';

const searchFormEl = document.querySelector('#search-form');
const loadMoreEl = document.querySelector('[data-action="load-more"]');
const galleryEl = document.querySelector('.gallery');
const goUpEl = document.querySelector('#go-up');
const backdropEl = document.querySelector('.backdrop');
const modalCloseBtnEl = document.querySelector('.modal-close-btn');
const modalEl = document.querySelector('.modal');

const imgApiService = new ImgApiService();

function onSearch(event) {
  event.preventDefault();

  imgApiService.query = event.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fetchImages().then(photoCard => {
    if (photoCard.length !== 0) {
      clearImageContainer();
      renderPhotoCard(photoCard);
      bottomBtnVisible();
      notificationSuccess();
      return;
    }
    notificationFailure();
  });
}

function onLoadMore() {
  imgApiService.fetchImages().then(photoCard => {
    if (photoCard.length !== 0) {
      renderPhotoCard(photoCard);
      notificationSuccessLoadMore();
      setTimeout(scrollView, 1000);
      return;
    }
    notificationFailure();
  });
}

function renderPhotoCard(card) {
  galleryEl.insertAdjacentHTML('beforeend', photoCardTpl(card));
}

function renderModalBigImg(event) {
  modalEl.innerHTML = `<img src=${event.target.dataset.sourse}>`;
}

function clearModal() {
  modalEl.innerHTML = '';
}

function clearImageContainer() {
  galleryEl.innerHTML = '';
}

function scrollView() {
  loadMoreEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function goTopPage() {
  notificationGoUp();
  window.scrollTo({
    top: 0,
    right: 0,
    behavior: 'smooth',
  });
}

function bottomBtnVisible() {
  loadMoreEl.classList.remove('is-hidden');
  goUpEl.classList.remove('is-hidden');
}

function openModal(event) {
  if (event.target.nodeName === 'IMG') {
    backdropEl.classList.add('is-open');
    window.addEventListener('keyup', closeModalByEsc);
    renderModalBigImg(event);
  }
  return;
}

function closeModal() {
  backdropEl.classList.remove('is-open');
  window.removeEventListener('keyup', closeModalByEsc);
  clearModal();
}

function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
  return;
}

function closeModalByClickBackdrop(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
  return;
}

searchFormEl.addEventListener('submit', onSearch);
loadMoreEl.addEventListener('click', onLoadMore);
goUpEl.addEventListener('click', goTopPage);
galleryEl.addEventListener('click', openModal);
modalCloseBtnEl.addEventListener('click', closeModal);
backdropEl.addEventListener('click', closeModalByClickBackdrop);
