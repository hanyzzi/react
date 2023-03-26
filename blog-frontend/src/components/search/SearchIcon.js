import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchIcon() {
const button = {
  fontSize: '2rem',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer'
}
  return (
    <button style={button}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </button>
  );
}
export default SearchIcon;
