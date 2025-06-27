import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose dark:prose-invert">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
            <p className="mb-4">
              Welcome to NeuralFit. We are committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about this privacy policy or our practices with regard to your 
              personal information, please contact us at privacy@neuralfit.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us when you register on the website, 
              express an interest in obtaining information about us or our products and services, or otherwise 
              when you contact us.
            </p>
            <p className="mb-4">
              The personal information we collect may include names, email addresses, and other similar information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect or receive:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>To facilitate account creation and logon process</li>
              <li>To send administrative information to you</li>
              <li>To protect our Services</li>
              <li>To respond to user inquiries/offer support to users</li>
              <li>For other business purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">4. Data Security</h2>
            <p className="mb-4">
              We have implemented appropriate technical and organizational security measures designed to protect 
              the security of any personal information we process. However, please also remember that we cannot 
              guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">5. Your Privacy Rights</h2>
            <p className="mb-4">
              You may review, change, or terminate your account at any time. If you are a resident in the EEA or UK and 
              you believe we are unlawfully processing your personal information, you also have the right to complain 
              to your local data protection supervisory authority.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">6. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may contact our Data Protection Officer (DPO) at 
              <a href="mailto:dpo@neuralfit.com" className="text-primary hover:underline">dpo@neuralfit.com</a>.
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
