import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-gold hover:bg-gold-dark text-white': variant === 'primary',
            'bg-navy hover:bg-navy-dark text-white': variant === 'secondary',
            'border-2 border-navy text-navy hover:bg-navy hover:text-white': variant === 'outline',
            'hover:bg-gray-100 text-charcoal': variant === 'ghost',
            'py-2 px-4 text-sm': size === 'sm',
            'py-3 px-6 text-base': size === 'md',
            'py-4 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
