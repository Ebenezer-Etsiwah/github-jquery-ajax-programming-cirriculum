function addItem(name, description, price,moreInfo){
  let html='';
  html +='<div class="item">';
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
      addItem(item.name,item.description,item.price,item.moreInfo)
  });

})
.fail(function(request, errorType,errorMessage){
  console.log(errorMessage);
})
.always(function(){

})
});
});
