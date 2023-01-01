import ImgApiService from './img-service';
import photoCardTpl from './templates/photo-card.hbs';

import {
  notificationSuccess,
  notificationFailure,
  notificationSuccessLoadMore,
  notificationGoUp,
} from './notification.js';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const backdropEl = document.querySelector('.backdrop');
const modalCloseBtnEl = document.querySelector('.modal-close-btn');
const modalEl = document.querySelector('.modal');
const targetEl = document.querySelector('.target-element');
const btnUp = document.querySelector('.btn-up');

const imgApiService = new ImgApiService();

const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(targetEl);

searchFormEl.addEventListener('submit', onSearch);
galleryEl.addEventListener('click', openModal);
modalCloseBtnEl.addEventListener('click', closeModal);
backdropEl.addEventListener('click', closeModalByClickBackdrop);
btnUp.addEventListener('click', goTopPage);

function onSearch(event) {
  event.preventDefault();

  imgApiService.query = event.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fetchImages().then(photoCard => {
    if (photoCard.length !== 0) {
      clearImageContainer();
      renderPhotoCard(photoCard);
      notificationSuccess();
      return;
    }
    notificationFailure();
  });
}

function btnUpVisible() {
  btnUp.classList.remove('is-hidden');
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

function goTopPage() {
  notificationGoUp();
  window.scrollTo({
    top: 0,
    right: 0,
    behavior: 'smooth',
  });
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

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imgApiService.query !== '') {
      imgApiService.fetchImages().then(photoCard => {
        if (photoCard.length !== 0) {
          renderPhotoCard(photoCard);
          notificationSuccessLoadMore();
          btnUpVisible();
          return;
        }
        notificationFailure();
      });
    }
  });
}
