import { PageShell } from '@/components/shared/PageShell'
import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { FeatureBento } from '@/components/landing/FeatureBento'
import { LiveDiagnosisDemo } from '@/components/landing/LiveDiagnosisDemo'
import { KnowledgeBaseSection } from '@/components/landing/KnowledgeBaseSection'
import { ResultPreviewSection } from '@/components/landing/ResultPreviewSection'
import { CTASection } from '@/components/landing/CTASection'

export function LandingPage() {
  return (
    <PageShell>
      <HeroSection />
      <HowItWorksSection />
      <FeatureBento />
      <LiveDiagnosisDemo />
      <KnowledgeBaseSection />
      <ResultPreviewSection />
      <CTASection />
    </PageShell>
  )
}
