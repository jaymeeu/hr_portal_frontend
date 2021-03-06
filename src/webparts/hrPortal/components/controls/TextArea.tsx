import * as React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function TextArea(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextareaAutosize
            style={{width:'100%', height: '50px'}}
            aria-label="minimum height" rowsMax={3}
            variant="outlined"
            size='small'
            label={label}
            name={name}
            value={value}
            onChange={onChange}
                {...other}
                {...(error && {error:true,helperText:error})}
            />
    )
}
