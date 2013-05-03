/* 
 * Adam Richards 2013
 * 
 */

function HeadingItem( input ) {
    
    // Cheesy for now...
    this.name = input.substring(1);
    
    
    this.createDivElement = function() {
        
        if ( this.divElement !== undefined ) {
            console.error("Trying to recreate div element in HeadingItem...");
            return;
        }
            
        this.divElement = document.createElement("div");

        // Give div some idea of the object it represents...
        this.divElement.headingItem = this;

        this.divElement.onclick = function(){
            this.headingItem.handleClick(); // 'this' here is the div ;)
        };
    };
    this.createDivElement();
    
        
    this.draw = function( newParent ) {
        
        // Assign class(es)
        var className = "item item_heading";
        this.divElement.className = className;
        
        var elementContent = "";
        
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
        
        this.draw();
        
        // TODO: Move this into dedicated model.
        //$.post("./read.php", "name=" + this.name +"&checked=" + this.checked, this.postDone);
    };
    
    //this.postDone = function( response ) {
    //    console.log("Response: " + response);
    //};
}


