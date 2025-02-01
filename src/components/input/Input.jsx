import React from 'react'
import "./input.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ label, value, onChange, name,  placeholder, type = "text", isPassword = false, toggleVisibility  }) => {
  return (
      <div className='input-wrapper'>
      <p className='label-input'>{label}</p>
      
      <div className="input-container">
          <input
              className='custom-input'
              placeholder={placeholder}
              value={value}
              type={type}
              onChange={onChange}
              name= {name}
      />
      
      {isPassword && (
                <button
                    type="button"
                    className="toggle-password"
                    onClick={toggleVisibility}
                    disabled={!value}
                >
                    {type === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
        )}
        </div>
    </div>
    
  )
}

export default Input
