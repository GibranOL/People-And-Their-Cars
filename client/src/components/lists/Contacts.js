import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../graphql/queries'
import { List } from 'antd'
import OwnerCard from '../listItems/OwnerCard'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%' 
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center', 
    width: '100%' 
  }
})

const Contacts = () => {
  const styles = getStyles()
  const { loading, error, data } = useQuery(GET_PEOPLE)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  // data.people ya incluye id, firstName, lastName y cars: [...]
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(person => (
        <List.Item key={person.id}>
          <OwnerCard person={person} />
        </List.Item>
      ))}
    </List>
  )
}

export default Contacts