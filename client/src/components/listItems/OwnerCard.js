import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import RemovePerson from '../buttons/RemovePerson'
import UpdateCar from '../forms/UpdateCar'
import RemoveCar from '../buttons/RemoveCar'

const OwnerCard = ({ person }) => {
  const styles = getStyles()
  const { id, firstName, lastName, cars } = person

  const [editOwner, setEditOwner] = useState(false)

  const handleOwnerEditClick = () => {
    setEditOwner(!editOwner)
  }

  return (
    <Card
      style={styles.card}
      title={
        editOwner ? (
          <UpdatePerson
            id={id}
            firstName={firstName}
            lastName={lastName}
            onButtonClick={handleOwnerEditClick}
          />
        ) : (
          <>
            {firstName} {lastName}{' '}
            <EditOutlined
              onClick={handleOwnerEditClick}
              style={{ marginLeft: 10, marginRight: 10 }}
            />
            <DeleteOutlined
              onClick={() => RemovePerson({ id })}
              style={{ color: 'red' }}
            />
          </>
        )
      }
    >
      <h3>Cars:</h3>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} ownerId={id} />
      ))}
    </Card>
  )
}

// Subcomponente para cada auto dentro del Owner
const CarItem = ({ car, ownerId }) => {
  const [editMode, setEditMode] = useState(false)
  const { id, year, make, model, price } = car

  const handleCarEditClick = () => {
    setEditMode(!editMode)
  }

  if (editMode) {
    // Si estamos en modo edición, renderizamos el formulario de UpdateCar
    return (
      <UpdateCar
        id={id}
        year={year}
        make={make}
        model={model}
        price={price}
        personId={ownerId}
        onButtonClick={handleCarEditClick}
      />
    )
  }

  // Si NO estamos editando, mostramos la info del auto
  return (
    <div style={{ border: '1px solid #eee', margin: '8px 0', padding: '8px' }}>
      <p>
        <strong>Model:</strong> {make} {model} ({year})
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <EditOutlined onClick={handleCarEditClick} style={{ marginRight: 8 }} />
      <RemoveCar id={id} />
    </div>
  )
}

const getStyles = () => ({
  card: {
    width: '500px',
    marginBottom: '15px'
  }
})

export default OwnerCard