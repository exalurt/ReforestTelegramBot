'use strict';

var botijo = require('./build/reforest');
var photoDir = __dirname + '/photos/'
var botijin = new botijo(process.env.TOKEN, photoDir);
