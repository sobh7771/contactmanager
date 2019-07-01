import React, { Component } from 'react';
import { Consumer } from '../../../context';
import TextInputGroup from '../../TextInputGroup/TextInputGroup';
import Axios from 'axios';

class AddContact extends Component {
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

  onSubmit = async ({ dispatch, contacts }, e) => {
    // prevent default behavior
    e.preventDefault();

    const btn = this.state.btn.current;
    const { name, email, phone } = this.state;

    // validate the form
    if (!name) {
      return this.setState({
        error: {
          name: 'Name is required'
        }
      });
    } else if (!email) {
      return this.setState({
        error: {
          email: 'Email is required'
        }
      });
    } else if (!phone) {
      return this.setState({
        error: {
          phone: 'Phone is required'
        }
      });
    }

    // inform the user of the request
    btn.disabled = true;
    btn.value = 'Adding Contact...';

    const res = await Axios.post('https://jsonplaceholder.typicode.com/users', {
      name,
      email,
      phone
    });

    btn.disabled = false;
    btn.value = 'Add Contact';

    const { data } = res;

    dispatch({
      type: 'ADD_CONTACT',
      payload: data
    });

    // Clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      error: {}
    });

    // redirect to home page
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone } = this.state;
    return (
      <Consumer>
        {val => {
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(val, e)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={this.state.error}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={this.state.error}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={this.state.error}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                    ref={this.state.btn}
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
