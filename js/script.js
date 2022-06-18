const TIME_ANIMATION_OUT = 500
const TIME_LOOP = 10
const TIME_INIT_GAME = 1000
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const title = document.querySelector('.title')
const display = document.querySelector('.display')
const record = document.querySelector('.record')
let countRecord= 0

const jump = () => {
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove('jump')
    }, TIME_ANIMATION_OUT)
}

const loop = () => {
    const interval = setInterval(() => {
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        const cloudsPosition = clouds.offsetLeft
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            gameOver(pipePosition, marioPosition, cloudsPosition)
            clearInterval(interval)
        }
        else if(pipePosition <= 120 && pipePosition > 0 && marioPosition > 80) {
            saveRecord()
        }
    },TIME_LOOP)
}

const gameOver = (pipePosition, marioPosition, cloudsPosition) => {
    record.style.display = 'none'
    display.style.display = 'flex'
    title.textContent = `Game Over - Record: ${countRecord}`
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`
    mario.style.animation = 'none'
    mario.style.bottom = `${marioPosition}px`
    mario.src = './images/game-over.png'
    mario.style.width = '75px'
    mario.style.marginLeft = '50px'
    clouds.style.animation = 'none'
    clouds.style.left = `${cloudsPosition}px`
}

const animation = () => {
    pipe.style.animation = 'pipe-animation 1.5s infinite linear'
    pipe.style.right = '-80px'
    mario.style.bottom = '0'
    mario.src = './images/mario.gif'
    mario.style.width = 'none'
    mario.style.marginLeft = 'none'
    clouds.style.animation = 'clouds-animation 10s infinite linear'
    clouds.style.right = '-550px'
}

const initRecord = () => {
    countRecord = 0
    record.style.display = 'flex'
    record.textContent = 'Record: 0'
}

const saveRecord = () => {
    countRecord = countRecord + 10
    record.textContent = `Record: ${countRecord}`
}

const tryAgain = () => window.location.reload()

const start = () => { 
    document.addEventListener('keydown', jump)
    initRecord()
    setTimeout(() => {
        animation()
        loop()  
    }, TIME_INIT_GAME)
}

start()

