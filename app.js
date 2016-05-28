'use strict';

var botijo = require('./build/reforest');
var db = require('./models/index');
var photoDir = __dirname + '/photos/'
var botijin = new botijo(process.env.TOKEN, photoDir,db);