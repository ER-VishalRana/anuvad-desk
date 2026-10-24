/* Varnum: "More tools" tab and letter add-ons.
   Everything here runs in the browser and is free: biodata, certificates and notices, letter check,
   Kruti Dev converter, reply letters, phone scanner, envelopes, finger signature, reminders, themes. */
(function(){
function start(){
const V=window.VN;if(!V)return;
const {$,store,toast}=V;
const h=(tag,props={},...kids)=>{const e=document.createElement(tag);for(const [k,v] of Object.entries(props)){if(k==="class")e.className=v;else if(k==="html")e.innerHTML=v;else if(k.startsWith("on"))e[k]=v;else if(v!==false&&v!=null)e.setAttribute(k,v===true?"":v)}for(const c of kids.flat())if(c!=null)e.append(c);return e};
const today=()=>new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
const QR_LIB="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";

document.head.append(h("style",{html:`
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:16px}
.card{all:unset;box-sizing:border-box;cursor:pointer;display:grid;gap:4px;padding:14px 16px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);box-shadow:var(--shadow);transition:border-color .2s,transform .15s}
.card:hover,.card[aria-pressed="true"]{border-color:var(--accent2)}
.card:focus-visible{outline:2px solid var(--accent2);outline-offset:2px}
.card b{font-family:var(--head);font-size:1rem}
.card span{color:var(--muted);font-size:.9rem;line-height:1.4}
.tpane{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow);padding:16px;display:grid;gap:12px}
.tpane h2{margin:0;font-family:var(--head);font-size:1.15rem}
.tpane .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.tpane .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px 14px}
.tpane label{display:grid;gap:4px;align-content:start;font-size:.88rem;color:var(--muted)}
.tpane input[type=text],.tpane input[type=date],.tpane textarea,.tpane select{font:inherit;padding:8px 10px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);width:100%;box-sizing:border-box;min-width:0}
.tpane textarea{resize:vertical;font-family:var(--letter)}
.tpane .note{color:var(--muted);font-size:.88rem;margin:0}
.tpane ul{margin:0;padding-left:20px}
.tpane .warn{color:var(--warn)}
.scanpages{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.scanpages figure{margin:0;display:grid;gap:6px;justify-items:center;background:#fff;border:1px solid var(--line);border-radius:10px;padding:8px}
.scanpages img{max-height:180px;object-fit:contain}
.scanpages .row{justify-content:center}
#bioPhotoPrev{max-height:90px;border-radius:8px;border:1px solid var(--line)}
#sigDlg{border:1px solid var(--line);border-radius:18px;padding:0;width:min(560px,calc(100vw - 32px));background:#fff;color:var(--ink)}
#sigDlg::backdrop{background:rgba(15,23,42,.35)}
#sigDlg .in{padding:18px;display:grid;gap:10px}
#sigPad{width:100%;height:200px;border:1px dashed var(--line);border-radius:12px;background:#fff;touch-action:none;cursor:crosshair}
#remindNote{margin:0 0 12px}
html.big{font-size:18px}html.big body{font-size:18px}html.big .btn{padding:10px 16px}
html[data-theme=dark]{color-scheme:dark;--bg:#0f1420;--surface:rgba(24,31,47,.92);--sheet:#151c2b;--ink:#e6e9f0;--muted:#9aa4b8;--line:rgba(148,163,184,.24);--accent:#cbd5e1;--accent2:#94a3b8;--accent-soft:rgba(148,163,184,.16);--grad:linear-gradient(120deg,#334155,#475569 50%,#64748b)}
html[data-theme=dark] body{background:#0f1420}
html[data-theme=dark] body::before{opacity:.25}
html[data-theme=dark] .brand b{background:linear-gradient(120deg,#f1f5f9,#94a3b8);-webkit-background-clip:text;background-clip:text}
html[data-theme=dark] .btn,html[data-theme=dark] select,html[data-theme=dark] input,html[data-theme=dark] textarea,html[data-theme=dark] .status,html[data-theme=dark] #findLetter,
html[data-theme=dark] .tpane input,html[data-theme=dark] .tpane textarea,html[data-theme=dark] .tpane select{background:#1b2335!important;color:var(--ink);border-color:var(--line)}
html[data-theme=dark] .btn.primary{background:var(--grad)!important;color:#fff}
html[data-theme=dark] .btn.on{background:rgba(148,163,184,.22)!important}
html[data-theme=dark] dialog,html[data-theme=dark] #meanPop,html[data-theme=dark] .scanpages figure{background:#151c2b!important;color:var(--ink)}
html[data-theme=dark] .drop{background:linear-gradient(135deg,#182032,#1b2335)}
html[data-theme=dark] .sheet textarea{color:var(--ink)}
html[data-theme=dark] #sigPad{background:#fff}
`}));

/* ---------- More ready letters: certificates, notices, government formats ---------- */
V.addTemplates("Certificates",{
charcert:["Character certificate",`CHARACTER CERTIFICATE

This is to certify that [Student's name], son/daughter of [Father's name], was a bonafide student of this school/college from [year] to [year]. He/She passed Class [class] in [year].

During this period his/her conduct and character were good. He/She was regular in studies and took part in school activities.

I wish him/her success in life.

Place: [Place]
Date: {DATE}

[Principal's name]
Principal
{NAME}`],
expcert:["Experience certificate",`EXPERIENCE CERTIFICATE

To whom it may concern

This is to certify that Mr./Ms. [Name] worked with {NAME} as [Designation] from [joining date] to [last working date].

During this period we found him/her sincere, hardworking and honest. His/her work and conduct were satisfactory.

We wish him/her all the best for the future.

For {NAME}

[Name of the person signing]
[Designation]
Date: {DATE}`],
bonacert:["Bonafide certificate",`BONAFIDE CERTIFICATE

This is to certify that [Student's name], son/daughter of [Father's name], is a bonafide student of Class [class], Section [section], of this school/college for the session [2026-27]. His/her date of birth as per our records is [date of birth].

This certificate is issued on his/her request for [purpose].

Date: {DATE}

Principal
{NAME}`],
tccert:["School leaving certificate",`SCHOOL LEAVING CERTIFICATE

Certificate No.: [number]

Student's name: [name]
Father's name: [name]
Mother's name: [name]
Date of birth: [date]
Date of admission: [date]
Class in which studying: [class]
Date of leaving: [date]
Reason for leaving: [reason]
Conduct: Good

Certified that the above details are correct as per the school records.

Date: {DATE}

Principal
{NAME}`],
salarycert:["Salary certificate",`SALARY CERTIFICATE

This is to certify that Mr./Ms. [Name] is working with {NAME} as [Designation] since [joining date]. His/her present monthly salary is as follows:

Basic pay: Rs. [amount]
Allowances: Rs. [amount]
Gross salary: Rs. [amount]

This certificate is issued on his/her request for [purpose, e.g. bank loan].

For {NAME}

[Name of the person signing]
[Designation]
Date: {DATE}`]});
V.addTemplates("Notices",{
nholiday:["School holiday notice",`NOTICE

Date: {DATE}

All students and parents are informed that the school will remain closed on [date] on account of [festival / reason]. Classes will run as usual from [date].

[Principal's name]
Principal
{NAME}`],
nmeeting:["Meeting notice",`NOTICE

Date: {DATE}

All members are informed that a meeting will be held on [date] at [time] at [place].

Agenda:
1. [First point]
2. [Second point]
3. Any other matter with the permission of the chair

All members are requested to attend on time.

[Name]
Secretary
{NAME}`],
nsociety:["Society maintenance notice",`NOTICE

Date: {DATE}

All residents are requested to pay the maintenance charges of Rs. [amount] for the month of [month] by [last date]. A late fee of Rs. [amount] will be charged after the last date.

You can pay at the society office or by UPI to [UPI ID].

Secretary
{NAME}`],
nshop:["Shop / office closed notice",`NOTICE

Our shop/office will remain closed from [date] to [date] because of [reason]. We will open again on [date].

We regret the inconvenience.

{NAME}
Phone: {PHONE}`],
nlost:["Lost item notice",`NOTICE

Lost: [item, e.g. a black wallet] on [date] near [place]. It has [important things inside]. The finder is requested to return it to the address below or call the number given. A suitable reward will be given.

{NAME}
{ADDR}
Phone: {PHONE}`]});
V.addTemplates("Government & office",{
affidavit:["Affidavit / self-declaration",`AFFIDAVIT

I, {NAME}, son/daughter/wife of [Father's or husband's name], aged [age] years, resident of [full address], do hereby solemnly declare as under:

1. That I am a citizen of India and the above address is my permanent address.
2. That [write what you are declaring, e.g. my name is written as ___ in some documents and as ___ in others, and both names are mine].
3. That this affidavit is made for [purpose].

I declare that the above statements are true and correct to the best of my knowledge and belief, and nothing has been hidden.

Place: [Place]
Date: {DATE}

Deponent
{NAME}

VERIFICATION

Verified at [Place] on {DATE} that the contents of the above affidavit are true and correct to my knowledge.

Deponent`],
rtiappeal:["RTI first appeal",`To,
The First Appellate Authority,
[Department name],
[Address]

Subject: First appeal under Section 19(1) of the RTI Act, 2005

Sir/Madam,

I filed an RTI application on [date] with the Public Information Officer, [department], asking for [short description of the information]. [I have not received any reply within 30 days. / The reply I received on [date] is incomplete.]

I request you to direct the Public Information Officer to give me the complete information free of cost, as the Act requires.

Enclosures:
1. Copy of my RTI application
2. Copy of the fee receipt
3. Copy of the reply received, if any

Thanking you,

Yours faithfully,
{NAME}
{ADDR}
Phone: {PHONE}
Date: {DATE}`],
noting:["Office note (noting)",`Office note

Subject: [Subject of the file]

1. An application dated [date] has been received from [name / office] about [matter] (page [no.] of the file).
2. As per [rule / order no.], [explain what is allowed].
3. The proposal is placed for kind consideration and orders.

[Name]
[Designation]
Date: {DATE}

Section Officer / Head of Office`],
income:["Income certificate application",`To,
The Tehsildar,
[Tehsil], [District]

Subject: Application for an income certificate

Sir,

I, {NAME}, resident of [village / ward, tehsil, district], request you to issue me an income certificate. The total yearly income of my family from all sources is Rs. [amount]. I need the certificate for [purpose, e.g. scholarship / admission].

The required documents are attached.

Enclosures:
1. Copy of Aadhaar card
2. Copy of ration card
3. Self-declaration of income
4. Passport-size photograph

Thanking you,

Yours faithfully,
{NAME}
Phone: {PHONE}
Date: {DATE}`],
ration:["Ration card application",`To,
The District Supply Officer,
[District]

Subject: Application for a new ration card

Sir/Madam,

I, {NAME}, resident of [full address], request you to issue a new ration card for my family. My family has [number] members and we do not have a ration card at present.

Details of the family members:
1. [Name] – [relation] – [age]
2. [Name] – [relation] – [age]

Enclosures:
1. Copies of Aadhaar cards of all members
2. Address proof
3. Income certificate
4. Passport-size photograph of the head of the family

Thanking you,

Yours faithfully,
{NAME}
Phone: {PHONE}
Date: {DATE}`],
followup:["Reminder / follow-up letter",`To,
[Officer's designation],
[Office name and address]

Subject: Reminder about my letter dated [date] regarding [subject]

Sir/Madam,

I sent a letter / application dated [date] regarding [subject]. I have not received any reply or seen any action so far.

I request you to kindly look into the matter and take action at the earliest. A copy of my earlier letter is attached for your reference.

Thanking you,

Yours faithfully,
{NAME}
{ADDR}
Phone: {PHONE}
Date: {DATE}`]});

/* Ready lines for enclosures (संलग्नक) in the phrase menu. */
{const ph=$("#phrase");if(ph){const og=h("optgroup",{label:"Enclosures"});
  for(const p of ["Enclosures:","1. Copy of Aadhaar card","2. Passport-size photograph","3. Copy of bank passbook","Copy of fee receipt","Medical certificate","Copy of my earlier letter","Address proof","Copy of marksheet","Income certificate"])og.append(h("option",{},p));ph.append(og)}}

/* ---------- Address book for the "To" part ---------- */
(function addressBook(){
  const COMMON={"School & college":["The Principal,\n[School / college name],\n[City]","The Class Teacher,\nClass [class],\n[School name], [City]","The Registrar,\n[University name],\n[City]"],
    "Bank":["The Branch Manager,\n[Bank name],\n[Branch], [City]"],
    "Police":["The Station House Officer (SHO),\nPolice Station [name],\n[City]","The Superintendent of Police,\n[District]"],
    "Government":["The District Collector,\n[District]","The Tehsildar,\n[Tehsil], [District]","The Sub-Divisional Officer (Electricity),\n[Electricity board], [City]","The Commissioner,\nMunicipal Corporation,\n[City]","The Public Information Officer,\n[Department],\n[Address]","The Block Development Officer,\n[Block], [District]","The Sarpanch,\nGram Panchayat [name],\n[District]"],
    "Office":["The HR Manager,\n[Company name],\n[City]","The Manager,\n[Company name],\n[City]"]};
  const sel=h("select",{id:"addrBook",title:"Fill the “To” part from a ready address"});
  const paint=()=>{const mine=store.get("addrBook",[]);sel.replaceChildren(h("option",{value:""},"To: address…"));
    if(mine.length){const og=h("optgroup",{label:"My addresses"});mine.forEach((a,i)=>og.append(h("option",{value:"m"+i},a.split("\n")[0].replace(/,$/,"")+(a.split("\n")[1]?" · "+a.split("\n")[1].replace(/,$/,""):""))));sel.append(og)}
    for(const [g,list] of Object.entries(COMMON)){const og=h("optgroup",{label:g});list.forEach((a,i)=>og.append(h("option",{value:g+"|"+i},a.split("\n")[0].replace(/,$/,""))));sel.append(og)}
    const og=h("optgroup",{label:"Manage"});og.append(h("option",{value:"save"},"Save the “To” part of this letter"));if(mine.length)og.append(h("option",{value:"clear"},"Remove my saved addresses"));sel.append(og)};
  paint();
  const toBlock=t=>{const m=t.match(/^\s*To,?\s*\n([\s\S]*?)(\n\s*\n|$)/i);return m?m[1].trim():null};
  sel.onchange=()=>{const v=sel.value;sel.value="";if(!v)return;const src=V.src;
    if(v==="save"){const b=toBlock(src.value);if(!b)return toast("Start your letter with “To,” and the address, then save it.");
      const mine=store.get("addrBook",[]);if(!mine.includes(b))store.set("addrBook",[b,...mine].slice(0,30));paint();return toast("Address saved")}
    if(v==="clear"){store.set("addrBook",[]);paint();return toast("Saved addresses removed")}
    const addr=v[0]==="m"&&!v.includes("|")?store.get("addrBook",[])[+v.slice(1)]:(([g,i])=>COMMON[g][+i])(v.split("|"));if(!addr)return;
    const t=src.value;let next;
    if(toBlock(t)!=null)next=t.replace(/^(\s*To,?\s*\n)([\s\S]*?)(\n\s*\n|$)/i,(m,a,b,c)=>a+addr+c);
    else next="To,\n"+addr+"\n\n"+t.replace(/^\s+/,"");
    V.setSrc(next);toast("Address filled. Change the words in [brackets].")};
  const lab=h("label",{},sel);($("#phrase")?.parentElement||$("#saveLetter")).before(lab);
})();

/* ---------- Letter add-ons: send PDF, image, envelope ---------- */
const pending=()=>/(^|\n)…(\n|$)/.test(V.out.value);
const needLetter=()=>{if(!V.out.value.trim()){toast("Write a letter first.");return false}if(pending()){toast("Still translating. Wait a moment.");return false}return true};
const sendPdf=h("button",{class:"btn",type:"button",id:"sendPdf",title:"Send the PDF on WhatsApp or any app"},"Send PDF");
sendPdf.onclick=async()=>{if(!needLetter())return;sendPdf.disabled=true;
  try{const blob=await V.textToPdf(V.out.value),name=V.fname(V.letterName(),"pdf"),file=new File([blob],name,{type:"application/pdf"});
    const text="Made with Varnum, free: https://varnum.alvvintechnology.com";
    if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:name,text}).catch(()=>{})}
    else{await V.saveFile(name,blob);toast("PDF saved. Attach it in WhatsApp from your Downloads.")}
    V.track("share","pdf")}
  catch(e){console.error(e);toast("Could not make the PDF.")}finally{sendPdf.disabled=false}};
