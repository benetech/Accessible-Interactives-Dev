==Description of Approach
For every image, there will exist a button, which has been styled to look consistent across various instances. This button can be positioned on top of the image. For now, we're assuming lower-left. The behavior of this button is as follows.

===Button Behavior
* On focus: displays short descriptive text
* On hover: Displays short descriptive text
* On click/enter/space: Displays long descriptive text in a collapsible/dismissible area beneath the image

==How Short Descriptive Text Works for Everyone
* Screen Reader Users: The short descriptive text is always available due to being mapped to the alt of the image in question.
* Sighted Users: The short descriptive text is available upon hover.
* Sighted Print-Disabled Keyboard-only Users: The short descriptive text is available upon focus (when one tabs to said button).

==How Long Descriptive Text Works for Everyone
The flow for surfacing long descriptive text, or additional resources such as a table of values, etc., is similar for everyone. The button needs to be actuated either by click or keyboard or voice, and then the long descriptive text/additional resources are made available.
