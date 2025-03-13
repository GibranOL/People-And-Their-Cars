import { useMutation, useQuery } from '@apollo/client'; // Asegúrate de importar useQuery
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { UPDATE_CAR, GET_CARS, GET_PEOPLE } from '../../graphql/queries';

const UpdateCar = props => {
  const { id, year, make, model, price, personId, onButtonClick } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const { loading: queryLoading, data } = useQuery(GET_PEOPLE); // Ahora se reconoce useQuery

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR, {
    update: (cache, { data: { updateCar } }) => {
      const existingData = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          ...existingData,
          cars: existingData.cars.map(car => 
            car.id === id ? updateCar : car
          )
        }
      });
    }
  });

  const onFinish = values => {
    updateCar({
      variables: {
        id,
        year: values.year,
        make: values.make,
        model: values.model,
        price: values.price,
        personId: values.personId
      }
    });
    onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{ year, make, model, price, personId }}
    >
      <Form.Item name="year" rules={[{ required: true, message: 'Please enter a year' }]}>
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item name="make" rules={[{ required: true, message: 'Please enter a make' }]}>
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item name="model" rules={[{ required: true, message: 'Please enter a model' }]}>
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true, message: 'Please enter a price' }]}>
        <Input placeholder="Price" type="number" />
      </Form.Item>
      <Form.Item name="personId" rules={[{ required: true, message: 'Please select an owner' }]}>
        <Select placeholder="Select an owner" loading={queryLoading}>
          {data &&
            data.people.map(person => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Car
        </Button>
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;