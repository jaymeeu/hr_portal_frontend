import * as React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

export default function CheckboxMUI(props) {

    const { name, label, value, onChange } = props;

    return (
        <FormControl>
            <FormControlLabel
                control=
                {<MuiCheckbox
                    name={name}
                    color="primary"
                   onChange={onChange}
                />}
                label={label}
            />
        </FormControl>
    )
}
