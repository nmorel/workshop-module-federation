import React from 'react'

const Button = () => (
  <div style={{background: 'yellow', padding: 10}}>
    <button
      type="button"
      onClick={() => window.alert('You clicked on a button contained in "Remote 1" app')}
    >
      I'm a button defined in remote1
    </button>
  </div>
)

export default Button
