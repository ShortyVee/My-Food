import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Items } from '../api/Items.js';

export default class Item extends Component {

  //Set the Checked state in the mongoDB Collection
  toggleChecked() {
    Meteor.call('items.setChecked', this.props.item._id, !this.props.item.checked);
  }
  //Call the server delete for the clicked item. Note there is validation server side to check the current user
  deleteThisItem() {
    Meteor.call('items.remove', this.props.item);
  }

  render() {

    const itemClassName = this.props.item.checked ? 'checked' : '';

    return (
      <li className={itemClassName}>
        <button className="delete" onClick={this.deleteThisItem.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.item.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">
        {this.props.item.qty} - {this.props.item.text}
        </span>
      </li>
    );
  }

}
