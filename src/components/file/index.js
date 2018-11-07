import React from "react";
import {
  ShowButton,
  Show,
  SimpleShowLayout,
  UrlField,
  FileInput,
  FileField,
  Filter,
  SaveButton,
  Toolbar,
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

const PostCreateToolbar = props => (
  <Toolbar {...props}>
      <SaveButton
          label="确定"
          redirect="list"
          submitOnEnter={true}
      />
  </Toolbar>
);


export const FileCreate = props => (
  <Create {...props}>
    <SimpleForm toolbar={<PostCreateToolbar />}>
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
