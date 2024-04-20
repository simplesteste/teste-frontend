import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  background-color: #f8f9fa;
  width: 100%;
  height: 100%;
  max-height: 200px;
  border-radius: 4px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  border: 1px dashed #adb5bd;
  .task__header {
    display: flex;
    justify-content: space-between;
    button {
      height: min-content;
      padding: 8px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }
    .content {
      font-size: 14px;
      width: 200px;
      p {
        opacity: 0.5;
        margin-top: 4px;
        max-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .status {
    font-size: 13px;

    .progress {
      width: 100%;
      height: 8px;
      background-color: #ced4da;
      border-radius: 8px;
      margin-top: 4px;
      &.done {
        background-color: #40c057;
      }
    }
  }

  .footer {
    .date {
      color: #343a40;
      background-color: #e9ecef;
      padding: 8px 14px;
      border-radius: 30px;
      width: fit-content;
      font-size: 14px;
    }
  }
`