const imgBtn=h("button",{class:"btn",type:"button",id:"imgBtn",title:"Save the first page as a picture (good for notices on WhatsApp)"},"Save as image");
imgBtn.onclick=async()=>{if(!needLetter())return;imgBtn.disabled=true;
  try{await V.textToPdf(V.out.value);const pages=V.textToPdf.lastPages||[];
    for(const [i,c] of pages.entries()){const blob=await new Promise(r=>c.toBlob(r,"image/png"));await V.saveFile(V.fname(V.letterName()+(pages.length>1?" - page "+(i+1):""),"png"),blob)}
    V.track("download","image")}catch(e){console.error(e);toast("Could not make the image.")}finally{imgBtn.disabled=false}};
const envBtn=h("button",{class:"btn",type:"button",id:"envBtn",title:"Print the address on an envelope"},"Envelope");
envBtn.onclick=()=>{openTool("envelope")};
$("#dlDocx").after(sendPdf,imgBtn,envBtn);

/* ---------- Draw signature with a finger ---------- */
(function drawSig(){
  const b=h("button",{class:"btn",type:"button",id:"sigDraw"},"Draw signature");$("#sigBtn").after(b);
  const d=h("dialog",{id:"sigDlg"});d.innerHTML=`<div class="in"><h2 style="margin:0;font-family:var(--head)">Draw your signature</h2><p class="hint" style="margin:0">Sign inside the box with your finger or mouse.</p><canvas id="sigPad" width="1000" height="400"></canvas><div class="row" style="display:flex;gap:8px;justify-content:flex-end"><button type="button" class="btn" id="sigClear">Clear</button><button type="button" class="btn" id="sigCancel">Cancel</button><button type="button" class="btn primary" id="sigUse">Use this signature</button></div></div>`;
  document.body.append(d);
  const c=d.querySelector("#sigPad"),ctx=c.getContext("2d");let drawing=false,last=null,inked=false;
  const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]};
  const clear=()=>{ctx.clearRect(0,0,c.width,c.height);inked=false};
  c.onpointerdown=e=>{drawing=true;last=pos(e);c.setPointerCapture(e.pointerId)};
  c.onpointermove=e=>{if(!drawing)return;const p=pos(e);ctx.strokeStyle="#0b1f5c";ctx.lineWidth=7;ctx.lineCap=ctx.lineJoin="round";ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(...p);ctx.stroke();last=p;inked=true};
  c.onpointerup=c.onpointercancel=()=>drawing=false;
  b.onclick=()=>{clear();d.showModal()};
  d.querySelector("#sigClear").onclick=clear;d.querySelector("#sigCancel").onclick=()=>d.close();
  d.querySelector("#sigUse").onclick=()=>{if(!inked)return toast("Sign in the box first.");
    const im=ctx.getImageData(0,0,c.width,c.height).data;let x0=c.width,y0=c.height,x1=0,y1=0;
    for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(im[(y*c.width+x)*4+3]){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
    const pad=10,w=x1-x0+2*pad,hh=y1-y0+2*pad,o=document.createElement("canvas");o.width=w;o.height=hh;o.getContext("2d").drawImage(c,x0-pad,y0-pad,w,hh,0,0,w,hh);
    const sc=Math.min(1,600/w,240/hh),f=document.createElement("canvas");f.width=Math.round(w*sc);f.height=Math.round(hh*sc);f.getContext("2d").drawImage(o,0,0,f.width,f.height);
    store.set("sig",f.toDataURL("image/png"));$("#sigOn").checked=true;store.set("sigOn",true);V.paintSig();d.close();toast("Signature added")};
})();

