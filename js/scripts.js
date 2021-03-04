
var products = {
    'white': {
        
        'plain': {
            'unit_price': 50.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 80.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 60.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 90.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}



// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:

$(function(){
    function set_params(){
        search_params.quantity = $('#quantity').val()
        search_params.quality = $('#quality .option-button.selected').attr('id')
        search_params.color = $('#color .option-button.selected').attr('id')
        search_params.style = $('#style').val()
        update_params()
        $('#total-price').html(calculatePrice())
    }

    function update_params(){
        $('.refresh-loader').show()

        $('#result-style').text(search_params.style)
        $('#result-color').text(search_params.color)
        $('#result-quantity').text(search_params.quantity)

        var qualityType = "#" + search_params.quality;
        $('#result-quality').html($(qualityType).text())

        // --- set image

        var imageUrl = 'img/' + products[search_params.color][search_params.style].photo;
        $('#photo-product').attr('src',imageUrl)

        setTimeout(() => {
            $('.refresh-loader').hide()
        }, 500);
    }

    // ---- Quantity
    $('#quantity').change( () => {
        search_params.quantity = $('#quantity').val()
        set_params()
    })

    // ---- Style
    $('#style').change( () => {
        search_params.style = $('#style').val()
        set_params()
    })

    // ---- Quality and Color
    $(".option-button").click(function(){
        
        var clickedParam = $(this).parent().attr("id");

        var childSelector = "#" + clickedParam + " .option-button";

        $(childSelector).removeClass('selected');
        $(this).addClass('selected')

        var selectedChild = "#" + clickedParam + " .option-button.selected";
        search_params[clickedParam] = $(selectedChild).attr('id')

       
        set_params();
    });

    //-- calculate Price

    // The high quality shirt (190g/m2) has a 12% increase in the unit price.

    // 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount

    function calculatePrice(){
        var hightQuality = $('#q190').text()
        var unitPrice = products[search_params.color][search_params.style].unit_price;

        if ( search_params.quality === hightQuality)
        {
            unitPrice += 0.12;
        }
        
        var total = search_params.quantity * unitPrice;
        var ordredQuantity = search_params.quantity;
        if( ordredQuantity > 1000)
        {
            total *= 0.2
        }else if( ordredQuantity > 500)
        {
            total *= 0.12
        }else if( ordredQuantity > 100)
        {
            total *= 0.05;
        }

        return total.toLocaleString("MAD", {style:'currency' , currency:'MAD'})
    }


    set_params()

});










