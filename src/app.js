import Snake from './Snake'

const canvas = document.getElementById('snake')
const score = document.getElementById('score')
const over = document.querySelector('.game-over')
const ctx = canvas.getContext('2d')
const snake = new Snake(ctx)

score.innerHTML = snake.score

document.addEventListener('updateScore', () => {
    score.innerHTML = snake.score
})

document.addEventListener('gameOver', () => {
    over.classList.add('game-over_active')
})

document.getElementById('start').addEventListener('click', () => {
    over.classList.remove('game-over_active')
    snake.start()
})
document.getElementById('pause').addEventListener('click', () => {
    snake.pause()
})

document.getElementById('change').addEventListener('click', () => {
    if (snake.options.targetColor !== 'red') {
        snake.options.targetColor = 'red'
    } else {
        snake.options.targetColor = 'blue'
    }
    snake.draw()
})