import React from 'react';
import AvtarItem from './avtarItem';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        float: 'left',
        margin: '-20px 20px 0 15px',
        zIndex: 100,
        borderRadius: 3,
    },
    icon: {
        float: 'right',
        width: 54,
        height: 54,
        padding: 14,
        color: '#fff',
    },
};

const NetSummary = ({ Icon, classes, bgColor }) => (
    <Card className={classes.card} style={{ backgroundColor: bgColor }}>
       <AvtarItem />
       <CircularProgress className={classes.progress} variant="static" value={75}size={100}>
            3332/3234342
       </CircularProgress>
    </Card>
);

export default withStyles(styles)(NetSummary);