import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const NumericInput = ({inputValue, disabled, onChange}) => {
    useEffect(() => {
        if (inputValue) {
            setValue(inputValue);
        } else {
            setValue("");
        }
    }, [inputValue]);

    const [value, setValue] = useState(inputValue ? inputValue : "");

    const onInputChange = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            setValue(value);
            onChange(value);
        }
    };

    return (
        <Input value={value} disabled={disabled} onChange={onInputChange}></Input>
    )
}

export default NumericInput