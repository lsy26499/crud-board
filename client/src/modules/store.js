import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, actionsModule, historyModule } from './slices';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware({
  context: {
    history: historyModule,
  },
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const actions = actionsModule;
export const history = historyModule;
