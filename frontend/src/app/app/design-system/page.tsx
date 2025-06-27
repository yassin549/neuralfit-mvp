'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { IOSCard, IOSCardHeader, IOSCardTitle, IOSCardDescription, IOSCardContent, IOSCardFooter } from '@/components/ui/ios-card';
import { cn } from '@/lib/utils';
import { ArrowRight, Check, Plus, Settings, Heart, MessageSquare, Share2, Bookmark, Bell, BellOff } from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">NeuralFit Design System</h1>
      
      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Primary</h3>
            <div className="space-y-3">
              <Button>Default</Button>
              <Button variant="default" size="sm">Small</Button>
              <Button variant="default" size="lg">Large</Button>
              <Button variant="default" disabled>Disabled</Button>
              <Button variant="default" className="w-full">Full Width</Button>
              <div className="flex gap-2">
                <Button variant="default" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="default">
                  <Settings className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
              </div>
            </div>
          </div>
          
          {/* Secondary Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Secondary</h3>
            <div className="space-y-3">
              <Button variant="secondary">Default</Button>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="secondary" className="w-full">Full Width</Button>
              <div className="flex gap-2">
                <Button variant="secondary" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="secondary">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
              </div>
            </div>
          </div>
          
          {/* Outline Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Outline</h3>
            <div className="space-y-3">
              <Button variant="outline">Default</Button>
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" disabled>Disabled</Button>
              <Button variant="outline" className="w-full">Full Width</Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Bookmark className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
              </div>
            </div>
          </div>
          
          {/* Ghost Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Ghost</h3>
            <div className="space-y-3">
              <Button variant="ghost">Default</Button>
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="lg">Large</Button>
              <Button variant="ghost" disabled>Disabled</Button>
              <Button variant="ghost" className="w-full">Full Width</Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  <BellOff className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
              </div>
            </div>
          </div>
          
          {/* Link Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Link</h3>
            <div className="space-y-3">
              <Button variant="link">Default Link</Button>
              <Button variant="link" className="text-ios-systemGreen">Custom Color</Button>
              <Button variant="link" className="text-ios-systemRed">Danger Link</Button>
              <Button variant="link" className="w-full justify-start">Full Width</Button>
              <div className="flex gap-2">
                <Button variant="link" className="flex items-center gap-1">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Glass Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Glass</h3>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-ios-systemBlue/20 to-ios-systemPurple/20 backdrop-blur-md">
              <div className="space-y-3">
                <Button variant="glass">Glass Button</Button>
                <Button variant="glass" size="sm">Small</Button>
                <Button variant="glass" size="lg">Large</Button>
                <Button variant="glass" disabled>Disabled</Button>
                <Button variant="glass" className="w-full">Full Width</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Card */}
          <IOSCard>
            <IOSCardHeader>
              <IOSCardTitle>Default Card</IOSCardTitle>
              <IOSCardDescription>A simple card with default styling</IOSCardDescription>
            </IOSCardHeader>
            <IOSCardContent>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                This is a basic card with some sample content. Cards are used to group and display content in a clear and organized way.
              </p>
            </IOSCardContent>
            <IOSCardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                Action
              </Button>
            </IOSCardFooter>
          </IOSCard>
          
          {/* Elevated Card */}
          <IOSCard variant="elevated">
            <IOSCardHeader>
              <IOSCardTitle>Elevated Card</IOSCardTitle>
              <IOSCardDescription>Card with elevation and shadow</IOSCardDescription>
            </IOSCardHeader>
            <IOSCardContent>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                This card has a subtle shadow that makes it appear elevated above the background. Great for drawing attention to important content.
              </p>
            </IOSCardContent>
            <IOSCardFooter className="justify-between">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Confirm</Button>
            </IOSCardFooter>
          </IOSCard>
          
          {/* Filled Card */}
          <IOSCard variant="filled">
            <IOSCardHeader>
              <IOSCardTitle>Filled Card</IOSCardTitle>
              <IOSCardDescription>Card with a subtle background</IOSCardDescription>
            </IOSCardHeader>
            <IOSCardContent>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                This card has a subtle background color that helps it stand out while maintaining a clean and minimal look.
              </p>
            </IOSCardContent>
          </IOSCard>
          
          {/* Outline Card */}
          <IOSCard variant="outline">
            <IOSCardHeader>
              <IOSCardTitle>Outline Card</IOSCardTitle>
              <IOSCardDescription>Card with a border</IOSCardDescription>
            </IOSCardHeader>
            <IOSCardContent>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                This card has a border around it, making it stand out without using background colors. Works well in contexts where you want a more subtle appearance.
              </p>
            </IOSCardContent>
          </IOSCard>
          
          {/* Glass Card */}
          <div className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-br from-ios-systemBlue/20 to-ios-systemPurple/20 backdrop-blur-md">
            <IOSCard variant="glass" className="bg-white/10 backdrop-blur-md border-white/10">
              <IOSCardHeader>
                <IOSCardTitle className="text-white">Glass Card</IOSCardTitle>
                <IOSCardDescription className="text-white/80">Frosted glass effect</IOSCardDescription>
              </IOSCardHeader>
              <IOSCardContent>
                <p className="text-sm text-white/80">
                  This card has a frosted glass effect that works well over images or colored backgrounds. The content remains readable while allowing the background to show through slightly.
                </p>
              </IOSCardContent>
              <IOSCardFooter>
                <Button variant="ghost" size="sm" className="text-white/90 hover:bg-white/20">
                  Learn More
                </Button>
              </IOSCardFooter>
            </IOSCard>
          </div>
          
          {/* Clickable Card */}
          <IOSCard 
            as="button" 
            className="text-left transition-all hover:bg-ios-tertiary/10 dark:hover:bg-ios-dark-tertiary/10 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ios-systemBlue/50"
            onClick={() => alert('Card clicked!')}
          >
            <IOSCardHeader>
              <div className="flex items-center justify-between">
                <IOSCardTitle>Clickable Card</IOSCardTitle>
                <ArrowRight className="h-4 w-4 text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel" />
              </div>
              <IOSCardDescription>Card that can be clicked</IOSCardDescription>
            </IOSCardHeader>
            <IOSCardContent>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                This entire card is clickable. It has hover and active states to provide feedback to users. Try clicking anywhere on this card!
              </p>
            </IOSCardContent>
          </IOSCard>
        </div>
      </section>
      
      {/* Usage Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
        
        {/* Notification Card */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Notification Card</h3>
          <IOSCard className="max-w-2xl">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-ios-systemGreen/10">
                <Bell className="h-6 w-6 text-ios-systemGreen" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">New Notification</h4>
                  <span className="text-xs text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">2 min ago</span>
                </div>
                <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel mt-1">
                  Your daily summary is ready. Check out your progress and insights.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
          </IOSCard>
        </div>
        
        {/* Settings Card */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Settings Card</h3>
          <IOSCard variant="elevated" className="max-w-2xl">
            <IOSCardHeader>
              <IOSCardTitle>Account Settings</IOSCardTitle>
              <IOSCardDescription>Manage your account preferences and security</IOSCardDescription>
            </IOSCardHeader>
            <div className="space-y-1">
              <button className="w-full px-4 py-3 text-left hover:bg-ios-tertiary/10 dark:hover:bg-ios-dark-tertiary/10 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span>Personal Information</span>
                  <ArrowRight className="h-4 w-4 text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel" />
                </div>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-ios-tertiary/10 dark:hover:bg-ios-dark-tertiary/10 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span>Security</span>
                  <ArrowRight className="h-4 w-4 text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel" />
                </div>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-ios-tertiary/10 dark:hover:bg-ios-dark-tertiary/10 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span>Notifications</span>
                  <ArrowRight className="h-4 w-4 text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel" />
                </div>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-ios-tertiary/10 dark:hover:bg-ios-dark-tertiary/10 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span>Privacy</span>
                  <ArrowRight className="h-4 w-4 text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel" />
                </div>
              </button>
            </div>
            <IOSCardFooter className="justify-between">
              <Button variant="outline" size="sm">Sign Out</Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </IOSCardFooter>
          </IOSCard>
        </div>
        
        {/* Feature Card */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Feature Card</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <IOSCard className="text-center">
              <div className="p-3 rounded-full bg-ios-systemBlue/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-ios-systemBlue" />
              </div>
              <h4 className="font-medium mb-2">Easy to Use</h4>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                Intuitive interface that makes it simple to get started and be productive right away.
              </p>
            </IOSCard>
            
            <IOSCard className="text-center">
              <div className="p-3 rounded-full bg-ios-systemGreen/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-ios-systemGreen" />
              </div>
              <h4 className="font-medium mb-2">Reliable</h4>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                Built with stability in mind to ensure your work is always saved and secure.
              </p>
            </IOSCard>
            
            <IOSCard className="text-center">
              <div className="p-3 rounded-full bg-ios-systemPurple/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-ios-systemPurple" />
              </div>
              <h4 className="font-medium mb-2">24/7 Support</h4>
              <p className="text-sm text-ios-secondaryLabel dark:text-ios-dark-secondaryLabel">
                Our team is always here to help you with any questions or issues you might have.
              </p>
            </IOSCard>
          </div>
        </div>
      </section>
    </div>
  );
}
