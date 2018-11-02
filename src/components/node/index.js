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
                    <TextField source="nodename" />
                    <TextField source="seedip" />
                    <TextField source="rtGraph" />
                    <ApproveButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const NodeTitle = ({ record }) => {
    return <span> {record ? `"${record.id}"` : ''}</span>;
};

export const NodeShow = (props) => (
    <Show title={<NodeTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.Network.tabs.tab1">
                    <TextField source="id" />
                    <TextField source="nodename" />
                    <TextField source="seedip" />
                    <TextField source="rtGraph" />
            </Tab>
            <Tab label="resources.Network.tabs.tab2">
                <ReferenceField
                label="私钥文件"
                source="keypair.id"
                reference="File"
                >
                <TextField source="title" />
                </ReferenceField>
            </Tab>
            
            <Tab label="resources.Network.tabs.tab3">
                <ReferenceField
                label="配置文件"
                source="config.id"
                reference="File"
                >
                <TextField source="title" />
                </ReferenceField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const NodeCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.Network.tabs.tab1">
                <TextInput source="nodename" />
                <TextInput source="seedip" />
                <TextInput source="rtGraph" />
            </FormTab>

            <FormTab label="resources.Network.tabs.tab2">
                <ReferenceField
                label="私钥文件"
                source="keypair.id"
                reference="File"
                >
                <SelectInput optionText="title" />
                </ReferenceField>
            </FormTab>
            
            <FormTab label="resources.Network.tabs.tab3">
                <ReferenceField
                label="配置文件"
                source="config.id"
                reference="File"
                >
                <SelectInput optionText="title" />
                </ReferenceField>
            </FormTab>
        </TabbedForm>
    </Create>
);



