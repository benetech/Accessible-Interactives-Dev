## Description of Approach
For every image, there will exist a button, which has been styled to look consistent across various instances. This button can be positioned on top of the image. For now, we're assuming lower-left. The behavior of this button is as follows.

### Button Behavior
* On focus: displays short descriptive text
* On hover: Displays short descriptive text
* On click/enter/space: Displays long descriptive text in a collapsible/dismissible area beneath the image

## How Short Descriptive Text Works for Everyone
* Screen Reader Users: The short descriptive text is always available due to being mapped to the alt of the image in question.
* Sighted Users: The short descriptive text is available upon hover.
* Sighted Print-Disabled Keyboard-only Users: The short descriptive text is available upon focus (when one tabs to said button).

## How Long Descriptive Text Works for Everyone
The flow for surfacing long descriptive text, or additional resources such as a table of values, etc., is similar for everyone. The button needs to be actuated either by click or keyboard or voice, and then the long descriptive text/additional resources are made available.

## Code-Related Considerations
### Use of Details and Summary
The button to expand descriptions, as described above, can be provided by the browser if we use details and summary. Therefore, this prevents us from needing to toggle the aria-expanded attribute on a button, manage its state, etc.
### Use of CSS and JavaScript
We will attempt to minimize any/all uses of JavaScript, but some may be needed for width calculations or other niceties to facilitate clean formatting. Essentially, the required tasks are as follows.
### Layout Considerations for Button
* Position the button at the bottom-left of the image
* Make the width of the layer that will become visible the same as the width of the image
* Figure out design for a light and dark version of the button so that color contrast is maintained across a wide variety of images

## Content Considerations
* Images with Short Descriptions: It is mapped to alt, and the button does not expand an area to display any long descriptive text/resources. To reiterate from above, screen reader users get the alt, keyboard users can focus the button to surface the alt, and sighted users can hover to see the alt.
* Images with Long Descriptions: All of the steps from "Images with Short Descriptions" hold, but the button does expand to display short descriptive text/resources as described above. Tentative recommendation: put the long description(s) in an unordered list to facilitate easy navigation for screen reader users. This can be styled to look however we want.
* Infographic with Long Description: Same as "Images with Long Description", but the additional layer need not only contain an unordered list with a long text string in it, but rather can surface a table of values, an audio player, a link to download the data that was used in the graphic, or anything else expressible in HTML. The critical takeaway is that this be consistent at a book-level (further discussions need to happen to talk about industry-wide or publisher-wide consistency).
