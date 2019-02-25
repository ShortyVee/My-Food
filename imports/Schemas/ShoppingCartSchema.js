import {SimpleSchema} from 'meteor/aldeed:simple-schema';

//Schema for our form
const ShoppingCartSchema = new SimpleSchema({
    itemName: {
        type: String,
        defaultValue: '',
        optional: false,
    },
    quantityNeeded: {
        type: String,
        defaultValue: '',
        optional: false,
    },
});

export default ShoppingCartSchema;