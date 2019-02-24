import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
//Server Calls
import { Items } from '../api/Items';
//Single Item template
import Item from './Item.jsx';
//Allow meteor blaze templates to be used inline
import Blaze from 'meteor/gadicc:blaze-react-component';
//Form to input shopping list items
import ShoppingForm from '../Forms/ShoppingForm.js';
import ShoppingCartSchema from '../Schemas/ShoppingCartSchema.js';

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  onSubmit = data => {
    //Store data in variables
    var text = data.itemName;
    var qty = data.quantityNeeded;
    //Insert Data into the Database
    Meteor.call('items.insert', text, qty);
    //Clear fields so that the user can submit another item
    data.itemName = '';
    data.quantityNeeded = '';
  };

  //toggle the showing and hiding of checked items
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  //Return a list of items based on if they need to be hidden or not
  renderItems() {
    let filteredItems = this.props.items;
    if(this.state.hideCompleted) {
      filteredItems = filteredItems.filter(item => !item.checked);
    }

    return filteredItems.map((item) => (
      <Item key={item._id} item={item} />
    ));
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>My Shopping List - ({this.props.incompletedItemCount})</h1>

          <div className="login-buttons-float">
            <Blaze template="loginButtons" align="right" />
          </div>
          {/* If statement to check if a user is logged in or not */}
          { this.props.currentUser ? 
          <div>
            <ShoppingForm
              schema={ShoppingCartSchema}
              onSubmit={this.onSubmit}
            />
          </div>
          : 
          <div>
            <p>Please sign in to add items to your shopping cart!</p>
          </div>
          }
          {/* Checkbox to toggle show/hide on checked items */}
          <div className="filter-button">
          <label>
            <input 
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Items
          </label>
          </div>

        </header>

        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

export default withTracker (() => {
  Meteor.subscribe('items');
  //Store Server queries into props for use in the page
  return {
    items: Items.find({}, {sort: { createdAt: -1} }).fetch(),
    incompletedItemCount: Items.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(ShoppingList);