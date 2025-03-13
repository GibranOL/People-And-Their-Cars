import Card from 'antd/es/card/Card';
import UpdateCar from '../forms/UpdateCar';
import UpdatePerson from '../forms/UpdatePerson';
import RemoveCar from '../buttons/RemoveCar';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const CarCard = props => {
  const [editMode, setEditMode] = useState(false);
  const [editOwner, setEditOwner] = useState(false); // Estado para editar el propietario
  const styles = getStyles();
  const { id, year, make, model, price, owner } = props;

  const handleCarEditClick = () => {
    setEditMode(!editMode);
  };

  const handleOwnerEditClick = () => {
    setEditOwner(!editOwner);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={owner.id}
          onButtonClick={handleCarEditClick}
        />
      ) : (
        <Card
          style={styles.card}
          title={
            editOwner ? (
              <UpdatePerson
                id={owner.id}
                firstName={owner.firstName}
                lastName={owner.lastName}
                onButtonClick={handleOwnerEditClick}
              />
            ) : (
              <>
                {owner.firstName} {owner.lastName}
                <EditOutlined onClick={handleOwnerEditClick} style={{ marginLeft: 10 }} />
              </>
            )
          }
          actions={[
            <EditOutlined id={id} onClick={handleCarEditClick} />,
            <RemoveCar id={id} />
          ]}
        >
          <p><strong>Car:</strong> {make} {model} ({year})</p>
          <p><strong>Price:</strong> ${price}</p>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: '500px',
    marginBottom: '15px'
  }
});

export default CarCard;