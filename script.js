//Requires jQuery

$(document).ready(function() {
    var id_array = [1, 2, 3], random;
    var bg_array = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9", "bg10", "bg11"]; //add as many background classes as you like. Each bg represents an image
    var bg_on = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8"] //images displayed when the page first loads.
    var bg_off = ["bg9", "bg10", "bg11"] //images not displayed when the page first loads.
    
    setInterval(function () {
        random = Math.floor((Math.random() * 2) + 1);
        
        if(random === 2) {
            picture_switcher("#t", "#top");
            
        }
        else {
            picture_switcher("#b", "#bottom");
        }
    }, 3500);
    
    function picture_switcher (a, b) {
        random = Math.floor((Math.random() * 3));
            var old_id = a + id_array[random];
            
            // get the contents and attributes of the random element
            var el_id = $(old_id).attr('id');
            var el_class = $(old_id).attr('class');
            var el_contents = $(old_id).html();
            
            // find the bg class that is in el_class
            var el_classes_array = el_class.split(" ");
            
            var el_bg_class = "none";
            for (i = 0; i < bg_array.length; i++) {
                var on_test = $.inArray(bg_array[i], el_classes_array);
                if (on_test != -1) {
                    el_bg_class = el_classes_array[on_test];
                    
                    // replace it with a bg class that is in bg_off
                    el_class = el_class.replace(el_bg_class, bg_off[0]);
                    
                    // remove the old bg class from bg_on and add it to bg_off
                    bg_on.splice($.inArray(el_bg_class, bg_on), 1, bg_off[0]);
                    
                    // remove the new bg class from bg_off and add it to bg_on
                    bg_off.splice($.inArray(bg_off[0], bg_off), 1);
                    bg_off.push(el_bg_class);
                    break;
                }
            }
            
            if (!isset(el_bg_class) || el_bg_class === "none") {
                var el_class_1 = $(old_id + " > div").attr('class');
                var el_class_2 = $(old_id + " div:nth-child(2)").attr('class');
                
                var el_classes_1_array = el_class_1.split(" ");
                var el_classes_2_array = el_class_2.split(" ");
                
                for (i = 0; i < bg_array.length; i++) {
                    var on_test_1 = $.inArray(bg_array[i], el_classes_1_array);
                    var on_test_2 = $.inArray(bg_array[i], el_classes_2_array);
                    
                    if(on_test_1 != -1) {
                        var el_bg_class_1 = el_classes_1_array[on_test_1];
                        el_class_1 = el_class_1.replace(el_bg_class_1, bg_off[0]);
                        bg_on.splice($.inArray(el_bg_class_1, bg_on), 1, bg_off[0]);
                        bg_off.splice($.inArray(bg_off[0], bg_off), 1);
                        bg_off.push(el_bg_class_1);
                    }
                    if(on_test_2 != -1) {
                        var el_bg_class_2 = el_classes_2_array[on_test_2];
                        el_class_2 = el_class_2.replace(el_bg_class_2, bg_off[0]);
                        bg_on.splice($.inArray(el_bg_class_2, bg_on), 1, bg_off[0]);
                        bg_off.splice($.inArray(bg_off[0], bg_off), 1);
                        bg_off.push(el_bg_class_2);
                    }
                    
                }
                
                new_id = "new";
                var el_build_sub = "<div id='" + new_id + "' class='" + el_class + "'><div class='" + el_class_1 + "'></div><div class='" + el_class_2 + "'></div>" +el_contents + "</div>";
            }
            
            var new_id = "new";
            var el_build = "<div id='" + new_id + "' class='" + el_class + "'>" + el_contents + "</div>";
            if(!isset(el_build_sub)) {
                $(b).append(el_build);
            }
            else {
                $(b).append(el_build_sub);
            }
            
            $(old_id).css("width", "0px");
            
            // remove the random element
            setTimeout(function() {
                $(old_id).remove();
                // change new element id to the old id
                $("#" + new_id).attr("id", el_id);
            },2000);
    }
    
        // ----- Isset function ------ //
    function isset() {
        var a = arguments,
            l = a.length,
            i = 0,
            undef;

          if (l === 0)
          {
            throw new Error('Empty isset');
          }

          while (i !== l)
          {
            if (a[i] === undef || a[i] === null)
            {
              return false;
            }
            i++;
          }
          return true;
    }
    
    
});
