import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
        <p className="mb-8 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose dark:prose-invert">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
            <p className="mb-4">
              Welcome to NeuralFit. These Terms of Service ("Terms") govern your access to and use of the NeuralFit 
              website, applications, and services (collectively, the "Service"). By accessing or using the Service, 
              you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Use of Service</h2>
            <p className="mb-4">
              NeuralFit provides an AI-powered mental health support platform. The Service is not intended to be a 
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your 
              physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. User Accounts</h2>
            <p className="mb-4">
              To access certain features of the Service, you may be required to create an account. You are responsible 
              for maintaining the confidentiality of your account information and for all activities that occur under 
              your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of NeuralFit and its licensors. Our trademarks and trade dress may not be used in connection 
              with any product or service without the prior written consent of NeuralFit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall NeuralFit, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access 
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Changes to These Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will 
              provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at 
              <a href="mailto:legal@neuralfit.com" className="text-primary hover:underline">legal@neuralfit.com</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
