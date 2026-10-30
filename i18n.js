/* Rubico multilingual UI; no API or server required. Works over file:// and https://. */
(()=>{
 'use strict';
 const translations=window.RUBICO_TRANSLATIONS||{};
 const qs=new URLSearchParams(window.location.search);
 let stored='tr';try{stored=localStorage.getItem('rubico-language')||'tr'}catch(_){}
 const lang=['tr','en'].includes(qs.get('lang'))?qs.get('lang'):(stored==='en'?'en':'tr');
 const t=(source)=>lang==='en'?(translations[String(source)]||String(source)):String(source);
 window.RubicoI18n={lang,t};
 document.documentElement.lang=lang;
 function translateText(root){
  const tree=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;
  while((node=tree.nextNode())){
   if(node.parentElement?.closest('script,style,noscript,textarea,[data-no-translate]'))continue;
   const raw=node.nodeValue,trim=raw.trim();
   if(!trim||!Object.prototype.hasOwnProperty.call(translations,trim))continue;
   const start=raw.match(/^\s*/)?.[0]||'',end=raw.match(/\s*$/)?.[0]||'';
   node.nodeValue=start+t(trim)+end;
  }
 }
 function translateAttrs(root){
  const nodes=[root,...root.querySelectorAll('*')];
  for(const el of nodes){
   if(el.nodeType!==1)continue;
   for(const key of ['placeholder','aria-label','alt','title']){
    if(!el.hasAttribute(key))continue;
    const val=el.getAttribute(key);
    if(translations[val])el.setAttribute(key,t(val));
   }
  }
 }
 function updateLinks(root){
  for(const a of root.querySelectorAll('a[href]')){
   const href=a.getAttribute('href');
   if(!href||!/^([\w\-]+\.html)(\?|#|$)/i.test(href))continue;
   const hashIndex=href.indexOf('#'),beforeHash=hashIndex<0?href:href.slice(0,hashIndex),fragment=hashIndex<0?'':href.slice(hashIndex);
   const questionIndex=beforeHash.indexOf('?');
   const pathname=questionIndex<0?beforeHash:beforeHash.slice(0,questionIndex);
   const params=new URLSearchParams(questionIndex<0?'':beforeHash.slice(questionIndex+1));
   if(lang==='en')params.set('lang','en');else params.delete('lang');
   a.setAttribute('href',pathname+(params.toString()?'?'+params.toString():'')+fragment);
  }
 }
 function apply(root=document){
  translateText(root);translateAttrs(root);updateLinks(root);
  if(root===document){
   const title=document.title;
   if(translations[title])document.title=t(title);
   const meta=document.querySelector('meta[name="description"]');
   if(meta&&translations[meta.content])meta.content=t(meta.content);
   for(const btn of document.querySelectorAll('[data-set-lang]')){
    const active=btn.dataset.setLang===lang;
    btn.classList.toggle('is-active',active);
    btn.setAttribute('aria-pressed',String(active));
   }
   document.querySelectorAll('.top-lang-indicator').forEach(node=>node.textContent=lang.toUpperCase());
  }
 }
 window.RubicoI18n.apply=apply;
 function setLanguage(next){
  if(!['tr','en'].includes(next)||next===lang)return;
  try{localStorage.setItem('rubico-language',next)}catch(_){}
  // Hard navigation also works when browsers isolate each file:// page's storage.
  const url=new URL(location.href);
  if(next==='en')url.searchParams.set('lang','en');else url.searchParams.delete('lang');
  window.location.assign(url.href);
 }
 document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-set-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.setLang)));
  try{localStorage.setItem('rubico-language',lang)}catch(_){}
  apply();
 });
})();
