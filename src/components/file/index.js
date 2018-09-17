import React from "react";
import {
  ShowButton,
  Show,
  SimpleShowLayout,
  UrlField,
  FileInput,
  FileField,
  Filter,
  DateField,
  DateInput,
  Responsive,
  SimpleList,
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  DisabledInput,
  SimpleForm,
  TextInput
} from "react-admin/lib";

const FileFilter = props => (
  <Filter {...props}>
    <TextInput label="name" source="name" alwaysOn />
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
    <SimpleForm>
      <DisabledInput source="id" />
      <FileInput multiple source="pictures">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const FileShow = props => (
  <Show title={<FileTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      
    </SimpleShowLayout>
  </Show>
);
