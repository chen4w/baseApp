import React from "react";
import {
  Show,SelectInput,
  TabbedShowLayout,
  Tab,
  FormTab,
  TabbedForm,
  Filter,
  RichTextField,
  DateField,
  Responsive,
  SimpleList,
  List,
  Create,
  Datagrid,
  TextField,
  ShowButton,
  LongTextInput,
  TextInput
} from "react-admin/lib";

const TransFilter = props => (
  <Filter {...props}>
    <TextInput label="txId" source="txId_contains" alwaysOn />
  </Filter>
);

export const TransList = props => (
  <List
    {...props}
    filters={<TransFilter />}
    sort={{ field: "timeStamp", order: "DESC" }}
    bulkActions={false}
  >
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
          <DateField source="timeStamp" showTime />
          <TextField source="txId" />
          <TextField source="cname" />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);

const TransTitle = ({ record }) => {
  return <span> {record ? `"${record.txId}"` : ""}</span>;
};

export const TransShow = props => (
  <Show title={<TransTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="resources.Transaction.tabs.tab1">
        <TextField source="id" />
        <TextField source="txId" />
        <TextField source="blockId" />
        <TextField source="signature" />
        <DateField source="timeStamp" />
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

export const TransCreate = props => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="resources.Transaction.tabs.tab2">
        <TextInput source="cid" defaultValue="0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7"/>
        <TextInput source="action" defaultValue="房源发布"/>
        <LongTextInput source="ipt" defaultValue=""/>
        <SelectInput
          source="keypair"
          choices={[
            { id: "	4cd83091601a015f0dee33065cff48b262ccf504", name: "737055008" },
            { id: "4cd83091601a015f0dee33065cff48b262ccf504", name: "2980082304" },
            { id: "5fd5c2d622b658e9fca4406a8317ad2acdc82ae4", name: "2320512304" }
          ]}
        />
      </FormTab>
    </TabbedForm>
  </Create>
);
