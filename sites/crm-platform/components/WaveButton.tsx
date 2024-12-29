import { ButtonHTMLAttributes, useState } from 'react';

interface WaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function WaveButton({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  disabled,
  ...props
}: WaveButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = 'relative overflow-hidden rounded-full font-semibold transition-all duration-300 ease-in-out';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
  };
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && !disabled && (
        <>
          <div className="wave-effect wave1" />
          <div className="wave-effect wave2" />
          <div className="wave-effect wave3" />
        </>
      )}
    </button>
  );
}
