/* Varnum: Excel tab. Opens .xlsx, .xls, .csv and .ods files in the browser (SheetJS), lets you edit,
   sort and translate them, and saves .xlsx, .csv or PDF. Also opens files sent to the Android app
   ("Open with Varnum") and files opened with the installed web app. Everything stays on the device. */
(function(){
function start(){
const V=window.VN;if(!V)return;
const {$,store,toast,setStatus}=V;
const h=(tag,props={},...kids)=>{const e=document.createElement(tag);for(const [k,v] of Object.entries(props)){if(k==="class")e.className=v;else if(k.startsWith("on"))e[k]=v;else if(v!==false&&v!=null)e.setAttribute(k,v===true?"":v)}for(const c of kids.flat())if(c!=null)e.append(c);return e};
const SHEET_RE=/\.(xlsx|xlsm|xls|csv|ods|tsv)$/i, MAX_SHOW=1000;
const colName=i=>{let s="";i++;while(i>0){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};

document.head.append(h("style",{},`
#sheetWrap{overflow:auto;max-height:70vh;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);-webkit-overflow-scrolling:touch}
#sheetGrid{border-collapse:separate;border-spacing:0;font-size:.95rem;min-width:100%}
#sheetGrid th,#sheetGrid td{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:6px 10px;white-space:pre-wrap;vertical-align:top;min-width:64px;max-width:360px;text-align:left}
#sheetGrid thead th{position:sticky;top:0;z-index:2;background:var(--accent-soft,#eef2f6);backdrop-filter:blur(6px);cursor:pointer;font-weight:600;color:var(--muted);text-align:center;user-select:none}
#sheetGrid tbody th{position:sticky;left:0;z-index:1;background:var(--accent-soft,#eef2f6);backdrop-filter:blur(6px);color:var(--muted);font-weight:500;min-width:40px;text-align:right;cursor:pointer;user-select:none}
#sheetGrid thead th:first-child{left:0;z-index:3}
#sheetGrid td{background:var(--sheet,#fff);color:var(--ink);outline:none}
#sheetGrid td:focus{box-shadow:inset 0 0 0 2px var(--accent2)}
#sheetGrid .selc,#sheetGrid tr.selr td{background:rgba(100,116,139,.12)}
#sheetGrid thead th.selc,#sheetGrid tr.selr th{color:var(--ink);background:rgba(100,116,139,.25)}
#sheetGrid tr.head td{font-weight:600}
#sheetGrid td.hit{background:rgba(245,158,11,.22)}
#sheetGrid td.changed{box-shadow:inset 3px 0 0 var(--accent2)}
#sheetWork .toolbar select,#sheetWork .toolbar input[type=search]{font:inherit;padding:7px 10px;border:1px solid var(--line);border-radius:10px;background:var(--sheet,#fff);color:var(--ink);min-width:0}
#sheetWork .toolbar input[type=search]{width:min(220px,100%)}
#sheetWork .toolbar label{display:flex;gap:6px;align-items:center;font-size:.9rem;color:var(--muted)}
#sheetInfo{color:var(--muted);font-size:.9rem;margin:8px 0 0}
.sheetstart{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
@media (max-width:640px){#sheetWork .sheetbar{flex-wrap:nowrap;overflow-x:auto;padding:8px 10px;gap:8px;scrollbar-width:none}#sheetWork .sheetbar::-webkit-scrollbar{display:none}#sheetWork .sheetbar>*{flex:none}#sheetWork .hint{font-size:.85rem}#sheetWrap{max-height:64vh}}
`));

const view=$("#view-excel");
view.append(
  h("label",{class:"drop",id:"sheetDrop"},
    h("strong",{},"Open an Excel file (.xlsx, .xls, .csv)"),
    "Tap to choose, or drop it here. You can edit cells, sort, translate a column, and save it again. Free, and the file never leaves your phone.",
    h("input",{type:"file",id:"sheetFile",accept:".xlsx,.xlsm,.xls,.csv,.tsv,.ods,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"})),
  h("div",{class:"sheetstart",id:"sheetStart"},
    h("button",{class:"btn",type:"button",id:"sheetNew"},"New blank sheet"),
    h("button",{class:"btn",type:"button",id:"sheetFromNames",title:"Start a sheet from the names saved for “Many people…” letters"},"Sheet from my names list")),
  h("div",{id:"sheetWork",hidden:true},
    h("div",{class:"toolbar"},
      h("span",{id:"sheetName",class:"grow"}),
      h("select",{id:"sheetPick","aria-label":"Sheet"}),
      h("input",{type:"search",id:"sheetFind",placeholder:"Search",'aria-label':"Search in sheet"}),
      h("button",{class:"btn primary",type:"button",id:"sheetSave"},"Download .xlsx"),
      h("button",{class:"btn",type:"button",id:"sheetClose"},"Close file")),
    h("div",{class:"toolbar sheetbar"},
      h("button",{class:"btn",type:"button",id:"sheetAddRow"},"+ Row"),
      h("button",{class:"btn",type:"button",id:"sheetAddCol"},"+ Column"),
      h("button",{class:"btn",type:"button",id:"sheetDelRow"},"Delete row"),
      h("button",{class:"btn",type:"button",id:"sheetDelCol"},"Delete column"),
      h("button",{class:"btn",type:"button",id:"sheetSort"},"Sort A→Z"),
      h("label",{},h("input",{type:"checkbox",id:"sheetHead"}),"First row is headings")),
    h("div",{class:"toolbar sheetbar"},
      h("button",{class:"btn",type:"button",id:"sheetTrCol"},"Translate column"),
      h("button",{class:"btn",type:"button",id:"sheetTrAll"},"Translate whole sheet"),
      h("button",{class:"btn",type:"button",id:"sheetLetters",title:"Use this list for “Many people…” letters"},"Make letters from this list"),
      h("button",{class:"btn",type:"button",id:"sheetCsv"},"Download .csv"),
      h("button",{class:"btn",type:"button",id:"sheetPdf"},"Download PDF")),
    h("p",{class:"hint"},"Tap a cell to edit it. Tap a column letter to pick that column, or a row number to pick that row. Translations go into a new column (or a new sheet), so your original stays as it was."),
    h("div",{id:"sheetWrap"},h("table",{id:"sheetGrid"})),
    h("p",{id:"sheetInfo","aria-live":"polite"})));

let wb=null,book=null; // book: {name, sheets:[{name,aoa,dirty:Set,rebuilt,head}], cur}
let selR=-1,selC=-1;
const cur=()=>book.sheets[book.cur];
const width=a=>a.reduce((m,r)=>Math.max(m,r.length),0);
const isNum=s=>typeof s==="number"||/^-?(0|[1-9]\d{0,8})(\.\d+)?$/.test(String(s).trim()); // 10-digit phone numbers stay text
const looksHead=a=>a.length>1&&a[0].length>0&&a[0].filter(x=>String(x).trim()).length>=Math.max(1,width(a)*.5)&&a[0].every(x=>!isNum(x)||String(x).trim()==="");

async function lib(){if(window.XLSX)return;setStatus("busy","Loading the Excel reader (one time)…");await V.loadScript(V.XLSX_URL)}
function toAoa(ws){
  const a=XLSX.utils.sheet_to_json(ws,{header:1,raw:false,defval:"",blankrows:true});
  while(a.length&&a[a.length-1].every(x=>x===""))a.pop();
  const w=width(a);a.forEach(r=>{while(r.length<w)r.push("")});return a;
}
async function openSheet(file){
  if(!SHEET_RE.test(file.name)&&!/sheet|excel|csv/i.test(file.type||""))return toast("Please choose an Excel file (.xlsx, .xls) or a .csv file.");
  setStatus("busy","Opening "+file.name+"…");
  try{
    await lib();
    const buf=await file.arrayBuffer();
    wb=/\.(csv|tsv)$/i.test(file.name)||/csv/.test(file.type||"")?XLSX.read(new TextDecoder().decode(buf),{type:"string",raw:true}):XLSX.read(buf,{type:"array"});
    book={name:file.name.replace(/\.[^.]+$/,""),fromCsv:/\.(csv|tsv)$/i.test(file.name),
      sheets:wb.SheetNames.map(n=>{const aoa=toAoa(wb.Sheets[n]);return {name:n,aoa,dirty:new Set(),rebuilt:false,head:looksHead(aoa)}}),cur:0};
    if(!book.sheets.length)throw new Error("empty");
    const first=book.sheets.findIndex(s=>s.aoa.length);book.cur=first<0?0:first;
    V.show("excel");render();setStatus("","Opened "+file.name);V.track?.("tool","excel");
  }catch(e){console.error(e);setStatus("err","That file could not be read as a spreadsheet.")}
}
async function newSheet(aoa,name){
  try{await lib()}catch{return setStatus("err","Could not load the Excel reader. Check the internet once and try again.")}
  wb=XLSX.utils.book_new();
  book={name:name||"Sheet",sheets:[{name:"Sheet1",aoa,dirty:new Set(),rebuilt:true,head:looksHead(aoa)}],cur:0};
  render();setStatus("","New sheet ready");
}
function render(){
  $("#sheetDrop").hidden=true;$("#sheetStart").hidden=true;$("#sheetWork").hidden=false;
  $("#sheetName").textContent=book.name;
  const pick=$("#sheetPick");pick.replaceChildren(...book.sheets.map((s,i)=>h("option",{value:i},s.name)));pick.value=book.cur;pick.hidden=book.sheets.length<2;
  $("#sheetHead").checked=cur().head;
  drawGrid();
}
function drawGrid(){
  const s=cur(),a=s.aoa,w=Math.max(width(a),1),q=$("#sheetFind").value.trim().toLowerCase();
  const tb=h("tbody");let shown=0,hits=0;
  for(let r=0;r<a.length&&shown<MAX_SHOW;r++){
    const row=a[r];
    if(q&&!(s.head&&r===0)&&!row.some(x=>String(x).toLowerCase().includes(q)))continue;
    const tr=h("tr",{class:(s.head&&r===0?"head ":"")+(r===selR?"selr":"")});tr.dataset.r=r;
    tr.append(h("th",{scope:"row"},String(r+1)));
    for(let c=0;c<w;c++){
      const v=row[c]??"",td=h("td",{contenteditable:"true",spellcheck:"false"});td.textContent=String(v);td.dataset.c=c;
      if(c===selC)td.classList.add("selc");
      if(q&&String(v).toLowerCase().includes(q)){td.classList.add("hit");hits++}
      if(s.dirty.has(r+","+c))td.classList.add("changed");
      tr.append(td);
    }
    tb.append(tr);shown++;
  }
  const hd=h("tr",{},h("th",{"aria-label":"Row"}),...Array.from({length:w},(_,c)=>h("th",{class:c===selC?"selc":"",scope:"col","data-c":c},colName(c))));
  $("#sheetGrid").replaceChildren(h("thead",{},hd),tb);
  const rows=a.length-(s.head?1:0);
  $("#sheetInfo").textContent=(q?`${hits} matches · `:"")+`${rows} rows · ${w} columns`+(shown>=MAX_SHOW?` · showing the first ${MAX_SHOW} rows (search to find others)`:"")+(selC>=0?` · column ${colName(selC)} picked`:"");
}
function setCell(r,c,text){
  const a=cur().aoa;while(a.length<=r)a.push([]);const row=a[r];while(row.length<=c)row.push("");
  if(String(row[c])===text)return;row[c]=text;cur().dirty.add(r+","+c);
}
const grid=$("#sheetGrid");
grid.addEventListener("input",e=>{const td=e.target.closest("td");if(!td)return;setCell(+td.parentNode.dataset.r,+td.dataset.c,td.textContent);td.classList.add("changed")});
grid.addEventListener("focusin",e=>{const td=e.target.closest("td");if(!td)return;pick(+td.parentNode.dataset.r,+td.dataset.c,false)});
grid.addEventListener("keydown",e=>{const td=e.target.closest("td");if(!td)return;
  if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();const next=td.parentNode.nextElementSibling?.children[+td.dataset.c+1];if(next)next.focus();else td.blur()}
  else if(e.key==="Escape")td.blur()});
grid.addEventListener("paste",e=>{const td=e.target.closest("td");if(!td)return;e.preventDefault();
  const t=(e.clipboardData||window.clipboardData).getData("text/plain").replace(/\r/g,"");
  const rows=t.replace(/\n$/,"").split("\n").map(l=>l.split("\t"));
  if(rows.length===1&&rows[0].length===1){document.execCommand("insertText",false,rows[0][0]);return}
  const r0=+td.parentNode.dataset.r,c0=+td.dataset.c;rows.forEach((row,i)=>row.forEach((v,j)=>setCell(r0+i,c0+j,v)));pad();cur().rebuilt=true;drawGrid()});
grid.addEventListener("click",e=>{const th=e.target.closest("th");if(!th)return;
  if(th.parentNode.parentNode.tagName==="THEAD"){if(th.dataset.c!=null)pick(-1,+th.dataset.c,true)}
  else pick(+th.parentNode.dataset.r,-1,true)});
function pick(r,c,redraw){
  if(r>=0||c<0)selR=r;if(c>=0||r<0)selC=c;
  if(redraw)return drawGrid();
  grid.querySelectorAll(".selc").forEach(x=>x.classList.remove("selc"));grid.querySelectorAll("tr.selr").forEach(x=>x.classList.remove("selr"));
  grid.querySelector(`tbody tr[data-r="${selR}"]`)?.classList.add("selr");
  if(selC>=0){grid.querySelector(`thead th[data-c="${selC}"]`)?.classList.add("selc");grid.querySelectorAll(`tbody td[data-c="${selC}"]`).forEach(x=>x.classList.add("selc"))}
  const info=$("#sheetInfo");info.textContent=info.textContent.replace(/ · column [A-Z]+ picked$/,"")+(selC>=0?` · column ${colName(selC)} picked`:"");
}
const pad=()=>{const a=cur().aoa,w=width(a);a.forEach(r=>{while(r.length<w)r.push("")})};
const needCol=()=>{if(selC<0){toast("First tap a column letter (A, B, C…) to pick the column.");return false}return true};

V.dropZone($("#sheetDrop"),$("#sheetFile"),openSheet);
$("#sheetNew").onclick=()=>newSheet([["Name","Phone",""],["","",""],["","",""]],"New sheet");
$("#sheetFromNames").onclick=()=>{const lines=String(store.get("mergeNames","")).split("\n").map(x=>x.trim()).filter(Boolean);
  if(!lines.length)return toast("No saved names yet. They are saved when you use “Many people…” on the Letter tab.");
  const rows=lines.map(l=>l.split("|").map(x=>x.trim()));const w=width(rows);
  newSheet([["Name",...Array.from({length:w-1},(_,i)=>"Detail "+(i+2))],...rows],"Names")};
$("#sheetPick").onchange=e=>{book.cur=+e.target.value;selR=selC=-1;render()};
let findT;$("#sheetFind").oninput=()=>{clearTimeout(findT);findT=setTimeout(drawGrid,200)};
$("#sheetHead").onchange=e=>{cur().head=e.target.checked;drawGrid()};
$("#sheetClose").onclick=()=>{if(book&&book.sheets.some(s=>s.dirty.size||s.rebuilt)&&!confirm("Close without downloading your changes?"))return;
  book=wb=null;selR=selC=-1;$("#sheetWork").hidden=true;$("#sheetDrop").hidden=false;$("#sheetStart").hidden=false;$("#sheetGrid").replaceChildren();$("#sheetFind").value="";setStatus("","Ready")};
$("#sheetAddRow").onclick=()=>{const s=cur(),w=Math.max(width(s.aoa),1),at=selR>=0?selR+1:s.aoa.length;s.aoa.splice(at,0,Array(w).fill(""));s.rebuilt=true;selR=at;drawGrid();
  grid.querySelector(`tbody tr[data-r="${at}"] td`)?.focus()};
$("#sheetAddCol").onclick=()=>{const s=cur(),at=selC>=0?selC+1:Math.max(width(s.aoa),1);if(!s.aoa.length)s.aoa.push([]);pad();s.aoa.forEach(r=>r.splice(at,0,""));s.rebuilt=true;selC=at;drawGrid()};
$("#sheetDelRow").onclick=()=>{const s=cur();if(selR<0||selR>=s.aoa.length)return toast("First tap a row number to pick the row.");s.aoa.splice(selR,1);s.rebuilt=true;selR=-1;drawGrid()};
$("#sheetDelCol").onclick=()=>{if(!needCol())return;const s=cur();s.aoa.forEach(r=>r.splice(selC,1));s.rebuilt=true;selC=-1;drawGrid()};
$("#sheetSort").onclick=()=>{if(!needCol())return;const s=cur(),c=selC,top=s.head?s.aoa.slice(0,1):[],body=s.head?s.aoa.slice(1):s.aoa.slice();
  const coll=new Intl.Collator(["hi","en"],{numeric:true,sensitivity:"base"});
  body.sort((x,y)=>{const a=String(x[c]??""),b=String(y[c]??"");if(!a!==!b)return a?-1:1;return isNum(a)&&isNum(b)?a-b:coll.compare(a,b)});
  const asc=body.map(r=>r[c]).join("\u0001")===s.aoa.slice(top.length).map(r=>r[c]).join("\u0001");if(asc)body.reverse(); // second tap sorts Z→A
  s.aoa=[...top,...body];s.rebuilt=true;selR=-1;drawGrid();toast(asc?"Sorted Z→A":"Sorted A→Z")};

/* Translate: only cells with words are sent; numbers, phones, dates and emails stay. */
const wordy=v=>{const t=String(v).trim();return t&&/\p{L}/u.test(t)&&!/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(t)&&!/^https?:\/\//i.test(t)};
async function trCells(vals){
  const idx=[],items=[];vals.forEach((v,i)=>{if(wordy(v)){idx.push(i);items.push(String(v))}});
  const res=vals.map(v=>v);if(!items.length)return res;
  const uniq=[...new Set(items)],out=await V.translateList(uniq);const map=new Map(uniq.map((u,i)=>[u,out[i]]));
  idx.forEach((k,j)=>res[k]=map.get(items[j])??items[j]);return res;
}
const lang=()=>V.langSel?.value||"Hindi";
async function busy(btn,label,fn){const t=btn.textContent;btn.disabled=true;btn.textContent=label;
  try{await fn()}catch(e){console.error(e);setStatus("err","Translation did not work right now. Check the internet and try again.")}finally{btn.disabled=false;btn.textContent=t}}
$("#sheetTrCol").onclick=e=>{if(!needCol())return;const s=cur(),c=selC;
  busy(e.target,"Translating…",async()=>{setStatus("busy","Translating column "+colName(c)+"…");
    const vals=s.aoa.map(r=>r[c]??"");const res=await trCells(vals);
    if(s.head&&s.aoa[0])res[0]=(String(vals[0]).trim()||"Column "+colName(c))+" ("+lang()+")";
    pad();s.aoa.forEach((r,i)=>r.splice(c+1,0,res[i]??""));s.rebuilt=true;selC=c+1;drawGrid();setStatus("","Column translated into "+lang())})};
$("#sheetTrAll").onclick=e=>{const s=cur();
  busy(e.target,"Translating…",async()=>{setStatus("busy","Translating the whole sheet…");
    const w=width(s.aoa),flat=s.aoa.flatMap(r=>Array.from({length:w},(_,c)=>r[c]??""));const res=await trCells(flat);
    const aoa=s.aoa.map((_,i)=>res.slice(i*w,i*w+w));let name=(s.name+" "+lang()).slice(0,31),n=2;while(book.sheets.some(x=>x.name===name))name=(s.name.slice(0,26)+" "+lang().slice(0,2)+" "+n++).slice(0,31);
    book.sheets.splice(book.cur+1,0,{name,aoa,dirty:new Set(),rebuilt:true,head:s.head});book.cur++;selR=selC=-1;render();setStatus("","Sheet translated into "+lang()+" (new sheet “"+name+"”)")})};
$("#sheetLetters").onclick=()=>{const s=cur(),body=(s.head?s.aoa.slice(1):s.aoa).filter(r=>r.some(x=>String(x).trim()));
  if(!body.length)return toast("The sheet is empty.");
  const first=selC>=0?selC:Math.max(0,(s.head?s.aoa[0]:[]).findIndex(x=>/name|नाम/i.test(String(x))));
  const lines=body.map(r=>[r[first],...r.filter((_,i)=>i!==first)].map(x=>String(x??"").replace(/\|/g,"/").trim()).join(" | ").replace(/( \| )+$/,""));
  store.set("mergeNames",lines.slice(0,300).join("\n"));V.show("letter");
  toast(`${Math.min(300,lines.length)} names ready. Write the letter with {NAME}, then press “Many people…”.`)};

/* Save */
function buildBook(){
  const out=XLSX.utils.book_new();
  for(const s of book.sheets){
    let ws=wb.Sheets?.[s.name];
    const val=v=>{const t=String(v??"");if(t==="")return null;return isNum(t)?{t:"n",v:+t}:{t:"s",v:t}};
    if(!ws||s.rebuilt){
      ws=XLSX.utils.aoa_to_sheet(s.aoa.map(r=>r.map(v=>{const c=val(v);return c?c.v:null})));
    }else{
      for(const k of s.dirty){const [r,c]=k.split(",").map(Number),a=XLSX.utils.encode_cell({r,c}),cell=val(s.aoa[r][c]);
        if(cell)ws[a]=cell;else delete ws[a];
        const rg=XLSX.utils.decode_range(ws["!ref"]||"A1");rg.e.r=Math.max(rg.e.r,r);rg.e.c=Math.max(rg.e.c,c);ws["!ref"]=XLSX.utils.encode_range(rg)}
    }
    const w=width(s.aoa);ws["!cols"]=Array.from({length:w},(_,c)=>({wch:Math.min(50,Math.max(8,...s.aoa.slice(0,500).map(r=>String(r[c]??"").length+2)))}));
    XLSX.utils.book_append_sheet(out,ws,s.name);
  }
  return out;
}
const blobOf=(data,type)=>new Blob([data],{type});
$("#sheetSave").onclick=async()=>{try{const data=XLSX.write(buildBook(),{bookType:"xlsx",type:"array"});
  await V.saveFile(V.fname(book.name,"xlsx"),blobOf(data,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));V.track?.("tool","excel-save")}
  catch(e){console.error(e);toast("Could not make the Excel file.")}};
$("#sheetCsv").onclick=async()=>{const s=cur(),csv=s.aoa.map(r=>r.map(v=>{const t=String(v??"");return /[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}).join(",")).join("\r\n");
  await V.saveFile(V.fname(book.name+(book.sheets.length>1?" - "+s.name:""),"csv"),blobOf("﻿"+csv,"text/csv"))}; // the BOM keeps Hindi readable in Excel
$("#sheetPdf").onclick=async e=>{const b=e.target;b.disabled=true;try{await V.saveFile(V.fname(book.name,"pdf"),await tablePdf(cur()))}catch(err){console.error(err);toast("Could not make the PDF.")}finally{b.disabled=false}};

/* PDF: the browser draws the table on A4 pages, so Hindi and every other script is shaped correctly. */
async function tablePdf(s){
  await document.fonts.load('400 20px "Mukta"').catch(()=>{});
  const a=s.aoa.filter(r=>r.some(x=>String(x).trim())),w=width(a);if(!a.length)throw new Error("empty");
  const FONT='"Mukta","Noto Sans Devanagari","Nirmala UI","Mangal",system-ui,sans-serif',M=70,PADX=12,MAXW=460;
  const meas=document.createElement("canvas").getContext("2d");
  const natural=fs=>{meas.font=`400 ${fs}px ${FONT}`;return Array.from({length:w},(_,c)=>Math.min(MAXW,Math.max(40,...a.slice(0,800).map(r=>meas.measureText(String(r[c]??"")).width*1.1))+PADX*2))};
  let W=1240,H=1754,fs=26,cw=natural(fs),tot=cw.reduce((x,y)=>x+y,0);
  if(tot>W-2*M){W=1754;H=1240}
  while(tot>W-2*M&&fs>15){fs--;cw=natural(fs);tot=cw.reduce((x,y)=>x+y,0)}
  if(tot>W-2*M){const k=(W-2*M)/tot;cw=cw.map(x=>x*k)}else{const extra=(W-2*M-tot)/w;if(tot<(W-2*M)*.6)cw=cw.map(x=>x+Math.min(extra,120))}
  const RH=Math.round(fs*1.9),head=s.head?a[0]:null,body=s.head?a.slice(1):a;
  const fit=(ctx,t,mw)=>{t=String(t??"").replace(/\s+/g," ");if(ctx.measureText(t).width<=mw)return t;while(t&&ctx.measureText(t+"…").width>mw)t=t.slice(0,-1);return t+"…"};
  const pages=[];let ctx,y,pageNo=0;
  const row=(r,bold)=>{let x=M;ctx.font=`${bold?600:400} ${fs}px ${FONT}`;
    if(bold){ctx.fillStyle="#e2e8f0";ctx.fillRect(M,y,cw.reduce((p,q)=>p+q,0),RH)}
    ctx.fillStyle="#0f172a";cw.forEach((wd,c)=>{ctx.fillText(fit(ctx,r[c],wd-PADX*2),x+PADX,y+RH/2);x+=wd});
    ctx.strokeStyle="#94a3b8";ctx.lineWidth=1;x=M;ctx.strokeRect(M,y,cw.reduce((p,q)=>p+q,0),RH);cw.slice(0,-1).forEach(wd=>{x+=wd;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+RH);ctx.stroke()});y+=RH};
  const newPage=()=>{const c=document.createElement("canvas");c.width=W;c.height=H;ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);ctx.textBaseline="middle";pages.push(c);pageNo++;
    y=M;if(pageNo===1){ctx.font=`600 ${fs+8}px ${FONT}`;ctx.fillStyle="#0f172a";ctx.fillText(book.name+(book.sheets.length>1?" · "+s.name:""),M,y+fs);y+=fs*2.6}
    if(head)row(head,true)};
  newPage();
  for(const r of body){if(y+RH>H-M)newPage();row(r,false)}
  const {jsPDF}=window.jspdf,land=W>H,doc=new jsPDF({unit:"pt",format:"a4",orientation:land?"landscape":"portrait"});
  const pw=doc.internal.pageSize.getWidth(),ph=doc.internal.pageSize.getHeight();
  pages.forEach((c,i)=>{if(i)doc.addPage("a4",land?"landscape":"portrait");
    const g=c.getContext("2d");g.font=`400 18px ${FONT}`;g.fillStyle="#64748b";g.textAlign="right";g.fillText(`${i+1} / ${pages.length}`,W-M,H-M/2);
    doc.addImage(c.toDataURL("image/jpeg",.92),"JPEG",0,0,pw,ph)});
  return doc.output("blob");
}

/* Files opened from outside: Android "Open with Varnum", the installed web app, or a shared file. */
const b64ToFile=(b64,name,type)=>{const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new File([u],name,{type:type||""})};
const EXT={xlsx:1,xlsm:1,xls:1,csv:1,tsv:1,ods:1};
async function route(f){
  const ext=(f.name.match(/\.([a-z0-9]+)$/i)||[])[1]?.toLowerCase()||"",t=f.type||"";
  if(EXT[ext]||/spreadsheet|excel|csv/.test(t))return openSheet(f.name.includes(".")?f:new File([f],f.name+(/csv/.test(t)?".csv":".xlsx"),{type:t}));
  if(ext==="docx"||/wordprocessing/.test(t)){V.show("word");return V.openWord(ext?f:new File([f],f.name+".docx",{type:t}))}
  if(ext==="pptx"||/presentation/.test(t)){V.show("ppt");return V.openPpt(ext?f:new File([f],f.name+".pptx",{type:t}))}
  if(ext==="pdf"||/pdf/.test(t)){V.show("pdf");return V.openPdf(f)}
  toast("Varnum cannot open this kind of file yet.");
}
V.openSheet=openSheet;V.openFile=route;
if(V.NATIVE&&window.Capacitor?.registerPlugin){
  const OF=Capacitor.registerPlugin("OpenedFile");
  OF.addListener("fileOpened",async x=>{
    if(!x||!x.data)return toast(x&&/too big/.test(x.error||"")?"That file is too big to open (20 MB at most).":"Could not open that file.");
    try{await route(b64ToFile(x.data,x.name||"file",x.mime))}catch(e){console.error(e);toast("Could not open that file.")}}).catch?.(()=>{});
}
if("launchQueue" in window)window.launchQueue.setConsumer(async p=>{for(const fh of p.files||[]){try{await route(await fh.getFile())}catch{}}});
}
if(window.VN)start();else window.addEventListener("vn-ready",start,{once:true});
})();
