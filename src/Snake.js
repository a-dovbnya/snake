import { DIRECTIONS, DEFAULTS, SOUND_TYPES } from './consts'
import { eventUpdateScore, eventGameOver } from './events'
import { SOUNDS } from './sounds'

export default class Snake {
    constructor (ctx, options={}) {
        if (!ctx) {
            console.error('ctx is required!')
        }

        this.ctx = ctx
        this.options = Object.assign({}, DEFAULTS, options)

        this.cols = Math.floor(this.options.width / this.options.size)
        this.rows = Math.floor(this.options.height / this.options.size)

        this.direction = DIRECTIONS.RIGHT

        this.setNewGame()
        this.draw()

        document.addEventListener('keydown', this.setDirection.bind(this))
    }
    setNewGame () {
        this.snake = this.createSnake()
        this.target = this.createTarget()
        this.isNewGame = false
        this.score = 0
    }
    createSnake () {
        return [{
            x: Math.floor(this.cols / 2) * this.options.size,
            y: Math.floor(this.rows / 2) * this.options.size
        }]
    }
    createTarget () {
        return {
            x: Math.floor(Math.random() * this.cols) * this.options.size,
            y: Math.floor(Math.random() * this.rows) * this.options.size,
        }
    }
    drawBackground () {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.ctx.fillStyle = j%2 === i%2 ? 'rgb(0,0,0,0.05)' : 'rgb(255,255,255,1)'
                this.ctx.fillRect(j * this.options.size, i * this.options.size, this.options.size, this.options.size)
            }
        }
    }
    drawTarget () {
        this.ctx.fillStyle = this.options.targetColor
        this.drawCircle(this.target.x + this.options.size/2, this.target.y + this.options.size/2)
    }
    drawSnake () {
        for (let i = 0; i < this.snake.length; i++) {
            this.ctx.fillStyle = i === 0 ? this.options.snakeHeadColor : this.options.snakeColor
            this.drawCircle(this.snake[i].x + this.options.size/2, this.snake[i].y + this.options.size/2)
        }
    }
    drawCircle (x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.options.size / 2, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }
    draw () {
        this.ctx.clearRect(0, 0, this.options.width, this.options.height);
        this.drawBackground()
        this.drawTarget()
        this.drawSnake()
    }
    updateSnake () {
        let x = this.snake[0].x
        let y = this.snake[0].y

        switch (this.direction) {
            case DIRECTIONS.LEFT: {
                x = x - this.options.size
                break
            }
            case DIRECTIONS.RIGHT: {
                x = x + this.options.size
                break
            }
            case DIRECTIONS.TOP: {
                y = y - this.options.size
                break
            }
            case DIRECTIONS.BOTTOM: {
                y = y + this.options.size
                break
            }
            default: break
        }

        // Пересечение с самим собой
        for (let i = 0; i < this.snake.length; i++) {
            if (this.snake[i].x !== x || this.snake[i].y !== y) {
                continue
            }
            // На малых скоростях при быстрой смене направления
            // "Голова" может пойти в другую сторону
            if (i === 1) {
                this.snake = this.snake.reverse()
                return
            }

            this.end()
            return
        }

        // Выход за рамки поля
        const isOutOfZone = this.isOutOfZone(x, y)

        if (isOutOfZone.x !== x || isOutOfZone.y !== y) {
            if (!this.options.throughWalls) {
                return this.end()
            }
            x = isOutOfZone.x
            y = isOutOfZone.y
        }

        // Пересечение с целью
        if (x === this.target.x && y === this.target.y) {
            this.target = this.createTarget()
            this.score++
            this.soundPlay(SOUND_TYPES.EVENT)
            document.dispatchEvent(eventUpdateScore)
        } else {
            this.snake.pop();
        }
        this.snake.unshift({x: x, y: y})
    }
    isOutOfZone (x, y) {
        if (x >= this.options.width) {
            x = 0
        } else if (x < 0) {
            x = this.options.width - this.options.size
        }
        if (y >= this.options.height) {
            y = 0
        } else if (y < 0) {
            y = this.options.height - this.options.size
        }
        return {x: x, y: y}
    }
    setDirection (e) {
        if (e.code === 'ArrowUp' && this.direction !== DIRECTIONS.BOTTOM) {
            return this.direction = DIRECTIONS.TOP
        }
        if (e.code === 'ArrowDown' && this.direction !== DIRECTIONS.TOP) {
            return this.direction = DIRECTIONS.BOTTOM
        }
        if (e.code === 'ArrowRight' && this.direction !== DIRECTIONS.LEFT) {
            return this.direction = DIRECTIONS.RIGHT
        }
        if (e.code === 'ArrowLeft' && this.direction !== DIRECTIONS.RIGHT) {
            return this.direction = DIRECTIONS.LEFT
        }
    }
    start () {
        if (this.isNewGame) {
            this.setNewGame()
            document.dispatchEvent(eventUpdateScore);
        }

        this.stop()
        this.timer = setInterval(() => {
            this.updateSnake()
            this.draw()
        }, this.options.speed)

        this.soundPlay(SOUND_TYPES.PLAY)
    }
    stop () {
        clearInterval(this.timer)
        this.timer = null
    }
    end () {
        this.stop()
        this.isNewGame = true

        this.soundPlay(SOUND_TYPES.OVER)

        document.dispatchEvent(eventGameOver);
    }
    soundPlay (sound) {
        if (this.options.sound && SOUNDS[sound]) {
            SOUNDS[sound].play()
        }
    }
}