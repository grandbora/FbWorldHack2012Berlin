function createProductView(product){

	product['image'] = imagePath + product['pic_thumb'];
	product['description'] = product['title'];
	product['url'] = appUrl + '/product?title=' + product['title'] + '&image=' +  product['pic_thumb'];

	var viewStr ='';
	viewStr +='<div class="product">';
	viewStr +='<div class="image horizontal">';
	viewStr +='<img src="' + product['image'] + '"/>';
	viewStr +='</div>';
	viewStr +='<div class="title horizontal">';
	viewStr += product['title'];
	viewStr +='</div>';
	viewStr +='<div class="like button horizontal">like</div>';
	viewStr +='<div class="recommend button horizontal">recommend</div>';
	viewStr +='<div class="ww button horizontal">what it worths?</div>';
	viewStr +='</div>';

	var productElm = $(viewStr).data('product', product);
	productElm.on('click', '.ww.button', wwOnclick);
	productElm.on('click', '.recommend.button', recommendOnclick);
	productElm.on('click', '.like.button', likeOnclick);
	return productElm;
}

function wwOnclick(){
	var product = $(this).parents('.product').data('product');
	FB.api('me/' + namespace + ':whatitworth', 'post',{
		product : product['url']
	}, function(){
		$("<div>").attr('title', product['title']).append($("<div>").text('worths'), $("<div>").text('250 €')).dialog();
	});
}

function recommendOnclick(){
	alert('rec');
}

function likeOnclick(){
	alert('like');
}

$(function() {

	$('input.search').on('keyup', function(){
		$.ajax( "/index/solr", {
			data:{
				q : $(this).val()
			}
		}).done(function(data, textStatus, errorThrown) { 
			var result =  $.parseJSON(data);
			$('div.result').empty();
			if (result) {
				$.each(result.response.docs, function(){
					$('div.result').append(createProductView(this));
				});
			}
		});
	});
});
