/* eslint-disable prettier/prettier */
import Game from './Game';

const { default: Home } = require('./Home');

export const pageDef = [
  {
    name: 'Home',
    title: 'Home',
    component: Home,
  },
  {
    name: 'Game',
    title: 'Game',
    component: Game,
  },
];
