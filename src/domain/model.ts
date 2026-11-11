export type Kind='video'|'audio'|'image'|'text';
export type Asset={id:string;name:string;kind:Exclude<Kind,'text'>;mime:string;size:number;duration:number;url:string;width?:number;height?:number};
export type Clip={id:string;assetId?:string;name:string;kind:Kind;start:number;sourceIn:number;duration:number;color:string;text?:string;volume:number};
export type Track={id:string;name:string;kind:Kind;muted:boolean;clips:Clip[]};
export type Project={schemaVersion:1;name:string;width:number;height:number;fps:number;duration:number;tracks:Track[];updatedAt:string};
export const id=()=>crypto.randomUUID();
export const blankProject=():Project=>({schemaVersion:1,name:'名称未設定プロジェクト',width:1920,height:1080,fps:30,duration:60,updatedAt:new Date().toISOString(),tracks:[{id:id(),name:'ビデオ 1',kind:'video',muted:false,clips:[]},{id:id(),name:'ビデオ 2',kind:'video',muted:false,clips:[]},{id:id(),name:'テキスト',kind:'text',muted:false,clips:[]},{id:id(),name:'オーディオ 1',kind:'audio',muted:false,clips:[]}]});
export const endTime=(p:Project)=>Math.max(60,...p.tracks.flatMap(t=>t.clips.map(c=>c.start+c.duration)));
