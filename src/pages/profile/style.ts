import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  height: 800px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 180px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`
