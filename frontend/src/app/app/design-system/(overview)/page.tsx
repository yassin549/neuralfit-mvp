import Link from 'next/link';
import { ArrowRight, Box, Code, Component, LayoutDashboard, Palette, Type } from 'lucide-react';
import { IOSCard, IOSCardContent } from '@/components/ui/ios-card';
import { Button } from '@/components/ui/button';

const components = [
  {
    title: 'Buttons',
    description: 'Interactive elements that trigger actions',
    href: '/design-system/buttons',
    icon: Component,
  },
  {
    title: 'Cards',
    description: 'Containers for grouping related content',
    href: '/design-system/cards',
    icon: Box,
  },
  {
    title: 'Typography',
    description: 'Text styles and headings',
    href: '/design-system/typography',
    icon: Type,
  },
  {
    title: 'Colors',
    description: 'Color palette and usage guidelines',
    href: '/design-system/colors',
    icon: Palette,
  },
  {
    title: 'Layout',
    description: 'Grid system and spacing',
    href: '/design-system/layout',
    icon: LayoutDashboard,
  },
  {
    title: 'Icons',
    description: 'Icon library and usage',
    href: '/design-system/icons',
    icon: Code,
  },
];

export default function DesignSystemOverview() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Design System</h1>
        <p className="text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
          A collection of reusable components and design tokens for building consistent UIs
        </p>
      </div>

      <IOSCard>
        <IOSCardContent>
          <div className="space-y-4">
              <h2 className="text-xl font-semibold">Getting Started</h2>
              <p>
                This design system is built with Tailwind CSS and React. Each component is designed to be accessible,
                customizable, and consistent with iOS/macOS design language.
              </p>
              <div className="pt-2">
                <Button asChild>
                  <Link href="/design-system/buttons" className="flex items-center gap-2">
                    Explore Components
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
        </IOSCardContent>
      </IOSCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <Link key={component.href} href={component.href}>
            <IOSCard className="h-full transition-all hover:shadow-md hover:translate-y-[-2px]">
              <IOSCardContent className="flex items-start gap-4 p-6">
                <div className="p-2 rounded-lg bg-ios-systemBlue/10 text-ios-systemBlue">
                  <component.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{component.title}</h3>
                  <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                    {component.description}
                  </p>
                </div>
              </IOSCardContent>
            </IOSCard>
          </Link>
        ))}
      </div>

      <div className="pt-8 border-t border-ios-separator/30 dark:border-ios-dark-separator/30">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <div className="space-y-4">
          <IOSCard variant="outline">
            <IOSCardContent className="p-6">
              <h3 className="font-medium mb-2">Installation</h3>
              <pre className="bg-ios-tertiary/10 dark:bg-ios-dark-tertiary/10 p-4 rounded-lg overflow-x-auto text-sm">
                <code>npm install @neuralfit/ui</code>
              </pre>
            </IOSCardContent>
          </IOSCard>
          
          <IOSCard variant="outline">
            <IOSCardContent className="p-6">
              <h3 className="font-medium mb-2">Importing Components</h3>
              <pre className="bg-ios-tertiary/10 dark:bg-ios-dark-tertiary/10 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{"import { Button } from '@neuralfit/ui';"}</code>
              </pre>
            </IOSCardContent>
          </IOSCard>
        </div>
      </div>
    </div>
  );
}
