import * as React from 'react'

const TextInput = ({
  text, value, onChange, id, placeholder,
}) => (
  <div>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label>
      {text}
      {' '}
    </label>
    <input value={value} id={id} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
  </div>
)

export default TextInput
