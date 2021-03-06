// import primary libraries
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as userActions from '../userActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import user components
import AdminUserForm from './AdminUserForm.js.jsx';

class AdminCreateUser extends Base {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(JSON.stringify(props.defaultUser))
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newState = _.update( this.state.user, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.sendCreateUser(this.state.user)).then((action) => {
      if(action.success) {
        this.props.dispatch(userActions.invalidateList());
        browserHistory.push('/admin/users');
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR CREATING USER: ", action.message);
      }
    });
  }

  render() {
    const { user } = this.state;
    const isEmpty = !user || (user.username === null || user.username === undefined);;
    return (
      <div>
        { isEmpty ?
          <h2> Loading... </h2>
          :
          <AdminUserForm
            user={this.state.user}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/admin/users`}
            formTitle="Create User"
          />
        }
      </div>
    )
  }
}

AdminCreateUser.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    defaultUser: store.user.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(AdminCreateUser);
