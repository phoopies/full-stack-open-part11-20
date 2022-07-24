import * as React from 'react'

const Notification = ({ message, color }) => {
  const style = {
    border: `3px solid ${color}`,
    borderRadius: 5,
    color,
    backgroundColor: '#eeee',
    width: '60%',
    margin: 5,
    padding: 5,
  }

  return (
    message === null || message === undefined || message === '' ? null
      : (
        <div style={style} className="notification">
          <p>{message}</p>
        </div>
      )
  )
}

export default Notification
