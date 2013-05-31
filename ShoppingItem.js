/* 
 * Adam Richards 2013
 * 
 */


function ShoppingItem(input) {
    
    // Cheesy for now...
    this.checked = (input[0] === "1");
    this.name = input.substring(2);
    
    
    
    this.createDivElement = function() {
        
        if ( this.divElement !== undefined ) {
            console.error("Trying to recreate div element in ShoppingItem...");
            return;
        }
            
        this.divElement = document.createElement("div");

        // Give div a reference to this object so we can operate on this object in response to div events...
        this.divElement.shoppingItem = this;

        this.divElement.onmousedown = function() {
            this.is_mouse_down = true;  // 'this' here is the div ;)
            
            var self = this;
            setTimeout (
                function ()
                {
                    console.log(self + " Trying mouse down timeout.");

                    if ( self.is_mouse_down ) {
                        console.log("mouse down after hold timeout.");
                        self.is_mouse_down = false;
                        self.shoppingItem.handleHold();
                    }
                }, 1000
            );
        };
        
        this.divElement.onmouseout = function() {
            this.is_mouse_down = false;
        };

        this.divElement.onmouseup = function() {
            
            if ( this.is_mouse_down )
                this.shoppingItem.handleClick();
        
            this.is_mouse_down = false;
        };
    };
    this.createDivElement();
    
        
    this.draw = function( newParent ) {
        
        // Assign class(es)
        var className = "item item_shopping";
        if ( this.checked )
            className += " item_shopping_checked";
        this.divElement.className = className;
        
        var elementContent = "";
        
        // Checkbox
        //elementContent += "<input type='checkbox'";
        //if (this.checked)
        //    elementContent += "checked='true'";
        //elementContent += "/>";
        
        // Name
        elementContent += this.name;
        
        // Put content into element...
        this.divElement.textContent = elementContent;
        
        //console.log( this.divElement.parentNode );
        //console.log( newParent );
        console.log("drew " + this.name);
        
        this.reparent( newParent );
    };
    
    this.reparent = function( newParent ) {
        
        // May want to allow this...
        if ( newParent === undefined )
            return;
        
        var oldParent = this.divElement.parentNode;
        if ( oldParent === newParent)
            return;

        if ( oldParent !== null && oldParent !== newParent )
            oldParent.removeChild(this.divElement);

        if ( oldParent !== newParent )
            newParent.appendChild(this.divElement);
    };
    
    this.handleClick = function(e) {
        
        //var event = e || window.event;
        //xxxevent.preventDefault();
        //if ( event.stopPropagation ) event.stopPropagation = true;
        //else event.cancelBubble = true;
        
        var desiredState = !this.checked;
        
        // Change state and redraw.
        this.checked = desiredState;
        this.draw();
        
        $(this.divElement).addClass("spinning");
                
        // TODO: Move this into dedicated model.
        var self = this;
        $.post("./write.php", "action=toggleChecked&name=" + this.name +"&checked=" + desiredState, function(data){self.postDone(data);});
    };
    
    this.handleHold = function( ) {
        console.log("Hold handled!");
    };
    
    this.postDone = function( response ) {
        console.log("Response: " + response + "; this: " + this.name);
        console.log("this.checked = " + this.checked);
        
        $(this.divElement).removeClass("spinning");
        
        if (response[0] === "!")
            console.error("Error: " + response);
        
        var newChecked = this.checked === "true";
        if (response !== newChecked) {
            this.checked = newChecked;
            this.draw();
        }
    };
}