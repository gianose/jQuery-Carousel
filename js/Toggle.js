/** 
 * @author Gregory Rose <gregianrose@gmail.com>
 * @created 2014-05-27
 */

/**
 * The description object provide the HTML element ID, and assigned type of the HTML element that will act as a toggle.
 * @typedef {Object} description
 * @property {string} id - The ID of the HTML element.
 * @property {boolean} direct - Boolean variable used to determine if the Toggle object is direct || indirect.
 */

/**
 * The action object provides css classes that the HTML element will take on based on different events as well as a task
 * to be carried out if the click event occures.
 * @typedef {Object} action
 * @property {string} active - CSS class used to visibily indicate that the HTML toggle element is active.
 * @property {string} select - CSS class used to visibily indicate that the HTML toggle element has been selected.
 * @property {null} task - Used by the caller to assign a task for the click event to activate.
 */

/**
 * @class The Toggle class is a representation of an HTML element that is to acts a button. 
 * @this {Toggle}
 * @type @call;Toggle
 */

var Toggle = (function Toggle(){
    
    /**
     * Creates an instance of Toggle
     * @constructor
     * @this {Toggle}
     * @param {description} description - Provide the HTML element ID, and assigned type of the Toggle instance.
     * @param {action} action - Provides CSS classes and a task that will be activatied via event listeners.
     */
    function Toggle(description, action){ 
        /** @private */ this.queue = new Queue();
        /** @private */ this.action = jQuery.type(description) === 'object' ? action : null;
        /** @private */ this.description = jQuery.type(description) === 'object' ? description : null;
        /** @private */ this.element = jQuery.type(this.description.id) === 'string' ? validate(this.description.id) : null;
         
        /** Initialize event listener on Toggle instance */ 
        this.attachEvents();
    
        return this;
    }
    
    /**
     * @this {Toggle}
     * @static
     * @property {string} duration - A string or number determining how long the animation will run. 
     * @property {string} easing - A string indicating which easing function to use for the transition.
     */
    Toggle.options = { duration: '2', easing: 'easeOutQuart'};
    
    /**
     * @this {Toggle}
     * @static
     * @property {Toggle} $liveToggle - The Toggle instance that is considered live.
     * @property {function} set - Set the object variable liveToggle to parameter unstance
     * @property {function} get - Return liveToggle to the caller.
     * @property {function} null - Returns whether or nut liveToggle is null.
     * @property {function} clear - Clears and set the object variable liveToggle to null. 
     */
    Toggle.liveToggle = {
        $liveToggle: null,
        
        $set: function(instance){ this.$liveToggle = instance; return this; },
        
        $get: function(){ return this.$liveToggle; },
        
        $nil: function(){ return this.$liveToggle === null ? true : false;},
        
        $clear: function(){ delete this.$liveToggle; this.$liveToggle = null; return this; }
    };
    
     /**
     * Attaches an event listener to the instance of Toggle.
     * @this {Toggle}
     */
    Toggle.prototype.attachEvents = function(){
        this.element.on({ 
            mouseenter: function(){ 
                this.element.addClass(this.action.active, Toggle.options.duration, Toggle.options.easing);
            }.bind(this),
            mouseleave: function(){
                this.element.removeClass(this.action.active, Toggle.options.duration, Toggle.options.easing); 
                if(this.element.hasClass(this.action.select)){
                    this.element.removeClass(this.action.select, Toggle.options.duration, Toggle.options.easing);
                }
                return false;
            }.bind(this),
            click: function(){  
                (this.description.direct) ? this.clickEvents() : this.action.task();
            }.bind(this)
        });
    
        return this;
    };
    
    /**
     * The series of event that occure upon click event.
     * @this {Toggle}
     * @param {boolean} nonClick - used to determing if the clickEvent was called by user initiated click event or a automated click event.
     */
    Toggle.prototype.clickEvents = function(nonClick){
        this.queue
            .queue(
            function(){
                if(Toggle.liveToggle.$nil()){ 
                    Toggle.liveToggle.$set(this); 
                } else {
                    Toggle.liveToggle.$get().attachEvents(); 
                    Toggle.liveToggle.$get().element.trigger("mouseleave"); 
                    Toggle.liveToggle.$clear().$set(this);
                }
            }.bind(this),
            function(){ this.element.off(); this.element.addClass(this.action.select, Toggle.options.duration, Toggle.options.easing); }.bind(this),
            function(){
                !nonClick ? this.action.task().ticker.clearTicker() : this.action.task();
            }.bind(this)
        ).fire();
        
        return this;
    };

    
    return Toggle;
})();