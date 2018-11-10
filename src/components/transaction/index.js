import React from 'react';
import {
    Show, TabbedShowLayout, Tab,
    FormTab, TabbedForm,
    Filter, RichTextField,
    DateField, Responsive, SimpleList, List, Create, Datagrid, TextField,
    ShowButton, LongTextInput, TextInput
} from 'react-admin/lib';

const TransFilter = props => (
    <Filter {...props}>
        <TextInput label="txId" source="txId_contains" alwaysOn />
    </Filter>
);

export const TransList = (props) => (
    <List {...props}
        filters={<TransFilter />}
        sort={{ field: "timeStamp", order: "DESC" }}
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
                    <DateField source="timeStamp" showTime />
                    <TextField source="txId" />
                    <TextField source="cname" />
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
            <Tab label="resources.Transaction.tabs.tab1">
                <TextField source="id" />
                <TextField source="txId" />
                <TextField source="blockId" />
                <TextField source="signature" />
                <DateField source="timeStamp" />
            </Tab>
            <Tab label="resources.Transaction.tabs.tab2">
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
            <FormTab label="resources.Transaction.tabs.tab2">
                <TextInput source="cid" />
                <TextInput source="action" />
                <LongTextInput source="ipt" />
            </FormTab>
        </TabbedForm>
    </Create>
);

