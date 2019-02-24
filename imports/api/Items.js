import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//declare a collection in the MongoDB
export const Items = new Mongo.Collection('items');
//We need this so that the collection can be subscribed to on the client
if(Meteor.isServer) {
    Meteor.publish('items', function itemsPublication() {
        return Items.find({ owner: this.userId });
    });
}

//A list of methods on the server to be called by the client
Meteor.methods({
    //Insert a record into the collection. Validate the content type to prevent wrong data.
    'items.insert'(text, qty) {
        //Validate the incomming data
        check(text, String);
        check(qty, String);

        //Check that the user IS logged in
        if(!this.userId) {
            throw new Meteor.Error('not-authorzed');
        }
        //add the record to the DB. This helps ensure there is a standard format in our data
        Items.insert({
            text,
            qty,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    //Remove an item from the DB
    'items.remove'(itemId) {
        //Check we have an object
        check(itemId, Object);
        //Check the user IS logged in
        if(itemId.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        //Remove the object passed in
        Items.remove(itemId);
    },
    //Toggle the checked state of an item to ensure even when a user goes and returns we keep the state of an item
    'items.setChecked'(itemId, setChecked) {
        //Check the data coming in
        check(itemId, String);
        check(setChecked, Boolean);
        //Update the checked state
        Items.update(itemId, { $set: { checked: setChecked } });
    },
});