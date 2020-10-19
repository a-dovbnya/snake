const DIRECTIONS = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right '      
}
const eventUpdateScore = new Event('updateScore')

class Snake {
    constructor (ctx) {
        if (!ctx) {
            console.error('ctx is required!')
        }
        this.ctx = ctx
        this.width = 500
        this.height = 500
        this.size = 20
        this.speed = 200
        this.direction = DIRECTIONS.RIGHT

        this.cols = Math.floor(this.width / this.size)
        this.rows = Math.floor(this.height / this.size)

        this.snakeColor = 'black'
        this.snake = [{
            x: Math.floor(this.cols / 2) * this.size,
            y: Math.floor(this.rows / 2) * this.size,
            direction: this.direction
        }]

        this.targetColor = 'red'
        this.target = this.createTargetCoords()

        this.score = 0

        document.addEventListener('keydown', this.setDirection.bind(this))

        this.start()
    }
    /**
     * Заливает фон шахматной доской
     */
    drawBackground () {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.ctx.fillStyle = j%2 === i%2 ? 'rgb(0,0,0,0.1)' : 'rgb(255,255,255,1)'
                this.ctx.fillRect(j * this.size, i * this.size, this.size, this.size)
            }
        }
    }
    drawTarget () {
        this.ctx.fillStyle = this.targetColor
        this.ctx.fillRect(this.target.x, this.target.y, this.size, this.size)
    }
    drawSnake () {
        for (let i = 0; i < this.snake.length; i++) {
            
            this.ctx.fillStyle = i === 0 ? 'blue' : this.snakeColor
            this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.size, this.size)
        }
    }
    updateSnake () {
        
        let x = this.snake[0].x
        let y = this.snake[0].y

        if (this.direction === DIRECTIONS.LEFT) {
            x = x - this.size
        }
        if (this.direction === DIRECTIONS.RIGHT) {
            x = x + this.size
        }
        if (this.direction === DIRECTIONS.TOP) {
            y = y - this.size
        }
        if (this.direction === DIRECTIONS.BOTTOM) {
            y = y + this.size
        }

        // Выход за рамки поля
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

        // Пересечение с целью
        if (x === this.target.x && y === this.target.y) {
            this.target = this.createTargetCoords()
            this.score++
            document.dispatchEvent(eventUpdateScore);
        } else {
            this.snake.pop();
        }
        this.snake.unshift({x: x, y: y})
    }
    createTargetCoords () {
        return {
            x: Math.floor(Math.random() * this.cols) * this.size,
            y: Math.floor(Math.random() * this.rows) * this.size,
        }
    }
    setDirection (e) {
        switch (e.code) {
            case 'ArrowUp' : {
                if (this.direction !== DIRECTIONS.BOTTOM) {
                    this.direction = DIRECTIONS.TOP
                }
                break
            }
            case 'ArrowDown': {
                if (this.direction !== DIRECTIONS.TOP) {
                    this.direction = DIRECTIONS.BOTTOM
                }
                break
            }
            case 'ArrowRight': {
                if (this.direction !== DIRECTIONS.LEFT) {
                    this.direction = DIRECTIONS.RIGHT
                }
                break
            }
            case 'ArrowLeft': {
                if (this.direction !== DIRECTIONS.RIGHT) {
                    this.direction = DIRECTIONS.LEFT
                }
                break
            }
            default: break
        }
    }
    start () {
        this.timer = setInterval(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.updateSnake()

            this.drawBackground()
            this.drawTarget()
            this.drawSnake()
        }, this.speed)
    }
}

const canvas = document.getElementById('snake')
const score = document.getElementById('score')
const ctx = canvas.getContext('2d')
const snake = new Snake(ctx)

score.innerHTML = snake.score

document.addEventListener('updateScore', () => {
    score.innerHTML = snake.score
})

