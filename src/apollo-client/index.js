import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-boost';

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

export default const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink.concat(httpLink),
  authLink.concat(httpLink)
)
