// Objectif : implémenter la frontière de décision métier propre au dépôt.
export const RELATIONS=["follows","distinguishes","limits","possible_overruling","unrelated"];
export function decision(input){if(!input?.id || !input?.court || !input?.date || !input?.holding || !input?.sourceUrl)
  throw new TypeError("A decision needs id, court, date, holding and sourceUrl");const date=new Date(input.date);if(Number.isNaN(date.valueOf()))throw new TypeError("date must be an ISO date");
  return{id:String(input.id),ecli:input.ecli?String(input.ecli):null,court:String(input.court),date:date.toISOString(),holding:String(input.holding).trim(),citations:[...(input.citations||[])].map(String),sourceUrl:String(input.sourceUrl)};}
export async function compareDecisions(earlierInput,laterInput,provider){const earlier=decision(earlierInput),later=decision(laterInput);
  if(new Date(later.date)<=new Date(earlier.date))throw new RangeError("later decision must be chronologically later");
  if(earlier.ecli && later.ecli && earlier.ecli===later.ecli)throw new TypeError("decisions must be distinct");
  const response=await provider.decide({state:{earlier,later},questions:{relation:{type:"choice",instructions:"Classify only the relationship between the two supplied holdings. possible_overruling requires a conflicting rule or explicit departure; unrelated means no shared legal issue.",criteria:{follows:"Applies the same rule",distinguishes:"Keeps the rule but distinguishes facts or scope",limits:"Narrows the earlier rule",possible_overruling:"Conflicts with or explicitly departs from the earlier rule",unrelated:"No material relationship"}}}});
  const a=response.answers.relation;return{relation:a.choice,probability:a.probabilities[a.choice],confidence:a.confidence,review:true,deterministic:false,earlier,later,usage:response.usage};}
