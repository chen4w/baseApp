import React from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  FormTab,
  TabbedForm,
  ReferenceInput,
  Edit,
  UrlField,
  RichTextField,
  ReferenceField,
  SelectInput,
  ImageField,
  Responsive,
  SimpleList,
  List,
  Create,
  Datagrid,
  TextField,
  EditButton,
  LongTextInput,
  TextInput
} from "react-admin/lib";
import ApproveButton from "../node/ApproveButton";

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
          <UrlField source="seed" />
          <ApproveButton />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

const NetworkTitle = ({ record }) => {
  return <span> {record ? `"${record.name}"` : ""}</span>;
};

export const NetworkShow = props => (
  <Show title={<NetworkTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="resources.Network.tabs.tab1">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="seed" />
        <TextField source="rtGraph" />
      </Tab>
      <Tab label="resources.Network.tabs.tab2">
        <RichTextField source="genesisBlock" />
      </Tab>
      <Tab label="resources.Network.tabs.tab3">
        <RichTextField source="config" stripTags />
      </Tab>
      <Tab label="resources.Network.tabs.tab4">
        <ReferenceField
          label="信任证书列表"
          source="certList.id"
          reference="File"
        >
          <TextField source="title" />
        </ReferenceField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export const NetworkCreate = props => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="resources.Network.tabs.tab1">
        <TextInput source="name" />
        <TextInput source="seed" />
        <TextInput source="rtGraph" />
      </FormTab>
      <FormTab label="resources.Network.tabs.tab2">
        <LongTextInput source="genesisBlock" />
      </FormTab>
      <FormTab label="resources.Network.tabs.tab3">
        <LongTextInput source="config" />
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
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="resources.Network.tabs.tab1">
        <TextInput source="name" />
        <TextInput source="seed" />
        <TextInput source="rtGraph" />
      </FormTab>
      <FormTab label="resources.Network.tabs.tab2">
        <LongTextInput source="genesisBlock" />
      </FormTab>
      <FormTab label="resources.Network.tabs.tab3">
        <LongTextInput source="config" />
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
