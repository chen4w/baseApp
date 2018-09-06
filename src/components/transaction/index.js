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
        <TextInput label="txId" source="txId" alwaysOn />
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
                    <TextField source="txId" />
                    <TextField source="cname" />
                    <DateField source="timeStamp" showTime/>                    
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
                <DateField source="created" />
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

