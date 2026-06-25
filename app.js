window.__SVC=[{"slug": "full-groom", "name": "Full Groom & Haircut"}, {"slug": "bath-and-brush", "name": "Bath & Brush"}, {"slug": "nail-trim", "name": "Nail Trim & Tidy"}, {"slug": "de-shed-blowout", "name": "De-Shed & Blowout"}, {"slug": "gentle-care", "name": "Gentle Care for Puppies & Seniors"}, {"slug": "daycare", "name": "Doggie Daycare & Play"}];window.__PHONE="+12085142366";
(function(){
  // ---- mobile menu ----
  var burger=document.getElementById('burger'), mnav=document.getElementById('mobile-nav');
  if(burger&&mnav){burger.addEventListener('click',function(){
    var open=mnav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
  });}
  // ---- live open / closed badge ----
  // Hours Tue-Sat 9-18, closed Sun/Mon. Times in America/Boise (Mountain).
  var HOURS={0:null,1:null,2:[9,18],3:[9,18],4:[9,18],5:[9,18],6:[9,18]};
  function nowMT(){
    try{var s=new Date().toLocaleString('en-US',{timeZone:'America/Boise'});return new Date(s);}
    catch(e){return new Date();}
  }
  function fmt(h){var ap=h>=12?'PM':'AM';var hr=h%12;if(hr===0)hr=12;return hr+' '+ap;}
  function setStatus(){
    var els=document.querySelectorAll('[data-status]');if(!els.length)return;
    var d=nowMT(),day=d.getDay(),hr=d.getHours()+d.getMinutes()/60,today=HOURS[day],txt,cls;
    if(today&&hr>=today[0]&&hr<today[1]){txt='Open now · closes '+fmt(today[1]);cls='status-open';}
    else{
      cls='status-closed';var nd=day,found=null,add=0;
      for(var i=0;i<8;i++){var dd=(day+i)%7;var hh=HOURS[dd];if(hh){if(i===0&&hr<hh[0]){found=hh;add=0;break;}if(i>0){found=hh;add=i;break;}}}
      if(found){var lbl=add===0?'today':(add===1?'tomorrow':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][(day+add)%7]);txt='Closed · opens '+fmt(found[0])+' '+lbl;}
      else{txt='Closed';}
    }
    els.forEach(function(el){el.textContent=txt;el.classList.remove('status-open','status-closed');el.classList.add(cls);});
  }
  setStatus();setInterval(setStatus,60000);
  // ---- FAQ ----
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var open=q.getAttribute('aria-expanded')==='true';
      q.setAttribute('aria-expanded',open?'false':'true');
      var a=q.nextElementSibling;a.style.maxHeight=open?null:(a.scrollHeight+'px');
    });
  });
  // ---- BOOKING TIME PICKER (signature feature) ----
  var bk=document.getElementById('booker');
  if(bk){
    var state={service:bk.getAttribute('data-preselect')||'',day:'',time:''};
    function days(){
      var out=[],d=new Date(),names=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      var count=0,i=0;
      while(count<6&&i<21){
        var dt=new Date(d.getTime()+i*86400000),wd=dt.getDay();
        var open=(wd>=2&&wd<=6);
        out.push({label:(i===0?'Today':(i===1?'Tomorrow':names[wd])),sub:(dt.getMonth()+1)+'/'+dt.getDate(),open:open,key:names[wd]+' '+(dt.getMonth()+1)+'/'+dt.getDate()});
        if(open)count++;i++;
      }
      return out;
    }
    var TIMES=['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];
    function chip(text,sub,pressed,disabled,on){
      var b=document.createElement('button');b.type='button';b.className='chip';
      b.setAttribute('aria-pressed',pressed?'true':'false');
      if(disabled){b.disabled=true;b.setAttribute('aria-label',text+' closed');}
      b.innerHTML=text+(sub?(' <span style="opacity:.6;font-weight:500">'+sub+'</span>'):'');
      if(!disabled)b.addEventListener('click',on);
      return b;
    }
    function render(){
      var sc=bk.querySelector('#bk-services');sc.innerHTML='';
      SVCDATA.forEach(function(s){sc.appendChild(chip(s.name,'',state.service===s.slug,false,function(){state.service=s.slug;state.changed=true;render();}));});
      var dc=bk.querySelector('#bk-days');dc.innerHTML='';
      days().forEach(function(d){dc.appendChild(chip(d.label,d.sub,state.day===d.key,!d.open,function(){state.day=d.key;render();}));});
      var tc=bk.querySelector('#bk-times');tc.innerHTML='';
      TIMES.forEach(function(t){tc.appendChild(chip(t,'',state.time===t,false,function(){state.time=t;render();}));});
      var sumEl=bk.querySelector('#bk-summary'),svcName=(SVCDATA.filter(function(s){return s.slug===state.service;})[0]||{}).name;
      var parts=[];
      if(svcName)parts.push('<b>'+svcName+'</b>');
      if(state.day)parts.push('on <b>'+state.day+'</b>');
      if(state.time)parts.push('around <b>'+state.time+'</b>');
      sumEl.innerHTML = parts.length? ('You would like: '+parts.join(' ')+'.') : 'Pick a service, a day and a time, then call or text and we will lock it in.';
      var ready=state.service&&state.day&&state.time;
      var body=ready?('Hi Classi K-9 Clips, I would like to book a '+svcName+' on '+state.day+' around '+state.time+' for my dog.'):'Hi Classi K-9 Clips, I would like to book a grooming appointment for my dog.';
      var call=bk.querySelector('#bk-call'),text=bk.querySelector('#bk-text');
      call.href='tel:'+BIZPHONE;
      text.href='sms:'+BIZPHONE+'?&body='+encodeURIComponent(body);
      text.style.display=ready?'inline-flex':'none';
    }
    var SVCDATA=window.__SVC||[];var BIZPHONE=window.__PHONE||'';
    render();
  }
})();