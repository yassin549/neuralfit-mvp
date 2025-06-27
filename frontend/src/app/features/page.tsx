import { BrainCircuit, MessageSquare, Users, Mic, HeartHandshake } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        { icon: Users, title: "Drop into anonymous live rooms", description: "Real convos. Zero identity." },
        { icon: MessageSquare, title: "Speak with our AI therapist", description: "Voice, video, or text. Instant clarity." },
        { icon: HeartHandshake, title: "Find your purpose", description: "Track your vibe, set micro-goals, live with intention." },
        { icon: BrainCircuit, title: "Grow your emotional intelligence", description: "Automatically — just by talking." },
        { icon: Mic, title: "Build voice, not vanity", description: "Be heard, not judged." },
    ];
    return (
        <section className="w-full py-20 md:py-32 bg-lavender dark:bg-night-blue/50 flex items-center justify-center min-h-screen">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold">What You Can Do Inside NeuralFit</h2>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-3xl bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-border/10 shadow-lg text-center flex flex-col items-center">
                            <feature.icon className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function FeaturesPage() {
    return <FeaturesSection />;
}
