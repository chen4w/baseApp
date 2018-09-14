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
                    <ReferenceField label="组网" source="net.id" reference="Network" linkType="show">
                        <TextField source="name" />
                    </ReferenceField>
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
            <Tab label="resources.Network.tabs.tab1">
                <TextField source="id" />
                <TextField source="rtGraph" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const NodeCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.Network.tabs.tab1">
                <TextInput source="rtGraph" />
                <ReferenceInput label="组网" source="net.id" reference="Network">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

