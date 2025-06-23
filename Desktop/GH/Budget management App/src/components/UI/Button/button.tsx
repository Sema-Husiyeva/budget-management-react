import type  { FC } from 'react'
import classNames from 'classnames'
import './button.scss'

interface IButton {
    text: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
    isActive?: boolean;
    variant?: string;
    className?: string;
    icon?: string;
}

const Button: FC<IButton> = ({text='',type='button', onClick, isActive=false, variant='white', className = '', icon}) => {
  return (
      <button 
      onClick={onClick} 
      type={type} 
      disabled={isActive} 
      className={classNames('btn', className, {
        'btn-white': variant === 'white',
        'btn-blue': variant === 'blue',
      })}>
      {icon && <img src={icon} alt={text} />}  
      {text}
      </button>
  )
}

export default Button