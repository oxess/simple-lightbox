(function($){

	LB = function(me,opts){

		var _ = this;

		_.me = me;

		_.url = _.me.attr('href');
		_.current_img;
		_.overland;

		_.img = _.me.find('img');

		_.start_size = undefined;

		_.opts = $.extend({

			css: {
				'position': 'fixed',
				'z-index': '9999',
				'top' : '0',
				'left': '0',
				'right': '0',
				'bottom': '0',
				'margin': 'auto',
				'width': '0',
				'height': '0',
				'cursor': 'zoom-out'
			},

			overland_css: {
				'position': 'fixed',
				'width': '100%',
				'height': '100vh',
				'background': 'rgba(0,0,0,.6)',
				'z-index': 9998,
				'top': 0,
				'left': 0,
				'color': '#eee',
				'text-align': 'center',
				'display': 'table'
			},

			speed: 500,
			wait_html: 'Proszę czekać ...'

		},opts);

		_.show = function(e){
			e.preventDefault();

			_.current_img = $('<img>');

			_.current_img.attr('src', _.url);
			_.current_img.css('display','none');
			_.current_img.appendTo('body');

			_.overland = _.set_overland();

			_.current_img.on('load', function(){
				var size = _.calcSize();

				_.current_img.css(_.opts.css);

				_.current_img.animate({
					width: size.width + 'px',
					height: size.height + 'px',
					display: 'block'
				}, _.opts.speed, function(){
					_.current_img.click(_.close);
					_.overland.html('');
				});

				_.current_img.on('click',_.close);
				$(window).on('resize', _.update);

				$(this).off('load');
			});

			return false;
		}

		_.update = function(){
			var size = _.calcSize();

			_.current_img.css({
				width: size.width + 'px',
				height: size.height + 'px',
			});
		}

		_.calcSize = function(){
			var wh = $(window).outerHeight() - 40;
			var ww = $(window).outerWidth() - 40;

			if( _.start_size == undefined ){
				_.start_size = {};
				_.start_size.h = _.current_img.height();
				_.start_size.w = _.current_img.width();
			}

			var ch = _.start_size.h;
			var cw = _.start_size.w;

			var w = cw;
			var h = ch;

			var ratio = ch/cw;

			if( ch > wh && ratio == 0 ) h, w = ( wh > ww )? wh : ww;

			if( ch > wh && ratio != 0 ){
				h = wh;
				w = h/ratio;
				if( w > ww ){
					h = ww/ratio;
					w = ww;
				}
			}

			if( cw > ww && ratio == 0 ) h, w = ( ww > wh )? ww : wh;

			if( cw > ww && ratio != 0 ){
				h = ww*ratio;
				w = ww;
				if( h > wh ){
					h = wh;
					w = h/ratio;
				}
			}

			return {
				width: w,
				height: h
			}
		}

		_.close_other = function(){
			$(_.me.selector).lightbox();
		}

		_.set_overland = function(){
			var obj = $('<div>');

			obj.html("<div style='display: table-cell;vertical-align: middle'>"+_.opts.wait_html+"</div>");
			obj.css(_.opts.overland_css);

			obj.appendTo('body');

			obj.show(_.opts.speed);

			obj.on('click', _.close);

			return obj;
		}

		_.close = function(){
			_.current_img.off('click');
			_.overland.off('click');
			$(window).off('resize');

			_.current_img.stop().animate(_.opts.css, _.opts.speed, function(){
				_.current_img.remove();
				_.start_size = undefined;
				_.overland.stop().hide(_.opts.speed).delay(_.opts.speed).remove();
			});
		}

		_.me.on('click', _.show);
	}

	$.fn.lightbox = function(opts){

		var opts = opts || {};

		this.each(function(){

			var instance = new LB($(this),opts);
			$(this).prop('instance', instance);

		});
	}

})(jQuery);
