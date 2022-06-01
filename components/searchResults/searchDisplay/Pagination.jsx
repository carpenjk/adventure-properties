import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const StyledPaginateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: ${({ theme }) => theme.space[3]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;
  > ul {
    display: flex;
    margin: 0;
  }
  > ul > li {
    display: list-item;
    position: relative;
    list-style: none;
  }
  > ul > li > a {
    outline: none;
    border: 3px solid transparent;
    border-radius: 3px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    display: block;
    position: relative;
    padding: 0.375em 0.75em;
    color: ${({ theme }) => theme.colors.link[0]};

    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
  }
  > ul > li.selected > a {
    z-index: 3;
    color: #fff;
    border-color: ${({ theme }) => `${theme.colors.link[0]}8A`};
    background-color: ${({ theme }) => theme.colors.primary[0]};
  }

  > ul > li:not(:first-child) > a {
    margin-left: -3px;
  }

  > ul > li > a:focus {
    border: 3px solid ${({ theme }) => `${theme.colors.link[0]}8A`};
    outline: none;
  }
  > ul > li:not(.selected) > a:hover {
    z-index: 2;
    background-color: #e9ecef;
    border-color: #e9ecef;
  }

  > ul > li.disabled > a {
    opacity: 55%;
    cursor: auto;
  }
  > ul > li.disabled > a:hover {
    color: ${({ theme }) => theme.colors.link[0]};
    cursor: auto;
    background: none;
    border-color: transparent;
  }
  > ul > li.disabled > a:focus {
    border-color: transparent;
  }
`;

const Pagination = ({ onPageChange, pageCount }) => (
  <StyledPaginateWrapper>
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  </StyledPaginateWrapper>
);

export default Pagination;
