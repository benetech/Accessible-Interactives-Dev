// Test if MathML is supported
// Two options (see https://tinyurl.com/moy3hcx):
// 1. use "hasFeature" and correct for fact that Chrome says "yes"
// 2. append MathML containing an mspace of a certain height, check that height, then remove the element"
//
// Regardless of the technique above, we still have to check if MathJax is in the page because the math
//   won't be ready to be rendered by MathJax on page load.
// This still isn't fool proof because other JS such as KaTeX might be doing the rendering
function IsMathMLSupported() {
	// call either HasFeatureMathML() or DisplaysMathML()
	return HasFeatureMathML() || (typeof MathJax != 'undefined');
}

// Not sure how robust the "hasFeatureMathML() implementation is, so both methods are given here

//  Feature Detect for MathML as w3c specification
//  <returns>boolean: true if mathML is supported in browser
function HasFeatureMathML(){
	var IsChrome = function(){
		var regex = /Chrome\/[0-9]{1,2}\.[0-9]/
		var matches = navigator.userAgent.match(regex)
		return (matches!=null && matches.length==1)
	};
	
	var MATHML_FEATURE = "org.w3c.dom.mathml"  //as per w3c specification
	var MATHML_FEATURE_VERSION = "2.0"         //Any version number appears to work
	if( IsChrome() )
		return false        					       // Not natively supported in Chrome despite what hasFeature() says 
	return document.implementation.hasFeature(MATHML_FEATURE, MATHML_FEATURE_VERSION )
}

function DisplaysMathML() {
	var div = document.createElement("div");
	div.innerHTML = '<math><mspace height="30px" width="20px"></mspace></math>';
	document.body.appendChild(div);
	var mathmlWorks = div.firstChild.firstChild.getBoundingClientRect().height === 30;
	document.body.removeChild(document.body.lastElementChild);
	return mathmlWorks;
}


// ForFach method for working on a nodelist as opposed to the built-in one for arrays
// IMHO, this makes for cleaner code
function ForEach(nodeList, callback, scope) {
  for (var i = 0; i < nodeList.length; i++) {
	 callback(nodeList[i], i, nodeList); // passes back stuff we need
  }
};


function MakeMathAccessible() {
	if (!IsMathMLSupported())
		return;
		
	var setARIAHidden = function(element) {
		element.setAttribute("aria-hidden", "true");
	};
	var unsetARIAHidden = function(element) {
		element.setAttribute("aria-hidden", "false");
	};
	var changeImage = function(element) {
		if (element.getAttribute("role")=="math") {
			element.setAttribute("alt", " ");
			element.setAttribute("aria-hidden", "true");
		}
	};
	var changeMathSpan = function(element) {
		if (element.getAttribute("role")=="math") {
			element.setAttribute("aria-hidden", "true");
		}
		if (element.getAttribute("class") && 
			 element.getAttribute("class").indexOf("MathMLNoDisplay") >=0) {
			element.parentNode.removeChild(element)
		}
	};
	
	ForEach( document.getElementsByTagName("math"), unsetARIAHidden );
	ForEach( document.getElementsByTagName("img"), changeImage );
	ForEach( document.getElementsByTagName("span"), changeMathSpan );
	
	// make sure an MathJax CSS math is hidden, not needed for properly done pages
	ForEach( document.getElementsByClassName("MathJax"), setARIAHidden );
}
