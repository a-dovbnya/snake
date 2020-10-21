import Snake from './Snake'

const canvas = document.getElementById('snake')
const score = document.getElementById('score')
const ctx = canvas.getContext('2d')
const snake = new Snake(ctx)

score.innerHTML = snake.score

document.addEventListener('updateScore', () => {
    score.innerHTML = snake.score
})

document.addEventListener('gameOver', () => {
    alert('gameOver')
})

document.getElementById('start').addEventListener('click', () => {
    snake.start()
})
document.getElementById('pause').addEventListener('click', () => {
    snake.pause()
})