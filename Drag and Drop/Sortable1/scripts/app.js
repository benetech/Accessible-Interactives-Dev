$(function(){
    // uses http://johnny.github.io/jquery-sortable/js/jquery-sortable-min.js
		$('#sort-it ol').sortable({
			onDrop: function(item) {
				$(item).removeClass("dragged").removeAttr("style");
				$("body").removeClass("dragging");

				getInitialOrder('#sort-it li');
			}
		});
        
		getInitialOrder('#sort-it li');
     
    //bind stuff to number inputs
		$('#sort-it ol input[type="number"]').focus(function(){
			$(this).select();	
		}).change(function(){
			updateAllNumbers($(this), '#sort-it input');
		}).keyup(function(){
			updateAllNumbers($(this), '#sort-it input');
		});
  
    //bind to form submission
    $('#sort-it').submit(function(e){
      reorderItems('#sort-it li', '#sort-it ol');
      e.preventDefault();
    })
    
}); // end doc ready
	
function getInitialOrder(obj){
		var num = 1;
		$(obj).each(function(){
       //set object initial order data based on order in DOM
			$(this).find('input[type="number"]').val(num).attr('data-initial-value', num); 
			num++;
		});
      $(obj).find('input[type="number"]').attr('max', $(obj).length); //give it an html5 max attr based on num of objects
}
	
function updateAllNumbers(currObj, targets){
        var delta = currObj.val() - currObj.attr('data-initial-value'), //if positive, the object went down in order. If negative, it went up.
                c = parseInt(currObj.val(), 10), //value just entered by user
                cI = parseInt(currObj.attr('data-initial-value'), 10), //original object val before change
                top = $(targets).length;
        
        //if the user enters a number too high or low, cap it
        if(c > top){
            currObj.val(top);
        }else if(c < 1){
            currObj.val(1);
        }
        
		$(targets).not($(currObj)).each(function(){ //change all the other objects
			var v = parseInt($(this).val(), 10); //value of object changed		
				
			if (v >= c && v < cI && delta < 0){ //object going up in order pushes same-numbered and in-between objects down
				$(this).val(v + 1);
			} else if (v <= c && v > cI && delta > 0){ //object going down in order pushes same-numbered and in-between objects up
				$(this).val(v - 1);
			}
		}).promise().done(function(){
			//after all the fields update based on new val, set their data element so further changes can be tracked 
			//(but ignore if no value given yet)
			$(targets).each(function(){
				if($(this).val() !== ""){
					$(this).attr('data-initial-value', $(this).val());
				}
			});
		});
}

function reorderItems(things, parent){
  for(var i = 1; i <= $(things).length; i++){
    $(things).each(function(){
      var x = parseInt($(this).find('input').val(), 10);
      if(x === i){
        $(this).appendTo(parent);
      }
    });
  }
}