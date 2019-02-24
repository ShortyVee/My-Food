import React from 'react';
import {AutoForm, TextField, SubmitField, ErrorsField} from 'uniforms-semantic';

import {Grid} from 'semantic-ui-react';

//Create the form layout based on the schema we pass in.
const ShoppingForm = ({schema, onSubmit, model = {}}) => (
    <AutoForm schema={schema} onSubmit={onSubmit} model={model}>
        <Grid>
            <Grid.Row>
                <Grid.Column width={12}>
                    <TextField name="itemName" placeholder="Eg. Milk"/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <TextField name="quantityNeeded" placeholder="Eg. 1L"/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <SubmitField value="Add Item" className="blue fluid"/>
                    <ErrorsField />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </AutoForm>
);

export default ShoppingForm;