(function($){

	$.fn.slider = function(options) {

		var defaults = {
			prevButtonSelector : "#prevButton",
			nextButtonSelector : "#nextButton",
			slidesClassName : "slide",
			currentSlideClassName : "currentSlide",			
			previousSlideClassName : "previous",
			nextSlideClassName : "next",
			direction : "horizontal",
			keySupport : true,
			effect : "cubic-bezier(0.42 0 0.58 1)",
			timeEffect : 800,
			loop : true,
			onlySlideOnThisAnchor : false,
			enablePlayPause : false,
			timeBetweenTwoSlides : 3000,
			autoPlay : true,
			playPauseButtonSelector : "#playButton",
			onPlay: function(){},
			onPause: function(){}
		};

		var options = $.extend(defaults, options);

		if ((options.onlySlideOnThisAnchor != false) && (options.onlySlideOnThisAnchor[0] != "#"))
			options.onlySlideOnThisAnchor = "#" + options.onlySlideOnThisAnchor;

		if (options.direction === 'horizontal') {
			var previousKey = 37;
			var nextKey = 39;
			var previousDirection = 'left';
			var nextDirection = 'right';
		} else {
			var previousKey = 38;
			var nextKey = 40;
			var previousDirection = 'up';
			var nextDirection = 'down';
		}

		return this.each(function() {

			this.init = function () {

				self._isPlaying = options.autoPlay;
				self._isSliding = false;
				self._currentSlideClassName = options.currentSlideClassName;
				self._previousSlideClassName = options.previousSlideClassName;
				self._nextSlideClassName = options.nextSlideClassName;
				self._slidesClassName = options.slidesClassName;
				self._onPlay = options.onPlay;
				self._onPause = options.onPause;

				if ($("."+self._currentSlideClassName).length === 0)
					$("."+self._slidesClassName+":first").addClass(self._currentSlideClassName);

				self.setSlidesVisibility();

				self._prevButton = $(options.prevButtonSelector);
				self._nextButton = $(options.nextButtonSelector);
				self._playPauseButton = $(options.playPauseButtonSelector);

				self.bindPreviousAndNextButtons();			

				if (options.keySupport)
					self.bindKeys();

				if (options.enablePlayPause) {
					self.bindPlayAndPauseButtons();
					if (self._isPlaying)
						self.setTimer();
				}

				if (options.effect.indexOf(",") > 0) {
					var msEffect = options.effect.replace(/, /g, " ");
					var effect = options.effect;
				} else {
					var msEffect = options.effect;
					var effect = options.effect.replace(/ /g, ", ");
				}

				$("."+self._slidesClassName).css({
					WebkitTransition: "all "+options.timeEffect+"ms "+msEffect,
					MozTransition: "all "+options.timeEffect+"ms "+msEffect,
					MsTransition: "all "+options.timeEffect+"ms "+msEffect,
					OTransition: "all "+options.timeEffect+"ms "+msEffect,
					transition: "all "+options.timeEffect+"ms "+msEffect,
					WebkitTransition: "all "+options.timeEffect+"ms "+effect,
					MozTransition: "all "+options.timeEffect+"ms "+effect,
					OTransition: "all "+options.timeEffect+"ms "+effect,
					transition: "all "+options.timeEffect+"ms "+effect
				});
			}

			this.setSlidesVisibility = function() {
				var prev = $("."+self._currentSlideClassName).prev("."+self._slidesClassName);
				if (prev.length === 0) {
					if (options.loop)
						prev = $("."+self._slidesClassName+":last");			
				}

				var next = $("."+self._currentSlideClassName).next("."+self._slidesClassName);
				if (next.length === 0) {
					if (options.loop)
						next = $("."+self._slidesClassName+":first");		
				}

				$("."+self._slidesClassName).css("display", "none");
				$("."+self._currentSlideClassName).css("display", "block");
				prev.css("display", "block").addClass(self._previousSlideClassName);
				next.css("display", "block").addClass(self._nextSlideClassName);
			}

			this.showPreviousSlide = function () {
				var nextSlide = $("." + self._currentSlideClassName);
				var currentSlide = nextSlide.prev("."+self._slidesClassName);

				if (currentSlide.length === 0) {
					if (options.loop)
						currentSlide = $("."+self._slidesClassName+":last");
					else
						return false;				
				}

				var previousSlide = currentSlide.prev("."+self._slidesClassName);

				if (previousSlide.length === 0)
					previousSlide = $("."+self._slidesClassName+":last");

				return self.showSlide(previousSlide, currentSlide, nextSlide, previousDirection, nextDirection);
			}

			this.showNextSlide = function () {			
				var previousSlide = $("."+self._currentSlideClassName);
				var currentSlide = previousSlide.next("."+self._slidesClassName);

				if (currentSlide.length === 0) {
					if (options.loop)
						currentSlide = $("."+self._slidesClassName+":first");
					else
						return false;				
				}

				var nextSlide = currentSlide.next("."+self._slidesClassName);

				if (nextSlide.length === 0)
					nextSlide = $("."+self._slidesClassName+":first");

				return self.showSlide(previousSlide, currentSlide, nextSlide, nextDirection, previousDirection);
			}

			this.showSlide = function(previousSlide, currentSlide, nextSlide) {

				if ((options.onlySlideOnThisAnchor != false) && (options.onlySlideOnThisAnchor != window.location.hash))
					return false;

				if (self._isSliding)
					return false;

				if (self._isPlaying) {
					window.clearTimeout(self._idTimeout);
					self.setTimer();
				}
				
				self._isSliding = true;

				$("."+self._slidesClassName).css("display", "none");

				$("."+self._currentSlideClassName).removeClass(self._currentSlideClassName);

				var previousWasNext = previousSlide.hasClass(self._nextSlideClassName);
				var nextWasPrevious = nextSlide.hasClass(self._previousSlideClassName);

				$("."+self._slidesClassName+"."+self._previousSlideClassName).removeClass(self._previousSlideClassName);	
				$("."+self._slidesClassName+"."+self._nextSlideClassName).removeClass(self._nextSlideClassName);

				if (previousWasNext) {
					previousSlide.addClass(self._previousSlideClassName);

					setTimeout(function(){
						previousSlide.css("display", "block");
					},options.timeEffect);
				} else
					previousSlide.css("display", "block").addClass(self._previousSlideClassName);

				if (nextWasPrevious) {
					nextSlide.addClass(self._nextSlideClassName);

					setTimeout(function(){
						nextSlide.css("display", "block");					
					},options.timeEffect);
				} else
					nextSlide.css("display", "block").addClass(self._nextSlideClassName);

				currentSlide.css("display", "block").addClass(self._currentSlideClassName);

				setTimeout(function(){self._isSliding = false;},options.timeEffect);

				return false;
			}

			this.bindPreviousAndNextButtons = function() {
				if (self._prevButton.length !== 0) {
					self._prevButtonHandler = function () { self.showPreviousSlide(); };
					self._prevButton.bind("click", self._prevButtonHandler);
				} else
					console.error("[Handy Slider] Previous button does not exists !");

				if (self._nextButton.length !== 0) {
					self._nextButtonHandler = function () { self.showNextSlide(); };
					self._nextButton.bind("click", self._nextButtonHandler);
				} else
					console.error("[Handy Slider] Next button does not exists !");
			}

			this.pause = function () {
				self._isPlaying = false;
				window.clearTimeout(self._idTimeout);
				if (self._playPauseButton.length !== 0)
					self._onPause();
			}

			this.play = function () {
				self._isPlaying = true;
				self.setTimer();
				if (self._playPauseButton.length !== 0)
					self._playPauseButton.text("Pause");
			}

			this.bindKeys = function() {
				$(document).bind('keydown', function (event) { 
					if (!$("input, textarea, button").is(":focus"))	{
						switch(event.keyCode) { 
							case previousKey:
								self.showPreviousSlide();
								break;
							case nextKey: 
								self.showNextSlide();
								break;
							case 32: 
								if (options.enablePlayPause)	{
									if (self._isPlaying)
										self.pause();
									else
										self.play();
								}
								break; 
						}
					}
				});
			}

			this.setTimer = function() {
				self._idTimeout = setTimeout( function(){
						self.showNextSlide();
					}, 
					options.timeBetweenTwoSlides
				);
			}		

			this.bindPlayAndPauseButtons = function() {
				if (self._playPauseButton.length !== 0) {
					self._playPauseButtonHandler = function () { 
						if (self._isPlaying)
							self.pause();
						else
							self.play();
					 };
					self._playPauseButton.bind("click", self._playPauseButtonHandler);
				} else
					console.error("[Handy Slider] Play/Pause button does not exists !");
			}

			var self = this;

			self.init();

		});
	}

	$.fn.destroySlider = function () {

		$(document).unbind("keydown");

		return this.each(function () {
			
			this._isPlaying = false;

			window.clearTimeout(this._idTimeout);

			$("."+this._slidesClassName).css("display", "none");
			$("."+this._slidesClassName+"."+this._previousSlideClassName).removeClass(this._previousSlideClassName);	
			$("."+this._slidesClassName+"."+this._nextSlideClassName).removeClass(this._nextSlideClassName);
			$("."+this._currentSlideClassName).css("display", "block");

			if (this._prevButton.length !== 0)
				this._prevButton.unbind("click", this._prevButtonHandler);

			if (this._nextButton.length !== 0)
				this._nextButton.unbind("click", this._nextButtonHandler);

			if (this._playPauseButton.length !== 0)
				this._playPauseButton.unbind("click", this._playPauseButtonHandler);
		});
	}

})(jQuery);
