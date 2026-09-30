// Objectif : montrer une décision sémantique avec des données entièrement synthétiques.
import assert from "node:assert/strict";
import { assessMobileCoverageClaim } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
  "id": "exemple-1",
  "text": "La carte annonce une bonne couverture 4G extérieure ; trois mesures datées décrivent des coupures récurrentes.",
  "source": {
    "url": "https://example.test/donnee-source",
    "date": "2026-09-15"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
};
const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "inconsistent", probabilities: {
  "consistent": 0.05,
  "uncertain": 0.05,
  "inconsistent": 0.85,
  "no_service": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 120, output_tokens: 0 } }));
const résultat = await assessMobileCoverageClaim(dossier, provider);
assert.equal(résultat.decision, "inconsistent");
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · probabilité : ${résultat.probability}`);
