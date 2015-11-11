$(document).ready(function() {
    
    var image_folder = 'imgs';
    
    var bg_array = [], bg_array_on = [], bg_array_off = [];
    
    create_img_RegEx(image_folder);
    populate_bg_array();
    populate_bg_array_on();
    populate_bg_array_off();
    buildInitHTMl();
    setInterval(function() {
        picture_switcher();
    }, 3000);
    
    
    
    // ----- Functions ----- //
    
    // Picture Change function
    function picture_switcher() {
        var random = Math.floor((Math.random() * 3) + 1); // random number from 1 to 3
        var el_to_remove = $('#t' + random);
        var el_to_remove_classes = el_to_remove.attr('class').split(' ');
        
        // large images
        // test if element class containes 'large'
        if( $.inArray('large', el_to_remove_classes) !== -1 ) {
            var el_to_remove_img = el_to_remove.css('background-image').match(img_RegEx);
            
            // remove img from bg_array_on to bg_array_off
            bg_array_on.splice(bg_array_on.indexOf(el_to_remove_img[0]), 1);
            bg_array_off.push(el_to_remove_img[0]);

            // add new img to bg_array_on from bg_array_off
            bg_array_on.push(bg_array_off[0]);
            bg_array_off.splice(0,1);
            
            // create new img html
            var new_img_html = '<div id="t' + random + '" class="box large" style="background-image: url(\'' + bg_array_on[3] + '\')"></div>';
            
        } 
        // small images
        // element class does not contain 'large'
        else {
            var el_to_remove_img_1 = $('#t' + random + ' > div').css('background-image').match(img_RegEx);
            var el_to_remove_img_2 = $('#t' + random + ' div:nth-child(2)').css('background-image').match(img_RegEx);
            
            // remove both images from bg_array_on to bg_array_off
            bg_array_on.splice(bg_array_on.indexOf(el_to_remove_img_1[0]), 1);
            bg_array_off.push(el_to_remove_img_1[0]);
            bg_array_on.splice(bg_array_on.indexOf(el_to_remove_img_2[0]), 1);
            bg_array_off.push(el_to_remove_img_2[0]);
            
            // add 2 new images to bg_array_on from bg_array_off
            bg_array_on.push(bg_array_off[0]);
            bg_array_off.splice(0,1);
            bg_array_on.push(bg_array_off[0]);
            bg_array_off.splice(0,1);
            
            // create new img html
            var new_img_html = '';
            new_img_html += '<div id="t' + random + '" class="box slider-small-container">';
            new_img_html += '<div class="small" style="background-image: url(\'' + bg_array_on[2] + '\')"></div>';
            new_img_html += '<div class="small" style="background-image: url(\'' + bg_array_on[3] + '\')"></div>';
            new_img_html += '</div>';
            
        }
        
        // add new img html to slide show
        $('#top').append(new_img_html)
        
        // shrink img to remove 
        el_to_remove.css('width', '0px');

        // remove old img
        setInterval(function() {
            el_to_remove.remove();
        }, 2000);
    }
    
    // build initial html
    function buildInitHTMl() {
        var html_contents = '';
        html_contents += '<div class="slider-row">';
        html_contents += '    <div id="top" class="slider">';
        html_contents += '        <div id="t1" class="box large" style="background-image: url(\'' + bg_array_on[0] + '\')"></div>';
        html_contents += '        <div id="t2" class="box slider-small-container">';
        html_contents += '            <div class="small" style="background-image: url(\'' + bg_array_on[1] + '\')"></div>';
        html_contents += '            <div class="small" style="background-image: url(\'' + bg_array_on[2] + '\')"></div>';
        html_contents += '        </div>';
        html_contents += '        <div id="t3" class="box large" style="background-image: url(\'' + bg_array_on[3] + '\')"></div>';
        html_contents += '    </div>';
        html_contents += '</div>';
        
        $('.slider-container').html(html_contents);
    }
    
    // populate bg_array
    function populate_bg_array() {
        
        // get images from html slider-container class
        $.each($('.slider-container img'), function() {
            bg_array.push($(this).attr('src'));
        });
        
    }
    
    // populate bg_array_on
    // first 4 objects in ob_array
    function populate_bg_array_on() {
        for( var i = 0; i < 4; i++ ) {
            bg_array_on.push(bg_array[i]);
        }
    }
    
    // poulate bg_array_off
    // all objects in bg_array not in bg_array_on
    function populate_bg_array_off() {
        for( var i = 0; i < bg_array.length; i++ ) {
             if( ($.inArray(bg_array[i], bg_array_on)) === -1 ) bg_array_off.push(bg_array[i]);
        }
    }
    
    // build RegEx to filter image src
    function create_img_RegEx(folder) {
        folder = '(' + folder + '\/)(.*)(jpg|JPG|jpeg|gif|png)';
        img_RegEx = new RegExp(folder)
    }
    
    // check if an object is set
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