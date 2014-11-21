/* 
 * @author Gregory Rose <gregianrose@gmail.com>
 * @created 06/09/2014
 */

/**
 * The slide object, consists of the ID of the HTML element representation of a Slide and the desired opacity.
 * @typedef {Object} slide
 * @property {string} id - The ID of the HTML element 
 * @property {number} opacity - The desired opacity
 * @param {string} id - ID of the HTML element 
 * @param {number} opacity -  The desired opacity
 */

function $slide(id, opacity){ this.id = id; this.opacity = opacity; }

/**
 * The slide# object, consists of slide objects/a slide object and a null varible element, both will be utilize to instantiate a instance of Slide.
 * @typedef {slide#}
 * @property {slide} slide - Consists of the ID of the HTML element representation of a Slide and the desired opacity.
 * @property {Slide} element - will be utilized to store an instance of Toggle.
 * @param {string} id - ID of the HTML element 
 * @param {number} opacity -  The desired opacity 
 */

function slide(id, opacity){ this.slide = new $slide(id, opacity); this.element = null; }

/**
 * Used to by a Carousel object to instantiate mutliple instances of Slide.
 * @typedef {slides} 
 * @property {string} id - use to identify the slides object.
 * @property {slide#} slide# - Consists of slide objects/a slide object and null varible element; used to instantiate a instance of Slide.
 */
var slides = { id: 'slides', 
               slide1: new slide('#slide1', 1), 
               slide2: new slide('#slide2', 0), 
               slide3: new slide('#slide3', 0), 
               slide4: new slide('#slide4', 0) 
             };

/**
 * The action object provides css classes that the HTML element will take on based on different events as well as a task
 * to be carried out if the click event occures.
 * @typedef {Object} action
 * @property {string} active - CSS class used to visibily indicate that the HTML toggle element is active.
 * @property {string} select - CSS class used to visibily indicate that the HTML toggle element has been selected.
 * @property {null} task - Used by the caller to assign a task for the click event to activate.
 */

function action(){ this.active = 'active'; this.select = 'select'; this.task = null; }

/**
 * The description object provide the HTML element ID, and assigned type of the HTML element that will act as a toggle.
 * @typedef {Object} description
 * @property {string} id - The ID of the HTML element.
 * @property {boolean} direct - Boolean variable used to determine if the Toggle object is direct || indirect.
 * @param {string} id
 * @param {boolean} direct
 */

function panel_desc(id, direct){ this.id = id; this.direct = direct; }

/**
 * The toggle object contains all the necessary parameters to instantiate an instance of a Toggle object
 * @typedef {Object} toggle
 * @property {action} action - Provides CSS classes and a task that will be activatied via event listeners.
 * @property {description} description - Provide the HTML element ID, and assigned type of the Toggle instance.
 * @property {Toggle} element - Stores an instance of Toggle.
 * @param {string} id
 * @param {boolean} direct 
 */

function panel_toggle(id, direct){ this.description = new panel_desc(id, direct); this.action = new action(); this.element = null; }

/**
 * The toggles object contains a toggle object/toggle objects.
 * @typedef {Object} toggles
 * @property {toggle} toggle - Contains all the necessary parameters to instantiate an instance of a Toggle object
 */

var panel1_toggles = [ new panel_toggle('#toggle1', true), 
                       new panel_toggle('#toggle2', true),
                       new panel_toggle('#toggle3', true), 
                       new panel_toggle('#toggle4', true) ];
var panel2_toggles = [ new panel_toggle('#toggleBack', false) ];
var panel3_toggles = [ new panel_toggle('#toggleForth', false) ];

/**
 * The action object provide the necessary offsets and offset values in order to animate the panel HTML elements 
 * @typedef {Object} action
 * @property {string} position - The definitive offset of the panel HTML element.
 * @property {string} center - The offset necessary in order to center the panel HTML element.
 * @property {number} visible - The offset value needed in order to make the panel HTML element visible. 
 * @property {number} hidden - The offset value needed in order to make the panel HTML element hidden.
 */

var panel1_action = { position: 'top', visible: '450', hidden: '485', center: 'left' };
var panel2_action = { position: 'left', visible: '30', hidden: '-5', center: 'top' };
var panel3_action = { position: 'right', visible: '30', hidden: '-5', center: 'top' };

/**
 * The panel# object contains all the necessary objects and variable to instantiate an instance of Panel.
 * @typedef {Object} panel#
 * @property {string} id - The string used to identify the object.
 * @property {Panel} element - Stores the corresponding instance of Panel.
 * @property {action} action - Provide the necessary offsets and offset values.
 * @property {toggles} toggles - contains a toggle object/toggle objects.
 */

var panel1 = { id: '#panel1', action: panel1_action, toggles: panel1_toggles, element: null };
var panel2 = { id: '#panel2', action: panel2_action, toggles: panel2_toggles, element: null };
var panel3 = { id: '#panel3', action: panel3_action, toggles: panel3_toggles, element: null };

/**
 * The panels object contains all the panels that are neccessary in order to instanciate the corresponding HTML elements.
 * @typedef {Object} panels
 * @property {string} id - The string used to identify the obect
 * @property {panel#} panel# - contains all the necessary objects and variable to instantiate an instance of Panel.
 */

var panels = { id: 'panels', panel1: panel1, panel2: panel2, panel3: panel3 };
 
var carousel = { id: '#carousel', sl: slides, pl: panels };

/***/ var jsCarousel = '<script type="text/javascript" src="js/Carousel.js"></script>';
/***/ var jsSlide = '<script type="text/javascript" src="js/Slide.js"></script>';
/***/ var jsToggle = '<script type="text/javascript" src="js/Toggle.js"></script>';
/***/ var jsPanel = '<script type="text/javascript" src="js/Panel.js"></script>';

/**
 * Validate verifies that the HTML element beinging referenced is valid.
 * @param {String} id
 * @returns {unresolved}
 */
function validate(id){ if($(id) !== null){ return $(id); } else { jQuery.error('The element does not exist!'); } }

$( document ).ready(function() {
    var mainEvents = new Queue()
        .queue(function(){$('head').append(jsCarousel).append(jsSlide).append(jsToggle).append(jsPanel);},
               function(){ var $carousel = new Carousel(carousel);}
              )
        .fire();
});

