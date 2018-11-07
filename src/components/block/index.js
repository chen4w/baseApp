import React from 'react';
import {
    Filter, 
    Show, TabbedShowLayout, Tab,
    Responsive, SimpleList, List,  Datagrid, TextField,
    ShowButton, ReferenceManyField, TextInput
} from 'react-admin/lib';

import { CardActions, RefreshButton } from 'react-admin';

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
        <TextInput label="hash" source="hash" alwaysOn />
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
                    secondaryText={record => record.hash}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="hash" />
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
            <Tab label="resources.Block.tabs.tab1">
                <TextField source="id" />
                <TextField source="height" />
                <TextField source="preHash" />
                <TextField source="hash" />
            </Tab>
            <Tab label="resources.Block.tabs.tab2">
                <ReferenceManyField
                    reference="Transaction"                    
                    target="blocker"
                    addLabel={false}
                >
                    <Datagrid>
                        <TextField source="txId" />
                        <TextField source="blockId" />
                        <ShowButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>

        </TabbedShowLayout>
    </Show>
);
