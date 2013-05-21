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

        // Give div some idea of the object it represents...
        this.divElement.shoppingItem = this;

        this.divElement.onclick = function(){
            this.shoppingItem.handleClick(); // 'this' here is the div ;)
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
        
        this.checked = !this.checked;
        this.draw();
                
        // TODO: Move this into dedicated model.
        var self = this;
        $.post("./write.php", "action=toggleChecked&name=" + this.name +"&checked=" + this.checked, function(data){self.postDone(data)});
    };
    
    this.postDone = function( response ) {
        console.log("Response: " + response + "this " + this.name);
        
        if (response[0] === "!")
            console.error("Error: " + response);
        
        if (response !== this.checked)
            this.draw();
    };
}