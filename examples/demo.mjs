// Objectif : démontrer la frontière de décision sans appel réseau.
import assert from "node:assert/strict";
import { compareDecisions } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const provider = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: {
    relation: {
      type: "choice",
      choice: "distinguishes",
      probabilities: {
        follows: 0.08,
        distinguishes: 0.79,
        limits: 0.08,
        possible_overruling: 0.03,
        unrelated: 0.02,
      },
      confidence: 0.79,
    },
  },
  usage: { input_tokens: 80, output_tokens: 0 },
}));
const earlier = {
  id: "synthetic-1",
  court: "Cour de cassation",
  date: "2024-01-10",
  holding: "La règle antérieure s’applique à toute rupture sans préavis.",
  sourceUrl: "https://www.courdecassation.fr/",
};
const later = {
  id: "synthetic-2",
  court: "Cour de cassation",
  date: "2026-02-12",
  holding:
    "La règle est écartée lorsque les faits établissent une urgence distincte.",
  sourceUrl: "https://www.courdecassation.fr/",
};
const resultat = await compareDecisions(earlier, later, provider);
assert.equal(resultat.relation, "distinguishes");
console.log(JSON.stringify(resultat, null, 2));
