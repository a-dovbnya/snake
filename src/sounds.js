import { SOUND_TYPES } from './consts'

export const SOUNDS = {
    [SOUND_TYPES.PLAY]: new Audio('./assets/sounds/play.mp3'),
    [SOUND_TYPES.EVENT]: new Audio('./assets/sounds/success.mp3'),
    [SOUND_TYPES.OVER]:  new Audio('./assets/sounds/over.mp3')
}