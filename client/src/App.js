import './App.css';
import Title from './components/layout/Title'
import Contacts from './components/lists/Contacts'
import Person from './components/forms/PersonForm'
import Car from './components/forms/CarForm'
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
        <Person />
        <Car />
        <Contacts />
      </div>
    </ApolloProvider>
  )
}

export default App;