/* ---------- Letterhead file: share the same letterhead with your staff ---------- */
(function lhFile(){
  const save=h("button",{class:"btn",type:"button",id:"lhSave"},"Save letterhead file"),open=h("button",{class:"btn",type:"button",id:"lhOpen"},"Open letterhead file");
  const inp=h("input",{type:"file",accept:".json,application/json",hidden:true});
  const row=h("div",{class:"sigrow"},save,open,inp,h("span",{class:"chk",style:"color:var(--muted)"},"Send the file to your staff so everyone uses the same letterhead and logo."));
  $("#qrOn").closest("label").after(row);
  save.onclick=()=>{const d={varnumLetterhead:1,lhName:$("#lhName").value,lhAddr:$("#lhAddr").value,lhContact:$("#lhContact").value,logo:store.get("logo",""),design:$("#design").value,lhOn:$("#lhOn").checked,stampOn:$("#stampOn").checked,qrOn:$("#qrOn").checked};
    V.saveFile(V.fname("Letterhead - "+(d.lhName||"Varnum"),"json"),new Blob([JSON.stringify(d)],{type:"application/json"}))};
  open.onclick=()=>inp.click();
  inp.onchange=async()=>{const f=inp.files[0];inp.value="";if(!f)return;
    try{const d=JSON.parse(await f.text());if(!d.varnumLetterhead)throw 0;
      for(const id of ["lhName","lhAddr","lhContact"]){$("#"+id).value=d[id]||"";store.set(id,d[id]||"");$("#"+id).dispatchEvent(new Event("input"))}
      store.set("logo",d.logo||"");V.paintLogo();$("#design").value=d.design||"plain";store.set("design",$("#design").value);
      for(const id of ["lhOn","stampOn","qrOn"]){$("#"+id).checked=!!d[id];store.set(id,!!d[id])}
      toast("Letterhead loaded")}catch{toast("That is not a Varnum letterhead file.")}};
})();

/* ---------- Reminders on saved letters ---------- */
(function reminders(){
  const sel=h("select",{id:"remind",title:"Remind me if there is no reply"},h("option",{value:"0"},"No reminder"),h("option",{value:"7"},"Remind in 7 days"),h("option",{value:"15"},"Remind in 15 days"),h("option",{value:"30"},"Remind in 30 days"));
  $("#saveLetter").after(h("label",{},sel));
  $("#saveLetter").addEventListener("click",()=>{const days=+sel.value;if(!days)return;const id=V.savedSel.value;if(!id)return;
    const all=V.letters().map(l=>l.id===id?{...l,remind:Date.now()+days*864e5,remindDone:false}:l);store.set("letters",all);sel.value="0";toast("I will remind you in "+days+" days")});
  function paint(){$("#remindNote")?.remove();const due=V.letters().filter(l=>l.remind&&!l.remindDone&&l.remind<=Date.now());if(!due.length)return;
    const l=due[0],n=h("div",{class:"notice",id:"remindNote"});
    const sent=new Date(l.ts).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
    n.append(`Reminder: did you get a reply to “${l.title}” (saved ${sent})?${due.length>1?` (${due.length-1} more)`:""} `);
    const fu=h("button",{class:"btn",type:"button"},"Write a follow-up letter"),ok=h("button",{class:"btn",type:"button"},"Got a reply");
    const done=()=>{store.set("letters",V.letters().map(x=>x.id===l.id?{...x,remindDone:true,ts:Date.now()}:x));paint()};
    fu.onclick=()=>{const to=(l.src.match(/^\s*To,?\s*\n([\s\S]*?)\n\s*\n/i)||[])[1]||"[Officer's designation],\n[Office address]";
      V.setSrc(`To,\n${to.trim()}\n\nSubject: Reminder about my letter dated ${sent} regarding ${l.title.replace(/…$/,"")}\n\nSir/Madam,\n\nI sent a letter dated ${sent} regarding ${l.title.replace(/…$/,"")}. I have not received any reply or seen any action so far.\n\nI request you to kindly look into the matter and take action at the earliest. A copy of my earlier letter is attached for your reference.\n\nThanking you,\n\nYours faithfully,\n${store.get("lhName","")||"[Your name]"}\nDate: ${today()}`);
      done();V.show("letter");toast("Follow-up letter ready")};
    ok.onclick=done;n.append(fu,ok);$("#lhBox").before(n)}
  paint();setInterval(paint,60*60*1000);window.addEventListener("varnum-signed-in",()=>setTimeout(paint,3000));
})();

