/!\ WARNING /!\
===============

This plugin is deprecated. You can easily found faster and better maintained plugins to create slideshows.

Handy Slider
===========

Plugin jQuery to create slideshows easily.

Requirements
============

Handy Slider needs the jQuery library to works.

Commands
========

$(sliderSelector).slider(options);
----------------------------------

###Description

Initialize the slider.

###Variables

- sliderSelector :
	- Type : jQuery selector
	- Description : Slider selector

- options :

	- prevButtonSelector (default value : "#prevButton")
		- Type : jQuery selector
		- Description : Previous button selector.

	- nextButtonSelector (default value : "#nextButton")
		- Type : jQuery selector
		- Description : Next button selector.

	- currentSlideClassName (default value : "currentSlide")
		- Type : string
		- Description : Class name of the current slide.

	- slidesClassName (default value : "slide")
		- Type : string
		- Description : Class name of the slides.

	- direction (default value : "horizontal")
		- Type : enum { "horizontal", "vertical" }
		- Description : Direction of the slide effect.

	- keySupport (default value : true)
		- Type : boolean
		- Description : If set to true, the user can navigate with the keyboard.

	- effect (default value : "cubic-bezier(0.42 0 0.58 1)")
		- Type : string
		- Description : Part of the CSS code used to do the slides' transition.

	- timeEffect (default value : 800)
		- Type : integer
		- Description : Time of the slide effect in milliseconds.

	- loop (default value : true)
		- Type : boolean
		- Description : If set to true, the first slide will be display after the last slide.

	- onlySlideOnThisAnchor (default value : false)
		- Type : string or false
		- Description :  If different of false, the user actions on the slider will be only execute on the anchor setted.

	- enablePlayPause (default value : false)
		- Type : boolean
		- Description : If set to true, the slider will support play and pause actions.

	If enablePlayPause is set to false, the following parameters are not use. 

	- timeBetweenTwoSlides (default value : 3000)
		- Type : integer
		- Description : Time between two slides launching in milliseconds.

	- autoPlay (default value : true)
		- Type : boolean
		- Description : If set to true, the slider will be automatically play.

	- playButtonSelector (default value : "#playButton")
		- Type : jQuery selector
		- Description : Play button selector

	- pauseButtonSelector : "#pauseButton"
		- Type : jQuery selector
		- Description : Pause button selector


$(sliderSelector).destroySlider();
----------------------------------

###Description

Destroy the slider.

###Variables

- sliderSelector :
	- Type : jQuery selector
	- Description : Slider selector
