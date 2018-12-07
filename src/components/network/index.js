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
import React from "react";
import NetSummary from "./summary";

import {
  Show,
  FormTab,
  TabbedForm,
  ReferenceInput,
  Edit,
  SelectInput,
  Responsive,
  SimpleList,
  List,
  Create,
  Datagrid,
  TextField,
  EditButton,
  TextInput
} from "react-admin/lib";

export const NetworkList = props => (
  <List {...props} bulkActions={false}>
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
          <TextField source="seedip" />
          <TextField source="blockCount" />
          <TextField source="transCount" />
          <TextField source="syncHeight" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

const NetworkTitle = ({ record }) => {
  return <span> 组网{record ? ` "${record.name}"` : ""}</span>;
};

export const NetworkShow = (props) => (
  <Show  title={<NetworkTitle/>}  actions={null} {...props}>
    <NetSummary {...props} />
  </Show>
)


export const NetworkCreate = props => (
  <Create {...props}>
    <TabbedForm redirect="list">
      <FormTab label="resources.Network.tabs.tab1">
        <TextInput source="name" />
        <TextInput source="seedip" />
      </FormTab>
      <FormTab label="resources.Network.tabs.tab2">
        <ReferenceInput
          label="创世块文件"
          source="genesisBlock.id"
          reference="File"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="resources.Network.tabs.tab4">
        <ReferenceInput
          label="信任证书列表"
          source="certList.id"
          reference="File"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Create>
);

export const NetworkEdit = props => (
  <Edit title={<NetworkTitle/>} {...props}>
    <TabbedForm>
      <FormTab label="resources.Network.tabs.tab1">
        <TextInput source="name" />
        <TextInput source="seedip" />
      </FormTab>
      <FormTab label="resources.Network.tabs.tab2">
        <ReferenceInput
          label="创世块文件"
          source="genesisBlock.id"
          reference="File"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
      </FormTab>

      <FormTab label="resources.Network.tabs.tab4">
        <ReferenceInput
          label="信任证书列表"
          source="certList.id"
          reference="File"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);
