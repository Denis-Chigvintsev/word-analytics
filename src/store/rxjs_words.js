import { BehaviorSubject } from 'rxjs';

const counterGlobalStore = new BehaviorSubject(0);

function setStoreWords(newValue) {
  counterGlobalStore.next(newValue);
}

function getStoreWords() {
  return counterGlobalStore;
}

export const rxjs_words = { setStoreWords, getStoreWords };
