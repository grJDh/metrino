import React from 'react';

import styled from 'styled-components';

const StyledSelect= styled.select`
`;

const Dropdown = ({ onFunc, value, name, options }) => {

  return (
    <StyledSelect onChange={onFunc} defaultValue={value} name={name}>
      {options.map((currentOption) => (
        <option key={currentOption[0]} value={currentOption[0]}>{currentOption[1]}</option>
        ))}
    </StyledSelect>
  );
}

export default Dropdown;
