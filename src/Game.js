import Snake from './Snake'

const d = document

export default class Game {
    constructor (opt) {
        const canvas = d.getElementById('snake')
        const ctx = canvas.getContext('2d')

        this.score = d.getElementById('score')
        this.over = d.querySelector('.game-over')
        this.snake = new Snake(ctx)
        this.toggleBtn = d.getElementById('start')
        this.soundBtn = d.getElementById('sound-btn')

        this.setScore()

        // Init events
        d.addEventListener('updateScore', this.setScore.bind(this))
        d.addEventListener('gameOver', this.showOver.bind(this))
        this.toggleBtn.addEventListener('click', this.hideOver.bind(this))
        this.soundBtn.addEventListener('click', this.toggleSound.bind(this))
        d.getElementById('setting-btn').addEventListener('click', this.showPopup.bind(this))
        d.querySelector('.popup__close').addEventListener('click', this.hidePopup.bind(this))
    }
    setScore () {
        console.log('setScoreThis', this)
        this.score.innerHTML = this.snake.score
    }
    showOver () {
        this.over.classList.add('game-over_active')
    }
    hideOver () {
        console.log('hideOver', this)
        this.over.classList.remove('game-over_active')
        this.snake.start()
    }
    showPopup () {
        d.querySelector('.popup').classList.add('popup__active')
    }
    hidePopup () {
        d.querySelector('.popup').classList.remove('popup__active')
    }
    toggleSound () {
        this.soundBtn.classList.toggle('btn_stroke')
        this.snake.options.sound = !this.snake.options.sound
        console.log(this.snake.options)
    }
}