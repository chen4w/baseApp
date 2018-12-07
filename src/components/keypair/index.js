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
import React from 'react';
import {
    FormTab, TabbedForm, TabbedShowLayout, Tab, SimpleForm, ReferenceField, FormDataConsumer, RadioButtonGroupInput, SelectInput,
    Filter, BooleanField, NumberField, ArrayInput, SimpleFormIterator,
    UrlField, DateField, FileInput, FileField, Responsive, SimpleList, List, ShowController, ShowView, Edit, Create, 
    Datagrid, TextField, ShowButton, EditButton, DisabledInput, LongTextInput, TextInput, NumberInput,
} from 'react-admin/lib';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import zhLocale from 'date-fns/locale/zh-CN';
import { DateTimeInput, DateInput } from 'react-admin-date-inputs'
import { required } from 'react-admin'
import PEMTextField from './PEMTextField'
import uuidV1 from 'uuid/v1'
import EditSaveButton from './EditSaveButton';
import SaveAsButton from './SaveAsButton'
import DownloadUrlField from './DownloadUrlField';
import CertificateExpiryStatusField from './CertificateExpiryStatusField';
import PEMContentPanelField from './PEMContentPanelField';
import { Divider } from '@material-ui/core';

const KeypairFilter = props => (
    <Filter {...props}>
        <TextInput source="kp.sn" alwaysOn />
        <TextInput source="cert.sn" />
        <SelectInput
            label="证书状态"
            source='cert.validityEnd'
            choices={[{ id: "unExpired", name: "未过期" }, { id: "expired", name: "已过期" }]}
        />
        <DateInput label="生成时间" source="createdAtLocale" options={{ format: "YYYY/MM/dd", showTodayButton: true }} providerOptions={{ utils: DateFnsUtils, locale: zhLocale }} />
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
                    primaryText={record => record.kp.sn}
                    secondaryText={record => record.cert.sn}
                    tertiaryText={record => new Date(record.createdAt).toLocaleDateString()}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <DownloadUrlField source="kp.sn" title="下载密钥对" />
                    <DownloadUrlField source="cert.sn" title="下载证书" />
                    <CertificateExpiryStatusField label="证书有效状态" source="cert.validityEnd" />
                    <DateField source="createdAt" showTime />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);

const KeypairTitle = ({ record }) => {
    return <span> {record ? `"${record.kp.sn}"` : ''}</span>;
};

export const KeypairShow = (props) => (
    <ShowController title={<KeypairTitle />} {...props}>
        {
            controllerProps => ( 
            <ShowView {...props} {...controllerProps}> 
                <TabbedShowLayout>
                    <Tab label="resources.keypairs.tabs.tab1">
                        <NumberField source="id" />
                        <TextField source="kp.sn" />
                        <TextField source="kp.alg.name" />
                        <TextField source="kp.alg.param" />
                    </Tab>
                    <Tab label="resources.keypairs.tabs.tab2">
                            <TextField label='证书拥有者(Subject)' source="cert.distinguishName" id="certSubject" />
                            <TextField label='证书发行者(Issuer)' source="cert.distinguishName" id="certIssuer"/>
                            <TextField label='序列号(Serial Number)' source="cert.sn" />
                            <DateField label='开始有效期(Valid From)' source="cert.validityStart" showTime />
                            <DateField label='终止有效期(Valid Util)' source="cert.validityEnd" showTime />
                            <TextField label='签名算法(Signature Alg)' source="cert.sigAlg" />
                            <PEMContentPanelField source="cert.certPEM" />
                    </Tab>
                    <Tab label="resources.keypairs.tabs.tab3">
                        <PEMTextField label='PEM格式公钥' source="kp.pubKeyPEM" />
                        <SaveAsButton source='kp.pubKeyPEM' />
                            <div style={{ height: '25px' }} />
                        <Divider />
                        {
                            controllerProps.record &&
                            <PEMTextField label={`PEM格式私钥${/ENCRYPTED/i.test(controllerProps.record.kp.prvKeyPEM) ? 
                                    '(**已加密)' : '(!!未加密)'}`}
                                source="kp.prvKeyPEM"
                            />
                        }
                        <SaveAsButton source='kp.prvKeyPEM' />
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
            )
        }
    </ShowController>
)


