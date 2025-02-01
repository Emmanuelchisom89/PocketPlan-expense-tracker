import React from 'react'
import "./button.css"

const Button = ({ text, onClick, blue, withGoogleLogo, disabled }) => {
  return (
      <button
          className={blue ? 'btn btn-blue' : 'btn'} onClick={onClick}
          disabled={disabled}
        >
        {withGoogleLogo && (
            <img
                src="/google-icon.svg"
                alt="Google Icon"
                className="google-icon"
            />
        )}
        {text}
    </button>
  )
}

export default Button
