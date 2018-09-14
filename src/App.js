import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin/lib';

import { CertList, CertShow } from './components/cert';
import { KeypairList, KeypairEdit, KeypairCreate } from './components/keypair';
import { AccountList, AccountEdit, AccountCreate } from './components/account';
import { TransList, TransShow, TransCreate } from './components/transaction';
import { NetworkList, NetworkShow, NetworkCreate } from './components/network';
import { NodeList, NodeShow, NodeCreate } from './components/node';
import { BlockList, BlockShow } from './components/block';
import { FileList, FileCreate } from './components/file';

import CertIcon from '@material-ui/icons/Description';
import KeypairIcon from '@material-ui/icons/VpnKey';
import AccountIcon from '@material-ui/icons/Group';
import TransIcon from '@material-ui/icons/Cached';
import NetworkIcon from '@material-ui/icons/GroupWork';
import NodeIcon from '@material-ui/icons/Computer';
import BlockIcon from '@material-ui/icons/ViewColumn';
import AttachIcon from '@material-ui/icons/AttachFile';
import Dashboard from './components/dashboard/Dashboard';

import authProvider from './authProvider';
import englishMessages from './i18n/cn';
import chineseMessages from './i18n/cn';

//import  dataProvider from './dataprovider/data-provider'
import buildGraphQLProvider from './adaptator';
import  fakeDataProvider from './dataprovider/fdp'
import addUploadCapabilities from './dataprovider/addUploadCapabilities';


const messages = {
    cn: chineseMessages,
    en: englishMessages,
}
const i18nProvider = locale => messages[locale];

/*const App = () => (
    <Admin title="RepChain基础服务" locale="cn" i18nProvider={i18nProvider} dashboard={Dashboard} 
    dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="certs" list={CertList}  show={CertShow} icon={CertIcon}/>
        <Resource name="keypairs" list={KeypairList}  edit={KeypairEdit} create={KeypairCreate} icon={KeypairIcon}/>
        <Resource name="accounts" list={AccountList}  edit={AccountEdit} create={AccountCreate} icon={AccountIcon}/>
        <Resource name="networks" list={NetworkList}  show={NetworkShow} create={NetworkCreate} icon={NetworkIcon}/>
        <Resource name="nodes" list={NodeList}  show={NodeShow} create={NodeCreate} icon={NodeIcon}/>
        <Resource name="Block" list={BlockList}  show={BlockShow}  icon={BlockIcon}/>
        <Resource name="transactions" list={TransList}  show={TransShow} create={TransCreate} icon={TransIcon}/>
    </Admin>
);*/



class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildGraphQLProvider({
            clientOptions: { uri: 'http://localhost:4466/' }
          }).then(dataProvider => {
              const upDataProvider = addUploadCapabilities(dataProvider)
               this.setState({
                    dataProvider: (type, resource, params) => {
                        console.log('resource name:'+resource)
                        if(resource=='keypairs')
                            return fakeDataProvider(type, resource, params);
                        else
                            return upDataProvider(type, resource, params);
                    }   
                }                
               )
            }
        );
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider} title="RepChain基础服务" authProvider={authProvider}
            locale="cn" i18nProvider={i18nProvider} dashboard={Dashboard} >
                <Resource name="keypairs" list={KeypairList}  edit={KeypairEdit} create={KeypairCreate} icon={KeypairIcon}/>
                <Resource name="Network" list={NetworkList}  show={NetworkShow} create={NetworkCreate} icon={NetworkIcon}/>
                <Resource name="NetPeer" list={NodeList}  show={NodeShow} create={NodeCreate} icon={NodeIcon}/>
                 <Resource name="Block" list={BlockList}  show={BlockShow}  icon={BlockIcon}/>
                 <Resource name="Transaction" list={TransList}  show={TransShow} create={TransCreate} icon={TransIcon}/>
                 <Resource name="File" list={FileList}   create={FileCreate} icon={AttachIcon}/>
            </Admin>
        );
    }
}
export default App;