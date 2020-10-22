import { DIRECTIONS } from './consts'
import { eventUpdateScore, eventGameOver } from './events'

export default class Snake {
    constructor (ctx) {
        if (!ctx) {
            console.error('ctx is required!')
        }
        this.isNewGame = false
        this.ctx = ctx
        this.width = 500
        this.height = 500
        this.size = 20
        this.speed = 200
        this.direction = DIRECTIONS.RIGHT

        this.cols = Math.floor(this.width / this.size)
        this.rows = Math.floor(this.height / this.size)

        this.snakeColor = '#a6c529'
        this.snakeHeadColor = '#516a05'
        this.snake = this.createSnake()

        this.targetColor = '#aa5d81'
        this.target = this.createTarget()

        this.score = 0
        this.throughWalls = false

        /**
         * sounds
         */
        this.soundPlay = new Audio('./assets/sounds/play.mp3');
        this.soundEvent = new Audio('./assets/sounds/success.mp3');
        this.soundOver = new Audio('./assets/sounds/over.mp3');

        document.addEventListener('keydown', this.setDirection.bind(this))
        this.drawBackground()
        this.drawTarget()
        this.drawSnake()
    }
    createSnake () {
        return [{
            x: Math.floor(this.cols / 2) * this.size,
            y: Math.floor(this.rows / 2) * this.size
        }]
    }
    createTarget () {
        return {
            x: Math.floor(Math.random() * this.cols) * this.size,
            y: Math.floor(Math.random() * this.rows) * this.size,
        }
    }
    /**
     * Заливает фон шахматной доской
     */
    drawBackground () {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.ctx.fillStyle = j%2 === i%2 ? 'rgb(0,0,0,0.05)' : 'rgb(255,255,255,1)'
                this.ctx.fillRect(j * this.size, i * this.size, this.size, this.size)
            }
        }
    }
    drawTarget () {
        this.ctx.fillStyle = this.targetColor
        this.drawCircle(this.target.x + this.size/2, this.target.y + this.size/2)
    }
    drawSnake () {
        for (let i = 0; i < this.snake.length; i++) {
            this.ctx.fillStyle = i === 0 ? this.snakeHeadColor : this.snakeColor
            this.drawCircle(this.snake[i].x + this.size/2, this.snake[i].y + this.size/2)
        }
    }
    drawCircle (x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size / 2, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }
    updateSnake () {
        let x = this.snake[0].x
        let y = this.snake[0].y

        switch (this.direction) {
            case DIRECTIONS.LEFT: {
                x = x - this.size
                break
            }
            case DIRECTIONS.RIGHT: {
                x = x + this.size
                break
            }
            case DIRECTIONS.TOP: {
                y = y - this.size
                break
            }
            case DIRECTIONS.BOTTOM: {
                y = y + this.size
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
            if (!this.throughWalls) {
                return this.end()
            }
            x = isOutOfZone.x
            y = isOutOfZone.y
        }

        // Пересечение с целью
        if (x === this.target.x && y === this.target.y) {
            this.target = this.createTarget()
            this.score++
            this.soundEvent.play()
            document.dispatchEvent(eventUpdateScore);
        } else {
            this.snake.pop();
        }
        this.snake.unshift({x: x, y: y})
    }
    isOutOfZone (x, y) {
        if (x >= this.width) {
            x = 0
        } else if (x < 0) {
            x = this.width - this.size
        }
        if (y >= this.height) {
            y = 0
        } else if (y < 0) {
            y = this.height - this.size
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
            this.snake = this.createSnake()
            this.target = this.createTarget()
            this.isNewGame = false
            this.score = 0
            document.dispatchEvent(eventUpdateScore);
        }

        this.timer = setInterval(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.updateSnake()

            this.drawBackground()
            this.drawTarget()
            this.drawSnake()

        }, this.speed)
        this.soundPlay.play()
    }
    pause () {
        clearInterval(this.timer)
        this.timer = null
    }
    end () {
        clearInterval(this.timer)
        this.isNewGame = true
        this.timer = null
        this.soundOver.play()

        document.dispatchEvent(eventGameOver);
    }
}