/* ---------- Dark mode and large text ---------- */
(function look(){
  const root=document.documentElement;
  const dark=h("button",{class:"btn",type:"button",id:"darkBtn",title:"Dark screen"},"🌙");
  const big=h("button",{class:"btn",type:"button",id:"bigBtn",title:"Large text, easier to read"},"Large text");
  const apply=()=>{const d=store.get("dark",false),b=store.get("big",false);if(d)root.dataset.theme="dark";else delete root.dataset.theme;root.classList.toggle("big",b);
    dark.textContent=d?"☀":"🌙";dark.setAttribute("aria-pressed",String(d));big.classList.toggle("on",b);big.setAttribute("aria-pressed",String(b));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content",d?"#0f1420":"#f5f7ff")};
  dark.onclick=()=>{store.set("dark",!store.get("dark",false));apply()};big.onclick=()=>{store.set("big",!store.get("big",false));apply()};
  $("#status").before(dark,big);apply();
})();

/* ---------- The "More tools" tab ---------- */
const TOOLS=[
  ["biodata","Biodata maker","Job or marriage biodata with your photo, in English or Hindi. Ready to print or send."],
  ["certs","Certificates and notices","Character, experience, bonafide and leaving certificates, and notices (सूचना) for schools, offices and societies."],
  ["check","Hindi letter check","Paste a Hindi letter. Varnum fixes spellings, “।”, Male/Female words and points out missing parts."],
  ["kruti","Kruti Dev ↔ Unicode","Change old Kruti Dev typing into normal Hindi (Unicode), or back."],
  ["reply","Reply to a letter","Take a photo of a letter you got (or paste it). Varnum makes the reply letter for you."],
  ["scan","Scan to PDF","Take photos of papers with your phone. Varnum crops and cleans them into one sharp PDF."],
  ["envelope","Envelope","Print the “To” and “From” address on an envelope."]];
const cards=$("#toolCards"),pane=$("#toolPane");
for(const [id,title,desc] of TOOLS){const c=h("button",{class:"card",type:"button","data-tool":id,"aria-pressed":"false"},h("b",{},title),h("span",{},desc));c.onclick=()=>openTool(id);cards.append(c)}
const BUILD={};
function openTool(id){V.show("tools");cards.querySelectorAll(".card").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.tool===id)));
  pane.replaceChildren(BUILD[id]());store.set("tool",id);V.track("tool",id);pane.scrollIntoView({behavior:"smooth",block:"start"})}
V.openTool=openTool;

/* Biodata */
const BIO=[
  // key, English label, Hindi label, kind (all|job|marriage), input type
  ["name","Full name","नाम","all"],["dob","Date of birth","जन्म तिथि","all"],["birthplace","Time and place of birth","जन्म समय एवं स्थान","marriage"],
  ["father","Father's name","पिता का नाम","all"],["fatherJob","Father's occupation","पिता का व्यवसाय","marriage"],["mother","Mother's name","माता का नाम","all"],
  ["siblings","Brothers and sisters","भाई-बहन","marriage"],["height","Height","कद","marriage"],["religion","Religion / caste","धर्म / जाति","marriage"],["gotra","Gotra","गोत्र","marriage"],
  ["manglik","Manglik","मांगलिक","marriage"],["education","Education","शिक्षा","all","area"],["occupation","Occupation and income","व्यवसाय एवं आय","marriage"],
  ["objective","Career objective","करियर उद्देश्य","job","area"],["experience","Work experience","कार्य अनुभव","job","area"],["skills","Skills","कौशल","job","area"],
  ["languages","Languages known","भाषाएँ","all"],["hobbies","Hobbies","रुचियाँ","all"],["address","Address","पता","all","area"],["phone","Phone","फ़ोन","all"],["email","Email","ईमेल","all"]];
BUILD.biodata=()=>{
  const st=store.get("bio",{type:"job",lang:"en"});
  const p=h("div",{class:"tpane"},h("h2",{},"Biodata maker"),h("p",{class:"note"},"Fill what you want. Empty boxes are left out of the biodata. Your details stay on this device."));
  const type=h("select",{},h("option",{value:"job"},"Job biodata / resume"),h("option",{value:"marriage"},"Marriage biodata"));type.value=st.type;
  const lang=h("select",{},h("option",{value:"en"},"English headings"),h("option",{value:"hi"},"Hindi headings (हिन्दी)"));lang.value=st.lang;
  const photoBtn=h("button",{class:"btn",type:"button"},"Add photo"),photoIn=h("input",{type:"file",accept:"image/*",hidden:true}),prev=h("img",{id:"bioPhotoPrev",alt:"Photo",hidden:!st.photo});if(st.photo)prev.src=st.photo;
  const delPhoto=h("button",{class:"btn",type:"button",hidden:!st.photo},"Remove photo");
  p.append(h("div",{class:"row"},h("label",{},"Type",type),h("label",{},"Headings",lang),photoBtn,photoIn,prev,delPhoto));
  const grid=h("div",{class:"grid"});const inputs={};
  for(const [k,en,,kind,t] of BIO){const el=t==="area"?h("textarea",{rows:"3"}):h("input",{type:"text"});el.value=st[k]||"";
    if(!st[k]&&k==="name")el.value=store.get("lhName","");if(!st[k]&&k==="phone")el.value=store.get("lhContact","");if(!st[k]&&k==="address")el.value=store.get("lhAddr","");
    const lab=h("label",{"data-kind":kind},en,el);inputs[k]=el;grid.append(lab)}
  const paintKind=()=>grid.querySelectorAll("label").forEach(l=>l.hidden=l.dataset.kind!=="all"&&l.dataset.kind!==type.value);paintKind();
  const keep=()=>{const s={type:type.value,lang:lang.value,photo:store.get("bio",{}).photo||""};for(const k in inputs)s[k]=inputs[k].value;store.set("bio",s)};
  type.onchange=()=>{paintKind();keep()};lang.onchange=keep;grid.oninput=keep;
  photoBtn.onclick=()=>photoIn.click();
  photoIn.onchange=async()=>{const f=photoIn.files[0];photoIn.value="";if(!f)return;const img=await V.loadImg(URL.createObjectURL(f));if(!img)return toast("That photo could not be opened.");
    const sc=Math.min(1,480/img.width,600/img.height),c=document.createElement("canvas");c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);c.getContext("2d").drawImage(img,0,0,c.width,c.height);
    const s=store.get("bio",{});s.photo=c.toDataURL("image/jpeg",0.9);store.set("bio",s);prev.src=s.photo;prev.hidden=false;delPhoto.hidden=false};
  delPhoto.onclick=()=>{const s=store.get("bio",{});s.photo="";store.set("bio",s);prev.hidden=true;delPhoto.hidden=true};
  const mk=h("button",{class:"btn primary",type:"button"},"Download biodata PDF"),img=h("button",{class:"btn",type:"button"},"Save as image");
  p.append(grid,h("div",{class:"row"},mk,img));
  async function render(){keep();const s=store.get("bio",{});const hi=s.lang==="hi";
    await document.fonts.load('400 20px "Noto Serif Devanagari"').catch(()=>{});
    const W=1240,H=1754,M=110;const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");
    x.fillStyle="#fff";x.fillRect(0,0,W,H);x.strokeStyle="#334155";x.lineWidth=4;x.strokeRect(40,40,W-80,H-80);
    const F=(w,sz)=>`${w} ${sz}px "Noto Serif Devanagari","Nirmala UI","Mangal",serif`;
    x.fillStyle="#1e293b";x.textAlign="center";x.textBaseline="top";x.font=F(700,54);
    const title=s.type==="marriage"?(hi?"बायोडाटा (विवाह हेतु)":"MARRIAGE BIODATA"):(hi?"बायोडाटा":"BIODATA");
    if(s.type==="marriage"){x.font=F(400,30);x.fillStyle="#b45309";x.fillText(hi?"॥ श्री गणेशाय नमः ॥":"|| Shree Ganeshaya Namah ||",W/2,70);x.fillStyle="#1e293b";x.font=F(700,54)}
    let y=s.type==="marriage"?120:90;x.fillText(title,W/2,y);y+=80;x.fillRect(M,y,W-2*M,3);y+=36;
    let photoBottom=0;if(s.photo){const ph=await V.loadImg(s.photo);if(ph){const pw=240,phh=Math.min(300,ph.height*pw/ph.width);x.drawImage(ph,W-M-pw,y,pw,phh);x.strokeStyle="#94a3b8";x.lineWidth=2;x.strokeRect(W-M-pw,y,pw,phh);photoBottom=y+phh+20}}
    x.textAlign="left";const LBL=330,FS=30,LH=46;
    for(const [k,en,hiL,kind] of BIO){const v=(s[k]||"").trim();if(!v||(kind!=="all"&&kind!==s.type))continue;
      const right=y<photoBottom?W-M-270:W-M;
      x.font=F(600,FS);x.fillStyle="#334155";x.fillText((hi?hiL:en),M,y);x.fillText(":",M+LBL-26,y);
      x.font=F(400,FS);x.fillStyle="#111";
      for(const para of v.split("\n")){let line="";for(const w of para.split(/(\s+)/)){const t=line+w;if(x.measureText(t.trim()).width>right-(M+LBL)&&line.trim()){x.fillText(line.trim(),M+LBL,y);y+=LH;line=w.trimStart()}else line=t}
        if(line.trim()){x.fillText(line.trim(),M+LBL,y);y+=LH}}
      y+=10;if(y>H-140)break}
    if(s.type==="job"){y+=20;x.font=F(400,28);x.fillStyle="#111";
      const decl=hi?"मैं घोषणा करता/करती हूँ कि ऊपर दी गई सभी जानकारी मेरी जानकारी के अनुसार सत्य है।":"I declare that the above information is true to the best of my knowledge.";
      let line="";for(const w of decl.split(/(\s+)/)){const t=line+w;if(x.measureText(t.trim()).width>W-2*M&&line.trim()){x.fillText(line.trim(),M,y);y+=42;line=w.trimStart()}else line=t}if(line.trim()){x.fillText(line.trim(),M,y);y+=42}
      y+=40;x.fillText((hi?"दिनांक: ":"Date: ")+today(),M,y);x.textAlign="right";x.fillText(s.name||"",W-M,y)}
    return c}
  const baseName=()=>(store.get("bio",{}).name||"My")+" biodata";
  mk.onclick=async()=>{mk.disabled=true;try{const c=await render();const {jsPDF}=window.jspdf,doc=new jsPDF({unit:"pt",format:"a4"});doc.addImage(c.toDataURL("image/jpeg",0.92),"JPEG",0,0,595.28,841.89);await V.saveFile(V.fname(baseName(),"pdf"),doc.output("blob"))}catch(e){console.error(e);toast("Could not make the PDF.")}finally{mk.disabled=false}};
  img.onclick=async()=>{const c=await render();V.saveFile(V.fname(baseName(),"png"),await new Promise(r=>c.toBlob(r,"image/png")))};
  return p};

