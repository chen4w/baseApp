import React from 'react';
import {
    FormTab, TabbedForm, ReferenceField,
    Filter, DateInput, BooleanField,
    UrlField, DateField, FileInput, FileField, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, TextInput
} from 'react-admin/lib';

const KeypairFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <DateInput source="created" />
    </Filter>
);

export const KeypairList = (props) => (
    <List {...props}
        filters={<KeypairFilter />}
        bulkActions={false}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.sn}
                    secondaryText={record => record.desc}
                    tertiaryText={record => new Date(record.created).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <UrlField source="sn" title="下载密钥对" />
                    <UrlField source="sn_cert" title="下载证书" />
                    <ReferenceField label="姓名" source="aid" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                    <BooleanField source="status" />
                    <DateField source="created" showTime />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const KeypairTitle = ({ record }) => {
    return <span> {record ? `"${record.sn}"` : ''}</span>;
};

export const KeypairEdit = (props) => (
    <Edit title={<KeypairTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.keypairs.tabs.tab1">
                <DisabledInput source="id" />
                <TextInput source="sn" />
                <TextInput source="algorithm" />
                <FileInput source="files" label="导入密钥对" accept="application/pdf">
                    <FileField source="fimp" title="title" />
                </FileInput>
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab2">
                <LongTextInput source="pub_cert" />
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab3">
                <LongTextInput source="pub_key" />
                <LongTextInput source="prv_key" />
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab4">
                <TextInput source="pwd_old" type="password" />
                <TextInput source="pwd1" type="password" />
                <TextInput source="pwd2" type="password" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const KeypairCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.keypairs.tabs.tab1">
                <DisabledInput source="id" />
                <TextInput source="sn" />
                <TextInput source="algorithm" />
                <FileInput source="files" label="导入密钥对" accept="application/pdf">
                    <FileField source="fimp" title="title" />
                </FileInput>
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab2">
                <LongTextInput source="pub_cert" />
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab3">
                <LongTextInput source="pub_key" />
                <LongTextInput source="prv_key" />
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab4">
                <TextInput source="pwd1" type="password" />
                <TextInput source="pwd2" type="password" />
            </FormTab>
        </TabbedForm>
    </Create>
);

