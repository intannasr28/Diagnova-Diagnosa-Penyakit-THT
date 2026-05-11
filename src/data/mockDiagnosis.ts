import type { ConfidenceLevel, DiagnosisResult } from '@/types'
import { CF_RULES, DISEASES, DISEASE_BY_CODE } from './diseases'
import { SYMPTOMS, SYMPTOM_BY_CODE } from './symptoms'

/**
 * MOCK diagnosis generator for the FRONTEND PROTOTYPE.
 * This is intentionally NOT the real Certainty Factor engine — it produces
 * plausible-looking numbers from the selected symptoms so the UI can be
 * designed and reviewed end-to-end. Replace with the real engine later.
 */

function levelFromCF(cf: number): ConfidenceLevel {
  if (cf >= 0.8) return 'very_high'
  if (cf >= 0.6) return 'high'
  if (cf >= 0.4) return 'medium'
  return 'low'
}

function buildExplanation(diseaseName: string, level: ConfidenceLevel, top: string[]): string {
  const levelText = {
    very_high: 'sangat tinggi',
    high: 'tinggi',
    medium: 'cukup',
    low: 'rendah',
  }[level]
  const symptomsList = top.slice(0, 3).join(', ')
  return `Sistem mendiagnosis ${diseaseName} dengan tingkat keyakinan ${levelText}. Gejala paling berkontribusi: ${symptomsList}.`
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function shuffled<T>(arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Random fallback when the rule-based engine yields no candidates.
 * Used so the prototype UI never bounces back silently — a banner in the
 * Result page tells the user this is mock data.
 */
function buildRandomFallback(selected: Map<string, number>): DiagnosisResult[] {
  const picks = shuffled(DISEASES).slice(0, 3)

  // Source symptoms for the contribution chart: user's selection if any,
  // otherwise fall back to a small slice of the catalog so the UI has rows.
  const sourceCodes =
    selected.size > 0
      ? Array.from(selected.entries())
      : shuffled(SYMPTOMS).slice(0, 3).map((s) => [s.code, 0.6] as [string, number])

  const cfValues = picks
    .map(() => parseFloat(randomInRange(0.45, 0.85).toFixed(4)))
    .sort((a, b) => b - a)

  return picks.map((disease, idx) => {
    const cfCombined = cfValues[idx]
    const contributionRaw = sourceCodes.map(([code, userWeight]) => {
      const expertWeight = parseFloat(randomInRange(0.4, 1.0).toFixed(2))
      const cfValue = parseFloat((userWeight * expertWeight).toFixed(4))
      return { code, userWeight, expertWeight, cfValue }
    })
    const total = contributionRaw.reduce((sum, c) => sum + c.cfValue, 0) || 1
    const contributingSymptoms = contributionRaw.map((c) => ({
      symptomCode: c.code,
      symptomName: SYMPTOM_BY_CODE[c.code]?.name ?? c.code,
      userWeight: c.userWeight,
      expertWeight: c.expertWeight,
      cfValue: c.cfValue,
      contributionPercent: parseFloat(((c.cfValue / total) * 100).toFixed(1)),
    }))

    const level = levelFromCF(cfCombined)
    return {
      diseaseCode: disease.code,
      diseaseName: disease.name,
      diseaseCategory: disease.category,
      cfValue: cfCombined,
      cfPercentage: `${(cfCombined * 100).toFixed(1)}%`,
      confidenceLevel: level,
      rank: idx + 1,
      contributingSymptoms,
      iterationSteps: [],
      explanation: `Hasil ini dihasilkan secara acak untuk keperluan demo UI prototype — kombinasi gejala yang dipilih belum cocok dengan basis aturan Certainty Factor.`,
      isMockFallback: true,
    }
  })
}

export function mockDiagnose(
  selected: Map<string, number>,
): DiagnosisResult[] {
  const results: DiagnosisResult[] = []

  const diseaseCodes = Array.from(new Set(CF_RULES.map((r) => r.diseaseCode)))

  for (const diseaseCode of diseaseCodes) {
    const disease = DISEASE_BY_CODE[diseaseCode]
    if (!disease) continue

    const rulesForDisease = CF_RULES.filter((r) => r.diseaseCode === diseaseCode)
    const cfPairs: { rule: (typeof rulesForDisease)[number]; userWeight: number; cfValue: number }[] = []

    for (const rule of rulesForDisease) {
      const userWeight = selected.get(rule.symptomCode)
      if (!userWeight || userWeight === 0) continue
      const cfValue = parseFloat((userWeight * rule.expertWeight).toFixed(4))
      cfPairs.push({ rule, userWeight, cfValue })
    }

    if (cfPairs.length === 0) continue

    cfPairs.sort((a, b) => b.cfValue - a.cfValue)

    let cfCombined = cfPairs[0].cfValue
    const iterationSteps = []

    for (let i = 1; i < cfPairs.length; i++) {
      const cf2 = cfPairs[i].cfValue
      const cfBefore = cfCombined
      const newCF = cfCombined + cf2 * (1 - cfCombined)
      cfCombined = parseFloat(newCF.toFixed(4))
      iterationSteps.push({
        iteration: i,
        symptomCode: cfPairs[i].rule.symptomCode,
        symptomName: SYMPTOM_BY_CODE[cfPairs[i].rule.symptomCode]?.name ?? cfPairs[i].rule.symptomCode,
        cfBefore,
        cfAdded: cf2,
        cfAfter: cfCombined,
        formula: `${cfBefore.toFixed(3)} + ${cf2.toFixed(3)} × (1 − ${cfBefore.toFixed(3)}) = ${cfCombined.toFixed(3)}`,
      })
    }

    if (cfCombined < 0.05) continue

    const totalCF = cfPairs.reduce((sum, p) => sum + p.cfValue, 0)
    const contributingSymptoms = cfPairs.map((p) => ({
      symptomCode: p.rule.symptomCode,
      symptomName: SYMPTOM_BY_CODE[p.rule.symptomCode]?.name ?? p.rule.symptomCode,
      userWeight: p.userWeight,
      expertWeight: p.rule.expertWeight,
      cfValue: p.cfValue,
      contributionPercent: parseFloat(((p.cfValue / totalCF) * 100).toFixed(1)),
    }))

    const level = levelFromCF(cfCombined)
    results.push({
      diseaseCode,
      diseaseName: disease.name,
      diseaseCategory: disease.category,
      cfValue: cfCombined,
      cfPercentage: `${(cfCombined * 100).toFixed(1)}%`,
      confidenceLevel: level,
      rank: 0,
      contributingSymptoms,
      iterationSteps,
      explanation: buildExplanation(
        disease.name,
        level,
        contributingSymptoms.map((s) => s.symptomName),
      ),
    })
  }

  if (results.length === 0) return buildRandomFallback(selected)

  return results
    .sort((a, b) => b.cfValue - a.cfValue)
    .slice(0, 3)
    .map((r, i) => ({ ...r, rank: i + 1 }))
}