export const KeypairEdit = (props) => (
    <Edit title={<KeypairTitle />} {...props}>
        <TabbedForm toolbar={null}>
            <FormTab label="resources.keypairs.tabs.tab1">
                <DisabledInput source="id" />
                <DisabledInput label='密钥对编号' source="kp.sn" />
                <DisabledInput label='生成算法名称' source="kp.alg.name" />
                <DisabledInput label='生成算法参数' source="kp.alg.param" />
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab2">
                <DisabledInput label='证书拥有者(Subject)' source="cert.distinguishName" id="certSubject" />
                <DisabledInput label='证书发行者(Issuer)' source="cert.distinguishName" id="certIssuer"/>
                <DisabledInput label='序列号(Serial Number)' source="cert.sn" />
                <DisabledInput label='开始有效期(Valid From)' source="cert.validityStart" />
                <DisabledInput label='终止有效期(Valid Util)' source="cert.validityEnd" />
                <DisabledInput label='签名算法(Signature Alg)' source="cert.sigAlg" />
                <LongTextInput disabled label='证书PEM信息' source="cert.certPEM" />
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab3">
                <LongTextInput disabled label='公钥PEM信息' source="kp.pubKeyPEM" />
                <LongTextInput source="kp.prvKeyPEM" style={{ display: 'none' }} />
                <FormDataConsumer>
                    {
                        ({ formData, ...rest }) => {
                            const isEncrypted = /ENCRYPTED/.test(formData.kp.prvKeyPEM)
                            return <LongTextInput disabled label={`私钥PEM信息${isEncrypted ? '(**已加密)' : '(**未加密)'}`} source="kp.prvKeyPEM" />
                        }
                    }
                </FormDataConsumer>
            </FormTab>
            <FormTab label="resources.keypairs.tabs.tab4">
                <FormDataConsumer>
                    {
                        ({ formData, ...rest }) => {
                            const isEncrypted = /ENCRYPTED/.test(formData.kp.prvKeyPEM)
                            return isEncrypted ? <TextInput label='旧密码' source="kp.pwdOld" type="password" {...rest} /> : null
                        }
                    }
                </FormDataConsumer>
                <TextInput source="kp.pwd1" type="password" />
                <TextInput source="kp.pwd2" type="password" />
                <FormDataConsumer>
                    {
                        ({ formData, ...rest }) => (
                            <EditSaveButton type={'UPDATE'} record={formData} />
                        )
                    }
                </FormDataConsumer>

            </FormTab>
        </TabbedForm>
    </Edit>
);

const createMethodChoices = [{ id: 'new', name: '新生成' }, { id: 'import', name: '导入已有' }]
const cryptoAlgNameChoices = [{ id: 'EC', name: 'EC' }, { id: 'RSA', name: 'RSA' }]
const cryptoAlgParamECChoices = [{ id: 'secp256r1', name: 'secp256r1' }, { id: 'secp256k1', name: 'secp256k1' }]
const cryptoAlgParamRSAChoices = [{ id: '1024', name: '1024' }, { id: '2048', name: '2048' }]
const certSignatureAlgECChoices = [{ id: 'SHA1withECDSA', name: 'SHA1withECDSA' }, { id: 'SHA256withECDSA', name: 'SHA256withECDSA' }]
const certSignatureAlgRSAChoices = [{ id: 'SHA1withRSA', name: 'SHA1withRSA' }, { id: 'SHA256withRSA', name: 'SHA256withRSA' }]
const certDNAttributeNameChoices = [
    { id: 'CN', name: 'Common Name (CN)' }, 
    { id: 'OU', name: 'Organization Unit (OU)' },
    { id: 'O', name: 'Organization Name (O)' },
    { id: 'L', name: 'Locality Name (L)' },
    { id: 'S', name: 'State Name (S)' },
    { id: 'C', name: 'Country (C)' },
    { id: 'E', name: 'Email (E)' },
    { id: 'UID', name: 'User ID (E)' },
]

