export const save = state => {
  try {
    const stringState = JSON.stringify(state.favorites);
    localStorage.setItem('favorites', stringState);
  } catch (error) {
    console.warn('Error while persisting data to local storage');
  }
}

export const loadStoredFavorites = () => {
  try {
    const state = localStorage.getItem('favorites');
    if (!state) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (error) {
    console.warn('Error while accessing local storage data');
  }
}
