/* Rubico static multi-page prototype. No external API, no backend. */
(()=>{
 'use strict';
 const $=(s,root=document)=>root.querySelector(s);
 const $$=(s,root=document)=>[...root.querySelectorAll(s)];
 const getStore=(key)=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(e){return []}};
 const setStore=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch(e){return false}};
 const esc=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
 const qs=new URLSearchParams(location.search);
 const loc=s=>window.RubicoI18n?.t?.(s)||s;
 const en=window.RubicoI18n?.lang==='en';
 const products=[
 {slug:'silikon-profiller',name:'Silikon Profil & Fitil',cat:'Silikon',img:'product-profiles.svg',desc:'Özel kesitli profil, fitil ve ekstrüzyon çözümleri.',mat:'Silikon (VMQ), EPDM',quote:'Profil / Fitil'},
 {slug:'conta-o-ring',name:'Conta & O-Ring',cat:'Sızdırmazlık',img:'product-seals.svg',desc:'Farklı geometriler ve çalışma koşulları için sızdırmazlık elemanları.',mat:'EPDM, NBR, FKM, VMQ',quote:'Conta / O-Ring'},
 {slug:'silikon-hortum',name:'Silikon Hortum',cat:'Silikon',img:'product-hoses.svg',desc:'Düz veya özel kesitli esnek hortum ve boru uygulamaları.',mat:'Silikon (VMQ)',quote:'Hortum / Boru'},
 {slug:'kalipli-parcalar',name:'Kalıplı Teknik Parçalar',cat:'Özel Üretim',img:'product-molded.svg',desc:'Geometriye ve uygulamaya özel elastomer parça tasarımları.',mat:'EPDM, NBR, VMQ, diğer',quote:'Kalıplı Parça'},
 {slug:'levha-serit',name:'Levha & Şerit',cat:'Silikon',img:'product-sheets.svg',desc:'Conta kesimine ve özel imalata uygun levha / şerit formları.',mat:'Silikon (VMQ), kauçuk',quote:'Levha / Şerit'},
 {slug:'titresim-takoz',name:'Titreşim Takozu',cat:'Kauçuk',img:'product-mounts.svg',desc:'Makine ve ekipmanlarda esnek bağlantı parçaları.',mat:'NR, SBR, EPDM, NBR',quote:'Titreşim Takozu'},
 {slug:'koruk-diyafram',name:'Körük & Diyafram',cat:'Kauçuk',img:'product-bellows.svg',desc:'Dinamik hareket ve koruma uygulamalarına yönelik tasarımlar.',mat:'Uygulamaya özel',quote:'Körük / Diyafram'},
 {slug:'ozel-geometri',name:'Özel Geometrili Parça',cat:'Özel Üretim',img:'product-custom.svg',desc:'Teknik çizime veya numuneye göre özelleştirilebilir parçalar.',mat:'Uygulamaya özel',quote:'Özel Teknik Parça'}];
 // Mobile navigation
 const menu=$('#menuButton'),mob=$('#mobileMenu');
 if(menu&&mob){menu.addEventListener('click',()=>{const opened=mob.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Menüyü kapat':'Menüyü aç')}); $$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mob.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}
 let toastTimer;
 function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3200)}
 // Catalog filtering
 if($('#productGrid')){
  let filter='Tümü';const search=$('#productSearch');
  const apply=()=>{const query=(search?.value||'').trim().toLocaleLowerCase('tr');let count=0;
   $$('#productGrid .product-card').forEach(el=>{const p=products.find(x=>el.getAttribute('href').includes(x.slug));const term=p?`${p.name} ${loc(p.name)} ${p.cat} ${loc(p.cat)} ${p.mat} ${p.desc} ${loc(p.desc)}`.toLocaleLowerCase(en?'en':'tr'):el.textContent.toLocaleLowerCase(en?'en':'tr');const show=(filter==='Tümü'||p?.cat===filter) &&(!query||term.includes(query));el.hidden=!show;if(show)count++});
   if($('#productCount'))$('#productCount').textContent=`${String(count).padStart(2,'0')} ${en?'PRODUCT GROUPS':'ÜRÜN GRUBU'}`;
   if($('#emptyProducts'))$('#emptyProducts').hidden=count!==0;
  };
  $$('#productFilters .filter-btn').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;$$('#productFilters .filter-btn').forEach(x=>x.classList.toggle('selected',x===b));apply()}));search?.addEventListener('input',apply);apply();
 }
 // Product details
 if(document.body.dataset.page==='detail'){
  const p=products.find(x=>x.slug===qs.get('urun'))||products[0];
  $('#detailImage').src='assets/'+p.img;$('#detailImage').alt=loc(p.name)+(en?' illustrative product image':' temsilî ürün görseli');
  $('#detailCategory').textContent='R / '+loc(p.cat).toLocaleUpperCase(en?'en':'tr');$('#detailName').textContent=loc(p.name);
  $('#detailDesc').textContent=loc(p.desc);$('#detailMaterials').textContent=p.mat;
  $('#detailQuote').href='konfigurator.html?parca='+encodeURIComponent(p.quote);
  document.title=loc(p.name)+' | RUBICO';
 }
 // Static form => local demo storage only. NOT a real submission or upload.
 const conf=$('#configForm');
 if(conf){
  let step=1,latest=null,attachedName='';
  const fields=name=>conf.elements.namedItem(name);
  const requiredByStep={1:['parca','malzeme','adet'],2:[],3:['ad','firma','eposta','demoOnay']};
  const validate=(num)=>{for(const n of requiredByStep[num]){const field=fields(n);if(!field||!field.checkValidity()){field?.focus();$('#configFeedback').textContent=en?'Please fill in the required fields correctly.':'Lütfen zorunlu alanları doğru şekilde doldurun.';return false}}$('#configFeedback').textContent='';return true};
  const showStep=n=>{step=n;$$('.step-panel').forEach(x=>x.hidden!==undefined&&(x.hidden=Number(x.dataset.step)!==n));$$('[data-step-nav]').forEach(x=>x.classList.toggle('active',Number(x.dataset.stepNav)===n));$('#prevStep').hidden=n===1;$('#nextStep').hidden=n===3;$('#submitConfig').hidden=n!==3;if(n===3)renderSummary();conf.scrollIntoView({behavior:'smooth',block:'start'})};
  const getVal=name=>{const field=fields(name);return field?.type==='checkbox'?field.checked:field?.value||''};
  const collect=()=>Object.fromEntries(['parca','malzeme','sertlik','adet','olcu','sektor','sicaklik','ortam','aciklama','ad','firma','eposta','telefon'].map(k=>[k,getVal(k)]));
  const renderSummary=()=>{const v=collect();$('#configSummary').innerHTML=`<span>${en?'REQUEST SUMMARY':'TALEP ÖZETİ'}</span><p><b>${en?'Part':'Parça'}:</b> ${esc(loc(v.parca||'—'))}<br><b>${en?'Material':'Malzeme'}:</b> ${esc(loc(v.malzeme||'—'))}<br><b>${en?'Quantity':'Adet'}:</b> ${esc(v.adet||'—')}<br><b>${en?'Industry':'Sektör'}:</b> ${esc(loc(v.sektor||'Belirtilmedi'))}<br><b>${en?'File':'Dosya'}:</b> ${esc(attachedName||(en?'Not selected':'Seçilmedi'))}</p>`};
  $('#nextStep').addEventListener('click',()=>{if(validate(step))showStep(Math.min(3,step+1))});
  $('#prevStep').addEventListener('click',()=>showStep(Math.max(1,step-1)));
  const file=$('#drawingFile');file?.addEventListener('change',()=>{const f=file.files?.[0]; if(!f){attachedName='';$('#fileStatus').textContent=loc('Henüz dosya seçilmedi');return};if(f.size>10*1024*1024){toast(en?'File size must not exceed 10 MB.':'Dosya 10 MB sınırını aşmamalı.');file.value='';attachedName='';$('#fileStatus').textContent=en?'File too large':'Dosya çok büyük';return};const valid=/\.(pdf|step|stp|dxf|dwg|png|jpg|jpeg)$/i.test(f.name);if(!valid){toast(en?'Please choose a supported file format.':'Desteklenen dosya türlerinden birini seçin.');file.value='';attachedName='';return};attachedName=f.name;$('#fileStatus').textContent=(en?'Selected: ':'Seçildi: ')+f.name+(en?' (this demo does not upload files)':' (bu demo dosyayı yüklemez)')});
  // prefill from relevant pages
  const setIfValid=(name,v)=>{if(!v)return;const f=fields(name);if(f&&[...f.options||[]].some(o=>o.value===v))f.value=v};
  setIfValid('parca',qs.get('parca'));setIfValid('malzeme',qs.get('malzeme'));setIfValid('sektor',qs.get('sektor'));
  conf.addEventListener('submit',e=>{e.preventDefault();if(!validate(3))return;if(!validate(1)){showStep(1);return};
   latest=collect();latest.dosyaAdi=attachedName;latest.date=new Date().toISOString();latest.id='RBC-'+Date.now().toString().slice(-8);
   const wasSaved=setStore('rubico-demo-quotes',[latest,...getStore('rubico-demo-quotes')]);
   conf.hidden=true;const success=$('#quoteSuccess');success.hidden=false;$('#quoteReference').textContent=latest.id+(wasSaved?(en?' · Saved in this browser':' · Tarayıcıya kaydedildi'):(en?' · Browser storage unavailable; download only.':' · Tarayıcı depolaması kapalı; yalnızca dosya indirilebilir.'));success.scrollIntoView({behavior:'smooth',block:'center'});
  });
  $('#downloadSummary')?.addEventListener('click',()=>{if(!latest)return;const lines=[en?'RUBICO | TECHNICAL REQUEST SUMMARY (DEMO)':'RUBICO | TEKNİK TALEP ÖZETİ (DEMO)',en?'This form has not been submitted to the Rubico team.':'Bu form gerçek Rubico sistemine gönderilmemiştir.','',...Object.entries(latest).map(([key,val])=>`${key}: ${loc(val||'—')}`),'',en?'NOTE: Technical drawing files are not uploaded in this demo.':'NOT: Teknik çizim dosyası bu demoya yüklenmemiştir.'];const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`${latest.id}-talep-ozeti.txt`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000)});
 }
 const contact=$('#contactForm');
 if(contact)contact.addEventListener('submit',e=>{e.preventDefault();if(!contact.reportValidity())return;const val=Object.fromEntries(new FormData(contact).entries());val.date=new Date().toISOString();const success=setStore('rubico-demo-messages',[val,...getStore('rubico-demo-messages')]);$('#contactFeedback').style.color='#247a65';$('#contactFeedback').textContent=success?(en?'Your demo message was saved in this browser. It was not sent to a server.':'Demo mesajınız bu tarayıcıda kaydedildi. Sunucuya gönderilmedi.'):(en?'Browser storage is unavailable; message was not sent.':'Tarayıcı kaydı kullanılamıyor; mesaj gönderilmedi.');if(success)contact.reset()});
 // Admin overview. Read-only preview to avoid pretending there's secure admin.
 if(document.body.dataset.page==='admin'){
  const quotes=getStore('rubico-demo-quotes'),messages=getStore('rubico-demo-messages');
  $('#adminQuoteCount').textContent=String(quotes.length);$('#adminMsgCount').textContent=String(messages.length);
  const row=(head,detail,rest)=>`<div class="admin-row"><div><strong>${esc(head)}</strong><small>${esc(detail)}</small></div><small>${esc(rest)}</small></div>`;
  if(quotes.length)$('#adminQuotes').innerHTML=quotes.slice(0,10).map(q=>row(q.firma||q.ad,`${loc(q.parca||'')} · ${q.adet||''} ${en?'units':'adet'}`,q.id||'DEMO')).join('');
  if(messages.length)$('#adminMessages').innerHTML=messages.slice(0,10).map(q=>row(q.ad||'Mesaj',q.konu||'',q.eposta||'')).join('');
 }
})();
