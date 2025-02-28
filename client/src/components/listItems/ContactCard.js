import Card from 'antd/es/card/Card'
import UpdateContact from '../forms/UpdateContact'
import RemoveContact from '../buttons/RemoveContact'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

const ContactCard = props => {
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()
  const { id, firstName, lastName } = props

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined
              id={id}
              firstName={firstName}
              lastName={lastName}
              onClick={handleButtonClick}
            />,
            <RemoveContact id={id} />
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

export default ContactCard
