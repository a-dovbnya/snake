import Snake from './Snake'

export default class Game {
    constructor (opt) {
        const canvas = document.getElementById('snake')
        const ctx = canvas.getContext('2d')

        //const score = document.getElementById('score')
        //const over = document.querySelector('.game-over')
        const ctx = canvas.getContext('2d')
        this.snake = new Snake(ctx, opt)
        this.state = {
            isStarted: false
        }
    }
}