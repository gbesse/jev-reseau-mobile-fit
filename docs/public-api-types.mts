// Objectif : vérifier que les types publics sont importables.
import { coverageCase, assessMobileCoverageClaim } from "../src/index.mjs";
const dossier = coverageCase({
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
});
void assessMobileCoverageClaim(dossier, { decide: async () => ({}) });
