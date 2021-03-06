import * as React from 'react';
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px 0px`,
        fontSize: '0.8rem',
        borderRadius: '0.8rem',
        backgroundColor: '#e1deef',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }   
    }
}));

export default function Header(props) {
    const {tag, badge} = props;
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}  style ={{boxShadow: 'none'}}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item sm={6} style={{color: 'black', marginLeft: '20px', fontWeight:'bolder'}}>{tag}
                        {/* <InputBase
                            placeholder="Search topics"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                            fullWidth
                        /> */}
                    </Grid >
                    <Grid item sm></Grid>
                    <Grid item sm={1}>
                        <IconButton>
                            <Badge badgeContent={badge} color="secondary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
