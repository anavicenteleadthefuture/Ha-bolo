var app = {

	init: function() {
		console.log('app.init');
		var hash = window.location.hash.replace(/^.*?#/,'');

		if (hash == '') {
			app.getPosts();
		}

	},

	getPosts: function() {
		console.log('app.getPosts');
		var rootURL = 'http://www.uppartner.pt/presentations/ha-bolo';

		//$.ajax({
		//	type: 'GET',
		//	url: rootURL + '/wp-json/posts?type=cake&filter[posts_per_page]=3',
		//	dataType: 'json',
		//	success: function(data){
		//		$.each(data, function(index, value) {
		//			$('ul.topcoat-list').append('<li class="topcoat-list__item">' +
		//			'<a class="view-link" href="#'+value.ID+'">' +
		//			'<h3>'+value.title+'</h3>');
		//		});
		//	},
		//	error: function(error){
		//		console.log(error);
		//		alert('error');
		//	}
		//});
		jQuery( function( $ ) {
			$.ajax( {
				url: 'http://www.uppartner.pt/presentations/ha-bolo/wp-json/posts?type=cake&filter[posts_per_page]=3',
				success: function ( data ) {
				  var post = data.shift(); // The data is an array of posts. Grab the first one.
				  $( '#quote-title' ).html( '<a class="view-link" href="#'+post.ID+'">'+post.title+'</a>' );
			  
				  // If the Source is available, use it. Otherwise hide it.
				  if ( typeof post.details !== 'undefined' && typeof post.details.Date !== 'undefined' ) {
				    $( '#quote-details' ).html( 'Data:' + post.details.Date );
				  } else {
				    $( '#quote-details' ).text( '' );
				  }
				},
				error: function(error){
					console.log(error);
				},
				cache: false
			} );
		});

	},

	getSinglePost: function(postID) {
		console.log('getSinglePost');
		var rootURL = 'http://www.uppartner.pt/presentations/ha-bolo/wp-json';
		$.ajax({
			type: 'GET',
			url: rootURL + '/posts/' + postID,
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('.single-post .title').append(data.title);
				$('.single-post .content').append(data.content);

			},
			error: function(error){
				console.log(error);
			}

		});

	},

	route: function(event) {
		var homePage =
    		'<div>'+
		'<div id="quote-title"></div>'+
		'<div id="quote-details"></div>'+
		'</div>';

		var singlePost =
		    '<div><article class="single-post">' +
		    '<a class="topcoat-button" href="#">Back</a>' +
		    '<h2 class="title"></h2>' +
		    '<div class="content"></div>' +
		    '</article></div>';

		var page,
		hash = window.location.hash.replace(/^.*?#/,'');
		console.log(hash);

        if (hash != '') {
        	page = singlePost;
        	app.getSinglePost(hash);
        } else {
    		page = homePage;
    		app.init();
    	}

    	slider.slidePage($(page));
	}

}

var slider = new PageSlider($("#container"));

$(window).on('hashchange', app.route);

app.route();