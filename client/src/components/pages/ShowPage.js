import React from 'react'
import { useParams, Link } from 'react-router-dom' 
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries' 

const ShowPage = () => {
  const { id } = useParams() 
  const { loading, error, data } = useQuery(GET_PEOPLE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const person = data.people.find((p) => p.id === id)

  if (!person) return <p>No data found for ID: {id}</p>

  const { firstName, lastName, cars } = person

  return (
    <div style={{ margin: '20px' }}>
      <Link to="/" style={styles.goBackLink}>
        ← GO BACK HOME
      </Link>

      <h2>
        Owner: {firstName} {lastName}
      </h2>
      <h3>Cars:</h3>
      {cars.length ? (
        cars.map((car) => (
          <div
            key={car.id}
            style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}
          >
            <p>
              <strong>Make/Model:</strong> {car.make} {car.model}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Price:</strong> ${car.price}
            </p>
          </div>
        ))
      ) : (
        <p>This owner has no cars.</p>
      )}
    </div>
  )
}

const styles = {
  goBackLink: {
    display: 'inline-block',
    marginBottom: '15px',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '16px'
  }
}

export default ShowPage