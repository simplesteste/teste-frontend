import React from 'react'

const spinKeyframes = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const loaderContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const loaderSpinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderLeftColor: '#4dabf7',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 1s linear infinite',
}

const Loader: React.FC = () => {
  return (
    <div style={loaderContainerStyle}>
      <style>{spinKeyframes}</style>
      <div style={loaderSpinnerStyle}></div>
    </div>
  )
}

export default Loader
