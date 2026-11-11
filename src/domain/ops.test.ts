import {describe,expect,it} from 'vitest';
import {blankProject} from './model';
import {addClip,deleteClip,splitClip} from './ops';
describe('timeline operations',()=>{
 it('adds and splits a clip without changing total duration',()=>{
  const p=blankProject(),t=p.tracks[0];
  const q=addClip(p,t.id,{name:'test',kind:'video',start:0,sourceIn:0,duration:12,color:'#fff',volume:1});
  const c=q.tracks[0].clips[0];
  const r=splitClip(q,t.id,c.id,5);
  expect(r.tracks[0].clips).toHaveLength(2);
  expect(r.tracks[0].clips.reduce((n,x)=>n+x.duration,0)).toBe(12);
 });
 it('deletes a clip',()=>{
  const p=blankProject(),t=p.tracks[0];
  const q=addClip(p,t.id,{name:'test',kind:'video',start:0,sourceIn:0,duration:3,color:'#fff',volume:1});
  expect(deleteClip(q,t.id,q.tracks[0].clips[0].id).tracks[0].clips).toHaveLength(0);
 });
});
