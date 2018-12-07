/*
 * Copyright  2018 Linkel Technology Co., Ltd, Beijing
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BA SIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
    Filter, DateField,
    Show, TabbedShowLayout, Tab,
    Responsive, SimpleList, List, Datagrid, TextField,
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
        <TextInput label="hash" source="hash_contains" alwaysOn />
    </Filter>
);

export const BlockList = (props) => (
    <List {...props}
        filters={<BlockFilter />}
        sort={{ field: "timeStamp", order: "DESC" }}
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
                    <DateField source="timeStamp" showTime />
                    <TextField source="hash" />
                    <TextField source="transCount" />

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
                <DateField source="timeStamp" />
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