/* Certificates and notices: open the ready formats in the Letter tab */
BUILD.certs=()=>{const p=h("div",{class:"tpane"},h("h2",{},"Certificates and notices"),h("p",{class:"note"},"Pick one. It opens in the Letter tab with your details filled in. Change the words in [brackets], then download. Tip: turn on “Put letterhead on PDF” and the “Certificate” page design in My details."));
  const groups={"Certificates":["charcert","expcert","bonacert","tccert","salarycert"],"Notices (सूचना)":["nholiday","nmeeting","nsociety","nshop","nlost"],"Government formats":["affidavit","rtiappeal","noting","income","ration","followup"]};
  for(const [g,keys] of Object.entries(groups)){p.append(h("b",{},g));const row=h("div",{class:"row"});
    for(const k of keys)row.append(h("button",{class:"btn",type:"button",onclick:()=>{const sel=$("#tpl");sel.value=k;sel.dispatchEvent(new Event("change"));
      if(/cert$/.test(k)&&$("#design").value==="plain"){$("#design").value="certificate";store.set("design","certificate")}V.show("letter");toast("Opened: "+V.MORE_TPL[k][0])}},V.MORE_TPL[k][0]));p.append(row)}
  return p};

/* Hindi letter check */
const SPELL={"प्रीय":"प्रिय","क्रप्या":"कृपया","कृप्या":"कृपया","क्रपया":"कृपया","कृप्पया":"कृपया","आर्शीवाद":"आशीर्वाद","आशिर्वाद":"आशीर्वाद","उपरोक्त":"उपर्युक्त","सम्मानिय":"सम्माननीय","सम्माननिय":"सम्माननीय",
  "अनुग्रहित":"अनुगृहीत","दुबारा":"दोबारा","इसलिये":"इसलिए","लिये":"लिए","चाहिये":"चाहिए","दिये":"दिए","जाये":"जाए","आये":"आए","हुये":"हुए","गये":"गए","लिखे":"लिखे","किये":"किए","गयी":"गई","आयी":"आई","नयी":"नई","प्राथना":"प्रार्थना","प्राथर्ना":"प्रार्थना","प्रार्थाना":"प्रार्थना",
  "प्रथना":"प्रार्थना","धन्यबाद":"धन्यवाद","धनयवाद":"धन्यवाद","धन्यावाद":"धन्यवाद","भवदिय":"भवदीय","भवदिया":"भवदीया","अवकाष":"अवकाश","उज्वल":"उज्ज्वल","अत्याधिक":"अत्यधिक","पुज्य":"पूज्य","पूज्यनीय":"पूजनीय",
  "अध्यन":"अध्ययन","परिक्षा":"परीक्षा","प्रतिक्षा":"प्रतीक्षा","स्थिती":"स्थिति","परिस्थिती":"परिस्थिति","आगामि":"आगामी","विधार्थी":"विद्यार्थी","विद्यार्थि":"विद्यार्थी","विधालय":"विद्यालय","महत्व":"महत्त्व",
  "हस्ताक्षेप":"हस्तक्षेप","अनाधिकार":"अनधिकार","सौजन्यता":"सौजन्य","दिनाँक":"दिनांक","आज्ञाकारि":"आज्ञाकारी","प्रधानाचार्या":"प्रधानाचार्या","कार्यवाई":"कार्रवाई","कार्यवाही":"कार्रवाई","सविनए":"सविनय","निवेदक":"निवेदक",
  "श्रीमान्":"श्रीमान","संलग्न्":"संलग्न","आवेदिका":"आवेदिका","धयान":"ध्यान","घ्यान":"ध्यान","अनुरोध्":"अनुरोध","प्रमानपत्र":"प्रमाण-पत्र","प्रमाणपत्र":"प्रमाण-पत्र","प्रर्थना":"प्रार्थना"};
const INFORMAL={"छुट्टी":"अवकाश","मदद":"सहायता","जल्दी":"शीघ्र","जरूरी":"आवश्यक","ज़रूरी":"आवश्यक","इजाज़त":"अनुमति","इजाजत":"अनुमति","शुक्रिया":"धन्यवाद","अर्जी":"प्रार्थना-पत्र","तनख्वाह":"वेतन","बीमार":"अस्वस्थ",
  "चिट्ठी":"पत्र","खत":"पत्र","इंतज़ार":"प्रतीक्षा","इंतजार":"प्रतीक्षा","कोशिश":"प्रयास","दिक्कत":"असुविधा","परेशानी":"असुविधा","तारीख":"दिनांक","साल":"वर्ष","हफ्ते":"सप्ताह","इलाज":"उपचार","जवाब":"उत्तर","वजह":"कारण"};
const DEV="ऀ-ॿ";const wordRe=w=>new RegExp(`(?<![${DEV}])${w}(?![${DEV}])`,"g");
function checkHindi(text,female){const changes=[];let t=text;
  for(const [bad,good] of Object.entries(SPELL)){if(bad===good)continue;const re=wordRe(bad);if(re.test(t)){t=t.replace(wordRe(bad),good);changes.push(`${bad} → ${good}`)}}
  const dot=(t.match(new RegExp(`[${DEV})"'”’]\\s*\\.(?=\\s|$)`,"g"))||[]).length;if(dot){t=t.replace(new RegExp(`([${DEV})"'”’])\\s*\\.(?=\\s|$)`,"g"),"$1।");changes.push(`“.” → “।” (${dot})`)}
  if(/ {2,}/.test(t)){t=t.replace(/ {2,}/g," ");changes.push("Extra spaces removed")}
  const g=female?[["भवदीय","भवदीया"],["आपका आज्ञाकारी शिष्य","आपकी आज्ञाकारी शिष्या"],["आज्ञाकारी शिष्य","आज्ञाकारी शिष्या"],["प्रार्थी","प्रार्थिनी"],["आपका विश्वासी","आपकी विश्वासी"]]:[["भवदीया","भवदीय"],["आपकी आज्ञाकारी शिष्या","आपका आज्ञाकारी शिष्य"],["आज्ञाकारी शिष्या","आज्ञाकारी शिष्य"],["प्रार्थिनी","प्रार्थी"]];
  for(const [a,b] of g){if(wordRe(a).test(t)){t=t.replace(wordRe(a),b);changes.push(`${a} → ${b} (${female?"woman":"man"} writing)`)}}
  const before=t;const gs=V.genderSel.value;V.genderSel.value=female?"f":"m";try{t=V.hiPolish(t)}finally{V.genderSel.value=gs}
  if(t!==before)changes.push("Verb forms matched to the writer (करता/करती, रहा/रही…)");
  const warns=[];const formal=/विषय|महोदय|महोदया|सेवा में|प्रार्थना/.test(t);
  if(formal){if(!/सेवा में/.test(t))warns.push("Formal letters usually start with “सेवा में,”.");
    if(!/विषय\s*[:：-]/.test(t))warns.push("Add a subject line: “विषय: …”.");
    if(!/(महोदय|महोदया|आदरणीय|माननीय|श्रीमान)/.test(t))warns.push("Add a greeting like “महोदय,” or “महोदया,”.");
    if(!/(भवदीय|भवदीया|आपका|आपकी|प्रार्थी|प्रार्थिनी|विनीत|निवेदक)/.test(t))warns.push("Add a closing like “भवदीय” / “भवदीया” and your name.");
    if(!/(धन्यवाद|सधन्यवाद)/.test(t))warns.push("Letters usually end with “धन्यवाद सहित,”.")}
  if(!/दिनांक|[0-9०-९]{1,2}\s*[\/.-]\s*[0-9०-९]{1,2}\s*[\/.-]\s*[0-9०-९]{2,4}/.test(t))warns.push("There is no date. Add “दिनांक: …”.");
  const inf=Object.entries(INFORMAL).filter(([w])=>wordRe(w).test(t));
  return{text:t,changes,warns,inf}}
