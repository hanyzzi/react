import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import SearchIcon from './SearchIcon';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 50px;
  border: none;
  font-size: 1.3rem;
  margin: 0 10px;
  padding: 0 20px;
  background-color: #e9ecef7a;
  border-radius: 25px;
`;

const selectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '120px',
  }),
  control: (provided, state) => ({
    ...provided,
    height: '50px',
    padding: '0 10px',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#90CAF9' : 'white',
    ':active': {
      backgroundColor: '#90CAF9',
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
  }),
}

const options = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '제목' },
  { value: 'body', label: '내용' },
  { value: 'comment', label: '댓글' },
];

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(options[0]);

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchClick(event) {
    props.onSearch(selectedOption,searchTerm);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      props.onSearch(selectedOption, searchTerm);
    }
  }

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <SearchBarContainer>
        <Select
          value={selectedOption}
          options={options}
          onChange={handleOptionChange}
          styles={selectStyles}
        />
      <SearchInput type="text" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      <SearchIcon onClick={handleSearchClick}>검색</SearchIcon>
    </SearchBarContainer>
  );
}

export default SearchBar;
