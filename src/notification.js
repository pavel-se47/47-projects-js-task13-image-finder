import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

export function notificationSuccess() {
  alert({
    title: 'Успешно!',
    text: 'Результат поиска выведен на экран!',
    delay: 2000,
    hide: true,
  });
}

export function notificationFailure() {
  alert({
    title: 'Ошибка!',
    text: 'Ошибка запроса!',
    delay: 2000,
    hide: true,
  });
}

export function notificationSuccessLoadMore() {
  alert({
    title: 'Успешно!',
    text: 'Новые картинки добавлены успешно!',
    delay: 2000,
    hide: true,
  });
}

export function notificationGoUp() {
  alert({
    title: 'Успешно!',
    text: 'Вы в начале страницы!',
    delay: 2000,
    hide: true,
  });
}
