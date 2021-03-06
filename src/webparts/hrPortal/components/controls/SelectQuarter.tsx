import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function SelectQuarter(props) {

    const { name, label, value,error=null, onChange, options, key, itemValue, itemData } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                <MenuItem key="First Quarter" value="First Quarter">First Quarter</MenuItem>
                <MenuItem key="Second Quarter" value="Second Quarter">Second Quarter</MenuItem>
                <MenuItem key="Third Quarter" value="Third Quarter">Third Quarter</MenuItem>
                <MenuItem key="Fourth Quarter" value="Fourth Quarter">Fourth Quarter</MenuItem>
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}


