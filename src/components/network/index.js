import React from 'react';
import {
    Show, TabbedShowLayout, Tab,
    FormTab, TabbedForm, ReferenceManyField,
    Filter, UrlField, RichTextField,
    DateField, Responsive, SimpleList, List, Create, Datagrid, TextField,
    ShowButton, LongTextInput, TextInput
} from 'react-admin/lib';
import ApproveButton from '../node/ApproveButton';

export const NetworkList = (props) => (
    <List {...props}
        bulkActions={false}>
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
                    <UrlField source="seed" />
                    <ApproveButton />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const NetworkTitle = ({ record }) => {
    return <span> {record ? `"${record.name}"` : ''}</span>;
};

export const NetworkShow = (props) => (
    <Show title={<NetworkTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.Network.tabs.tab1">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="seed" />
                <TextField source="rtGraph" />
            </Tab>
            <Tab label="resources.Network.tabs.tab2">
                <RichTextField source="genesisBlock" />
            </Tab>
            <Tab label="resources.Network.tabs.tab3">
                <RichTextField source="config" stripTags />
            </Tab>
            <Tab label="resources.Network.tabs.tab4">
                <RichTextField source="certList" stripTags />
            </Tab>

        </TabbedShowLayout>
    </Show>
);

export const NetworkCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.Network.tabs.tab1">
                <TextInput source="name" />
                <TextInput source="seed" />
                <TextInput source="rtGraph" />
            </FormTab>
            <FormTab label="resources.Network.tabs.tab2">
                <LongTextInput source="genesisBlock" />
            </FormTab>
            <FormTab label="resources.Network.tabs.tab3">
                <LongTextInput source="config" />
            </FormTab>
            <FormTab label="resources.Network.tabs.tab4">
                <LongTextInput source="certList" />
            </FormTab>
        </TabbedForm>
    </Create>
);

