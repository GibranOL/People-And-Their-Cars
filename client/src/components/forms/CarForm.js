import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../graphql/queries'
import { useEffect, useState } from 'react'

const CarForm = () => {
  const [form] = Form.useForm()
  const [carId] = useState(uuidv4())
  const [, forceUpdate] = useState()

  const { loading: queryLoading, data } = useQuery(GET_PEOPLE)

  const [addCar, { loading: mutationLoading }] = useMutation(ADD_CAR, {
    update: (cache, { data: { addCar } }) => {
      try {
        const existingCarsData = cache.readQuery({ query: GET_CARS })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...existingCarsData,
            cars: [...existingCarsData.cars, addCar]
          }
        })
      } catch (err) {
        console.log('No se encontró GET_CARS en caché o hubo error:', err)
      }

      try {
        const existingPeopleData = cache.readQuery({ query: GET_PEOPLE })

        if (existingPeopleData?.people) {
          const updatedPeople = existingPeopleData.people.map((p) => {
            if (p.id === addCar.owner.id) {
              return {
                ...p,
                cars: [...p.cars, addCar]
              }
            }
            return p
          })

          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              ...existingPeopleData,
              people: updatedPeople
            }
          })
        }
      } catch (err) {
        console.log('No se encontró GET_PEOPLE en caché o hubo error:', err)
      }
    },
    onCompleted: () => {
      form.resetFields()
    }
  })


  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values

    addCar({
      variables: {
        id: carId,
        year: year.toString(), 
        make,
        model,
        price: price.toString(), 
        personId
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-car-form'
      layout='inline'
      onFinish={onFinish}
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please enter a year' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>

      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please enter a make' }]}
      >
        <Input placeholder='Make' />
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please enter a model' }]}
      >
        <Input placeholder='Model' />
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please enter a price' }]}
      >
        <Input placeholder='Price' />
      </Form.Item>

      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please select a person' }]}
      >
        <Select placeholder='Select a person' loading={queryLoading}>
          {data &&
            data.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              mutationLoading ||
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default CarForm