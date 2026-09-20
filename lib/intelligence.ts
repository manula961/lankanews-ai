import {Article} from "./store";
const districts=["Colombo","Gampaha","Kalutara","Kandy","Galle","Matara","Jaffna","Kurunegala","Anuradhapura","Batticaloa","Trincomalee","Ratnapura","Nuwara Eliya","Puttalam","Hambantota","Badulla","Ampara","Polonnaruwa","Kegalle","Monaragala","Mannar","Vavuniya","Mullaitivu","Kilinochchi"];
export const districtNames=districts;
export function districtFor(a:Article){const s=(a.title+" "+a.summary).toLowerCase();return districts.find(d=>s.includes(d.toLowerCase()))||null}
export function keywords(a:Article){return [...new Set((a.title+" "+a.summary).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu," ").split(/\s+/).filter(x=>x.length>4))].slice(0,10)}
export function trendData(a:Article,h=24){const m=new Map<string,number>();for(const x of a.filter(x=>Date.now()-+new Date(x.publishedAt)<h*3600000))for(const k of keywords(x))m.set(k,(m.get(k)||0)+1);return [...m].map(([topic,count])=>({topic,count,velocity:Math.round(count/h*100)/100})).sort((x,y)=>y.count-x.count).slice(0,30)}
export function compare(a:Article[],id:string){const x=a.find(v=>v.id===id);if(!x)return null;const c=a.filter(v=>v.clusterId&&v.clusterId===x.clusterId);return {story:x,coverage:c.length?c:[x],sources:[...new Set(c.map(v=>v.source))]}}
