import React from 'react'

interface IInputProps {
    label?: string
    type?: string
    name?: string
    placeholder?: string
    className?: string
    disabled?: boolean
    value?: string
    error?: boolean
    errorMessage?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInputProps> = ({ label, className, name, disabled, onChange, error, errorMessage, placeholder, type, value }) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
        {label && <label className='text-md text-slate-900'>{label}</label>}
        <input 
            className={`p-2 rounded-md border border-gray-300 w-full disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 focus:outline-none focus:border-slate-500 transition-all ${error ? 'border-red-500' : ''} ${className}`}
            type={type} 
            name={name}
            disabled={disabled}
            placeholder={placeholder} 
            onChange={onChange}
            value={value}
        />
        {error && <p className='text-red-500 text-sm'>{errorMessage}</p>}
    </div>
  )
}

export default Input