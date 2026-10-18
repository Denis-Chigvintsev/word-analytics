import { BehaviorSubject } from 'rxjs';

const counterGlobalStore = new BehaviorSubject(0);

function setStoreChars(newValue) {
  counterGlobalStore.next(newValue);
}

function getStoreChars() {
  return counterGlobalStore;
}

export const rxjs_chars = { setStoreChars, getStoreChars };
