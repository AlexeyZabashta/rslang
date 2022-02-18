(()=>{"use strict";var n={307:(n,t,e)=>{e.r(t)},607:function(n,t,e){var s=this&&this.__awaiter||function(n,t,e,s){return new(e||(e=Promise))((function(a,i){function o(n){try{c(s.next(n))}catch(n){i(n)}}function r(n){try{c(s.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,r)}c((s=s.apply(n,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),e(307);const a=e(388),i=(e(834),e(332)),o=e(159),r=e(1),c=e(159);!function(){s(this,void 0,void 0,(function*(){a.startFlag.push(!0);a.groupPage.push({group:5,page:0}),(yield(0,i.getWords)(5,1)).map((n=>c.falseAnswersAudio.push(n)));const n=yield(0,i.getWords)(5,0);n.map((n=>r.answersAudio.push(n))),(0,o.audioDOM)(n[0])}))}()},1:(n,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clickAudioGame=t.indWordAudio=t.answersAudio=void 0,t.answersAudio=[],t.indWordAudio=[],t.clickAudioGame=function(n,t){console.log("сработала функция клика",n+1,t);const e=document.querySelector(`#audio_answer_variant${n}`);t?e.classList.add("right"):e.classList.add("false")}},159:function(n,t,e){var s=this&&this.__awaiter||function(n,t,e,s){return new(e||(e=Promise))((function(a,i){function o(n){try{c(s.next(n))}catch(n){i(n)}}function r(n){try{c(s.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,r)}c((s=s.apply(n,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.audioDOM=t.rightAnswNum=t.falseAnswersAudio=void 0;const a=e(365),i=e(388),o=e(1),r=e(1);t.falseAnswersAudio=[],t.rightAnswNum=[];let c=0;function d(){document.querySelector(".hide_info").classList.add("active"),document.querySelector("#next_word_btn").disabled=!1}function u(n){document.querySelectorAll(".btn_word_variant").forEach(((t,e)=>s(this,void 0,void 0,(function*(){t.disabled=!0,n!==e&&t.classList.add("block")}))))}function l(n,e,a){return s(this,void 0,void 0,(function*(){if(n===e)return console.log("верный ответ на кнопке",n+1),a;const s=(0,i.randomDiap)(0,19);return t.falseAnswersAudio[s].wordTranslate}))}t.audioDOM=n=>s(void 0,void 0,void 0,(function*(){const e=(0,i.randomDiap)(0,4);console.log("верная кнопка: ",e+1),t.rightAnswNum.push(e),a.body.innerHTML=`<section class="wrapper_audioGame">\n  <div class="word_block">\n    <audio id="audioGame_audio" src="http://localhost:2020/${n.audio}"></audio>\n    <div class="hide_info">\n      <div class="audio_img" style="background-image: url('http://localhost:2020/${n.image}');"></div>    \n      <div class="audio_answer">${n.word} (${n.wordTranslate})</div>\n    </div>\n    <button id="play_word">\n      <img src="../src/assets/volume.svg" id="play_word_audio">        \n    </button>      \n  </div>\n  <div class="word_variants">\n    <div class="word_variant">\n      <span class="audio_answer_variant" id="audio_answer_variant0"></span>\n      <button class="btn_word_variant" id="btn_word_variant0">${yield l(0,e,n.wordTranslate)}</button>\n    </div>\n    <div class="word_variant">\n      <span class="audio_answer_variant" id="audio_answer_variant1"></span>\n      <button class="btn_word_variant" id="btn_word_variant1">${yield l(1,e,n.wordTranslate)}</button>\n    </div>\n    <div class="word_variant">\n      <span class="audio_answer_variant" id="audio_answer_variant2"></span>\n      <button class="btn_word_variant" id="btn_word_variant2">${yield l(2,e,n.wordTranslate)}</button>\n    </div>\n    <div class="word_variant">\n      <span class="audio_answer_variant" id="audio_answer_variant3"></span>\n      <button class="btn_word_variant" id="btn_word_variant3">${yield l(3,e,n.wordTranslate)}</button>\n    </div>\n    <div class="word_variant">\n      <span class="audio_answer_variant" id="audio_answer_variant4"></span>\n      <button class="btn_word_variant" id="btn_word_variant4">${yield l(4,e,n.wordTranslate)}</button>\n    </div>\n  </div>\n  <div class="next_word">\n    <button id="idk">Не знаю</button>\n    <button id="next_word_btn" disabled>&#8594;</button>\n  </div>\n  </section>`,function(n){const t=document.querySelector(".word_variants"),e=document.querySelector("#idk");e.addEventListener("click",(()=>{e.disabled=!0,function(n){document.querySelector(`#audio_answer_variant${n}`).classList.add("right"),u(n),d()}(n)})),t.addEventListener("click",(t=>{if(t.target.classList.contains("btn_word_variant")){const s=t.target.id,a=Number(s[s.length-1]);e.disabled=!0,u(a),d(),a===n?(0,r.clickAudioGame)(a,!0):(0,r.clickAudioGame)(a,!1)}}))}(e),document.querySelector("#next_word_btn").addEventListener("click",(()=>{c+=1,(0,t.audioDOM)(o.answersAudio[c])})),a.body.classList.add("active")}))},917:function(n,t){var e=this&&this.__awaiter||function(n,t,e,s){return new(e||(e=Promise))((function(a,i){function o(n){try{c(s.next(n))}catch(n){i(n)}}function r(n){try{c(s.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,r)}c((s=s.apply(n,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.checkBonus=t.addDOMVariables=t.gameTimer=void 0;let s,a,i,o,r,c,d,u,l,v,_,w,f=0,h=0,m=!1,b=!1;function p(){const n=i;switch(!0){case f>=0&&f<4:i=10;break;case f>=4&&f<7:i=20,r.classList.add("active");break;case f>=7&&f<9:i=40,c.classList.add("active");break;case 10===f:i=80,d.classList.add("active")}n<i&&function(){e(this,void 0,void 0,(function*(){_.src="../src/assets/audio/bonus.mp3",_.play()}))}()}function y(){return e(this,void 0,void 0,(function*(){l.play();let n=60,t=setTimeout((function e(){n>0?(n-=1,w.textContent=`${n}`,t=setTimeout(e,1e3)):clearTimeout(t)}),1e3)}))}t.gameTimer=y,t.addDOMVariables=function(){s=document.querySelectorAll(".bonus_circle"),u=document.querySelectorAll(".bonus_icon"),a=document.querySelector(".total_score"),o=document.querySelector(".bonus_size"),r=document.querySelector(".big"),c=document.querySelector(".boom"),d=document.querySelector(".flash"),w=document.querySelector(".timer_value"),l=document.querySelector("#game_timer"),v=document.querySelector("#answer_sound"),_=document.querySelector("#answer_bonus"),window.addEventListener("click",(()=>{b||(b=!0,y())})),m=!0},t.checkBonus=function(n){n?(10!==f&&(f+=1,p(),function(){switch(f%s.length){case 0:s[2].classList.add("active");break;case 1:s.forEach((n=>n.classList.remove("active"))),s[0].classList.add("active");break;case 2:s[1].classList.add("active")}}(),10===f&&(s[0].classList.add("max"),s[1].classList.add("active"),s[2].classList.add("max"))),h+=i):(f=0,p(),s.forEach((n=>{n.classList.remove("active"),n.classList.remove("max")})),u.forEach((n=>{n.classList.remove("active")}))),f<4?o.classList.remove("active"):o.classList.add("active"),function(n){e(this,void 0,void 0,(function*(){n?(v.src="../src/assets/audio/right2.mp3",v.play()):(v.src="../src/assets/audio/wrong2.mp3",v.play())}))}(n),o.innerHTML=`+${i} очков за слово`,a.innerHTML=`${h}`}},388:function(n,t,e){var s=this&&this.__awaiter||function(n,t,e,s){return new(e||(e=Promise))((function(a,i){function o(n){try{c(s.next(n))}catch(n){i(n)}}function r(n){try{c(s.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,r)}c((s=s.apply(n,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.checkAnsw=t.createMassFalse=t.trueAnsw=t.falseAnsw=t.answerVariant=t.randomDiap=t.startFlag=t.groupPage=t.answers=void 0;const a=e(917),i=e(332);t.answers=[],t.groupPage=[],t.startFlag=[];let o,r=[],c=0;function d(n,t){return Math.floor(Math.random()*(t-n+1))+n}function u(){return s(this,void 0,void 0,(function*(){return 1===Math.round(Math.random())?(o=!0,t.answers[c].wordTranslate):(o=!1,r[d(0,19)].wordTranslate)}))}function l(){return s(this,void 0,void 0,(function*(){const n=document.querySelector(".engl_word"),e=document.querySelector(".translate_engl_word");n.textContent=t.answers[c].word,e.textContent=yield u()}))}function v(){return s(this,void 0,void 0,(function*(){const n=document.querySelector(".answ_result_false");n.classList.add("click"),n.ontransitionend=function(){n.classList.remove("click")}}))}function _(){return s(this,void 0,void 0,(function*(){const n=document.querySelector(".answ_result_right");n.classList.add("click"),n.ontransitionend=function(){n.classList.remove("click")}}))}function w(n,t){return s(this,void 0,void 0,(function*(){r=n<5?yield(0,i.getWords)(n+1,t):yield(0,i.getWords)(n-1,t)}))}t.randomDiap=d,t.answerVariant=u,t.falseAnsw=v,t.trueAnsw=_,t.createMassFalse=w,t.checkAnsw=function(n){return s(this,void 0,void 0,(function*(){console.log("val: ",n,"answerFlag: ",o),console.log("if result: ",n===o),o===n?(_(),(0,a.checkBonus)(!0)):((0,a.checkBonus)(!1),v()),yield function(){return s(this,void 0,void 0,(function*(){const n=t.groupPage[0].page,e=t.groupPage[0].group;if(c<19)c+=1;else{c=0,t.answers.length=0;const s=function(n){return n>0?n-1:29}(n);(yield(0,i.getWords)(e,s)).map((n=>t.answers.push(n))),yield w(e,s),l()}}))}(),l()}))}},365:(n,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.body=void 0,t.body=document.querySelector("body")},332:function(n,t){var e=this&&this.__awaiter||function(n,t,e,s){return new(e||(e=Promise))((function(a,i){function o(n){try{c(s.next(n))}catch(n){i(n)}}function r(n){try{c(s.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,r)}c((s=s.apply(n,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getWords=void 0,t.getWords=(n,t)=>e(void 0,void 0,void 0,(function*(){const e=yield fetch(`http://localhost:2020/words?page=${t}&group=${n}`,{method:"GET"}),s=yield e.json();return console.log(s),s}))},834:function(n,t,e){var s=this&&this.__awaiter||function(n,t,e,s){return new(e||(e=Promise))((function(a,i){function o(n){try{c(s.next(n))}catch(n){i(n)}}function r(n){try{c(s.throw(n))}catch(n){i(n)}}function c(n){var t;n.done?a(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,r)}c((s=s.apply(n,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.sprintDOM=void 0;const a=e(388),i=e(917),o=e(365);t.sprintDOM=n=>s(void 0,void 0,void 0,(function*(){o.body.innerHTML=`<section class="wrapper_minigame">\n  <audio id="game_timer" src="../src/assets/audio/timer.mp3"></audio>\n  <audio id="answer_sound"></audio>\n  <audio id="answer_bonus"></audio>\n  <h2 class="total_score">0</h2>\n  <div class="game_content_wrapper">\n    <div class="bonus_carousel_wrapper">\n      <div class="bonus_carousel">\n        <div class="bonus_circle"></div>\n        <div class="bonus_circle"></div>\n        <div class="bonus_circle"></div>\n      </div>\n      <h3 class="bonus_size">очков за слово</h3>        \n    </div>\n    <div class="game_content">\n      <div class="bonus_icon_wrapper">\n        <img src="../src/assets/red.png" class="bonus_icon" id="red">\n        <img src="../src/assets/big.png" class="bonus_icon big" id="big">\n        <img src="../src/assets/boom.png" class="bonus_icon boom" id="boom">\n        <img src="../src/assets/flash.png" class="bonus_icon flash" id="flash">\n      </div>\n      <div class="engl_word">${n}</div>\n      <div class="translate_engl_word">${yield(0,a.answerVariant)()}</div>\n    </div>\n    <div class="answer_wrapper">\n      <button class="answ_btn" id="answ_false">Неверно</button>\n      <button class="answ_btn" id="answ_true">Верно</button>\n    </div>\n    <img class="answ_result_right" src="../src/assets/true2.svg">\n    <img class="answ_result_false" src="../src/assets/false2.svg">\n  </div>\n  <div class="timer_value">60</div>\n</section>`,document.querySelector("#answ_false").addEventListener("click",(()=>(0,a.checkAnsw)(!1))),document.querySelector("#answ_true").addEventListener("click",(()=>(0,a.checkAnsw)(!0))),(0,i.addDOMVariables)()}))}},t={};function e(s){var a=t[s];if(void 0!==a)return a.exports;var i=t[s]={exports:{}};return n[s].call(i.exports,i,i.exports,e),i.exports}e.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e(607)})();