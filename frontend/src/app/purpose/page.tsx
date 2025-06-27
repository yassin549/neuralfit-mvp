import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PurposeSection = () => (
    <section className="w-full py-20 md:py-40 bg-background flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">You weren’t made to scroll.</h2>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mt-2">You were made to <span className="text-primary">feel.</span></h2>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground">
                On NeuralFit, you reconnect with your voice. Not for likes. For life.
            </p>
            <div className="mt-10">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/register">Get Started Free</Link>
                </Button>
            </div>
        </div>
    </section>
);

export default function PurposePage() {
    return <PurposeSection />;
}
