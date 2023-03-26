import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 30px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 5px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  height: 30px;
  background-color: #4c7aaf;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #4c7aaf;
  }
`;

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchClick() {
    props.onSearch(searchTerm);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      props.onSearch(searchTerm);
    }
  }

  return (
    <SearchBarContainer>
      <SearchInput type="text" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      <SearchButton onClick={handleSearchClick}>검색</SearchButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
