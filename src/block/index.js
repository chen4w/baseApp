import React from 'react';
import {
    Filter, DateInput,
    Show, TabbedShowLayout, Tab,
    FormTab, TabbedForm, ReferenceField,
    ReferenceInput, SelectInput, RichTextField,
    DateField, Responsive, SimpleList, List, Create, Datagrid, TextField,
    ShowButton, ReferenceManyField, TextInput
} from 'react-admin/lib';

import { CardActions, CreateButton, RefreshButton } from 'react-admin';

const PostActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        <RefreshButton />
    </CardActions>
);

const BlockFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <DateInput source="created" />
    </Filter>
);

export const BlockList = (props) => (
    <List {...props}
        filters={<BlockFilter />}
        bulkActions={false}
        actions={<PostActions />}>

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
                    <TextField source="height" />
                    <TextField source="preHash" />
                    <ReferenceField label="组网" source="pid" reference="networks" linkType="show">
                        <TextField source="netId" />
                    </ReferenceField>

                    <DateField source="created" showTime />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const BlockTitle = ({ record }) => {
    return <span> {record ? `"${record.id}"` : ''}</span>;
};

export const BlockShow = (props) => (
    <Show title={<BlockTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.blocks.tabs.tab1">
                <TextField source="id" />
                <TextField source="height" />
                <TextField source="preHash" />
                <TextField source="transCount" />
                <DateField source="created" />
            </Tab>
            <Tab label="resources.blocks.tabs.tab2">
                <ReferenceManyField
                    reference="transactions"
                    target="bid"
                    addLabel={false}
                >
                    <Datagrid>
                        <TextField source="txId" />
                        <DateField source="created" />
                        <ShowButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);
