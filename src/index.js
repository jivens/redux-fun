<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import reducer from './reducers'
//import middleware from './middleware'
//import client from './apollo-client'
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
import authedUser from './reducers/authedUser'
import users from './reducers/users'
import polls from './reducers/polls'
import stems from './reducers/stems'
import affixes from './reducers/affixes'
import { loadingBarReducer } from 'react-redux-loading'
import 'react-table/react-table.css'
//import {  getUserFromToken } from './queries/queries';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/api'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('TOKEN')
  console.log(token)
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

//const store = createStore(reducer, middleware)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    authedUser,
    users,
    polls,
    stems,
    affixes,
    loadingBar: loadingBarReducer,
  }),
  {},
  composeEnhancers(
    applyMiddleware(thunk, logger),
  )
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store} client={client}>
      <App client={client}/>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
=======
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import reducer from './reducers'
//import middleware from './middleware'
//import client from './apollo-client'
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
import authedUser from './reducers/authedUser'
import users from './reducers/users'
import polls from './reducers/polls'
import stems from './reducers/stems'
import affixes from './reducers/affixes'
import { loadingBarReducer } from 'react-redux-loading'
import 'react-table/react-table.css'
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

//const store = createStore(reducer, middleware)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    authedUser,
    users,
    polls,
    stems,
    affixes,
    loadingBar: loadingBarReducer,
  }),
  {},
  composeEnhancers(
    applyMiddleware(thunk, logger),
  )
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store} client={client}>
      <App client={client}/>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
>>>>>>> master
