import * as localStorage from './localStorage';

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock();
global.console = {warn: jest.fn()}

const mockState = {
  favorites: {
    1: { id: 1, name: 'Spiderman'}
  }
};

describe('utils/localStorage', () => {
  it('should have save method defined', () => {
    expect(localStorage.save).toBeDefined();
  });

  it('should have loadStoredFavorites method defined', () => {
    expect(localStorage.loadStoredFavorites).toBeDefined();
  });

  it('should save favorites to the local storage', () => {
    localStorage.save(mockState);

    expect(localStorage.loadStoredFavorites()).toBeDefined();
    expect(localStorage.loadStoredFavorites()).toEqual(mockState.favorites);
  });

  it('should return undefined when nothing is stored in local storage', () => {
    global.localStorage.clear();
    expect(localStorage.loadStoredFavorites()).toBeUndefined();
  });

  it('should load stored favorites from the local storage', () => {
    localStorage.save(mockState);

    expect(localStorage.loadStoredFavorites()).toBeDefined();
    expect(localStorage.loadStoredFavorites()).toEqual(mockState.favorites);
  });

  it('should fail on load when localstorage is not available', () => {
    global.localStorage = null;
    expect(localStorage.loadStoredFavorites()).toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith('Error while accessing local storage data');
  });

  it('should fail on save when localstorage is not available', () => {
    global.localStorage = null;
    expect(localStorage.save(mockState)).toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith('Error while persisting data to local storage');
  });
});