BUILD.check=()=>{const p=h("div",{class:"tpane"},h("h2",{},"Hindi letter check"),h("p",{class:"note"},"Paste or type a Hindi letter. Your Hindi letter from the Letter tab is filled in already."));
  const ta=h("textarea",{rows:"10","aria-label":"Hindi letter"});ta.value=/[ऀ-ॿ]/.test(V.out.value)?V.out.value:"";
  const who=h("select",{},h("option",{value:"m"},"Man"),h("option",{value:"f"},"Woman"));who.value=V.genderSel.value;
  const go=h("button",{class:"btn primary",type:"button"},"Check my letter");
  const res=h("div",{class:"grid",style:"grid-template-columns:1fr",hidden:true});
  p.append(ta,h("div",{class:"row"},h("label",{},"Written by",who),go),res);
  go.onclick=()=>{if(!/[ऀ-ॿ]/.test(ta.value))return toast("Paste a letter in Hindi first.");
    const r=checkHindi(ta.value,who.value==="f");res.hidden=false;res.replaceChildren();
    const outTa=h("textarea",{rows:"10","aria-label":"Checked letter"});outTa.value=r.text;
    res.append(h("b",{},r.changes.length?`Fixed ${r.changes.length} thing${r.changes.length>1?"s":""}`:"No spelling mistakes found"));
    if(r.changes.length)res.append(h("ul",{},r.changes.map(c=>h("li",{},c))));
    if(r.warns.length)res.append(h("b",{class:"warn"},"Please check"),h("ul",{},r.warns.map(c=>h("li",{},c))));
    if(r.inf.length){const all=h("button",{class:"btn",type:"button"},"Use all formal words");
      all.onclick=()=>{let t=outTa.value;for(const [a,b] of r.inf)t=t.replace(wordRe(a),b);outTa.value=t;all.disabled=true;toast("Formal words used")};
      res.append(h("b",{},"More formal words"),h("p",{class:"note"},r.inf.map(([a,b])=>`${a} → ${b}`).join(" · ")),h("div",{class:"row"},all))}
    const use=h("button",{class:"btn primary",type:"button"},"Use as my Hindi letter"),cp=h("button",{class:"btn",type:"button"},"Copy");
    use.onclick=()=>{V.setOut(outTa.value);V.show("letter");toast("Checked letter is in the Letter tab")};
    cp.onclick=async()=>{try{await navigator.clipboard.writeText(outTa.value);toast("Copied")}catch{outTa.select()}};
    res.append(outTa,h("div",{class:"row"},use,cp))};
  return p};

/* Kruti Dev 010 ↔ Unicode */
const KRUTI=[["v‚","ऑ"],["vks","ओ"],["vkS","औ"],["vk","आ"],["v","अ"],["bZ","ई"],["b","इ"],["m","उ"],["Å","ऊ"],[",s","ऐ"],[",","ए"],["_","ऋ"],
  ["Jh","श्री"],["J","श्र"],["{k","क्ष"],["{","क्ष्"],["=k","त्र"],["=","त्र्"],["K","ज्ञ"],["Ùk","त्त"],["Ù","त्त्"],["ä","क्त"],["–","दृ"],["—","कृ"],["í","द्द"],["}","द्व"],["|","द्य"],[")","द्ध"],["Ø","क्र"],["ç","प्र"],["#","रु"],[":","रू"],
  ["d","क"],["D","क्"],["[k","ख"],["[","ख्"],["x","ग"],["X","ग्"],["?k","घ"],["?","घ्"],["³","ङ"],["p","च"],["P","च्"],["N","छ"],["t","ज"],["T","ज्"],[">","झ"],["÷","झ्"],["¥","ञ"],
  ["V","ट"],["B","ठ"],["M","ड"],["<","ढ"],[".k","ण"],[".","ण्"],["r","त"],["R","त्"],["Fk","थ"],["F","थ्"],["n","द"],["/k","ध"],["/","ध्"],["u","न"],["U","न्"],
  ["i","प"],["I","प्"],["Q","फ"],["¶","फ्"],["c","ब"],["C","ब्"],["Hk","भ"],["H","भ्"],["e","म"],["E","म्"],[";","य"],["¸","य्"],["j","र"],["y","ल"],["Y","ल्"],["G","ळ"],["o","व"],["O","व्"],
  ["'k","श"],["'","श्"],['"k',"ष"],['"',"ष्"],["l","स"],["L","स्"],["g","ह"],["º","ह्"],
  ["ks","ो"],["kS","ौ"],["k","ा"],["h","ी"],["q","ु"],["w","ू"],["`","ृ"],["s","े"],["S","ै"],["‚","ॉ"],["a","ं"],["¡","ँ"],["%","ः"],["~","्"],["+","़"],["z","्र"],["ª","्र"],
  ["å","०"],["ƒ","१"],["„","२"],["…","३"],["†","४"],["‡","५"],["ˆ","६"],["‰","७"],["Š","८"],["‹","९"],["A","।"],["-","."],["&","-"],["^","‘"],["*","’"],["Þ","“"],["ß","”"],["¼","("],["½",")"],["¿","{"],["À","}"],["@","/"],["Œ","॰"],["]",","],["\\","?"],["f","\uE002"],["Z","\uE003"]];
const CONS="\u0915-\u0939\u0958-\u095F";const CL=`(?:[${CONS}]़?्)*[${CONS}]़?`;const MAT="ािीुूृेैोौॉंँः";
function krutiToUni(s){const sorted=[...KRUTI].sort((a,b)=>b[0].length-a[0].length);let o="";
  for(let i=0;i<s.length;){const m=sorted.find(([k])=>s.startsWith(k,i));if(m){o+=m[1];i+=m[0].length}else{o+=s[i];i++}}
  o=o.replace(new RegExp(`\uE002(${CL})`,"g"),"$1ि").replace(/\uE002/g,"ि");
  o=o.replace(new RegExp(`(${CL})([${MAT}]*)\uE003`,"g"),"र्$1$2").replace(/\uE003/g,"र्");
  return o.normalize("NFC")}
function uniToKruti(s){s=s.normalize("NFC").replace(/[\u0958-\u095F]/g,c=>c.normalize("NFD"));
  s=s.replace(/([क-ह]़?)्र/g,(m,c)=>c==="श"||c==="त"?m:c+"\uE001");
  s=s.replace(new RegExp(`र्(${CL})([${MAT}]*)`,"g"),"$1$2\uE003");
  s=s.replace(new RegExp(`(${CL})ि`,"g"),"\uE002$1");
  const REV=KRUTI.filter(([k,u])=>!(/[\uE002\uE003]/.test(u))&&!["ª","ç","ƒ","&"].includes(k)).map(([k,u])=>[u,k]);REV.push(["\uE001","z"],["\uE002","f"],["\uE003","Z"],["-","&"],["्र","z"],["१","ƒ"]);
  const sorted=REV.sort((a,b)=>b[0].length-a[0].length);let o="";
  for(let i=0;i<s.length;){const m=sorted.find(([u])=>s.startsWith(u,i));if(m){o+=m[1];i+=m[0].length}else{o+=s[i];i++}}
  return o}
