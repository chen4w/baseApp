import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

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
        color: 'white',
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    }

});


const PaperSheet = ({ label, value, classes }) => {
    const font_size =["display3","display2","display2","display1","headline"];
    const font_top = [15,25,30,35,40];
    let len = value?(value+"").length:1;
    let fsize = (len<=font_size.length)? font_size[len-1]:"title";
    let ftop =  (len<=font_size.length)? font_top[len-1]: 40;
    
    return (
    <div >
        <Paper className={classes.root} square={false}>
            <Typography className={classes.title}  variant={fsize} style={{paddingTop:ftop}}>
              {value}
            </Typography>
        </Paper>
        <Typography className={classes.description} variant="subheading" >
           {label}
        </Typography>
    </div>
)
}

export default withStyles(styles)(PaperSheet);
