import { applyMiddleware, combineReducers, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga';
// tạo ra biến middleWareSaga 
const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    // Chứa những reducers, reducers khai báo tại đây
    



})

// Khởi tạo cái store
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));
// Gọi saga
middleWareSaga.run(rootSaga)


export default store;