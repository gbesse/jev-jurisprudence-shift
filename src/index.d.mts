import type{JevProvider}from"./jev.mjs";export const RELATIONS:readonly string[];export type CourtDecision={id:string;ecli:string|null;court:string;date:string;holding:string;citations:string[];sourceUrl:string};
export function decision(input:any):CourtDecision;export function compareDecisions(earlier:any,later:any,provider:JevProvider):Promise<any>;
