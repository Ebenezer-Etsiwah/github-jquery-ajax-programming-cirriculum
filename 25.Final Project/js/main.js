var cart=0;

function addItem(id,name, description, price,moreInfo){
  let html='';
  html +='<div class="item" data-id="''+id+"''">';
    html +='<div class="name">' + name+'</div>';

    html +='<img src="assests/Weather.JPG"></img>';
  html +=  '<div class="description">'+description+'</div>';
  html +=  '<div class="price">'+price+'</div>';
  html +=  '<button class="item-add">Add to cart</button>';
  html +=  '<button class="item-remove">Remove</button>';
  html +=  '<br/>';
  html +='<a href="#">More info</a>';
  html +='<div class="more-info">'+moreInfo+'</div>';
  html +='</div>';
  $('#container').prepend(html);

}

$(document).ready(function(){
 //$('#button-create-item').on('click',function(){
  //let name=$('#input-create-item').val();
  //console.log(name);
//$('#input-create-item').val('');

//});
$('#container').on('click','.more-info-link',
function(event){
  event.preventDefault();
  $(this).parent().find(' .more-info').slideToggle('slow');
  $(this)
  .animate({ "opacity":0.5,"margin-left": 10},150);
  .animate({ "opacity":1.0,"margin-left": 0},150);
});
$('#container').on('click',' .item-remove',function(){
  //console.log('Hello')
  $(this).parent().remove();
});
$.ajax('data/item.json',{
dataType:'json',
contentType: 'application/json',
cache:false
})
.done(function(response){
  //console.log('Hello!');
  let items =response.items;
  items.forEach(function(item){
      //console.log(items);
      addItem(item.id,item.name,item.description,item.price,item.moreInfo)
  });

})
.fail(function(request, errorType,errorMessage){
  console.log(errorMessage);
})
.always(function(){

});
$('#container').on('click','.item-add',function(){
  let id =$(this).parent.data('id');
  //console.log(id);
  $.ajax('data/addToCart.json',{
    type:'post',
    data:{ id: id},
    dataType:'json',
    contentType:'application/json'
  })
  .done(function(response)){
    //console.log(response);
    if(response.message==='success'){
      let price = response.price;
    //  console.log(price);
    cart+=price;
    $('#cart-container').text('$' +cart);
    }
  });
});
$('#newsletter-checkbox').on('change',function({
  if($(this).is(':checked')){
    //console.log('Yes');
    $('#newsletter-frequency').fadeIn();
  }else{

    $('#newsletter-frequency').fadeOut();
  }
});
$('#newsletter-checkbox').trigger('change');

$('#cart-form').on('submit',function(event){
  event.preventDefault();


  let data ={ form:$(this).serialize(),
    price:cart };
    console.log(data.form);
    $.ajax($(this).attr('action'),{
      type:'post',
      data:data
    })
    .done(function(response){
      $('#feedback-message').text(response.message);
    //  alert(.form+':'+response.message);
    });
  });

});
});
});
