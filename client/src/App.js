import './App.css';
import AddContact from './components/forms/AddContact'
import Title from './components/layout/Title'
import Contacts from './components/lists/Contacts'
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title />
        <AddContact />
        <Contacts />
      </div>
    </ApolloProvider>
  )
}

export default App;
