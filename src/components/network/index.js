import React from 'react';
import {
    Show, TabbedShowLayout, Tab,
    FormTab, TabbedForm, ReferenceManyField,
    Filter, UrlField, RichTextField,
    DateField, Responsive, SimpleList, List, Create, Datagrid, TextField,
    ShowButton, LongTextInput, TextInput
} from 'react-admin/lib';


export const NetworkList = (props) => (
    <List {...props}
        bulkActions={false}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.netId}
                    tertiaryText={record => new Date(record.created).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="netId" />
                    <UrlField source="seed" />
                    <DateField source="created" showTime />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const NetworkTitle = ({ record }) => {
    return <span> {record ? `"${record.netId}"` : ''}</span>;
};

export const NetworkShow = (props) => (
    <Show title={<NetworkTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.networks.tabs.tab1">
                <TextField source="id" />
                <TextField source="netId" />
                <TextField source="seed" />
                <DateField source="created" />
            </Tab>
            <Tab label="resources.networks.tabs.tab2">
                <RichTextField source="genesisBlock" />
            </Tab>
            <Tab label="resources.networks.tabs.tab3">
                <RichTextField source="config" stripTags />
            </Tab>
            <Tab label="resources.networks.tabs.tab4">
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
            </Tab>
            <Tab label="resources.networks.tabs.tab5">
                <ReferenceManyField
                    reference="blocks"
                    target="pid"
                    addLabel={false}
                >
                    <Datagrid>
                        <TextField source="preHash" />
                        <DateField source="created" />
                        <ShowButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>

        </TabbedShowLayout>
    </Show>
);

export const NetworkCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.networks.tabs.tab1">
                <TextInput source="seed" />
            </FormTab>
            <FormTab label="resources.networks.tabs.tab2">
                <LongTextInput source="genesisBlock" />
            </FormTab>
            <FormTab label="resources.networks.tabs.tab3">
                <LongTextInput source="config" />
            </FormTab>
            <FormTab label="resources.networks.tabs.tab4">
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
        </TabbedForm>
    </Create>
);

