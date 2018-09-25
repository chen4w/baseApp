import React from 'react';
import {
    FormTab, TabbedForm, ReferenceField, FormDataConsumer, RadioButtonGroupInput, SelectInput,
    Filter, DateInput, BooleanField,
    UrlField, DateField, FileInput, FileField, Responsive, SimpleList, List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, TextInput
} from 'react-admin/lib';

const KeypairFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="sn" alwaysOn />
        <DateInput source="createdAt" />
    </Filter>
);

export const KeypairList = (props) => (
    <List {...props}
        filters={<KeypairFilter />}
        bulkActions={false}
        //sort={{field: 'id', sort: 'ASC'}}
        >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.sn}
                    secondaryText={record => record.desc}
                    tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <UrlField source="sn" title="下载密钥对" />
                    <UrlField source="sn_cert" title="下载证书" />
                   <BooleanField source="status" />
                    <DateField source="createdAt" showTime />
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
                <DisabledInput source="sn" />
                <DisabledInput label='生成算法名称' source="alg.name" />
                <DisabledInput label='生成算法参数' source="alg.param" />
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

const createMethodChoices=[{id: 'new', name: '新生成'}, {id: 'import', name: '导入已有'}]
const cryptoAlgNameChoices=[{id: 'EC', name: 'EC'},{id: 'RSA', name: 'RSA'}]
const cryptoAlgParamECChoices=[{id: 'secp256r1', name: 'secp256r1'},{id: 'secp256k1', name: 'secp256k1'}]
const cryptoAlgParamRSAChoices=[{id: '1024', name: '1024'},{id: '2048', name: '2048'}]

export const KeypairCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.keypairs.tabs.tab1">
                {/*
                <DisabledInput source="id" />
                <TextInput source="sn" />
                <TextInput source="alg" />
                */}
                <RadioButtonGroupInput label='新建方式' source='createMethod' choices={createMethodChoices}/>
                <FormDataConsumer>
                    {
                        ({formData, ...rest}) => {
                            const method = formData.createMethod
                            if(method && method === 'new')
                                return <RadioButtonGroupInput label='非对称密钥算法' source='alg.name' choices={cryptoAlgNameChoices}/>
                            if(method && method === 'import')
                                return (
                                    <FileInput source="files" label="导入密钥对" accept="application/pdf">
                                        <FileField source="fimp" title="title" />
                                    </FileInput>
                                )
                            return null
                        }
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {
                        ({formData, ...rest}) => {
                            const alg = formData.alg
                            const method = formData.createMethod
                            if(alg && alg.name === 'EC' && method === 'new')
                                return <SelectInput label='曲线名' source='alg.param' choices={cryptoAlgParamECChoices} {...rest}/>
                            if(alg && alg.name === 'RSA' && method === 'new')
                                return <SelectInput label='密钥长度' source='alg.param' choices={cryptoAlgParamRSAChoices} {...rest} />
                            return null
                        }
                    }
                </FormDataConsumer>
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