// main imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import 'rxjs';
import registerServiceWorker from './registerServiceWorker';

// custom imports
import { searchEpic, loadFavoritesEpic, saveFavoritesEpic, preloadFavorites } from './redux/heroes';
import reducer from './redux/heroes';
import App from './App';
import { loadStoredFavorites } from './utils/localStorage';

// styles
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

const rootEpic = combineEpics(
  searchEpic,
  loadFavoritesEpic,
  saveFavoritesEpic
);
const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(epicMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const storedFavorites = loadStoredFavorites();
if (storedFavorites) {
  store.dispatch(preloadFavorites(storedFavorites));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
