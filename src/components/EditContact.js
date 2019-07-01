import React, { Component } from 'react';

import TextInputGroup from './TextInputGroup/TextInputGroup';
import Axios from 'axios';
import { Consumer } from '../context';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    btn: React.createRef(),
    error: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { name, email, phone } = this.state;

    Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
      name,
      email,
      phone
    }).then(res => {
      const contact = res.data;

      dispatch({
        type: 'UPDATE_CONTACT',
        payload: contact
      });
    });

    this.setState({
      name: '',
      email: '',
      phone: ''
    });

    this.props.history.push('/');

    /**
     * call `dispatch`
     * with action type === 'EDIT_CONTACT' and payload
     * */
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const btn = this.state.btn.current;
    const res = await Axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    btn.disabled = false;

    const { name, email, phone } = res.data;

    this.setState({
      name,
      email,
      phone
    });
  }

  render() {
    // console.log('');
    const { name, email, phone } = this.state;
    return (
      <Consumer>
        {val => (
          <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit.bind(this, val.dispatch)}>
                <TextInputGroup
                  name="name"
                  value={name}
                  label="Name"
                  placeholder="Enter Name..."
                  onChange={this.onChange}
                />

                <TextInputGroup
                  type="email"
                  name="email"
                  value={email}
                  label="Email"
                  placeholder="Enter Email..."
                  onChange={this.onChange}
                />

                <TextInputGroup
                  name="phone"
                  value={phone}
                  label="Phone"
                  placeholder="Enter Phone..."
                  onChange={this.onChange}
                />

                <input
                  className="btn btn-block btn-light"
                  type="submit"
                  value="Edit Contact"
                  disabled
                  ref={this.state.btn}
                />
              </form>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default EditContact;
