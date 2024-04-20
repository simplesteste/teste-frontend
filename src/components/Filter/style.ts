import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  width: 100%;
  height: fit-content;
  border-radius: 4px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .filters {
    display: flex;
    flex-direction: column;
    gap: 8px;
    > div {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      button {
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        border: none;
        padding: 8px;
        color: #202020;
        background-color: transparent;
        border-radius: 8px;
        &.isActive {
          background-color: #202020;
          color: #fff;
        }
      }
    }
  }

  .search {
    display: flex;
    flex-direction: column;
    gap: 8px;
    input {
      height: 32px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      &:focus {
        outline: 1.5px solid #4dabf7;
      }
    }
    button {
      border: none;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    width: 278px;
    max-width: 300px;
  }
  @media (min-width: 1024px) {
    position: sticky;
    top: 130px;
  }
`
