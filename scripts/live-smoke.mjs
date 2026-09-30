// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessMobileCoverageClaim } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessMobileCoverageClaim({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
