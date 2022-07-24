/* eslint-disable react/prop-types */
import * as React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Hidable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      {isVisible && props.children}
      <button type="button" id={props.id} onClick={toggleVisibility}>{isVisible ? 'cancel' : props.buttonLabel}</button>
    </div>
  )
})

Hidable.displayName = 'Hidable'

Hidable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,

}

export default Hidable
