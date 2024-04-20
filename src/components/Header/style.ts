import { ButtonBase, styled } from '@mui/material'

export const Wrapper = styled('header')`
  background-color: #212529;
  height: 112px;
  color: #fff;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 80px;
  .center {
    width: 100%;
    max-width: 1200px;
    /* height: 137px; */
    top: 10px;
    position: absolute;
    left: 50%;
    padding: 0 24px;
    transform: translate(-50%, 70%);
    .header__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        display: flex;
        align-items: center;
        gap: 4px;
        text-decoration: none;
        h1 {
          color: #fff;
          font-size: 20px;
        }
      }

      .cta {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        .user__logged {
          height: 40px;
          width: 40px;
          background-color: #495057;
          border-radius: 50px;
          display: grid;
          place-items: center;
          button {
            cursor: pointer;
            background-color: transparent;
            border: none;
          }
          img {
            cursor: pointer;
            border: 1.5px solid #fff;
            width: 100%;
            height: 100%;
            border-radius: 50px;
          }
        }
      }
    }
  }
`

export const User = styled('div')``

export const PopoverUser = styled('div')`
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

export const Button = styled(ButtonBase)`
  background-color: #4dabf7;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    display: none;
  }
  &:hover {
    background-color: #74c0fc;
  }
  @media (min-width: 425px) {
    span {
      display: block;
    }
  }
`
