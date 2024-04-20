import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  /* background-color: #9fa; */
  width: 100%;
  width: 278px;
  max-width: 400px;
  height: min-content;
  border-radius: 4px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: sticky;
  top: 130px;
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
`
