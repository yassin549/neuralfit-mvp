import { BrainCircuit } from 'lucide-react';

const ScienceSection = () => {
  const scienceItems = [
    { title: 'Cognitive Behavioral Therapy (CBT)', description: 'Our AI adapts real-time feedback loops based on proven CBT frameworks.' },
    { title: 'Acceptance & Commitment Therapy (ACT)', description: 'Learn to sit with emotions, not silence them. Our model reflects ACT principles.' },
    { title: 'Internal Family Systems (IFS)', description: 'Yes, you have parts. Our AI understands them and helps you navigate your inner world.' },
    { title: 'Humanlike Fine-Tuning', description: 'Trained on tens of thousands of real therapy interactions to create the most emotionally intelligent model ever.' },
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-background flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Built with Real Science</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Not a replacement for therapy. An evolution.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scienceItems.map(item => (
            <div key={item.title} className="p-6 rounded-2xl border border-border/20 bg-card hover:shadow-lg transition-shadow">
              <BrainCircuit className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function SciencePage() {
    return <ScienceSection />;
}
