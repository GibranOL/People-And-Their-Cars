import { useQuery } from '@apollo/client';
import { GET_CARS } from '../../graphql/queries';
import { List } from 'antd';
import CarCard from '../listItems/CarCard';

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const Cars = () => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.cars.map(({ id, year, make, model, price, owner }) => (
        <List.Item key={id}>
          <CarCard id={id} year={year} make={make} model={model} price={price} owner={owner} />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;