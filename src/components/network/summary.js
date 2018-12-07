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
import PaperItem from './paperItem';
import PerItem from './perItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' , margin:50},
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};


const NetSummary = ({ classes, bgColor,record }) => 
(
        <div style={styles.flexColumn}>
            <div style={styles.flex}>
            <PaperItem label="组网节点" value="5"  />
                <PaperItem label="区块高度" value={record.blockCount} />
                <PaperItem label="交易数" value={record.transCount} />
                <PaperItem label="TPS" value={record.tps} />
                <PerItem  label="同步高度" value={record.syncHeight}  total={record.blockCount}/>
            </div>
        </div>
);

export default withStyles(styles)(NetSummary);