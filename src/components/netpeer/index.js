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
    Show, TabbedShowLayout, Tab,Edit,EditButton,
    FormTab, TabbedForm, ReferenceField,
    ReferenceInput, SelectInput, 
    Responsive, SimpleList, List, Create, Datagrid, TextField,
    TextInput
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
                    <EditButton />
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
        <TabbedForm  redirect="list">
            <FormTab label="resources.Network.tabs.tab1">
                <TextInput source="nodename" />
                <TextInput source="seedip" />
                <TextInput source="rtGraph" />
            </FormTab>

            <FormTab label="resources.Network.tabs.tab6">
                <ReferenceInput
                label="私钥文件"
                source="keypair.id"
                reference="File"
                >
                <SelectInput optionText="title" />
                </ReferenceInput>
            </FormTab>
            
            <FormTab label="resources.Network.tabs.tab3">
                <ReferenceInput
                label="配置文件"
                source="config.id"
                reference="File"
                >
                <SelectInput optionText="title" />
                </ReferenceInput>
            </FormTab>
        </TabbedForm>
    </Create>
);


export const NodeEdit = props => (
    <Edit {...props}>
      <TabbedForm>
            <FormTab label="resources.Network.tabs.tab1">
                <TextField source="nodename" />
                <TextField source="seedip" />
                <TextInput source="rtGraph" />
            </FormTab>

            <FormTab label="resources.Network.tabs.tab6">
                <ReferenceInput
                label="私钥文件"
                source="keypair.id"
                reference="File"
                >
                <SelectInput optionText="title" />
                </ReferenceInput>
            </FormTab>
            
            <FormTab label="resources.Network.tabs.tab3">
                <ReferenceInput
                label="配置文件"
                source="config.id"
                reference="File"
                >
                <SelectInput optionText="title" />
                </ReferenceInput>
            </FormTab>
        </TabbedForm>
    </Edit>
  );
  


