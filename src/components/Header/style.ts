import { ButtonBase, styled } from '@mui/material'

export const Wrapper = styled('header')`
  background-color: rgba(255 255 255 / 0.2);
  height: 112px;
  color: #000;
  margin: 0 auto;
  width: 100%;
  position: fixed;
  z-index: 10;
  backdrop-filter: blur(20px);
  border-bottom: 0.8px dashed #adb5bd;
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
          color: #000;
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
