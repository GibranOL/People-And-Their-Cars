import './App.css'
import Title from './components/layout/Title'
import Contacts from './components/lists/Contacts'
import Person from './components/forms/PersonForm'
import Car from './components/forms/CarForm'
import ShowPage from './components/pages/ShowPage' 
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <Title />
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Person />
                  <Car />
                  <Contacts />
                </>
              }
            />
            <Route path='/person/:id' element={<ShowPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App