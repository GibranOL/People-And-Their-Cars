import { Card } from 'antd';
import UpdatePerson from '../forms/UpdatePerson';
import RemovePerson from '../buttons/RemovePerson';
import CarCard from './CarCard';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ContactCard = ({ id, firstName, lastName, cars = [] }) => {
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false); // Initialize editMode state

  console.log(`Rendering ContactCard for ${firstName} ${lastName}`, cars); 

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <Card
      title={`${firstName} ${lastName}`} 
      style={styles.card}
      actions={[
        <EditOutlined onClick={handleButtonClick} />,
        <RemovePerson id={id} />
      ]}
    >
      {editMode ? (
        <UpdatePerson id={id} firstName={firstName} lastName={lastName} />
      ) : (
        cars.length > 0 ? (
          cars.map(car => (
            <CarCard
              key={car.id}
              id={car.id}
              year={car.year}
              make={car.make}
              model={car.model}
              price={car.price}
              owner={{ id, firstName, lastName }}
            />
          ))
        ) : (
          <p>No cars available</p>
        )
      )}
    </Card>
  );
};

const getStyles = () => ({
  card: {
    width: '600px',
    marginBottom: '20px'
  }
});

export default ContactCard;