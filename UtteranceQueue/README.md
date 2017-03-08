UtteranceQueue
======

An queueing system for alerts that might come from a highly interactive application.

### Documentation
In an accessible interactive web application, it is conceivable that a single interaction can trigger
many updates at once. It is also likely that clients will want to control the order
in which alerts are announced.  Simply triggering a change to content of an HTML element with the "aria-live"
attribute is insufficient because aria-live behavior (specifically queing) is inconsistent across various user agents.
There is no specification for order, queue or priority (beyond 'polite', and 'assertive' aria-live attributes).

The UtteranceQueue is an attempt to solve this, by providing a way to order alerts, and queue many alerts
if it is important that they all be heard.  The queue uses an event system - whenever an utterance is ready to be
announced, the UtteranceQueue will emit an event so that the client can observe the next utterance that should be
announced.

In addition to queuing alerts, the client can specify an utterance "type", and a predicate function. When type is
specified for an utterance added to the queue, the queue will remove all utterances that are already in the queue that
have the same type. This feature prevents the user from being overwhelmed with a multitude of alerts that cover the
same information. The predicate function is called right before the event is fired that signals an utterance made it
to the front of the queue. If the function returns false, the utterance will be removed from the queue silently without
triggering any event.

### Example Usage

```html
<p id="live-element" aria-live="assertive"></p>
```

```js
// create the UtteranceQueue
var utteranceQueue = new UtteranceQueue();

// update an aria-live element whenever the next utterance gets to the front of the queue
utteranceQueue.utteranceChangedEmitter.addListener( function( utterance ) {
  document.getElementById( 'live-element' ).textContent = utterance;
} );

// add a few utterances to the queue
utteranceQueue.add( { utterance: 'Utterance 1', type: 'TYPE_1' } );
utteranceQueue.add( { utterance: 'Utterance 2', type: 'TYPE_2' } );
utteranceQueue.add( { utterance: 'Utterance 3', type: 'TYPE_2' } );
utteranceQueue.add( { utterance: 'Utterance 4', type: 'TYPE_3', condition: function() { return false; } } );
```

In the above example, 4 utterances are added to the queue.  From the added objects, we would expect two alerts:
"Utterance 1"
"Utterance 3"

We should ever hear the second and fourth utterances.  Utterance 2 is of the same type as utterance 3, and will be
removed from the queue when utterance 3 is added.  Utterance 4 has a predicate function that returns false, so when 
it is time for utterance 4 to be announced, the predicate function will prevent an event from triggering that suggests
the utterance should be announced.

Please see https://github.com/benetech/Accessible-Interactives-Dev/blob/master/UtteranceQueue/UtteranceQueueExample.html
for an example usage in an HTML app.


