import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import * as React from 'react';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

const Popup =(props)=>{
    const {head, children, openPopup, setopenPopup} = props;
    return(
        <Dialog open={openPopup} maxWidth="sm">
            <DialogTitle>
                <div style={{display:"flex"}}>
                <Typography variant="h6" component="div" style={{flexGrow:1}}>
                  {head}
                </Typography>
                <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setopenPopup(false)}}>
                        <CloseIcon/>
                </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent> 
        </Dialog>
    )
}
export default Popup;