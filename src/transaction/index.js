import React from 'react';
import {
    Show,TabbedShowLayout,Tab,
    FormTab, TabbedForm, ReferenceField,
    Filter, DateInput, RichTextField,
    DateField, Responsive, SimpleList, List, Create, Datagrid, TextField,
     ShowButton, LongTextInput, TextInput
} from 'react-admin/lib';

const TransFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <DateInput source="created" />
    </Filter>
);

export const TransList = (props) => (
    <List {...props}
        filters={<TransFilter />}
        bulkActions={false}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.txId}
                    secondaryText={record => record.blockId}
                    tertiaryText={record => new Date(record.created).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="姓名" source="aid" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="区块" source="bid" reference="blocks"  linkType="show">
                        <TextField source="height" />
                    </ReferenceField>
                    <TextField source="txId" />
                    <DateField source="created" showTime />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const TransTitle = ({ record }) => {
    return <span> {record ? `"${record.txId}"` : ''}</span>;
};

export const TransShow = (props) => (
    <Show title={<TransTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.transactions.tabs.tab1">
                <TextField source="id" />
                <TextField source="txId" />
                <TextField source="blockId" />
                <DateField source="created" />
            </Tab>
            <Tab label="resources.transactions.tabs.tab2">
                <TextField source="cid" />
                <TextField source="cname" />
                <TextField source="action" />
                <RichTextField source="ipt" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const TransCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.transactions.tabs.tab2">
                <TextInput source="cid" />
                <TextInput source="action" />
                <LongTextInput source="ipt" />
            </FormTab>
        </TabbedForm>
    </Create>
);

