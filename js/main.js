(() => {
  const siteConfig = { projectsDelivered:'20+', coreServices:'4', yearsExperience:'3+', clientFocus:'Global' };
  document.querySelectorAll('[data-stat]').forEach(el => { const key=el.dataset.stat; if (siteConfig[key]) el.textContent=siteConfig[key]; });

  const nav=document.querySelector('[data-navbar]');
  const syncNav=()=>nav?.classList.toggle('nav-scrolled',window.scrollY>12);
  syncNav(); window.addEventListener('scroll',syncNav,{passive:true});

  const megaToggle=document.querySelector('[data-mega-toggle]');
  const mega=document.querySelector('[data-mega]');
  const setMega=(open)=>{ if(!mega||!megaToggle)return; mega.dataset.open=String(open); megaToggle.setAttribute('aria-expanded',String(open)); if(open)setAbout(false); };
  megaToggle?.addEventListener('click',e=>{e.stopPropagation();setMega(mega.dataset.open!=='true');});
  megaToggle?.addEventListener('mouseenter',()=>setMega(true));
  mega?.addEventListener('mouseenter',()=>setMega(true));
  mega?.addEventListener('mouseleave',()=>setMega(false));
  document.addEventListener('click',e=>{if(mega&&!mega.contains(e.target)&&e.target!==megaToggle)setMega(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMega(false);});

  const aboutToggle=document.querySelector('[data-about-toggle]');
  const aboutMenu=document.querySelector('[data-about-menu]');
  const aboutWrap=aboutToggle?.parentElement;
  function setAbout(open){
    if(!aboutMenu||!aboutToggle)return;
    aboutMenu.dataset.open=String(open);
    aboutToggle.setAttribute('aria-expanded',String(open));
    if(open&&mega){mega.dataset.open='false';megaToggle?.setAttribute('aria-expanded','false');}
  }
  aboutToggle?.addEventListener('click',e=>{e.stopPropagation();setAbout(aboutMenu.dataset.open!=='true');});
  let aboutCloseTimer;
  aboutWrap?.addEventListener('mouseenter',()=>{clearTimeout(aboutCloseTimer);setAbout(true);});
  aboutWrap?.addEventListener('mouseleave',()=>{aboutCloseTimer=setTimeout(()=>setAbout(false),140);});
  document.addEventListener('click',e=>{if(aboutMenu&&!aboutWrap?.contains(e.target))setAbout(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setAbout(false);});

  const mobileBtn=document.querySelector('[data-mobile-toggle]');
  const mobileMenu=document.querySelector('[data-mobile-menu]');
  mobileBtn?.addEventListener('click',()=>{const open=mobileMenu?.classList.contains('hidden');mobileMenu?.classList.toggle('hidden',!open);mobileBtn.setAttribute('aria-expanded',String(open));});
  document.querySelector('[data-mobile-services-toggle]')?.addEventListener('click',e=>{const panel=document.querySelector('[data-mobile-services]');if(!panel)return;const open=panel.classList.contains('hidden');panel.classList.toggle('hidden',!open);e.currentTarget.setAttribute('aria-expanded',String(open));});
  document.querySelector('[data-mobile-about-toggle]')?.addEventListener('click',e=>{const panel=document.querySelector('[data-mobile-about]');if(!panel)return;const open=panel.classList.contains('hidden');panel.classList.toggle('hidden',!open);e.currentTarget.setAttribute('aria-expanded',String(open));});

  document.querySelectorAll('.faq-item').forEach(item=>item.querySelector('button')?.addEventListener('click',()=>{const answer=item.querySelector('.faq-answer');const open=item.dataset.open==='true';item.dataset.open=String(!open);item.querySelector('button').setAttribute('aria-expanded',String(!open));answer?.classList.toggle('hidden',open);}));

  const filters=document.querySelectorAll('[data-filter]');
  const projects=document.querySelectorAll('[data-project-category]');
  filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');const f=btn.dataset.filter;projects.forEach(card=>card.classList.toggle('hidden',f!=='all'&&!card.dataset.projectCategory.split(' ').includes(f)));}));

  const revealItems=document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
    revealItems.forEach((item,index)=>{item.style.transitionDelay=`${Math.min(index%3,2)*80}ms`;revealObserver.observe(item);});
  }else revealItems.forEach(item=>item.classList.add('is-visible'));

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  if(window.lucide)window.lucide.createIcons();
})();
