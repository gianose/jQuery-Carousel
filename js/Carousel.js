/**
 * @class The Carousel class is a representation of a slide show and all it's attributes.
 * @this {Carousel}
 * @type @call;Carousel
 */

var Carousel = (function Carousel(){
    
    /**
     * Creates an instance of Carousel 
     * @constructor
     * @this {Carousel}
     * @param {object} args - contains an objec of type Slides and an object of type Panels.
     */
    function Carousel(args){ 
        /** @private */ this.chain = new Queue();
        /** @private */ this.slides = $.type(args.sl) === 'object' ? this.instantiate(args.sl) : null;
        /** @private */ this.panels = $.type(args.pl) === 'object' ? this.instantiate(args.pl) : null;
        /** @private */ this.element = $.type(args.id) === 'string' ? validate(args.id) : null;
        var that = this;
        this.autoDrive();
        
        $( window ).on("blur focus", function(event){
            /** Sets the previousEvent variable to the content of previousEvent stored in the window element. */
            var previousEvent = $(this).data('previousEvent');
            
            if (previousEvent !== event.type) {
                switch (event.type){
                    case "blur":
                        that.ticker.clearTicker(true);
                        break;
                    case "focus":
                        that.autoDrive();
                        break;
                }
            }
            
            /** Attache the previous event type to the window element using the name previousEvent. */
            $(this).data('previousEvent', event.type);
         });
    }
    
    /**
     * The options object is used to store variables that are constant and are utilized through out the class.
     * @this {Carousel}
     * @property {object} toggle - Used to store the element IDs of the toggle objects.
     * @property {boolean} auto - Indicater used to deteremine whether or not the Carousel is on auto drive.
     * @property {number} onPeriod - Indicates the dely between transitions when the mouse enteres the Carousel.
     * @property {number} offPeriod - Indicates the dely between transitions when the mouse exits the Carousel.
     */ 
    Carousel.prototype.options = {
        toggles: {
            progress: this.panels.panel3.toggles[0].description.id,
            reverse:  this.panels.panel2.toggles[0].description.id,
            alpha:    this.panels.panel1.toggles[0].description.id, 
            beta:     this.panels.panel1.toggles[1].description.id,
            gamma:    this.panels.panel1.toggles[2].description.id,
            delta:    this.panels.panel1.toggles[3].description.id
        },
        auto: true,
        onPeriod: 18000,
        offPeriod: 12000
    };
    
    /**
     * Ticker contains a series of variables and function in order to aide in the automation of the Carousel.
     * @this {Carousel}
     * @property {number} $ticker - Utilized in order to initialize setInterval. 
     * @property {function} $objective - Utilized to store the function that will be executed periodically.
     * @property {number} $period - The time dely used by setInterval
     * @property {function} setTicker - Method used to set the object variable $ticker.
     * @property {function} setObjective - Method used to set the object variable $objective.
     * @property {function} clearTicker - Method used in order to reset the periodic calling of $objective.
     */
    Carousel.prototype.ticker = {
      $ticker: null, $objective: null, $period: 12000, 
      
      setTicker: function(period){ 
          this.$period = typeof period === 'number' ? period : this.$period;
          this.$ticker = setInterval( this.$objective, this.$period );
      },
      
      setObjective: function(objective){
          this.$objective = typeof objective === 'function' ? objective : null;
          this.setTicker();
      },
      
      clearTicker: function(period){
          clearInterval(this.$ticker); 
          delete this.$ticker;
          typeof period === 'boolean' && period ? null : this.setTicker(period);
      }
    };
               
    /**
     * Utilized in order to automate the Carousel.
     * @this {Carousel}
     */
    Carousel.prototype.autoDrive = function(){
        this.element.on({
            mouseenter: function(){ this.options.auto = false; this.ticker.clearTicker(this.options.onPeriod); }.bind(this),
            mouseleave: function(){ this.options.auto = true; this.ticker.clearTicker(this.options.offPeriod); }.bind(this) 
        });
        
        drive = function(){
            this.successively(this.options.toggles.progress, true);
        }.bind(this);
        
        this.ticker.setObjective(drive);
    };
    
    /**
     * Utilized in order to assign an action to the task element of a toggle object.
     * @this {Carousel}
     * @param {object} toggles - An object that contains a toggle object or toggle objects.
     */
    Carousel.prototype.delegate = function(toggles){
        $.each(toggles, function(index, value){
            if(value.description.direct){
            	value.action.task = function(){ return this.precession(value.description.id); }.bind(this);
            } else {
                value.action.task = function(){ return this.successively(value.description.id); }.bind(this);
            }
        }.bind(this));
       
        return toggles;
    };
    
    /**
     * Utilized in order to instantiate the instance variables slides and panels.
     * @this {Carousel}
     * @param {object} object - Either an object of type panels or an object of type slides.
     */
    Carousel.prototype.instantiate = function(object){
        if(object.id === 'slides'){
            var slides = $.each(object, function(key, value){ if(key === 'id'){ delete object['id']; } });
            $.each(slides, function(key, value){ value.element = new Slide(value.slide); }.bind(this));
            return slides;
        } else if(object.id === 'panels'){
            var panels = $.each(object, function(key, value){ if(key === 'id'){ delete object['id']; } });
            $.each(panels, function(key, value){ value.element = new Panel(value.id, value.action, this.delegate(value.toggles)); }.bind(this));
            return panels; 
        }
        
    };
   
    /**
     * Utilized in order to transition through each slide one by one.
     * @this {Carousel}
     * @param {string} id - The id of the toggle element, to be assigned the successive action.
     * @param {boolean} nonClick - Indicates whether or not the successive action was called by the autoDrive method or by a click event.
     */
    Carousel.prototype.successively = function(id, nonClick){
        nonClick = typeof nonClick !== 'undefined' ? nonClick : false;
        
        switch(id){
            case this.options.toggles.reverse:
                if(parseInt(this.slides.slide1.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[3].element.clickEvents(nonClick);
                }else if(parseInt(this.slides.slide2.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[0].element.clickEvents(nonClick);
                }else if(parseInt(this.slides.slide3.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[1].element.clickEvents(nonClick);
                }else if(parseInt(this.slides.slide4.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[2].element.clickEvents(nonClick);
                }
                break;
            case this.options.toggles.progress:
                if(parseInt(this.slides.slide1.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[1].element.clickEvents(nonClick);
                }else if(parseInt(this.slides.slide2.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[2].element.clickEvents(nonClick);
                }else if(parseInt(this.slides.slide3.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[3].element.clickEvents(nonClick);
                }else if(parseInt(this.slides.slide4.element.getOpacity(), 10) === 1){
                    this.panels.panel1.toggles[0].element.clickEvents(nonClick);
                }
                break;
            default:
        }
        return this;
    };
    
    /**
     * @this {Carousel}
     * @param {string} id - The id of the direct toggle element.
     */
    Carousel.prototype.precession = function(id) {
    	if (!this.inTransit()){
            switch(id){
                case this.options.toggles.alpha:
                    this.transition(this.slides.slide1.element, this.slides.slide2.element, this.slides.slide3.element, this.slides.slide4.element);
                    break;
                case this.options.toggles.beta:
                    this.transition(this.slides.slide2.element, this.slides.slide1.element, this.slides.slide3.element, this.slides.slide4.element);
                    break;
                case this.options.toggles.gamma:
                    this.transition(this.slides.slide3.element, this.slides.slide1.element, this.slides.slide2.element, this.slides.slide4.element);
                    break;
                case this.options.toggles.delta:
                    this.transition(this.slides.slide4.element, this.slides.slide1.element, this.slides.slide2.element, this.slides.slide3.element);
                    break;
                default:
            }
        }
        return this;
    };
    
    /**
     * Utilized in order to determine which object of type slide will be faded out. 
     * @this {Carousel}
     * @param {object} aim - An object of type slide, which represents the slide to be faded in.
     * @param {object} prospect1 - An object of type slide, which represents the possible slide to faded out
     * @param {object} prospect2 - An object of type slide, which represents the possible slide to faded out
     * @param {object} prospect3 - An object of type slide, which represents the possible slide to faded out
     */
    Carousel.prototype.transition = function(aim, prospect1,  prospect2,  prospect3){
    	if(parseInt(aim.getOpacity(), 10) === 0 && parseInt(prospect1.getOpacity(), 10) === 1){
            this.agenda(aim, prospect1);
        } else if(parseInt(aim.getOpacity(), 10) === 0 && parseInt(prospect2.getOpacity(), 10) === 1){
            this.agenda(aim, prospect2);
        } else if(parseInt(aim.getOpacity(), 10) === 0 && parseInt(prospect3.getOpacity(), 10) === 1){
            this.agenda(aim, prospect3);
        }
        return this;
    };
    
    /**
     * Utilized to transition from one slide to another. 
     * @this {Carousel}
     * @param {object} aim - An object of type slide, which represents the slide to be faded in.
     * @param {object} prospect - An object of type slide, which represent the slide to be faded out.
     */
    Carousel.prototype.agenda = function(aim, prospect){
    	this.chain.queue(
    		function(){ if (!this.options.auto){ this.firePanelEvent('mouseleave'); } }.bind(this),
    		function(){ this.releasePanelEvent('mouseenter'); }.bind(this),
    		function(){ this.releasePanelEvent('mouseleave'); }.bind(this),
    		function(){ aim.fadeIn(); },
    		function(){ prospect.fadeOut(); },
    		function(){
    			var doReattachEvent = function(){
    				if (!this.inTransit()){
    					this.reattachPanelEvent();
    					if(!this.options.auto){ this.firePanelEvent('mouseenter'); }
    					clearInterval(clock);
    				}
    			}.bind(this);
    			
    			var clock = setInterval(function(){ doReattachEvent(); }, 100);
    		}.bind(this)
    	).fire(100);
        return this;
    };
    
    /**
     * Executes the indicated the event for all objects of type Panel.
     * @this {Carousel}
     * @param {string} eventType - Event in witch to execute.
     */
    Carousel.prototype.firePanelEvent = function(eventType){
        $.each(this.panels, function(key, value){
            value.element.fireEvent(eventType); 
            return this;
        });
    };
    
    /**
     * Releases the indicated the event for all objects of type Panel.
     * @this {Carousel}
     * @param {string} eventType - Event in witch to release.
     */
    Carousel.prototype.releasePanelEvent = function(eventType){
        $.each(this.panels, function(key, value){ 
            value.element.releaseEvent(eventType);
            return this;
        });
    };
    
    /**
     * Reattaches events to all objects of type Panel.
     * @this {Carousel}
     */
    Carousel.prototype.reattachPanelEvent = function(){
        $.each(this.panels, function(key,value){ value.element.attachEvent(); });
        return this;
    };
    
    /**
     * Returns to the caller whether or not the slide object is in transition.
     * @this {Carousel}
     * @return {Boolean} Returns if te slide object is in transition.
     */
    Carousel.prototype.inTransit = function(){
        $.each(this.slides, function(key, value){
           if(value.element.isRunning()){ return true; }
        });
    };
    
    return Carousel;
})();