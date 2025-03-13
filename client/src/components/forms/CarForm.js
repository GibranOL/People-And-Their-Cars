import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../graphql/queries';

const CarForm = () => {
  const [form] = Form.useForm();
  const { loading: queryLoading, data } = useQuery(GET_PEOPLE);

  const [addCar, { loading: mutationLoading }] = useMutation(ADD_CAR, {
    update: (cache, { data: { addCar } }) => {
      const existingData = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          ...existingData,
          cars: [...existingData.cars, addCar]
        }
      });
    },
    onCompleted: () => form.resetFields()
  });

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    addCar({
      variables: {
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId
      }
    });
  };

  return (
    <Form
      form={form}
      name="add-car-form"
      layout="inline"
      onFinish={onFinish}
      style={{ marginBottom: '40px' }}
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
      <Form.Item name="personId" rules={[{ required: true, message: 'Please select a person' }]}>
        <Select placeholder="Select a person" loading={queryLoading}>
          {data &&
            data.people.map(person => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            mutationLoading ||
            !form.isFieldsTouched(true) ||
            !!form.getFieldsError().filter(({ errors }) => errors.length).length
          }
        >
          Add Car
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;