import React from 'react';
import {
    Show, TabbedShowLayout, Tab,
    FormTab, TabbedForm, ReferenceField,
    ReferenceInput, SelectInput, RichTextField,
    DateField, Responsive, SimpleList, List, Create, Datagrid, TextField,
    ShowButton, LongTextInput, TextInput
} from 'react-admin/lib';
import ApproveButton from './ApproveButton';


export const NodeList = (props) => (
    <List {...props}
        bulkActions={false}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.sid}
                    tertiaryText={record => new Date(record.created).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="sid" />
                    <TextField source="addr" />
                    <ReferenceField label="组网" source="pid" reference="networks" linkType="show">
                        <TextField source="netId" />
                    </ReferenceField>

                    <DateField source="created" showTime />
                    <ApproveButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const NodeTitle = ({ record }) => {
    return <span> {record ? `"${record.sid}"` : ''}</span>;
};

export const NodeShow = (props) => (
    <Show title={<NodeTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.networks.tabs.tab1">
                <TextField source="id" />
                <TextField source="sid" />
                <TextField source="addr" />
                <DateField source="created" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const NodeCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.networks.tabs.tab1">
                <ReferenceInput label="组网" source="pid" reference="networks">
                    <SelectInput optionText="netId" />
                </ReferenceInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

