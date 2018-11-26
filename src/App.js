import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin/lib';

import { KeypairList, KeypairShow, KeypairEdit, KeypairCreate } from './components/keypair';
import { CertList, CertShow, CertCreate, CertEdit} from './components/cert';
import { TransList, TransShow, TransCreate } from './components/transaction';
import { NetworkList, NetworkShow, NetworkEdit, NetworkCreate } from './components/network';
import { NodeList, NodeEdit, NodeShow, NodeCreate } from './components/netpeer';
import { BlockList, BlockShow } from './components/block';
import { FileList, FileCreate, FileShow } from './components/file';

import KeypairIcon from '@material-ui/icons/VpnKey';
import CertIcon from '@material-ui/icons/CardMembership'
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
import indexDataProvider from './dataprovider/ra-data-indexdb'
import addUploadCapabilities from './dataprovider/addUploadFeature';
import createRealtimeSaga from "./createRealtimeSaga";
import settings from  './settings';

const messages = {
    cn: chineseMessages,
    en: englishMessages,
}
const i18nProvider = locale => messages[locale];



class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildGraphQLProvider({
            clientOptions: { uri: settings.Prisma.endpoint }
        }).then(dataProvider => {
            const upDataProvider = addUploadCapabilities(dataProvider)
            const realTimeSaga = createRealtimeSaga(upDataProvider);
            this.setState({
                customSagas: realTimeSaga,
                dataProvider: (type, resource, params) => {
                    if (resource === 'keypairs')
                        return addUploadCapabilities(indexDataProvider)(type, resource, params);
                    if(resource === 'certsImport')
                        return addUploadCapabilities(indexDataProvider)(type, resource, params);
                    return upDataProvider(type, resource, params);
                }
            }
            )
        }
        );
    }

    render() {
        const { dataProvider, customSagas,title } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider}
                title = {title}
                authProvider={authProvider}
                customSagas={[customSagas]}
                locale="cn" 
                i18nProvider={i18nProvider} 
                dashboard={Dashboard} >
                <Resource name="keypairs" list={KeypairList} show={KeypairShow} edit={KeypairEdit} create={KeypairCreate} icon={KeypairIcon} />
                <Resource name="certsImport" list={CertList} create={CertCreate} edit={CertEdit} show={CertShow} icon={CertIcon}/>
                <Resource name="Network" list={NetworkList} edit={NetworkEdit} show={NetworkShow} create={NetworkCreate} icon={NetworkIcon} />
                <Resource name="NetPeer" list={NodeList} edit={NodeEdit} show={NodeShow} create={NodeCreate} icon={NodeIcon} />
                <Resource name="Block" list={BlockList} show={BlockShow} icon={BlockIcon} />
                <Resource name="Transaction" list={TransList} show={TransShow} create={TransCreate} icon={TransIcon} />
                <Resource name="File" list={FileList} show={FileShow} create={FileCreate} icon={AttachIcon} />
            </Admin>
        );
    }
}
export default App;