import React from 'react';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/VpnKey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin/lib';
import { Link } from 'react-router-dom';
import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 20,
    },
    titleLink: { textDecoration: 'none', color: 'inherit' },
    card: {
        overflow: 'inherit',
        textAlign: 'right',
        padding: 16,
        minHeight: 52,
    },
};
const location = {
    pathname: 'keypairs',
    query: { filter: JSON.stringify({ status: 'pending' }) },
};

const dashKeypairs = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={ShoppingCartIcon} bgColor="#ff9800" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.keypair_info')}
            </Typography>
            <Typography variant="headline" component="h2">
                <Link to={location} className={classes.titleLink}>
                    {value} 
                </Link>
            </Typography>
        </Card>
    </div>
);

export default translate(withStyles(styles)(dashKeypairs));