const LS_TEST_KEY = 'ls-test';
let isLocalStorageSupported = typeof localStorage === 'object';
 
try {
  localStorage.setItem(LS_TEST_KEY, 'test');
  localStorage.removeItem(LS_TEST_KEY);
} catch (e) {
  isLocalStorageSupported = false;
 
  // If we get error that we exceeded storage's quota
  // but storage is still empty we are in private mode
  
  if (e.code === DOMException.QUOTA_EXCEEDED_ERR && localStorage.length === 0) {
    // Private mode
  } else {
    throw e;
  }
}
 
const LocalStorage = {
  getItem: (key) => {
    if (isLocalStorageSupported) {
      return localStorage.getItem(key);
    }
 
    return null;
  },
 
  setItem: (key, value) => {
    if (isLocalStorageSupported) {
      localStorage.setItem(key, value);
    }
  },
 
  removeItem: (key) => {
    if (isLocalStorageSupported) {
      localStorage.removeItem(key);
    }
  },
};
 

export default LocalStorage;