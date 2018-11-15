import React from 'react';
import PaperItem from './paperItem';
import PerItem from './perItem';

import Card from '@material-ui/core/Card';

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