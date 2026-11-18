import type {Project} from '../domain/model';
import {ProjectSchema} from '../domain/validation';

export const saveProject=(p:Project)=>{
 const u=URL.createObjectURL(new Blob([JSON.stringify(p,null,2)],{type:'application/json'}));
 const a=document.createElement('a');
 a.href=u;
 a.download=(p.name.replace(/[\\\\/:*?"<>|]/g,'_')||'project')+'.vsneo.json';
 a.click();
 URL.revokeObjectURL(u);
};

export async function openProject(f:File):Promise<Project>{
 const raw:unknown=JSON.parse(await f.text());
 const parsed=ProjectSchema.safeParse(raw);
 if(!parsed.success){
  const details=parsed.error.issues.slice(0,3).map(issue=>`${issue.path.join('.')||'project'}: ${issue.message}`).join('; ');
  throw new Error(`プロジェクトファイルが不正です: ${details}`);
 }
 return parsed.data as Project;
}

export async function importMedia(files:FileList|File[]){
 const assets=[] as {id:string;name:string;kind:'video'|'audio'|'image';mime:string;size:number;duration:number;url:string;width?:number;height?:number}[],bad:string[]=[];
 for(const f of Array.from(files)){
  const kind=f.type.startsWith('video/')?'video':f.type.startsWith('audio/')?'audio':f.type.startsWith('image/')?'image':null;
  if(!kind){bad.push(f.name);continue}
  const url=URL.createObjectURL(f);
  let duration=0,width:number|undefined,height:number|undefined;
  if(kind!=='image'){
   const el=document.createElement(kind);el.src=url;
   await new Promise<void>(r=>{el.onloadedmetadata=()=>r();el.onerror=()=>r();setTimeout(r,4000)});
   duration=Number.isFinite(el.duration)?el.duration:0;
   if(kind==='video'){width=(el as HTMLVideoElement).videoWidth;height=(el as HTMLVideoElement).videoHeight}
  }else{
   const im=new Image();im.src=url;
   await new Promise<void>(r=>{im.onload=()=>r();im.onerror=()=>r()});
   width=im.naturalWidth;height=im.naturalHeight;
  }
  assets.push({id:crypto.randomUUID(),name:f.name,kind,mime:f.type,size:f.size,duration,url,width,height});
 }
 return {assets,bad};
}
