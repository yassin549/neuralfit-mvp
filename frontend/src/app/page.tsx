'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useWindowSystem } from '@/components/window-system';
import { DashboardContent } from '@/components/window-content/dashboard-content';
import { SocialSpaceContent } from '@/components/window-content/social-space-content';
import { VoiceCallContent } from '@/components/window-content/voice-call-content';
import { VideoCallContent } from '@/components/window-content/video-call-content';
import { ChattingContent } from '@/components/window-content/chatting-content';
import { SettingsContent } from '@/components/window-content/settings-content';
import { 
  Brain, MessageSquare, Sparkles, ArrowRight, LayoutDashboard, Users, Mic, Video, MessageCircle, Settings, Quote
} from 'lucide-react';

// --- UNUTHENTICATED USER: HERO SECTION --- //
const HeroSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeInOut" as any
      } 
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Animated background gradients */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8">
        <div className="container mx-auto">
          <Link href="/">
            <Image src="/logo.svg" alt="NeuralFit Logo" width={120} height={40} priority className="w-auto h-8 md:h-10" />
          </Link>
        </div>
      </header>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-1/2 -right-1/4 h-[200%] w-[200%] rounded-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent"
          animate={{
            x: [0, '5%', 0],
            y: [0, '5%', 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/4 h-[200%] w-[200%] rounded-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent"
          animate={{
            x: [0, '-5%', 0],
            y: [0, '-5%', 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-6 py-16 md:flex-row md:py-0 md:px-8">
        {/* Left side - Content */}
        <motion.div 
          className="mb-16 space-y-8 text-center md:mb-0 md:w-1/2 md:pr-8 md:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={item}
            className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-100">The future of mental wellness</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            variants={item}
          >
            <span className="relative inline-block">
              feel, talk, <motion.span 
                className="relative z-10 bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                live
              </motion.span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-blue-300/20 blur-2xl -z-10 rounded-full"
                aria-hidden="true"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300/90 md:mx-0 md:text-xl"
            variants={item}
          >
            Get your life in order, a non-judgemental space meets the smartest therapist on earth
          </motion.p>
          
          <motion.div 
            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
            variants={item}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-white font-medium text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Link href="/register" className="flex items-center">
                  <span className="relative z-10">Jump In Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="group relative overflow-hidden border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <Link href="/ai-therapist" className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Meet the AI Therapist</span>
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Right side - Mockup */}
        <motion.div 
          className="relative hidden md:mt-0 md:w-1/2 md:flex md:justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full max-w-md">
            {/* iPhone mockup */}
            <div className="relative mx-auto h-[600px] w-[300px] overflow-hidden rounded-[40px] border-4 border-gray-800 bg-gray-900 shadow-2xl">
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-10 h-6 w-1/3 -translate-x-1/2 rounded-b-2xl bg-gray-900"></div>
              
              {/* Screen content */}
              <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Split screen */}
                <div className="absolute inset-0 flex">
                  {/* Left side - Audio Room UI */}
                  <div className="h-full w-1/2 bg-gradient-to-b from-purple-900 to-blue-900 p-4">
                    <div className="flex h-full flex-col">
                      <div className="mb-3 flex-1 rounded-xl bg-white/5 p-3">
                        <div className="mb-2 h-2 w-3/4 rounded-full bg-white/10"></div>
                        <div className="mb-2 h-2 w-1/2 rounded-full bg-white/10"></div>
                        <div className="h-2 w-5/6 rounded-full bg-white/10"></div>
                      </div>
                      <div className="rounded-xl bg-white/5 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="h-2 w-1/4 rounded-full bg-white/20"></div>
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"></div>
                        </div>
                        <div className="h-2 w-3/4 rounded-full bg-white/10"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - AI Therapist */}
                  <div className="relative flex h-full w-1/2 items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
                    <div className="relative z-10 p-6 text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-400 shadow-lg">
                        <Brain className="h-10 w-10 text-white" />
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-2 rounded-full bg-white/10"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: [20, 0, 0, -10]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5,
          ease: "easeInOut"
        }}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-white"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
        <span className="mt-2 text-xs text-white/50">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

// --- AUTHENTICATED USER: WELCOME PAGE --- //
type Feature = {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: React.ComponentType<any>;
  description: string;
};

const AuthenticatedHomePage = ({ session }: { session: Session }) => {
  const { openWindow } = useWindowSystem();

  const features: Feature[] = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-8 h-8" />, content: DashboardContent, description: 'Visualize your progress and activity.' },
    { id: 'social', name: 'Social Spaces', icon: <Users className="w-8 h-8" />, content: SocialSpaceContent, description: 'Connect with others in live audio rooms.' },
    { id: 'voice', name: 'Voice Call', icon: <Mic className="w-8 h-8" />, content: VoiceCallContent, description: 'Engage in a private voice session.' },
    { id: 'video', name: 'Video Call', icon: <Video className="w-8 h-8" />, content: VideoCallContent, description: 'Start a face-to-face video call.' },
    { id: 'text', name: 'Chatting', icon: <MessageCircle className="w-8 h-8" />, content: ChattingContent, description: 'Have a text-based conversation.' },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-8 h-8" />, content: SettingsContent, description: 'Customize your app experience.' },
  ];

  const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      transition={{ delay: index * 0.05, ease: 'easeOut' }}
      className="relative group"
    >
      <button 
        onClick={(e) => openWindow({ id: feature.id, title: feature.name, content: feature.content, icon: feature.icon }, e.currentTarget)}
        className="w-full h-full text-left p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="text-violet-300 mb-3">{feature.icon}</div>
          <h3 className="text-xl font-bold text-white/90">{feature.name}</h3>
          <p className="text-white/60 mt-1 text-sm">{feature.description}</p>
        </div>
        <div className="mt-4 text-xs font-semibold text-white/50 group-hover:text-white transition-colors duration-300 flex items-center">
          Open <ArrowRight className="w-3 h-3 ml-1"/>
        </div>
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6 sm:p-8">
      <motion.div 
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto"
      >
        <motion.header variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }} className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
                Welcome back, <span className="text-violet-300">{session.user.name || 'friend'}</span>.
              </h1>
              <p className="text-lg text-white/60 mt-2">Ready to continue your journey?</p>
            </div>
            <Image src="/logo.svg" alt="NeuralFit Logo" width={150} height={50} className="hidden md:block w-auto h-12" />
          </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
          
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ delay: features.length * 0.05, ease: 'easeOut' }}
            className="md:col-span-2 lg:col-span-1 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg flex flex-col items-center justify-center text-center"
          >
            <Quote className="w-10 h-10 text-violet-300/70 mb-4"/>
            <p className="text-xl italic text-white/80 leading-relaxed">"The journey of a thousand miles begins with a single step."</p>
            <footer className="mt-4 text-sm text-white/50">— Lao Tzu</footer>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// --- LOADING SPINNER --- //
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gray-950">
    <div className="w-16 h-16 border-4 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// --- MAIN PAGE EXPORT --- //
export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'authenticated' && session) {
    return <AuthenticatedHomePage session={session} />;
  }

  return <HeroSection />;
}