export const KeypairCreate = (props) => {
    const keypairDefaultValue={cert: {sn : parseInt(uuidV1(), 16)}}
    return (
    <Create {...props}>
        <SimpleForm redirect="list" defaultValue={keypairDefaultValue} >
            <RadioButtonGroupInput label='新建方式' source='createMethod' choices={createMethodChoices} validate={required()}/>
            <FormDataConsumer>
                {
                    ({formData, ...rest}) => {
                        const method = formData.createMethod
                        if(method === 'new')
                            return <RadioButtonGroupInput label='非对称密钥算法' source='kp.alg.name' choices={cryptoAlgNameChoices} validate={required()} {...rest}/>
                        if(method === 'import')
                            return (
                                <FileInput source="keypairFile" label="导入密钥对" accept=".pem" validate={required()} {...rest}>
                                    <FileField source="fimp" title="title" />
                                </FileInput>
                            )
                        else
                            return null
                    }
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {
                    ({formData, ...rest}) => {
                        const kp = formData.kp
                        const method = formData.createMethod
                        if(kp && kp.alg && kp.alg.name === 'EC' && method === 'new')
                            return <SelectInput label='曲线名' source='kp.alg.param' choices={cryptoAlgParamECChoices} validate={required()} {...rest}/>
                        if(kp && kp.alg && kp.alg.name === 'RSA' && method === 'new')
                            return <SelectInput label='密钥长度' source='kp.alg.param' choices={cryptoAlgParamRSAChoices} validate={required()} {...rest} />
                        else
                            return null
                    }
                }
            </FormDataConsumer>
            <FormDataConsumer>
                {
                    ({formData, ...rest}) => {
                        const kp = formData.kp
                        const method = formData.createMethod
                        if(method === 'new' && kp && kp.alg && kp.alg.name && kp.alg.param){
                            return (
                                <div style={{display: 'inline-grid'}}>
                                    <TextInput label='私钥保护密码' source="kp.pwd1" type="password" />
                                    <TextInput label='私钥保护密码确认' source="kp.pwd2" type="password" />
                                    <NumberInput label='证书序列号' source='cert.sn' validate={required()}/>
                                    {
                                        kp.alg.name === 'EC' ?
                                            <SelectInput label='证书签名算法' source='cert.sigAlg' choices={certSignatureAlgECChoices} validate={required()} {...rest}/>
                                            :
                                            <SelectInput label='证书签名算法' source='cert.sigAlg' choices={certSignatureAlgRSAChoices} validate={required()} {...rest}/>

                                    }
                                    <DateTimeInput label='证书起始有效期' source='cert.validityStart' validate={required()} options={{format: 'YYYY/MM/dd, HH:mm:ss', showTodayButton: true}}
                                        providerOptions={{utils: DateFnsUtils, locale: zhLocale}} {...rest}/>
                                    <DateTimeInput label='证书终止有效期' source='cert.validityEnd' validate={required()} options={{format: 'YYYY/MM/dd, HH:mm:ss', showTodayButton: true}}
                                        providerOptions={{utils: DateFnsUtils, locale: zhLocale}} {...rest}/>
                                    <ArrayInput label="证书拥有者/发行者识别名" source="cert.distinguishNameAttributes" validate={required()}>
                                        <SimpleFormIterator>
                                            <SelectInput label="属性" source="name" choices={certDNAttributeNameChoices} validate={required()} />
                                            <TextInput label="值" source="value" validate={required()} />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </div>
                            )
                        }
                        else
                            return null
                    }
                }
            </FormDataConsumer>
        </SimpleForm>
    </Create>
    )
};