(()=>{"use strict";var n={307:(n,e,t)=>{t.r(e)},607:function(n,e,t){var s=this&&this.__awaiter||function(n,e,t,s){return new(t||(t=Promise))((function(o,r){function i(n){try{a(s.next(n))}catch(n){r(n)}}function c(n){try{a(s.throw(n))}catch(n){r(n)}}function a(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(i,c)}a((s=s.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),t(307);const o=t(919),r=t(35),i=t(141);!function(){s(this,void 0,void 0,(function*(){o.startFlag.push(!0);o.groupPage.push({group:5,page:0}),(0,o.createMassFalse)(5,0);const n=yield(0,i.getWords)(5,0);n.map((n=>o.answers.push(n))),(0,r.renderDOM)(n[0].word)}))}()},919:function(n,e,t){var s=this&&this.__awaiter||function(n,e,t,s){return new(t||(t=Promise))((function(o,r){function i(n){try{a(s.next(n))}catch(n){r(n)}}function c(n){try{a(s.throw(n))}catch(n){r(n)}}function a(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(i,c)}a((s=s.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.checkAnsw=e.createMassFalse=e.trueAnsw=e.falseAnsw=e.answerVariant=e.startFlag=e.groupPage=e.answers=void 0;const o=t(141);e.answers=[],e.groupPage=[],e.startFlag=[];let r,i=[],c=0;function a(){return s(this,void 0,void 0,(function*(){return 1===Math.round(Math.random())?(r=!0,e.answers[c].wordTranslate):(r=!1,i[(0,19,Math.floor(20*Math.random())+0)].wordTranslate)}))}function u(){return s(this,void 0,void 0,(function*(){const n=document.querySelector(".engl_word"),t=document.querySelector(".translate_engl_word");n.textContent=e.answers[c].word,t.textContent=yield a()}))}function d(){return s(this,void 0,void 0,(function*(){const n=document.querySelector(".answ_result_false");n.classList.add("click"),n.ontransitionend=function(){n.classList.remove("click")}}))}function l(){return s(this,void 0,void 0,(function*(){const n=document.querySelector(".answ_result_right");n.classList.add("click"),n.ontransitionend=function(){n.classList.remove("click")}}))}function v(n,e){return s(this,void 0,void 0,(function*(){i=n<5?yield(0,o.getWords)(n+1,e):yield(0,o.getWords)(n-1,e)}))}e.answerVariant=a,e.falseAnsw=d,e.trueAnsw=l,e.createMassFalse=v,e.checkAnsw=function(n){return s(this,void 0,void 0,(function*(){console.log("val: ",n,"answerFlag: ",r),console.log("if result: ",n===r),r===n?l():d(),yield function(){return s(this,void 0,void 0,(function*(){const n=e.groupPage[0].page,t=e.groupPage[0].group;if(c<19)c+=1;else{c=0,e.answers.length=0;const s=function(n){return n>0?n-1:29}(n);(yield(0,o.getWords)(t,s)).map((n=>e.answers.push(n))),yield v(t,s),u()}}))}(),u()}))}},365:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.body=void 0,e.body=document.querySelector("body")},35:function(n,e,t){var s=this&&this.__awaiter||function(n,e,t,s){return new(t||(t=Promise))((function(o,r){function i(n){try{a(s.next(n))}catch(n){r(n)}}function c(n){try{a(s.throw(n))}catch(n){r(n)}}function a(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(i,c)}a((s=s.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.renderDOM=void 0;const o=t(919),r=t(365);e.renderDOM=n=>s(void 0,void 0,void 0,(function*(){r.body.innerHTML=`<section class="wrapper_minigame">\n  <h2 class="total_score">0</h2>\n  <div class="game_content_wrapper">\n    <div class="bonus_carousel_wrapper">\n      <div class="bonus_carousel">\n        <div class="bonus_circle"></div>\n        <div class="bonus_circle"></div>\n        <div class="bonus_circle"></div>\n      </div>\n      <h3 class="bonus_size">+20</h3>        \n    </div>\n    <div class="game_content">\n      <div class="bonus_icon_wrapper">\n        <img src="../src/assets/red.png" class="bonus_icon" id="red">\n        <img src="../src/assets/big.png" class="bonus_icon" id="big">\n        <img src="../src/assets/boom.png" class="bonus_icon" id="boom">\n        <img src="../src/assets/flash.png" class="bonus_icon" id="flash">\n      </div>\n      <div class="engl_word">${n}</div>\n      <div class="translate_engl_word">${yield(0,o.answerVariant)()}</div>\n    </div>\n    <div class="answer_wrapper">\n      <button class="answ_btn" id="answ_false">Неверно</button>\n      <button class="answ_btn" id="answ_true">Верно</button>\n    </div>\n    <img class="answ_result_right" src="../src/assets/true.svg">\n    <img class="answ_result_false" src="../src/assets/false.svg">\n  </div>\n</section>`,document.querySelector("#answ_false").addEventListener("click",(()=>(0,o.checkAnsw)(!1))),document.querySelector("#answ_true").addEventListener("click",(()=>(0,o.checkAnsw)(!0)))}))},141:function(n,e){var t=this&&this.__awaiter||function(n,e,t,s){return new(t||(t=Promise))((function(o,r){function i(n){try{a(s.next(n))}catch(n){r(n)}}function c(n){try{a(s.throw(n))}catch(n){r(n)}}function a(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(i,c)}a((s=s.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.getWords=void 0,e.getWords=(n,e)=>t(void 0,void 0,void 0,(function*(){const t=yield fetch(`http://localhost:2020/words?page=${e}&group=${n}`,{method:"GET"}),s=yield t.json();return console.log(s),s}))}},e={};function t(s){var o=e[s];if(void 0!==o)return o.exports;var r=e[s]={exports:{}};return n[s].call(r.exports,r,r.exports,t),r.exports}t.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t(607)})();