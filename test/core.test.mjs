// Objectif : vérifier la normalisation, la règle déterministe et la décision sémantique.
import test from "node:test";
import assert from "node:assert/strict";
import { coverageCase, assessMobileCoverageClaim } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const edge = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-09-16"
  },
  "claimedLevel": "none",
  "observedLevel": "none"
};
test("exige une source", () => assert.throws(() => coverageCase({ id: "x", text: "y" }), /source/));
test("applique le cas limite sans appel Jev", async () => { const provider = createFakeProvider(() => { throw new Error("appel interdit"); }); assert.equal((await assessMobileCoverageClaim(edge, provider)).decision, "no_service"); assert.equal(provider.calls, 0); });
test("classe un dossier sourcé", async () => { const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "inconsistent", probabilities: {
  "consistent": 0.05,
  "uncertain": 0.05,
  "inconsistent": 0.85,
  "no_service": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 10, output_tokens: 0 } })); const result = await assessMobileCoverageClaim({
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
}, provider); assert.equal(result.decision, "inconsistent"); assert.equal(result.review, false); });
