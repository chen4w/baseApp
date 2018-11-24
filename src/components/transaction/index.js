import React from "react";
import SignSubmitButton from './SignSubmitButton';

import {
  Show, SelectInput,
  TabbedShowLayout,
  Tab, RadioButtonGroupInput,
  FormTab, ReferenceInput,
  TabbedForm, FormDataConsumer,
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

import {
  required,
} from 'react-admin';

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

export class TransCreate extends React.Component {
  constructor() {
    super();
    this.receiveMessage = this.receiveMessage.bind(this);
    this.state = {};
  }
  componentDidMount() {
    window.addEventListener("message", this.receiveMessage, false);
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.receiveMessage, false);
  }
  receiveMessage(event) {
    // For Chrome, the origin property is in the event.originalEvent
    // object. 
    var origin = event.origin || event.originalEvent.origin;
    console.log(event);
    this.setState({iptVal:event.data})
    if (origin !== "http://example.org:8080")
      return;
  }

  render() {
    const {iptVal} = this.state;
    return (
      <Create {...this.props}>
        <TabbedForm toolbar={null}>
          <FormTab label="resources.Transaction.tabs.tab1">
            <RadioButtonGroupInput label="合约类型" source="type2" defaultValue={"2"}
              choices={[
                { id: "1", name: 'CHAINCODE_DEPLOY' },
                { id: "2", name: 'CHAINCODE_INVOKE' }
              ]} />
            <TextInput source="cname" defaultValue="0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7" />
            <TextInput source="action" defaultValue="transfer" />
            <LongTextInput source="ipt" value={iptVal} defaultValue={iptVal} />
            <ReferenceInput label="密钥对" source="keypair" defaultValue={1}
              reference="keypairs" validate={required()} >
              <SelectInput optionText="cert.sn" optionValue="id" />
            </ReferenceInput>
            <TextInput label="密钥密码" source="keypair_pwd" defaultValue="" type="password" />
            <FormDataConsumer>
              {
                ({ formData, source, ...rest }) => (
                  <SignSubmitButton record={formData} source={source} />
                )
              }
            </FormDataConsumer>
          </FormTab>
        </TabbedForm>
      </Create>
    );
  }
}