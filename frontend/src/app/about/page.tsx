import dynamic from 'next/dynamic';
import Link from "next/link";

const DynamicButton = dynamic(() => import("@/components/ui/button").then(mod => mod.Button), { ssr: false });
const DynamicCard = dynamic(() => import("@/components/ui/card").then(mod => mod.Card), { ssr: false });
const DynamicCardContent = dynamic(() => import("@/components/ui/card").then(mod => mod.CardContent), { ssr: false });
const DynamicCardHeader = dynamic(() => import("@/components/ui/card").then(mod => mod.CardHeader), { ssr: false });
const DynamicCardTitle = dynamic(() => import("@/components/ui/card").then(mod => mod.CardTitle), { ssr: false });
const DynamicIcons = dynamic(() => import("@/components/icons").then(mod => mod.Icons), { ssr: false });

export default function AboutPage() {
  return (
    <div className="container py-8">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          About NeuralFit
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Empowering mental wellness through AI technology
        </p>
      </section>

      <section className="mb-16">
        <div className="mx-auto max-w-4xl">
          <DynamicCard>
            <DynamicCardHeader>
              <DynamicCardTitle className="text-2xl">Our Mission</DynamicCardTitle>
            </DynamicCardHeader>
            <DynamicCardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At NeuralFit, we believe that mental health support should be accessible to everyone, 
                  anytime and anywhere. Our mission is to break down barriers to mental healthcare by 
                  providing an AI-powered platform that offers immediate, personalized support.
                </p>
                <p>
                  We combine cutting-edge artificial intelligence with evidence-based therapeutic 
                  techniques to create a safe, private space for you to explore your thoughts and 
                  feelings.
                </p>
              </div>
            </DynamicCardContent>
          </DynamicCard>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Empathy First",
              description: "We prioritize understanding and compassion in every interaction.",
              icon: <DynamicIcons.heart className="h-8 w-8 text-primary" />
            },
            {
              title: "Privacy & Security",
              description: "Your data is always protected with enterprise-grade security.",
              icon: <Icons.shield className="h-8 w-8 text-primary" />
            },
            {
              title: "Innovation",
              description: "Continuously improving our technology to better serve you.",
              icon: <Icons.Zap className="h-8 w-8 text-primary" />
            }
          ].map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {value.icon}
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-primary/5 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
        <p className="mb-6 text-muted-foreground">
          Join thousands of users who have already improved their mental well-being with NeuralFit.
        </p>
        <Button size="lg" asChild>
          <Link href="/register">
            Get Started for Free
          </Link>
        </Button>
      </section>
    </div>
  )
}
