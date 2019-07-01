import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Consumer } from '../../../context';
import Axios from 'axios';
class Contact extends Component {
  state = {
    showContact: false
  };

  onShowClick = () => {
    this.setState({
      showContact: !this.state.showContact
    });
  };

  onDeleteClick = async (id, dispatch) => {
    await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({
      type: 'DELETE_CONTACT',
      payload: id
    });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    let contact = null;

    if (this.state.showContact) {
      contact = (
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      );
    }

    return (
      <Consumer>
        {val => {
          const { dispatch } = val;
          return (
            <div className="card card-body mb-3">
              <h4>
                {`${name} `}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  style={{ cursor: 'pointer', color: 'red', float: 'right' }}
                  className="fas fa-times"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />

                <Link
                  style={{
                    float: 'right',
                    marginRight: '1rem',
                    color: '#000'
                  }}
                  to={`/edit/contact/${id}`}
                >
                  <i className="fas fa-pencil-alt" />
                </Link>
              </h4>
              {contact}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