V.kruti={krutiToUni,uniToKruti};
BUILD.kruti=()=>{const p=h("div",{class:"tpane"},h("h2",{},"Kruti Dev ↔ Unicode"),h("p",{class:"note"},"Paste text typed in Kruti Dev 010 (it looks like “Hkkjr”) to get normal Hindi (भारत), or paste normal Hindi to get Kruti Dev text for old software."));
  const a=h("textarea",{rows:"8","aria-label":"Text to change"}),b=h("textarea",{rows:"8","aria-label":"Result",readonly:true});
  const toU=h("button",{class:"btn primary",type:"button"},"Kruti Dev → Unicode Hindi"),toK=h("button",{class:"btn",type:"button"},"Unicode Hindi → Kruti Dev"),cp=h("button",{class:"btn",type:"button"},"Copy result"),use=h("button",{class:"btn",type:"button"},"Use in my letter");
  toU.onclick=()=>{b.value=krutiToUni(a.value);V.track("tool","kruti-u")};toK.onclick=()=>{b.value=uniToKruti(a.value);V.track("tool","kruti-k")};
  cp.onclick=async()=>{try{await navigator.clipboard.writeText(b.value);toast("Copied")}catch{b.select()}};
  use.onclick=()=>{if(!b.value.trim())return;V.setOut(b.value);V.show("letter")};
  p.append(a,h("div",{class:"row"},toU,toK),b,h("div",{class:"row"},cp,use),h("p",{class:"note"},"Kruti Dev text shows correctly only in the Kruti Dev 010 font."));return p};

/* Reply to a letter */
function readLetter(t){const g=re=>((t.match(re)||[])[1]||"").trim();
  const no=g(/(?:Letter\s*No\.?|Ref(?:erence)?\.?\s*(?:No\.?)?|पत्रांक|पत्र\s*(?:सं(?:ख्या)?\.?|क्रमांक)|क्रमांक)\s*[:\-–]?\s*([^\n,]+?)(?=\s*(?:dated|date|दिनांक|,|\n|$))/i);
  const date=g(/(?:dated|date|दिनांक)\s*[:\-–]?\s*([0-9०-९]{1,2}\s*[\/.\-]\s*[0-9०-९]{1,2}\s*[\/.\-]\s*[0-9०-९]{2,4}|[0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s*,?\s*[0-9]{4}|[A-Za-z]+\s+[0-9]{1,2},?\s*[0-9]{4}|[0-9०-९]{1,2}\s+[ऀ-ॿ]+\s+[0-9०-९]{4})/i);
  const subj=g(/(?:Subject|Sub\.?|विषय)\s*[:\-–]\s*(.+)/i);
  let from="";const fm=t.match(/(?:^|\n)\s*(?:From|प्रेषक)\s*[:,]?\s*\n?([\s\S]*?)(\n\s*\n|\n\s*(?:To|सेवा में))/i);
  if(fm)from=fm[1].trim();else{const lines=t.split("\n").map(x=>x.trim());const ci=lines.findIndex(x=>/^(yours|sincerely|regards|भवदीय|भवदीया|आपका|आपकी|हस्ताक्षर)/i.test(x));
    if(ci>=0)from=lines.slice(ci+1).filter(Boolean).slice(0,4).join("\n");else from=lines.filter(Boolean).slice(0,2).join("\n")}
  return{no,date,subj,from}}
BUILD.reply=()=>{const p=h("div",{class:"tpane"},h("h2",{},"Reply to a letter"),h("p",{class:"note"},"Take a photo of the letter you received, or paste its text. Check the details Varnum finds, write your answer in one or two lines, and get the full reply letter."));
  const photo=h("button",{class:"btn",type:"button"},"📷 Read a photo"),pin=h("input",{type:"file",accept:"image/*",hidden:true});
  const ta=h("textarea",{rows:"7","aria-label":"Letter you received",placeholder:"Paste the letter you received here"});
  const f={from:h("textarea",{rows:"3"}),no:h("input",{type:"text"}),date:h("input",{type:"text"}),subj:h("input",{type:"text"}),ans:h("textarea",{rows:"3",placeholder:"e.g. the documents you asked for are attached / the payment was made on 12 October"})};
  const fill=()=>{const r=readLetter(ta.value);f.from.value=r.from;f.no.value=r.no;f.date.value=r.date;f.subj.value=r.subj};
  ta.addEventListener("input",()=>{clearTimeout(ta._t);ta._t=setTimeout(fill,400)});
  photo.onclick=()=>pin.click();
  pin.onchange=async()=>{const file=pin.files[0];pin.value="";if(!file)return;photo.disabled=true;photo.textContent="Reading… (first time can take a minute)";
    try{ta.value=await V.ocr(file);fill();if(!ta.value)toast("No text found. Try a clearer photo.")}catch(e){console.error(e);toast("Could not read the photo. Check your internet and try again.")}finally{photo.disabled=false;photo.textContent="📷 Read a photo"}};
  const go=h("button",{class:"btn primary",type:"button"},"Make my reply letter");
  go.onclick=()=>{const from=f.from.value.trim()||"[Name / designation of the sender],\n[Office address]",no=f.no.value.trim(),date=f.date.value.trim(),subj=f.subj.value.trim()||"[subject]",ans=f.ans.value.trim()||"[write your reply here]";
    const ref=`your letter${no?" no. "+no:""}${date?" dated "+date:""}`;
    V.setSrc(`To,\n${from}\n\nSubject: Reply to ${ref} regarding ${subj.replace(/\.$/,"")}\n\nSir/Madam,\n\nWith reference to ${ref} on the above subject, I wish to state that ${ans.replace(/^\w/,c=>c.toLowerCase()).replace(/\.?$/,".")}\n\nI hope this is in order. Please let me know if anything more is needed.\n\nThanking you,\n\nYours faithfully,\n${store.get("lhName","")||"[Your name]"}\n${store.get("lhContact","")?"Phone: "+store.get("lhContact","")+"\n":""}Date: ${today()}`);
    V.show("letter");toast("Reply letter ready. Check it and translate.")};
  p.append(h("div",{class:"row"},photo,pin),ta,h("div",{class:"grid"},h("label",{},"Reply goes to (sender)",f.from),h("label",{},"Their letter no.",f.no),h("label",{},"Their letter date",f.date),h("label",{},"Subject",f.subj)),h("label",{},"Your answer, in short",f.ans),h("div",{class:"row"},go));
  return p};

/* Scan to PDF */
async function cleanPhoto(file,mode){const img=await V.loadImg(URL.createObjectURL(file));if(!img)throw new Error("img");
  const sc=Math.min(1,1700/Math.max(img.width,img.height));let c=document.createElement("canvas");c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);let x=c.getContext("2d");x.drawImage(img,0,0,c.width,c.height);
  let d=x.getImageData(0,0,c.width,c.height),px=d.data,W=c.width,H=c.height;
  // Find the paper: the bright area. Crop to rows/columns where most pixels are bright.
  const gray=new Float32Array(W*H);for(let i=0;i<W*H;i++)gray[i]=0.3*px[i*4]+0.59*px[i*4+1]+0.11*px[i*4+2];
  const sorted=Float32Array.from(gray).sort(),lo=sorted[Math.floor(sorted.length*0.04)],hi=sorted[Math.floor(sorted.length*0.96)],thr=lo+(hi-lo)*0.55;
  const rowOk=y=>{let n=0;for(let x2=0;x2<W;x2+=4)if(gray[y*W+x2]>thr)n++;return n>W/4*0.5},colOk=x2=>{let n=0;for(let y=0;y<H;y+=4)if(gray[y*W+x2]>thr)n++;return n>H/4*0.5};
  let t=0,b=H-1,l=0,r=W-1;while(t<H/3&&!rowOk(t))t++;while(b>H*2/3&&!rowOk(b))b--;while(l<W/3&&!colOk(l))l++;while(r>W*2/3&&!colOk(r))r--;
  const cw=r-l+1,ch=b-t+1;if(cw*ch<W*H*0.97&&cw*ch>W*H*0.3){const o=document.createElement("canvas");o.width=cw;o.height=ch;o.getContext("2d").drawImage(c,l,t,cw,ch,0,0,cw,ch);c=o;x=c.getContext("2d");W=cw;H=ch;d=x.getImageData(0,0,W,H);px=d.data}
  // Stretch the contrast so the paper turns white and the ink dark.
  const g2=[];for(let i=0;i<W*H;i+=7)g2.push(0.3*px[i*4]+0.59*px[i*4+1]+0.11*px[i*4+2]);g2.sort((a,b2)=>a-b2);
  const L=g2[Math.floor(g2.length*0.03)],Hh=g2[Math.floor(g2.length*0.85)],k=255/Math.max(30,Hh-L);
  for(let i=0;i<px.length;i+=4){if(mode==="bw"){let v=(0.3*px[i]+0.59*px[i+1]+0.11*px[i+2]-L)*k;v=v>200?255:v<0?0:Math.pow(v/255,1.6)*255;px[i]=px[i+1]=px[i+2]=v}
    else for(let j=0;j<3;j++)px[i+j]=Math.max(0,Math.min(255,(px[i+j]-L)*k))}
  x.putImageData(d,0,0);return c}
