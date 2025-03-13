import { gql } from '@apollo/client';

// Obtener todas las personas (antes `GET_CONTACTS`)
export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
      cars {
        id
        make
        model
        year
        price
      }
    }
  }
`;

// Obtener todos los autos y sus dueños (ya estaba correcto)
export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

// Agregar una persona (antes `ADD_CONTACT`)
export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

// Actualizar persona (antes `UPDATE_CONTACT`)
export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

// Eliminar persona (antes `REMOVE_CONTACT`)
export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
    }
  }
`;

// Agregar un auto
export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

// Actualizar auto
export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

// Eliminar auto
export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
    }
  }
`;