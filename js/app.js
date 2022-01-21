import { Register } from './auth/Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"
import * as utils from './utils/utils.js';
import * as pageLoader from './pages.js';
import EventClick from './EventClick.js';

let gameView = new GameView();
let game = new Game();
let register = new Register();


let eventClick = new EventClick(register, game, gameView);


