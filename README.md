Handy Slider
===========

Plugin jQuery to create great sliders easily.

Requirements
============

Handy Slider needs the jQuery library to works.

Commands
============

$(sliderSelector).slider(options);

description : Initialize the slider.

- sliderSelector :
	type : jQuery selector
	description : Slider selector

- options :
	type : object
	description : Custom options

	- prevButtonSelector (default value : "#prevButton")
		type : jQuery selector
		description : Previous button selector.

	- nextButtonSelector (default value : "#nextButton")
		type : jQuery selector
		description : Next button selector.

	- currentSlideClassName (default value : "currentSlide")
		type : string
		description : Class name of the current slide

	- slidesClassName (default value : "slide")
		type : string
		description : Class name of the slides.

	- direction (default value : "horizontal")
		type : enum { "horizontal", "vertical" }
		description : Direction of the slide effect.

	- keySupport (default value : true)
		type : boolean
		description : If set to true, the user can navigate with the keyboard.

	- effect (default value : "cubic-bezier(0.42 0 0.58 1)")
		type : string
		description : Part of the CSS code used to do the slides' transition.

	- timeEffect (default value : 800)
		type : integer
		description : Time of the slide effect in milliseconds.

	- loop (default value : true)
		type : boolean
		description : If set to true, the first slide will be display after the last slide.

	- onlySlideOnThisAnchor (default value : false)
		type : string or false
		description :  If different of false, the user actions on the slider will be only execute on the anchor setted.

	- enablePlayPause (default value : false)
		type : boolean
		description : If set to true, the slider will support play and pause actions.

	If enablePlayPause is set to false, the following parameters are not use. 

	- timeBetweenTwoSlides (default value : 3000)
		type : integer
		description : Time between two slides launching in milliseconds.

	- autoPlay (default value : true)
		type : boolean
		description : If set to true, the slider will be automatically play.

	- playButtonSelector (default value : "#playButton")
		type : jQuery selector
		description : Play button selector

	- pauseButtonSelector : "#pauseButton"
		type : jQuery selector
		description : Pause button selector


$(sliderSelector).destroySlider();

description : Destroy the slider.

- sliderSelector :
	type : jQuery selector
	description : Slider selector
