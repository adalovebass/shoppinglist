<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <script type="text/javascript" src="ShoppingItem.js"></script>
    <script type="text/javascript" src="HeadingItem.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>

    
    <link href="styles.css" rel="stylesheet" type="text/css" >
    
    <title>4054 shopping</title>

<script>
    function getData() {
        $.post("./read.php", "fileName=./lists/list.txt", dataGotten);
    };
    
    function dataGotten( response ) {
        console.log("Response: " + response);
        
        var data = JSON.parse(response);
        
        printData(data);
    };
    
    function printData(data) {
                
        var items = [];
        
        for (var i = 0; i < data.length; i++) {
            if (data[i][0] === ":") {
                console.log("Found heading " + data[i].substr(1));
                var newItem = new HeadingItem( data[i] );
                items.push( newItem );
            }
            else {
                var newItem = new ShoppingItem( data[i] );
                console.log( newItem );
                items.push( newItem );
            }
        }
        
        for (var i = 0; i < items.length; i++ ) {
            items[i].draw( document.getElementById("main_list_wrapper"));
        }
    }
    
    function logMainClick() {
        //console.log('main_click');
    }
    
    var $window = $(window),
       $stickyEl = $('#header'),
       elTop = $stickyEl.offset().top;
       
       console.log("elTop" + elTop);

    $window.scroll(function() {
       //console.log($stickyEl);
       //console.log(elTop);
       //$stickyEl.toggleClass('sticky', true);// $window.scrollTop() > elTop);
    });
    
    function dynamicSizeElements(){
        console.log("sizing elements..." + $('body').width());
        $('#header').width($('body').width());
        $('#main_list_wrapper').css('margin-top', $('#header_content').height());
    }
</script>

</head>
<body>
    <div id="header">
        <div id="header_content">
            <span id="button_left" class="button_header" onclick="{console.log('button_left');}">&lt;&lt;</span>
            <span id="heading">Groceries</span>
            <span id="button_right" class="button_header" onclick="{console.log('button_right');}">&gt;&gt;</span>
        </div>
        <div id="header_shadow"></div>
    </div>
    <div id="main_list_wrapper" onclick="logMainClick();">
        <script>
            dynamicSizeElements();
            getData();
        </script>
    </div>
</body>
</html>