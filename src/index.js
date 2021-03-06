import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import logger from './middleware/logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { loadState, saveState } from './utils/localStorage'
import users from './reducers/users'
import roots from './reducers/roots'
import stems from './reducers/stems'
import affixes from './reducers/affixes'
import errors from './reducers/errors'
import texts from './reducers/texts'
import audios from './reducers/audios'
import spellings from './reducers/spellings'
import consonants from './reducers/consonants'
import vowels from './reducers/vowels'
import { loadingBarReducer } from 'react-redux-loading'

//import {  getUserFromToken } from './queries/queries';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/api'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('TOKEN')
  console.log('the token is ' + token)
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : ''
    }
  }
})

const wsLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('TOKEN')
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : ''
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink.concat(httpLink),
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()
console.log('my persisted state =', persistedState)
const store = createStore(
  combineReducers({
    persistedState,
    users,
    stems,
    roots,
    affixes,
    texts,
    audios,
    spellings,
    consonants,
    vowels,
    errors,
    loadingBar: loadingBarReducer,
  }),
  {},
  composeEnhancers(
    applyMiddleware(thunk, logger),
  )
)

store.subscribe(() => {
  console.log('I am saving the state into localStorage')
  saveState(store.getState())
})

// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }, 3000));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store} client={client}>
      <App client={client}/>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
