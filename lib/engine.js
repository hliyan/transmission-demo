'use strict';

var EventEmitter2 = require('eventemitter2').EventEmitter2;

function Engine() {
  this._emitter = new EventEmitter2({wildcard: true});
} 

Engine.prototype.addListener = function(cb) {
  this._emitter.addListener('*', cb); 
}
/* istanbul ignore next */
Engine.prototype.removeListener = function(cb) {
  this._emitter.removeListener('*', cb); 
}

Engine.prototype.removeAllListeners = function(cb) {
  this._emitter.removeAllListeners(); 
}

Engine.prototype.emit = function(type, data) {
  this._emitter.emit(type, {type, data});
}

Engine.prototype.emitError = function(type, error) {
  this._emitter.emit(type, {type, error});
}

module.exports = Engine;