import React from 'react';
import {
    FormTab, TabbedForm,
    ReferenceManyField,BooleanField,
    Filter, DateField, DateInput, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, SimpleForm, TextInput
} from 'react-admin/lib';

const AccountFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <DateInput source="created" />
    </Filter>
);

export const AccountList = (props) => (
    <List {...props}
        filters={<AccountFilter />}
        bulkActions={false}
        sort={{ field: 'id', order: 'ASC' }}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.user_id}
                    secondaryText={record => record.name}
                    tertiaryText={record => new Date(record.created).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="sn" />
                    <TextField source="name" />
                    <TextField source="phone" />
                    <BooleanField source="status" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const AccountTitle = ({ record }) => {
    return <span> {record ? `"${record.sn}"` : ''}</span>;
};

export const AccountEdit = (props) => (
    <Edit title={<AccountTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.accounts.tabs.tab1">
                <DisabledInput source="id" />
                <TextInput source="org" />
                <TextInput source="name" />
                <TextInput source="phone" />
                <TextInput source="tel" />
                <TextInput source="email" />
            </FormTab>
            <FormTab label="resources.accounts.tabs.tab2">
                <ReferenceManyField
                    reference="certs"
                    target="aid"
                    addLabel={false}
                >
                    <Datagrid>
                        <TextField source="sn" />
                        <DateField source="created" />

                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <FormTab label="resources.accounts.tabs.tab3">
                <ReferenceManyField
                    reference="transactions"
                    target="aid"
                    addLabel={false}
                >
                    <Datagrid>
                        <TextField source="txId" />
                        <DateField source="created" />

                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const AccountCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="org" />
            <TextInput source="name" />
            <TextInput source="phone" />
            <TextInput source="tel" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);

