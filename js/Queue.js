/* 
 * @author Gregory Rose <gregianrose@gmail.com>
 * @created 2014-06-04
 */

/**
 * @class Used in order to execute a serious of anonymous function one following another.
 * @this {Queue}
 * @type @call;Queue
 */
var Queue = (function Queue(){
    
    /**
     * Creates an instance of Queue
     * @constructor
     * @this {Queue}
     * @return {Queue} return current instance of Queue
     */
    function Queue(){ /** @private */ this.$queue = []; this.$timer; return this; }
   
   /**
     * Assigns the contents of arguments to the instance variable $queue
     * @this {Queue}
     * @return {Queue} return current instance of Queue
     */
    Queue.prototype.queue = function(){ this.$queue = Array.prototype.slice.call(arguments, 0); return this; };
    
    /**
     * Executes the next function in the $queue array.
     * @this {Queue}
     * @return {Queue} return current instance of Queue. 
     */
    Queue.prototype.next = function(){ (this.$queue.length)? this.$queue.shift().apply(this, arguments) : null; return this; };
    
    /**
     * Executes all functions in the instance variable $queue. 
     * @this {Queue}
     * @return {Queue} return current instance of Queue.
     */
    Queue.prototype.fire = function(time){
    	time = typeof time !== 'undefined' ? time : 50;
        var $fire =  function(){(this.$queue.length === 0) ? clearInterval(this.$timer) : this.next();}.bind(this); 
        this.$timer = setInterval(function(){$fire();}, time);
    };
    
    /**
     * Clears the instance variable (array) $queue
     * @this {Queue}
     * @return {Queue} return current instance of Queue. 
     */
    Queue.prototype.clear = function(){ (this.$queue.length)? this.$queue = [] : null; return this; };
    
    return Queue;
})();


