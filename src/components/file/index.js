import React from 'react';
import {
    FormTab, TabbedForm,
    NumberInput,BooleanField,
    Filter, DateField, DateInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput
} from 'react-admin/lib';

const FileFilter = props => (
    <Filter {...props}>
        <TextInput label="name" source="name" alwaysOn />
    </Filter>
);

export const FileList = (props) => (
    <List {...props}
        filters={<FileFilter />}
        bulkActions={false}
        sort={{ field: 'id', order: 'ASC' }}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.name}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="size" />
                    <TextField source="url" />
                </Datagrid>
            }
        />
    </List>
);

const FileTitle = ({ record }) => {
    return <span> {record ? `"${record.id}"` : ''}</span>;
};


export const FileCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <NumberInput source="size" />
        </SimpleForm>
    </Create>
);

