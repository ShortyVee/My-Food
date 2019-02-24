import {SimpleSchema} from 'meteor/aldeed:simple-schema';

//Schema for our form
const ShoppingCartSchema = new SimpleSchema({
    itemName: {
        type: String,
        defaultValue: '',
    },
    quantityNeeded: {
        type: String,
        defaultValue: '',
    },
});

export default ShoppingCartSchema;