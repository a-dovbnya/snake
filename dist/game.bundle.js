(()=>{"use strict";const t="top",e="bottom",s="left",i="right ",h=new Event("updateScore"),r=new Event("gameOver"),a=document.getElementById("snake"),n=document.getElementById("score"),o=a.getContext("2d"),d=new class{constructor(t){t||console.error("ctx is required!"),this.isNewGame=!1,this.ctx=t,this.width=500,this.height=500,this.size=20,this.speed=200,this.direction=i,this.cols=Math.floor(this.width/this.size),this.rows=Math.floor(this.height/this.size),this.snakeColor="#a6c529",this.snakeHeadColor="#516a05",this.snake=this.createSnake(),this.targetColor="#aa5d81",this.target=this.createTarget(),this.score=0,this.soundPlay=new Audio("./assets/sounds/play.mp3"),this.soundEvent=new Audio("./assets/sounds/success.mp3"),this.soundOver=new Audio("./assets/sounds/over.mp3"),document.addEventListener("keydown",this.setDirection.bind(this)),this.drawBackground(),this.drawTarget(),this.drawSnake()}createSnake(){return[{x:Math.floor(this.cols/2)*this.size,y:Math.floor(this.rows/2)*this.size}]}createTarget(){return{x:Math.floor(Math.random()*this.cols)*this.size,y:Math.floor(Math.random()*this.rows)*this.size}}drawBackground(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.cols;e++)this.ctx.fillStyle=e%2==t%2?"rgb(0,0,0,0.05)":"rgb(255,255,255,1)",this.ctx.fillRect(e*this.size,t*this.size,this.size,this.size)}drawTarget(){this.ctx.fillStyle=this.targetColor,this.drawCircle(this.target.x+this.size/2,this.target.y+this.size/2)}drawSnake(){for(let t=0;t<this.snake.length;t++)this.ctx.fillStyle=0===t?this.snakeHeadColor:this.snakeColor,this.drawCircle(this.snake[t].x+this.size/2,this.snake[t].y+this.size/2)}drawCircle(t,e){this.ctx.beginPath(),this.ctx.arc(t,e,this.size/2,0,2*Math.PI,!1),this.ctx.fill()}updateSnake(){let r=this.snake[0].x,a=this.snake[0].y;switch(this.direction){case s:r-=this.size;break;case i:r+=this.size;break;case t:a-=this.size;break;case e:a+=this.size}for(let t=0;t<this.snake.length;t++)if(this.snake[t].x===r&&this.snake[t].y===a)return 1===t?void(this.snake=this.snake.reverse()):void this.end();r>=this.width?r=0:r<0&&(r=this.width-this.size),a>=this.height?a=0:a<0&&(a=this.height-this.size),r===this.target.x&&a===this.target.y?(this.target=this.createTarget(),this.score++,this.soundEvent.play(),document.dispatchEvent(h)):this.snake.pop(),this.snake.unshift({x:r,y:a})}setDirection(h){return"ArrowUp"===h.code&&this.direction!==e?this.direction=t:"ArrowDown"===h.code&&this.direction!==t?this.direction=e:"ArrowRight"===h.code&&this.direction!==s?this.direction=i:"ArrowLeft"===h.code&&this.direction!==i?this.direction=s:void 0}start(){this.isNewGame&&(this.snake=this.createSnake(),this.target=this.createTarget(),this.isNewGame=!1,this.score=0,document.dispatchEvent(h)),this.timer=setInterval((()=>{this.ctx.clearRect(0,0,this.width,this.height),this.updateSnake(),this.drawBackground(),this.drawTarget(),this.drawSnake()}),this.speed),this.soundPlay.play()}pause(){clearInterval(this.timer),this.timer=null}end(){clearInterval(this.timer),this.isNewGame=!0,this.timer=null,this.soundOver.play(),document.dispatchEvent(r)}}(o);n.innerHTML=d.score,document.addEventListener("updateScore",(()=>{n.innerHTML=d.score})),document.addEventListener("gameOver",(()=>{alert("gameOver")})),document.getElementById("start").addEventListener("click",(()=>{d.start()})),document.getElementById("pause").addEventListener("click",(()=>{d.pause()}))})();