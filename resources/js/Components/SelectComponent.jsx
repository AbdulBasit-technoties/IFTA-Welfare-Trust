import React from 'react';
import Select from 'react-select';

const SelectComponent = ({ options, value, onChange, className }) => {
    return (
        <Select
            options={options}
            value={options.find(option => option.value === value) || null}
            onChange={(selectedOption) => onChange(selectedOption.value)}
            className={className}
            classNamePrefix="select"
        />
    );
};

export default SelectComponent;
