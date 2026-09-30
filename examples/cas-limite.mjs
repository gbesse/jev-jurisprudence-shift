// Cas limite : la décision dite ultérieure doit réellement être postérieure.
import assert from "node:assert/strict";
import { compareDecisions } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";

const recente = {
  id: "d-2026",
  court: "Cour de cassation",
  date: "2026-01-01",
  holding: "Règle récente",
  sourceUrl: "https://www.courdecassation.fr/",
};
const ancienne = {
  id: "d-2024",
  court: "Cour de cassation",
  date: "2024-01-01",
  holding: "Règle ancienne",
  sourceUrl: "https://www.courdecassation.fr/",
};
const jev = createFakeProvider(() => {
  throw new Error("Jev ne doit pas être appelé");
});
await assert.rejects(
  compareDecisions(recente, ancienne, jev),
  /chronologically/,
);
assert.equal(jev.calls, 0);
console.log(
  JSON.stringify(
    { gardeFou: "chronologie_invalide", appelsJev: jev.calls },
    null,
    2,
  ),
);
