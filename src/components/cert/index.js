import React from 'react';
import {
    ShowButton, Show, TabbedShowLayout, Tab, ReferenceField,
    Filter, DateInput, BooleanField, UrlField, DateField, Responsive,
    SimpleList, List, RichTextField, Datagrid, TextField, TextInput,
    SimpleForm, Create, FileField, FileInput, FormDataConsumer, required,
    FormTab, TabbedForm, Edit, LongTextInput, DisabledInput, EditButton,
    ShowView, ShowController, SaveButton
} from 'react-admin/lib';
import uuidV1 from 'uuid/v1';
import CertificateExpiryStatusField from '../keypair/CertificateExpiryStatusField';


const CertFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="cert.sn" alwaysOn />
        <DateInput source="created" />
    </Filter>
);

export const CertList_b = (props) => (
    <List {...props}
        filters={<CertFilter />}
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
                    <UrlField source="sn_cert" title="下载证书" />
                    <ReferenceField label="姓名" source="aid" reference="accounts">
                        <TextField source="name" />
                    </ReferenceField>
                    <BooleanField source="status" />
                    <DateField source="created" showTime />
                    <ShowButton />
                </Datagrid>
            }
        />
    </List>
);

const CertTitle = ({ record }) => {
    return <span> {record ? `"${record.cert.sn}"` : ''}</span>;
};

export const CertShow_b = (props) => (
    <Show title={<CertTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.keypairs.tabs.tab2">
                <RichTextField source="pub_cert" />
            </Tab>
            <Tab label="resources.keypairs.tabs.tab3">
                <RichTextField source="pub_key" />
                <RichTextField source="prv_key" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);


export const CertList = (props) => (
    <List {...props}
        filters={<CertFilter />}
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
                    <TextField source="cert.sn" title="证书标识" />
                    {/* <ReferenceField label="姓名" source="aid" reference="accounts"> */}
                    <TextField source="usrname" />
                    {/* </ReferenceField> */}
                    <TextField label="手机号" source="phone" />
                    <TextField label="邮箱" source="email" />
                    <DateField source="cert.validityEnd" showTime />
                    <CertificateExpiryStatusField label="证书有效状态" source="cert.validityEnd" />
                    {/* <DateField source="cert.created" showTime /> */}
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);


export const CertCreate = (props) => {
    const certImportDefaultValue = { cert: { sn: parseInt(uuidV1(), 16) } };
    return (
        <Create {...props}>
            <SimpleForm redirect='list'>
                <TextInput source="usrname" defalutValue="ISCAS" validate={required()} />
                <TextInput source="phone" defalutValue="010-6266****" validate={required()} />
                <TextInput source="email" defalutValue="iscas@iscas.ac.cn" validate={required()} />
                <FileInput source="certFile" label="导入证书" accept=".pem" validate={required()}>
                    <FileField source="import" title="title" />
                </FileInput>
            </SimpleForm>
        </Create>
    )
};


const SignField = ({ record = {} }) =>
    <div style={{ width: '800px', 'word-wrap': 'break-word' }}>
        <span>
            {'{"' + Buffer.from(record.cert.certPEM).toString('base64') + '\":\"' + Buffer.from(JSON.stringify({ name: record.usrname, email: record.email, phone: record.phone })).toString('base64') + '"}'}
        </span>
    </div>;
export const CertShow = (props) => (
    <Show title={<CertTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="resources.certsImport.tabs.tab1">
                <TextField label='用户姓名' source="usrname" />
                <TextField label='用户手机号' source="phone" />
                <TextField label='用户邮箱' source="email" />
                <TextField label='证书拥有者(Subject)' source="cert.distinguishName" />
                <TextField label='证书发行者(Issuer)' source="cert.distinguishName" />
                <TextField label='序列号(Serial Number)' source="cert.sn" />
                <DateField label='开始有效期(Valid From)' source="cert.validityStart" showTime />
                <DateField label='终止有效期(Valid Util)' source="cert.validityEnd" showTime />
                <TextField label='签名算法(Signature Alg)' source="cert.sigAlg" />
            </Tab>
            <Tab label="resources.certsImport.tabs.tab2">
                <TextField source="cert.certPEM" />
            </Tab>
            <Tab label="resources.certsImport.tabs.tab3">
                <SignField />
            </Tab>
        </TabbedShowLayout>
    </Show>
);



export const CertEdit = (props) => (
    <Edit title={<CertTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.certsImport.tabs.tab1" >
                <TextInput label='用户姓名' source="usrname" />
                <TextInput label='用户手机号' source="phone" />
                <TextInput label='用户邮箱' source="email" />
                <DisabledInput label='证书拥有者(Subject)' source="cert.distinguishName" />
                <DisabledInput label='证书发行者(Issuer)' source="cert.distinguishName" />
                <DisabledInput label='序列号(Serial Number)' source="cert.sn" />
                <DisabledInput label='开始有效期(Valid From)' source="cert.validityStart" />
                <DisabledInput label='终止有效期(Valid Util)' source="cert.validityEnd" />
                <DisabledInput label='签名算法(Signature Alg)' source="cert.sigAlg" />
            </FormTab>
            <FormTab label="resources.certsImport.tabs.tab2">
                <LongTextInput disabled label='证书PEM信息' source="cert.certPEM" />
            </FormTab>
        </TabbedForm>
    </Edit>
);
