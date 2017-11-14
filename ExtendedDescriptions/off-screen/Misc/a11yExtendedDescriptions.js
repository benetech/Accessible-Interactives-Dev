// 
// This JavaScript will do two things
// #1 make all classes found with "description-off-screen" hidden via aria-hidden="true"
// #2 add a new button immediately after the image/table/etc. by looking for all class="toggle-description" and inserting after this element a new button to toggle on/off the extended descriptions
// #3 provide the button handling to unhide/hide the extended descriptions when invoked by the user.
//  NOTE: We are currently making this only available to AT, if we also need to make this available to any user additional work will need to be done to make this button visible and the corresponding descriptions when invoked to be displayed not only to AT but visually.


// ForFach method for working on a nodelist as opposed to the built-in one for arrays
// IMHO, this makes for cleaner code
function ForEach(nodeList, callback, scope) {
  for (var i = 0; i < nodeList.length; i++) {
	 callback(nodeList[i]); // passes back stuff we need
  }
};

function MakeExtendedDescriptionsAccessible() {

    var setARIAHidden = function(element) {
		element.setAttribute("aria-hidden", "true");
    };
    
    	ForEach( document.getElementsByClassName("extended-description"), setARIAHidden );
}
