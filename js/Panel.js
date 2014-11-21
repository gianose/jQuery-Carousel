/**
 * @author Gregory Rose <gregianrose@gmail.com>
 */

/**
 * The action object provide the necessary offsets and offset values in order to animate the panel HTML elements 
 * @typedef {Object} action
 * @property {string} position - The definitive offset of the panel HTML element.
 * @property {string} center - The offset necessary in order to center the panel HTML element.
 * @property {number} visible - The offset value needed in order to make the panel HTML element visible. 
 * @property {number} hidden - The offset value needed in order to make the panel HTML element hidden.
 */

/**
 * The toggles object contains all the necessary parameters to instantiate the panel object's corrsponding toggles objects
 * @typedef {Object} toggles
 * @property {Toggle} element - Stores an instance of Toggle. 
 * @property {action} action - Provides CSS classes and a task that will be activatied via event listeners.
 * @property {description} description - Provide the HTML element ID, and assigned type of the Toggle instance.
 */

/**
 * @class The Panel class is a representation of container for buttons and all the corresponding attributes.
 * @this {Panel}
 * @type @call;Panel
 */
var Panel = (function Panel(){
    /**
     * Creates an instance of Panel;
     * @constructor
     * @this {Panel}
     * @param {string} id - The ID of the HTML element 
     * @param {action} action - Provide the necessary offsets and offset values in order to animate the panel HTML elements
     * @param {toggles} toggles name description
     */ 
    function Panel(id, action, toggles){
        /** @private */ this.id = jQuery.type(id) === 'string' ? id : null; 
        /** @private */ this.action = jQuery.type(action) === 'object' ? action : null;
        /** @private */ this.toggles = jQuery.type(toggles) === 'array' ? toggles : null;
        /** @private */ this.$element = validate(this.id);

        /** Initialize centerPanel */ this.centerPanel(this.action.center);
        /** Initialize event listener on setting HTML element */ this.attachEvent().addToggles();
        /** Instantiate toggles */
    
        /** Initialize event listener resize on window */ 
        $( window ).resize(function(){ this.centerPanel(this.action.center); }.bind(this));
    }
    
    /**
     * @static
     * @property {array} eventType - The default event types the event listerner listens for.
     * @property {object} setting - A representation of the HTML object setting.
     * @property {string} duration -  The speed at which transition occures.
     * @property {string} fadeIn - Visible opacity
     * @property {string} fadeOut - Invisible opacity
     */
    Panel.options = { eventType: ['mouseenter', 'mouseleave'], setting: validate('#setting'), duration: '300', fadeIn: '0.7', fadeOut: '0' };
    
    /**
     * Attaches an event listener to the setting HTML element which in turns animates the panel objects.
     * @this {Panel}
     */
    Panel.prototype.attachEvent = function(){
        Panel.options.setting.on({
            mouseenter: function(){ 
                if(this.action.position === 'top'){
                    this.$element.animate({ top: this.action.visible, opacity: Panel.options.fadeIn}, Panel.options.duration);
                } else if(this.action.position === 'left'){
                    this.$element.animate({ left: this.action.visible, opacity: Panel.options.fadeIn}, Panel.options.duration);
                } else if(this.action.position === 'right'){
                    this.$element.animate({ right: this.action.visible, opacity: Panel.options.fadeIn}, Panel.options.duration);
                }
            }.bind(this),
            mouseleave: function(){ 
                if(this.action.position === 'top'){
                    this.$element.animate({ top: this.action.hidden, opacity: Panel.options.fadeOut}, Panel.options.duration);
                } else if(this.action.position === 'left'){
                    this.$element.animate({ left: this.action.hidden, opacity: Panel.options.fadeOut}, Panel.options.duration);
                } else if(this.action.position === 'right'){
                    this.$element.animate({ right: this.action.hidden, opacity: Panel.options.fadeOut}, Panel.options.duration);
                }
            }.bind(this)
        });
        
        return this;
    };

    /**
     * When called executes the event that corresponds with the event type parameter.
     * @this {Panel}
     * @param {string} event
     */
    Panel.prototype.fireEvent = function(event){
        var contains = function(element){
            if(element === event){ Panel.options.setting.trigger(event); };
        }.bind(this);
    
        Panel.options.eventType.forEach(contains);
        
        return this;
    };

    /**
     * When called releases the event that corresponds with the event type parameter.
     * @this {Panel}
     * @param {string} event
     */
    Panel.prototype.releaseEvent = function(event){
        var contains = function(element) {
            if(element === event){ Panel.options.setting.off(event); }
        }.bind(this);
    
        Panel.options.eventType.forEach(contains);
        
        return this;
    };

    /**
     * Determines the desired offset of the button box in order for it to appear centered.
     * @this {Panel}
     * @param {string} post
     */
    Panel.prototype.centerPanel = function(post){
        var setOffSet = function(post, offSet){ this.$element.css(post, offSet); }.bind(this);
    
        if (post === 'left'){
            setOffSet(post, ((parseInt(Panel.options.setting.css('width'))/2) - (parseInt(this.$element.css('width'))/2)));
        } else if (post === 'top'){
            setOffSet(post, ((parseInt(Panel.options.setting.css('height'))/2) - (parseInt(this.$element.css('height'))/2)));
        }
    };
   
   /**
    * Instantiates the corresponding Toggles instances for the Panel.
    * @this {Panel}
    */
   Panel.prototype.addToggles = function(){
       $.each(this.toggles, function(index, value){
           value.element = new Toggle(value.description, value.action);
           if(value.description.id === '#toggle1'){ value.element.clickEvents(true); }
       }.bind(this));
       
       return this;
   };
   
   return Panel;
})();