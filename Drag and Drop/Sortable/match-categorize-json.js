/* Match and categorize (MC) JSON data structure.
{"behavior": "match",
 "contentSets": [[...], ...] // for n sets.
 // Initial implementation limited to two sets.
}

// Categorization JSON data structure.

{
    "behavior": "categorize",
    "contentSets": [["item", ...], ["category", ...]]
}
*/

// Validate an MC (match/categorize) data structure.
function validateMC(mcData) {
    const mc = JSON.parse(mcData);
    // Verify that at least one content set is present.
    if (mc.contentSets.length == 0)
	throw new Error("At least one content set must be specified");

    switch (mc.behavior) {
    case "match":
	if (mc.contentSets.length > 2)
	    console.log("Warning: this implementation supports a maximum of 2 match sets");
	break;
    case "categorize":
	if (mc.contentSets.length != 2)
	    throw new Error("Two content sets must be specified for categorization: a set of items and a set of categories");

    default:
	throw new Error(`Unsupported behavior: ${mc.behavior}`);
    }

    // Perform type checking.
    for (let i = 0; i < mc.contentSets.length; i++)
	for (let j = 0; j < mc.contentSets[i].length; j++) {
	    const content = mc.contentSets[i][j];
	    if (typeof content != "string" ||
		    content.length == 0)
		    throw new Error(`Item ${j} of list ${i} must be a non-empty string`);
	}
}
    
