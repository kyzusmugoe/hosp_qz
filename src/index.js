import React ,{createContext}from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers/rootReducer'

//import WebService from './webservice/WebService'
import WebService from './webservice/WebSerivceTest'

import WebServiceContext from './webservice/WebServiceContext'

const store = createStore(rootReducer)
const webservice = new WebService()

//webservice.login()
ReactDOM.render(
  <Provider store={store}>
       <WebServiceContext.Provider value={webservice}>
         <App/>
       </WebServiceContext.Provider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
