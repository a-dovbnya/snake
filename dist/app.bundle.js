!function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=4)}({4:function(t,e,s){"use strict";s.r(e);const i="top",o="bottom",n="left",r="right ",a={width:500,height:500,size:20,speed:200,throughWalls:!1,snakeColor:"#a6c529",snakeHeadColor:"#516a05",targetColor:"#aa5d81"},h=new Event("updateScore"),c=new Event("gameOver"),d=new Audio("./assets/sounds/play.mp3"),l=new Audio("./assets/sounds/success.mp3"),p=new Audio("./assets/sounds/over.mp3");const u=document.getElementById("snake"),f=document.getElementById("score"),g=document.querySelector(".game-over"),m=u.getContext("2d"),w=new class{constructor(t,e={}){t||console.error("ctx is required!"),this.ctx=t,this.options=Object.assign({},a,e),this.cols=Math.floor(this.options.width/this.options.size),this.rows=Math.floor(this.options.height/this.options.size),this.direction=r,this.setNewGame(),this.draw(),document.addEventListener("keydown",this.setDirection.bind(this))}setNewGame(){this.snake=this.createSnake(),this.target=this.createTarget(),this.isNewGame=!1,this.score=0}createSnake(){return[{x:Math.floor(this.cols/2)*this.options.size,y:Math.floor(this.rows/2)*this.options.size}]}createTarget(){return{x:Math.floor(Math.random()*this.cols)*this.options.size,y:Math.floor(Math.random()*this.rows)*this.options.size}}drawBackground(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.cols;e++)this.ctx.fillStyle=e%2==t%2?"rgb(0,0,0,0.05)":"rgb(255,255,255,1)",this.ctx.fillRect(e*this.options.size,t*this.options.size,this.options.size,this.options.size)}drawTarget(){this.ctx.fillStyle=this.options.targetColor,this.drawCircle(this.target.x+this.options.size/2,this.target.y+this.options.size/2)}drawSnake(){for(let t=0;t<this.snake.length;t++)this.ctx.fillStyle=0===t?this.options.snakeHeadColor:this.options.snakeColor,this.drawCircle(this.snake[t].x+this.options.size/2,this.snake[t].y+this.options.size/2)}drawCircle(t,e){this.ctx.beginPath(),this.ctx.arc(t,e,this.options.size/2,0,2*Math.PI,!1),this.ctx.fill()}draw(){this.ctx.clearRect(0,0,this.options.width,this.options.height),this.drawBackground(),this.drawTarget(),this.drawSnake()}updateSnake(){let t=this.snake[0].x,e=this.snake[0].y;switch(this.direction){case n:t-=this.options.size;break;case r:t+=this.options.size;break;case i:e-=this.options.size;break;case o:e+=this.options.size}for(let s=0;s<this.snake.length;s++)if(this.snake[s].x===t&&this.snake[s].y===e)return 1===s?void(this.snake=this.snake.reverse()):void this.end();const s=this.isOutOfZone(t,e);if(s.x!==t||s.y!==e){if(!this.options.throughWalls)return this.end();t=s.x,e=s.y}t===this.target.x&&e===this.target.y?(this.target=this.createTarget(),this.score++,l.play(),document.dispatchEvent(h)):this.snake.pop(),this.snake.unshift({x:t,y:e})}isOutOfZone(t,e){return t>=this.options.width?t=0:t<0&&(t=this.options.width-this.options.size),e>=this.options.height?e=0:e<0&&(e=this.options.height-this.options.size),{x:t,y:e}}setDirection(t){return"ArrowUp"===t.code&&this.direction!==o?this.direction=i:"ArrowDown"===t.code&&this.direction!==i?this.direction=o:"ArrowRight"===t.code&&this.direction!==n?this.direction=r:"ArrowLeft"===t.code&&this.direction!==r?this.direction=n:void 0}start(){this.isNewGame&&(this.setNewGame(),document.dispatchEvent(h)),this.stop(),this.timer=setInterval(()=>{this.updateSnake(),this.draw()},this.options.speed),d.play()}stop(){clearInterval(this.timer),this.timer=null}end(){this.stop(),this.isNewGame=!0,p.play(),document.dispatchEvent(c)}}(m);f.innerHTML=w.score,document.addEventListener("updateScore",()=>{f.innerHTML=w.score}),document.addEventListener("gameOver",()=>{g.classList.add("game-over_active")}),document.getElementById("start").addEventListener("click",()=>{g.classList.remove("game-over_active"),w.start()}),document.getElementById("setting-btn").addEventListener("click",()=>{document.querySelector(".popup").classList.add("popup__active")}),document.querySelector(".popup__close").addEventListener("click",()=>{document.querySelector(".popup").classList.remove("popup__active")})}});