
/**
 * A very simple event and listener abstraction.
 * @constructor
 */
function Emitter() {
  this.listeners = [];
}

//------------------------------------------------
// functions for the Emitter prototype
//------------------------------------------------
Emitter.prototype.addListener = function( listener ) {
  this.listeners.push( listener );
};

Emitter.prototype.removeListener = function( listener ) {
  var index = this.listeners.indexOf( listener );
  if ( index >=0 ) {
    this.listeners.splice( index, 1 );
  }
};

Emitter.prototype.emit = function( value ) {
  for ( var i = 0; i < this.listeners.length; i++ ) {
    this.listeners[ i ]( value );
  }
};