import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',M=new Int8Array(256).fill(-1);
M[0]=M[3]=M[4]=M[5]=M[6]=M[7]=M[32]=M[33]=M[34]=M[52]=M[64]=M[65]=M[80]=M[81]=M[82]=M[83]=0;M[1]=1;M[2]=4;for(let i=16;i<=30;i++)M[i]=0;M[48]=M[49]=M[50]=M[51]=2;
const P=new Int8Array(256),Q=new Int8Array(256),S=(o,p,q)=>{P[o]=p;Q[o]=q};
S(1,0,1);S(2,0,1);S(3,1,0);S(4,1,2);S(5,2,2);S(6,2,3);S(7,3,3);S(49,1,0);S(50,1,0);S(64,1,1);S(65,2,0);S(80,1,0);S(81,1,0);S(82,0,1);S(83,1,0);
for(let i=16;i<=34;i++){P[i]=2;Q[i]=1}P[23]=P[27]=1;
function run(g,n){const s=[],c=[],m=new Int32Array(256),o=[],R=q=>({out:o,code:q});let p=0,t=0,i=0;for(;;){if(t>=1e6)return R(10);if(p<0||p>=g.length)return R(9);const v=g[p],e=M[v];if(e<0)return R(5);if(p+1+e>g.length)return R(9);const k=P[v];if(s.length<k)return R(2);if(s.length-k+Q[v]>256)return R(3);t++;const x=p+1+e;let y=x;switch(v){
case 0:return R(0);
case 1:{let b=g[p+1];s.push(b<128?b:b-256);break}
case 2:s.push(g[p+1]|g[p+2]<<8|g[p+3]<<16|g[p+4]<<24);break;
case 3:s.pop();break;
case 4:s.push(s[s.length-1]);break;
case 5:{let b=s.pop(),a=s.pop();s.push(b,a);break}
case 6:s.push(s[s.length-2]);break;
case 7:{let d=s.pop(),b=s.pop(),a=s.pop();s.push(b,d,a);break}
case 16:{let b=s.pop(),a=s.pop();s.push(a+b|0);break}
case 17:{let b=s.pop(),a=s.pop();s.push(a-b|0);break}
case 18:{let b=s.pop(),a=s.pop();s.push(Math.imul(a,b));break}
case 19:{let b=s.pop(),a=s.pop();if(b===0)return R(4);s.push(Math.trunc(a/b)|0);break}
case 20:{let b=s.pop(),a=s.pop();if(b===0)return R(4);s.push(a%b|0);break}
case 21:{let b=s.pop(),a=s.pop();if(b===0)return R(4);s.push(Math.trunc((a>>>0)/(b>>>0))|0);break}
case 22:{let b=s.pop(),a=s.pop();if(b===0)return R(4);s.push((a>>>0)%(b>>>0)|0);break}
case 23:s.push(-s.pop()|0);break;
case 24:{let b=s.pop(),a=s.pop();s.push(a&b);break}
case 25:{let b=s.pop(),a=s.pop();s.push(a|b);break}
case 26:{let b=s.pop(),a=s.pop();s.push(a^b);break}
case 27:s.push(~s.pop());break;
case 28:{let b=s.pop(),a=s.pop();s.push(a<<(b&31));break}
case 29:{let b=s.pop(),a=s.pop();s.push(a>>(b&31));break}
case 30:{let b=s.pop(),a=s.pop();s.push(a>>>(b&31)|0);break}
case 32:{let b=s.pop(),a=s.pop();s.push(a===b?1:0);break}
case 33:{let b=s.pop(),a=s.pop();s.push(a<b?1:0);break}
case 34:{let b=s.pop(),a=s.pop();s.push((a>>>0)<(b>>>0)?1:0);break}
case 48:{let w=g[p+1]|g[p+2]<<8;if(w>=32768)w-=65536;y=x+w;break}
case 49:{let w=g[p+1]|g[p+2]<<8;if(w>=32768)w-=65536;if(s.pop()===0)y=x+w;break}
case 50:{let w=g[p+1]|g[p+2]<<8;if(w>=32768)w-=65536;if(s.pop()!==0)y=x+w;break}
case 51:{if(c.length>=64)return R(7);c.push(x);y=g[p+1]|g[p+2]<<8;break}
case 52:{if(c.length===0)return R(8);y=c.pop();break}
case 64:{let a=s.pop();if(a<0||a>255)return R(6);s.push(m[a]);break}
case 65:{let a=s.pop(),w=s.pop();if(a<0||a>255)return R(6);m[a]=w;break}
case 80:{let w=String(s.pop());if(o.length+w.length>65536)return R(11);for(let j=0;j<w.length;j++)o.push(w.charCodeAt(j));break}
case 81:{if(o.length+1>65536)return R(11);o.push(s.pop()&255);break}
case 82:s.push(i<n.length?n[i++]:-1);break;
case 83:return R(s.pop()&255);
}p=y;}}
for(const d of readdirSync(I).sort()){const r=run(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));mkdirSync(join(O,d),{recursive:true});writeFileSync(join(O,d,'stdout.bin'),Buffer.from(r.out));writeFileSync(join(O,d,'exit.txt'),r.code+'\n');}