BUILD.scan=()=>{const p=h("div",{class:"tpane"},h("h2",{},"Scan to PDF"),h("p",{class:"note"},"Take photos of each page from straight above, in good light. Varnum crops the paper and makes the writing dark and clear. Photos stay on your device."));
  const add=h("button",{class:"btn primary",type:"button"},"📷 Add pages"),inp=h("input",{type:"file",accept:"image/*",capture:"environment",multiple:true,hidden:true});
  const mode=h("select",{},h("option",{value:"bw"},"Black & white (clean)"),h("option",{value:"color"},"Colour"));mode.value=store.get("scanMode","bw");
  const grid=h("div",{class:"scanpages"}),pages=[];
  const mk=h("button",{class:"btn primary",type:"button",disabled:true},"Download PDF"),read=h("button",{class:"btn",type:"button",disabled:true},"Read the text and translate");
  const paint=()=>{grid.replaceChildren();pages.forEach((pg,i)=>{const im=h("img",{alt:"Page "+(i+1),src:pg.c.toDataURL("image/jpeg",0.6)});
    const rot=h("button",{class:"btn",type:"button",title:"Turn"},"↻"),del=h("button",{class:"btn",type:"button",title:"Remove"},"✕"),up=h("button",{class:"btn",type:"button",title:"Move left",disabled:!i},"←");
    rot.onclick=()=>{const o=document.createElement("canvas");o.width=pg.c.height;o.height=pg.c.width;const x=o.getContext("2d");x.translate(o.width,0);x.rotate(Math.PI/2);x.drawImage(pg.c,0,0);pg.c=o;paint()};
    del.onclick=()=>{pages.splice(i,1);paint()};up.onclick=()=>{[pages[i-1],pages[i]]=[pages[i],pages[i-1]];paint()};
    grid.append(h("figure",{},im,h("figcaption",{},"Page "+(i+1)),h("div",{class:"row"},up,rot,del)))});mk.disabled=read.disabled=!pages.length};
  add.onclick=()=>inp.click();mode.onchange=()=>store.set("scanMode",mode.value);
  inp.onchange=async()=>{const files=[...inp.files];inp.value="";add.disabled=true;
    for(const f of files){try{pages.push({c:await cleanPhoto(f,mode.value),file:f})}catch{toast("One photo could not be opened.")}}add.disabled=false;paint()};
  mk.onclick=async()=>{mk.disabled=true;try{const {jsPDF}=window.jspdf,doc=new jsPDF({unit:"pt",format:"a4"});
    pages.forEach((pg,i)=>{if(i)doc.addPage("a4","p");const pw=595.28,ph=841.89,m=18,s=Math.min((pw-2*m)/pg.c.width,(ph-2*m)/pg.c.height),w=pg.c.width*s,hh=pg.c.height*s;
      doc.addImage(pg.c.toDataURL("image/jpeg",0.85),"JPEG",(pw-w)/2,(ph-hh)/2,w,hh)});
    await V.saveFile(V.fname("Scan "+new Date().toISOString().slice(0,10),"pdf"),doc.output("blob"));V.track("tool","scan-pdf")}catch(e){console.error(e);toast("Could not make the PDF.")}finally{mk.disabled=false}};
  read.onclick=async()=>{read.disabled=true;read.textContent="Reading… (first time can take a minute)";
    try{let all=[];for(const pg of pages){const blob=await new Promise(r=>pg.c.toBlob(r,"image/png"));all.push(await V.ocr(blob))}const t=all.filter(Boolean).join("\n\n");
      if(!t)return toast("No text found. Try a clearer photo.");V.setSrc(t);V.show("letter");toast("Text read. Translation is on the right.")}
    catch(e){console.error(e);toast("Could not read the text. Check your internet and try again.")}finally{read.disabled=false;read.textContent="Read the text and translate"}};
  p.append(h("div",{class:"row"},add,inp,h("label",{},"Look",mode)),grid,h("div",{class:"row"},mk,read));return p};

/* Envelope */
BUILD.envelope=()=>{const p=h("div",{class:"tpane"},h("h2",{},"Envelope"),h("p",{class:"note"},"The address comes from your letter. Print on a DL envelope (22 × 11 cm), or on A4 paper and cut it out."));
  const pick=t=>{const m=t.match(/^\s*(?:To,?|सेवा में,?)\s*\n([\s\S]*?)(\n\s*\n|$)/i);return m?m[1].trim():""};
  const to=h("textarea",{rows:"5"});to.value=pick(V.out.value)||pick(V.src.value);
  const fromT=h("textarea",{rows:"4"});fromT.value=[store.get("lhName",""),store.get("lhAddr",""),store.get("lhContact","")].filter(x=>x.trim()).join("\n");
  const post=h("select",{},h("option",{value:""},"No label"),h("option",{value:"SPEED POST"},"Speed Post"),h("option",{value:"REGISTERED POST"},"Registered Post"),h("option",{value:"BY HAND"},"By hand"),h("option",{value:"CONFIDENTIAL"},"Confidential"));
  const size=h("select",{},h("option",{value:"dl"},"DL envelope (22 × 11 cm)"),h("option",{value:"a4"},"A4 paper"));
  const mk=h("button",{class:"btn primary",type:"button"},"Download envelope PDF");
  mk.onclick=async()=>{if(!to.value.trim())return toast("Write the “To” address first.");
    await document.fonts.load('400 20px "Noto Serif Devanagari"').catch(()=>{});
    const W=2200,H=1100,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,W,H);
    const F=(w,s)=>`${w} ${s}px "Noto Serif Devanagari","Nirmala UI","Mangal",serif`;x.textBaseline="top";x.fillStyle="#111";
    const hi=/[ऀ-ॿ]/.test(to.value);
    if(post.value){x.font=F(700,52);x.textAlign="right";x.fillText(post.value,W-110,90);x.strokeStyle="#111";x.lineWidth=4;const tw=x.measureText(post.value).width;x.strokeRect(W-130-tw,70,tw+40,90)}
    x.textAlign="left";let y=420;x.font=F(600,48);x.fillText(hi?"सेवा में,":"To,",1050,y);y+=78;x.font=F(400,52);for(const l of to.value.split("\n")){x.fillText(l.trim(),1050,y);y+=74}
    if(fromT.value.trim()){let fy=H-90-fromT.value.split("\n").length*48-56;x.font=F(600,38);x.fillText(hi?"प्रेषक:":"From:",110,fy);fy+=56;x.font=F(400,36);for(const l of fromT.value.split("\n")){x.fillText(l.trim(),110,fy);fy+=48}}
    const {jsPDF}=window.jspdf;let doc;
    if(size.value==="dl"){doc=new jsPDF({unit:"mm",format:[220,110],orientation:"landscape"});doc.addImage(c.toDataURL("image/jpeg",0.92),"JPEG",0,0,220,110)}
    else{doc=new jsPDF({unit:"mm",format:"a4",orientation:"landscape"});doc.addImage(c.toDataURL("image/jpeg",0.92),"JPEG",38,50,220,110);doc.setDrawColor(150);doc.setLineDashPattern([2,2],0);doc.rect(38,50,220,110)}
    await V.saveFile(V.fname("Envelope","pdf"),doc.output("blob"));V.track("tool","envelope")};
  p.append(h("div",{class:"grid"},h("label",{},"To",to),h("label",{},"From (your address)",fromT)),h("div",{class:"row"},h("label",{},"Label",post),h("label",{},"Size",size),mk));return p};

// Reopen the last tool when coming back to the tab.
const last=store.get("tool","");if(BUILD[last]&&!$("#view-tools").hidden)openTool(last);
$("#tab-tools").addEventListener("click",()=>{if(!pane.firstChild){const t=store.get("tool","");if(BUILD[t])openTool(t)}});
}
if(window.VN)start();else window.addEventListener("vn-ready",start,{once:true});
})();
