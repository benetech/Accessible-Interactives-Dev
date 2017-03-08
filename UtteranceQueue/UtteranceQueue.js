/**
 * @constructor
 */
function UtteranceQueue() {

  // @private
  this.running = false;
  this.queue = [];

  // @private - store the previous utterance - if the next utterance is of the same type as the previous utterance it will be
  // skipped
  this.previousUtterance;

  // start the queue loop, getting the next alert every 4000 ms
  setInterval( this.next.bind( this ), 4000 );

  // emits an event whenever the utterance changes
  this.utteranceChangedEmitter = new Emitter();

  // emits an event whenever the client predicate fails
  this.predicateFailedEmitter = new Emitter();

  // emits an event whenver the types are the same
  this.typeSameEmitter = new Emitter();
}

//------------------------------------------------
// Add functions to the AlertQueue prototype
//------------------------------------------------

/**
 * Add a queueItem to the queue. The queueItem is an object with key value pairs that look like
 *   {
 *     utterance: {string} - the text content to be announced by assistive technologies
 *     condition: {function} - function that returns a boolean, the utterance will only be spoken when it returns true
 *     type: {string} - flag that indicates the type of the queue item, other queueItems of the same type will be removed
 *   }
 *
 * The condition and type are both optional.  Condition allows the client to pass in a function that makes sure the
 * utterance is still relevant and true. By the time the utterance is ready to be spoken, the alert could be stale
 * The type allows the client to prevent many updates of the same type from overwhelming the user.  For instance,
 * as an object moves across the screen, it could trigger hundreds of alerts as the position changes.
 * @param {object} queueItem - see above signature
 */
UtteranceQueue.prototype.add = function( queueItem ) {

  // add the item directly to the queue
  this.queue.push( queueItem );

  // if there is any other item in the queue of the same type, remove it since it is probably stale information
  if ( queueItem.type ) {
    for ( var i = this.queue.length - 1; i >= 0; i-- ) {
      var otherItem = this.queue[ i ];
      if ( otherItem.type === queueItem.type ) {

        // if another item in the queue has the same type, remove from the queue 
        this.queue.splice( i, 1 );

        // emit an event to notify client
        this.typeSameEmitter.emit();
      }
    }
  }

  var previousUtterance = this.queue[ this.queue.length - 1 ];
  if ( previousUtterance && ( previousUtterance.type === queueItem.type ) ) {
    this.queue[ this.queue.length - 1 ] = queueItem;
  }
  else {
    this.queue.push( queueItem );
  }
}

/**
 * Move to the next item in the queue. Checks the condition on the item first, to make sure the utterance is still
 * relevant.
 */
UtteranceQueue.prototype.next = function() {
  this.running = false;

  // returns the next item in the queue
  var shift = this.queue.shift();
  if ( shift ) {

    var condition = true;
    if ( shift.condition ) {
      condition = shift.condition();
    }

    // only speak the utterance if the condition was true or undefined
    if ( condition ) {
      this.running = true;
      this.utteranceChangedEmitter.emit( shift.utterance );
    }
    else {
      // condition failed, emit an event to notify this
      this.predicateFailedEmitter.emit();
    }
  }
}