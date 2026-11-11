import {id,type Clip,type Kind,type Project} from './model';
export const addTrack=(p:Project,k:Kind):Project=>({...p,tracks:[...p.tracks,{id:id(),name:`${k} ${p.tracks.filter(t=>t.kind===k).length+1}`,kind:k,muted:false,clips:[]}]});
export const addClip=(p:Project,trackId:string,c:Omit<Clip,'id'>):Project=>({...p,tracks:p.tracks.map(t=>t.id===trackId?{...t,clips:[...t.clips,{...c,id:id()}]}:t)});
export const patchClip=(p:Project,trackId:string,clipId:string,patch:Partial<Clip>):Project=>({...p,tracks:p.tracks.map(t=>t.id===trackId?{...t,clips:t.clips.map(c=>c.id===clipId?{...c,...patch}:c)}:t)});
export const deleteClip=(p:Project,trackId:string,clipId:string):Project=>({...p,tracks:p.tracks.map(t=>t.id===trackId?{...t,clips:t.clips.filter(c=>c.id!==clipId)}:t)});
export const splitClip=(p:Project,trackId:string,clipId:string,at:number):Project=>({...p,tracks:p.tracks.map(t=>{if(t.id!==trackId)return t;const c=t.clips.find(x=>x.id===clipId);if(!c||at<=c.start||at>=c.start+c.duration)return t;return {...t,clips:t.clips.flatMap(x=>x.id!==clipId?[x]:[{...x,duration:at-x.start},{...x,id:id(),start:at,sourceIn:x.sourceIn+at-x.start,duration:x.start+x.duration-at}])}})});
