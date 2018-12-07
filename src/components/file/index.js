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
import UploadSaveButton from './UploadSaveButton';

import {
  FormDataConsumer,
  ShowButton,
  Show,
  SimpleShowLayout,
  UrlField,
  FileInput,
  FileField,
  Filter,
  Responsive,
  SimpleList,
  List,
  Create,
  Datagrid,
  TextField,
  DisabledInput,
  SimpleForm,
  TextInput
} from "react-admin/lib";

const FileFilter = props => (
  <Filter {...props}>
    <TextInput label="title" source="title_contains" alwaysOn />
  </Filter>
);

export const FileList = props => (
  <List
    {...props}
    filters={<FileFilter />}
    bulkActions={false}
    sort={{ field: "id", order: "DESC" }}
  >
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
          <TextField source="title" />
          <TextField source="size" />
          <UrlField source="url" />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);

const FileTitle = ({ record }) => {
  return <span> {record ? `"${record.id}"` : ""}</span>;
};

export const FileCreate = props => (
  <Create {...props}>
    <SimpleForm toolbar={null}>
      <DisabledInput source="id" />
      <FileInput multiple source="pictures">
        <FileField source="src" title="title" />
      </FileInput>
      <FormDataConsumer>
        {
          ({ formData, ...rest }) => (
            <UploadSaveButton record={formData} />
          )
        }
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);

export const FileShow = props => (
  <Show title={<FileTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="size" />
      <FileField source="url" title="title" />
    </SimpleShowLayout>
  </Show>
);
