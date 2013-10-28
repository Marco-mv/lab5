/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


$(function() {
    var arr = Employees.entries;
    sortObjArray(arr, 'last');
    render(arr);

    $('.sort-ui .btn').popover({
        content: function(){
            return 'Click to Resort by ' + $(this).html();
        },
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    });
});



function render(entries){
    var template = $('.template');
    var address = $('.address-book');
    var footer = $('.foot');
    address.hide();
    footer.hide();
    address.empty();

    var instance;

    $.each(Employees.entries, function(){
       instance = template.clone();
       for (prop in this) {
            if (prop === 'pic') {
                instance.find('.pic').attr({
                    src: this[prop],
                    alt: 'Picture of ' + this[prop]
                });
            } else { 
                instance.find('.' + prop).html(this[prop]);
        }

        instance.removeClass('template');
        address.append(instance);
	   }
	});
    address.fadeIn(1000);
    footer.fadeIn(1000);    
}

$('.sort-ui .btn').click(buttonPush);
function buttonPush(){
    var sortBtn = $(this);
    var buttonName = sortBtn.attr('data-sortby');
    sortObjArray(Employees.entries, buttonName);
    $('.btn').removeClass('active');
    sortBtn.addClass('active');
    render(Employees.entries);
}

function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/