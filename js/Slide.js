/**
 * @author Gregory Rose <gregianrose@gmail.com>
 */

/**
 * Creates an instance of Slide;
 * @class Representation of a single Slide in a Slide Show and all of it corresponding attributes.
 * @this {Slide}
 * @param {slide} slide - The id of HTML element and the desired opacity .
 */
function Slide(slide){
    /** @private */ this.slide = jQuery.type(slide) === 'object' ? slide : null;
    /** @private */ this.element = jQuery.type(this.slide.id) === "string" ? validate(this.slide.id) : null;
    this.setOpacity();
} 

/**
 * @typedef {Object} options
 * @property {string} duration - The speed at which transition occures 
 * @property {string} fadeOut - Visible opacity
 * @property {string} fadeIn - Invisible opacity 
 * @static 
 */ 
Slide.options = { duration: '1500', fadeOut: '0', fadeIn: '1' };

/**
 * Sets the opacity of the HTML element to the desired opacity. 
 * @this {Slide}
 */
Slide.prototype.setOpacity = function(){
  if(jQuery.type(this.slide.opacity) === 'number'){
    if((this.slide.opacity >= 0) && (this.slide.opacity <= 1)){
        this.element.css({'opacity': this.slide.opacity.toString()});
    }  
  }  
};

/**
 * Return the opacity of the HTML element to the caller. 
 * @this {Slide} 
 * @returns {Slide.prototype@pro;element@call;css}
 */
Slide.prototype.getOpacity = function(){ return this.element.css('opacity'); };

/**
 * Fades the HTML element in. 
 * @this {Slide}
 */
Slide.prototype.fadeIn = function(){ this.element.animate({ opacity: Slide.options.fadeIn }, Slide.options.duration); };

/**
 * Fades the HTML element out. 
 * @this {Slide}
 */
Slide.prototype.fadeOut = function(){ this.element.animate({ opacity: Slide.options.fadeOut }, Slide.options.duration); };

/**
 * Return to caller whether or not the HTML element is currently being animated.
 * @this {Slide}
 * @returns {Slide.prototype@pro;element@call;is}
 */
Slide.prototype.isRunning = function(){ return this.element.is(':animated'); };