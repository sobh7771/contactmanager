import React, { Component } from 'react';
import Axios from 'axios';

const { Provider, Consumer } = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'DELETE_CONTACT':
      return {
        ...state, // contacts from state will be omitted
        contacts: state.contacts.filter(contact => contact.id !== payload)
      };

    case 'ADD_CONTACT':
      return {
        ...state, // contacts from state will be omitted
        contacts: [...state.contacts, payload]
      };

    case 'UPDATE_CONTACT':
      const contacts = state.contacts.filter(
        contact => contact.id !== payload.id
      );

      console.log(contacts);

      contacts.push(payload);

      return {
        ...state,
        contacts
      };

    default:
      return state;
  }
};

export default class extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const res = await Axios.get('https://jsonplaceholder.typicode.com/users');

    const { data } = res;
    console.log(data);
    this.setState({
      contacts: data
    });

    // Axios.get('http://localhost:8080/todos').then(response => {
    //   console.log(response);
    // });

    // Axios.post('http://localhost:8080/todos', {
    //   text: 'Todo from react app'
    // }).then(response => {
    //   console.log(response);
    // });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { Consumer };
