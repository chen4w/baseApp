import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        //paddingTop: theme.spacing.unit * 2,
        //paddingBottom: theme.spacing.unit * 2,
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        position: 'relative',
        rounded: true,
        borderRadius: '50%',
        backgroundColor: "#33cccc"
    },
    title: {
        paddingTop: 40,
        color: 'white',
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    }

});


const PaperSheet = ({ label, value, classes }) => (
    <div >
        <Paper className={classes.root} square={false}>
            <Typography className={classes.title} variant="title" component="h3">
              {value}
            </Typography>
        </Paper>
        <Typography className={classes.description} variant="caption" noWrap={true}>
           {label}
        </Typography>
    </div>
)

export default withStyles(styles)(PaperSheet);
