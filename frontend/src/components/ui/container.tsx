import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padded?: boolean;
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Container({
  as: Component = 'div',
  size = 'xl',
  padded = true,
  centered = true,
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto',
        centered && 'px-4 sm:px-6 lg:px-8',
        padded && 'py-8 sm:py-12 md:py-16 lg:py-20',
        size !== 'full' && sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Section({
  as: Component = 'section',
  size = 'xl',
  padded = true,
  className,
  children,
  ...props
}: Omit<ContainerProps, 'centered'>) {
  return (
    <Container as={Component} size={size} padded={padded} className={className} {...props}>
      {children}
    </Container>
  );
}

export function ContainerFull({
  as: Component = 'div',
  className,
  children,
  ...props
}: Omit<ContainerProps, 'size' | 'padded' | 'centered'>) {
  return (
    <Container as={Component} size="full" padded={false} centered={false} className={className} {...props}>
      {children}
    </Container>
  );
}
