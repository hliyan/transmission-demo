'use strict';

var EventEmitter2 = require('eventemitter2').EventEmitter2;

function Emitter() {
  this._emitter = new EventEmitter2({wildcard: true});
} 

Emitter.prototype.addListener = function(cb) {
  this._emitter.addListener('*', cb); 
}
/* istanbul ignore next */
Emitter.prototype.removeListener = function(cb) {
  this._emitter.removeListener('*', cb); 
}

Emitter.prototype.removeAllListeners = function(cb) {
  this._emitter.removeAllListeners(); 
}

Emitter.prototype.emit = function(type, data) {
  this._emitter.emit(type, {type, data});
}

Emitter.prototype.emitError = function(type, error) {
  this._emitter.emit(type, {type, error});
}

module.exports = Emitter;