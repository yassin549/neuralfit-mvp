import * as React from 'react';
import { cn } from '@/lib/utils';

export interface iOSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the card
   * @default 'default'
   */
  variant?: 'default' | 'elevated' | 'filled' | 'outline' | 'glass';
  
  /**
   * The size of the card
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the card is hoverable
   * @default false
   */
  hoverable?: boolean;
  
  /**
   * Whether the card is clickable
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Whether the card has a shadow
   * @default true
   */
  shadow?: boolean;
  
  /**
   * Whether the card has rounded corners
   * @default true
   */
  rounded?: boolean;
  
  /**
   * The border color when the card is selected
   * @default 'ring-2 ring-offset-2 ring-ios-systemBlue dark:ring-ios-dark-systemBlue'
   */
  selected?: boolean | string;
  
  /**
   * The component to render the card as
   * @default 'div'
   */
  as?: React.ElementType;
  
  /**
   * The content of the card
   */
  children: React.ReactNode;
}

const IOSCard = React.forwardRef<HTMLDivElement, iOSCardProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    hoverable = false,
    clickable = false,
    shadow = true,
    rounded = true,
    selected = false,
    as: Component = 'div',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'transition-all duration-200 overflow-hidden';
    
    const variants: { [key: string]: string } = {
      default: 'bg-ios-secondary dark:bg-ios-dark-secondary',
      elevated: 'bg-white dark:bg-ios-dark-secondary shadow-ios',
      filled: 'bg-ios-tertiary/10 dark:bg-ios-dark-tertiary/10',
      outline: 'bg-transparent border border-ios-separator dark:border-ios-dark-separator',
      glass: 'glass border border-white/10',
    };
    
    const sizes: { [key: string]: string } = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };
    
    const hoverStyles = hoverable || clickable 
      ? 'hover:translate-y-[-2px] hover:shadow-lg' 
      : '';
      
    const clickableStyles = clickable 
      ? 'cursor-pointer active:scale-[0.98] active:shadow-md' 
      : '';
      
    const shadowStyles = shadow ? 'shadow-sm' : '';
    const roundedStyles = rounded ? 'rounded-2xl' : '';
    
    const selectedStyles = selected 
      ? typeof selected === 'string' 
        ? selected 
        : 'ring-2 ring-offset-2 ring-ios-systemBlue dark:ring-ios-dark-systemBlue'
      : '';
    
    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          hoverStyles,
          clickableStyles,
          shadowStyles,
          roundedStyles,
          selectedStyles,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

IOSCard.displayName = 'IOSCard';



// Card Header Component
export interface IOSCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const IOSCardHeader = React.forwardRef<HTMLDivElement, IOSCardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

IOSCardHeader.displayName = 'IOSCardHeader';

// Card Title Component
export interface IOSCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
}

const IOSCardTitle = React.forwardRef<HTMLHeadingElement, IOSCardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

IOSCardTitle.displayName = 'IOSCardTitle';

// Card Description Component
export interface IOSCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

const IOSCardDescription = React.forwardRef<HTMLParagraphElement, IOSCardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel', className)}
      {...props}
    >
      {children}
    </p>
  )
);

IOSCardDescription.displayName = 'IOSCardDescription';

// Card Content Component
export interface IOSCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const IOSCardContent = React.forwardRef<HTMLDivElement, IOSCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
);

IOSCardContent.displayName = 'IOSCardContent';

// Card Footer Component
export interface IOSCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const IOSCardFooter = React.forwardRef<HTMLDivElement, IOSCardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

IOSCardFooter.displayName = 'IOSCardFooter';

export { 
  IOSCard,
  IOSCardHeader,
  IOSCardTitle,
  IOSCardDescription,
  IOSCardContent,
  IOSCardFooter
};
