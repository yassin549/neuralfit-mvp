'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'xs' | 'xl' | 'icon-sm' | 'icon-lg';

type ButtonBaseProps = {
  asChild?: boolean;
  withRipple?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  style?: React.CSSProperties;
};

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & ButtonBaseProps;

// Haptic feedback for iOS-like touch feedback
const triggerHaptic = (event: React.MouseEvent | React.TouchEvent) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5); // 5ms of vibration
  }
};

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-150 relative',
  {
    variants: {
      variant: {
        default: [
          'bg-ios-systemBlue dark:bg-ios-dark-systemBlue',
          'text-white',
          'shadow-sm hover:shadow-ios active:shadow-none',
          'active:scale-[0.98]',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-systemBlue/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
        secondary: [
          'bg-ios-secondary dark:bg-ios-dark-secondary',
          'text-ios-label dark:text-ios-dark-label',
          'shadow-sm hover:shadow-ios active:shadow-none',
          'active:scale-[0.98]',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-secondary/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
        destructive: [
          'bg-ios-red dark:bg-ios-dark-red',
          'text-white',
          'shadow-sm hover:shadow-ios active:shadow-none',
          'active:scale-[0.98]',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-red/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
        outline: [
          'border border-ios-separator dark:border-ios-dark-separator',
          'bg-transparent hover:bg-ios-secondary/20 dark:hover:bg-ios-dark-secondary/20',
          'text-ios-label dark:text-ios-dark-label',
          'active:scale-[0.98]',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-systemBlue/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
        ghost: [
          'bg-transparent hover:bg-ios-secondary/10 dark:hover:bg-ios-dark-secondary/10',
          'text-ios-label dark:text-ios-dark-label',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-systemBlue/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
        link: [
          'bg-transparent',
          'text-ios-systemBlue dark:text-ios-dark-systemBlue',
          'underline-offset-4 hover:underline',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-systemBlue/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
        glass: [
          'bg-white/10 backdrop-blur-md border border-white/20',
          'text-white',
          'shadow-lg hover:bg-white/20 active:bg-white/30',
          'active:scale-[0.98]',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50',
          'disabled:opacity-50 disabled:pointer-events-none',
        ],
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-lg',
        sm: 'h-8 px-3 text-sm rounded-xl',
        md: 'h-10 px-4 py-2 rounded-2xl',
        lg: 'h-12 px-6 py-2.5 rounded-3xl',
        xl: 'h-14 px-8 py-3 text-lg rounded-3xl',
        'icon-sm': 'h-8 w-8 rounded-2xl',
        icon: 'h-10 w-10 rounded-2xl',
        'icon-lg': 'h-12 w-12 rounded-3xl',
      },
      withRipple: {
        true: 'overflow-visible',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      withRipple: false,
    },
  }
);

// Ripple effect component
const RippleEffect = () => (
  <span className="absolute inset-0 overflow-hidden">
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/20 rounded-full opacity-0 animate-ripple" />
  </span>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    asChild = false,
    withRipple = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    onClick,
    onTouchStart,
    disabled = false,
    type = 'button',
    ...props
  }, ref) => {
    const [isRippling, setIsRippling] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Set up ref forwarding
    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement, []);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled || isLoading) return;
      
      // Call the onClick handler if provided
      onClick?.(e);

      // Handle ripple effect if enabled
      if (withRipple) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 600);
      }

      // Trigger haptic feedback
      triggerHaptic(e);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
      if (disabled || isLoading) return;
      
      // Call the onTouchStart handler if provided
      onTouchStart?.(e);
      
      // Trigger haptic feedback on touch devices
      triggerHaptic(e);
    };
    
    const Comp = asChild ? Slot : 'button';
    
    const buttonContent = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        <span
          className={cn(
            'inline-flex items-center justify-center gap-2',
            isLoading ? 'invisible' : 'visible'
          )}
        >
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </span>
      </>
    );

    if (asChild) {
      // For asChild, we'll use the Slot component from Radix UI
      const { asChild: _, ...restProps } = props as any;
      
      // Create a clone of the child with our props
      const child = React.Children.only(children) as React.ReactElement;
      const childRef = (child as any).ref;
      
      const buttonClasses = cn(
        buttonVariants({ variant, size }),
        'relative inline-flex',
        withRipple && 'overflow-hidden',
        isLoading && 'pointer-events-none opacity-70',
        child.props.className,
        className
      );
      
      return React.cloneElement(child, {
        ...restProps,
        ref: (node: HTMLElement | null) => {
          // Forward the ref to the child
          if (typeof childRef === 'function') {
            childRef(node);
          } else if (childRef) {
            (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
          
          // Forward the ref to the parent
          if (typeof ref === 'function') {
            ref(node as any);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node as any;
          }
        },
        className: buttonClasses,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          child.props.onClick?.(e);
          if (!e.defaultPrevented) {
            handleClick(e);
          }
        },
        onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
          child.props.onTouchStart?.(e);
          if (!e.defaultPrevented) {
            handleTouchStart(e);
          }
        },
        disabled: disabled || isLoading,
        'aria-disabled': disabled || isLoading,
        style: {
          ...child.props.style,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
      });
    }

    const buttonClassName = cn(
      buttonVariants({
        variant,
        size,
      }),
      'relative inline-flex',
      withRipple && 'overflow-hidden',
      isLoading && 'pointer-events-none opacity-70',
      className
    );

    return (
      <button
        ref={buttonRef}
        className={buttonClassName}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        type={type}
        {...props}
      >
        {isRippling && withRipple && <RippleEffect />}
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
