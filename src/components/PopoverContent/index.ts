import { styled } from '@mui/material'

export const PopoverContent = styled('div')`
  background-color: #fff;
  width: 200px;
  display: flex;
  padding: 8px 4px;
  ul {
    list-style: none;
    width: 100%;
    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      padding: 8px;
      border-radius: 8px;
      width: 100%;
      button {
        background-color: transparent;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 4px;
        border: none;
        width: 100%;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.4s ease;
        border: 1.5px solid transparent;
        &:hover {
          border-color: #ced4da;
        }
      }
    }
  }
`
