import React from 'react';
import { Admin, Resource } from 'react-admin/lib';

import { CertList, CertShow } from './cert';
import { KeypairList, KeypairEdit, KeypairCreate } from './keypair';
import { AccountList, AccountEdit, AccountCreate } from './account';
import { TransList, TransShow, TransCreate } from './transaction';
import { NetworkList, NetworkShow, NetworkCreate } from './network';
import { NodeList, NodeShow, NodeCreate } from './node';
import { BlockList, BlockShow } from './block';

import CertIcon from '@material-ui/icons/Description';
import KeypairIcon from '@material-ui/icons/VpnKey';
import AccountIcon from '@material-ui/icons/Group';
import TransIcon from '@material-ui/icons/Cached';
import NetworkIcon from '@material-ui/icons/GroupWork';
import NodeIcon from '@material-ui/icons/Computer';
import BlockIcon from '@material-ui/icons/ViewColumn';

import Dashboard from './dashboard/Dashboard';

import authProvider from './authProvider';
import englishMessages from 'ra-language-english';
import chineseMessages from './i18n/cn';

import  dataProvider2 from './fake/fdp'
const messages = {
    cn: chineseMessages,
    en: englishMessages,
}
const i18nProvider = locale => messages[locale];


//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


const App = () => (
    <Admin title="RepChain基础服务" locale="cn" i18nProvider={i18nProvider} dashboard={Dashboard} 
    dataProvider={dataProvider2} authProvider={authProvider}>
        <Resource name="certs" list={CertList}  show={CertShow} icon={CertIcon}/>
        <Resource name="keypairs" list={KeypairList}  edit={KeypairEdit} create={KeypairCreate} icon={KeypairIcon}/>
        <Resource name="accounts" list={AccountList}  edit={AccountEdit} create={AccountCreate} icon={AccountIcon}/>
        <Resource name="networks" list={NetworkList}  show={NetworkShow} create={NetworkCreate} icon={NetworkIcon}/>
        <Resource name="nodes" list={NodeList}  show={NodeShow} create={NodeCreate} icon={NodeIcon}/>
        <Resource name="blocks" list={BlockList}  show={BlockShow}  icon={BlockIcon}/>
        <Resource name="transactions" list={TransList}  show={TransShow} create={TransCreate} icon={TransIcon}/>
    </Admin>
);
export default App;