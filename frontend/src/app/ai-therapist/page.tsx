import { Zap } from 'lucide-react';

const AiSection = () => (
    <section id="ai-therapist" className="w-full py-20 md:py-32 bg-blush-pink dark:bg-night-blue flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold">Our AI Therapist Is Built Different</h2>
                    <ul className="mt-6 space-y-4 text-lg text-muted-foreground">
                        <li className="flex items-start"><Zap className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" /><span>Trained on real clinical data — not just scraped text.</span></li>
                        <li className="flex items-start"><Zap className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" /><span>Adapts to your tone, speed, and pauses.</span></li>
                        <li className="flex items-start"><Zap className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" /><span>Understands nuance, silence, and indirect signals.</span></li>
                    </ul>
                    <p className="mt-4 text-xl font-semibold">It’s not just smart. It *feels*.</p>
                </div>
                <div className="h-96 rounded-3xl bg-white/50 dark:bg-black/20 p-4 border border-border/20 shadow-2xl backdrop-blur-xl flex items-center justify-center">
                    <p className="text-muted-foreground">[Siri-style wave animation visual here]</p>
                </div>
            </div>
        </div>
    </section>
);

export default function AiTherapistPage() {
    return <AiSection />;
}
