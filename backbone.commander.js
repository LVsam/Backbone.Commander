(function() {
	/*
	* Backbone.Commander
	* Maps key combinations to event names, which you can use with the event aggregator of your choice.
	*
	* - eventMap (optional): {
	*		"ctrl+y": "event:name"
	*	}
	* - eventAggregator (optional): {
	*		"method": App.vent, (Event aggregator, default = App.vent)
	*		"trigger": "trigger" (Method that fires event, default = "trigger")
	*	}
	*/

	var Commander;

	Commander = function(eventMap, eventAggregator){
		_.bindAll(this);

		this.eventMap = eventMap ? eventMap : {};
		this.eventAggregator = eventAggregator ? eventAggregator['method'] : App.vent;
		this.trigger = eventAggregator ? eventAggregator['trigger'] : "trigger";
		this.downKeys = [];

		this.initListeners();
	};

	_.extend(Commander.prototype, {
		initListeners: function(){
			this.addEvent(document, 'keydown', _.bind(function(e){this.dispatch(e);}, this));
			this.addEvent(document, 'keyup', _.bind(function(e){this.clearDownKeys();}, this));
		},
		//Method to manually add a new key command
		addCommand: function(command, eventName){
			if(command && eventName && !this.eventMap.hasOwnProperty(command)){
				return this.eventMap[command] = eventName;
			}

			throw new Error("A key command and eventName are required.")
		},
		//Method to manually remove an existing key command
		removeCommand: function(command){
			if(command && this.eventMap.hasOwnProperty(command)){
				delete this.eventMap[command];
			}

			throw new Error("A command was not supplied or did not exist on the eventMap")
		},
		//Clears the array of current keys pressed
		clearDownKeys: function(){
			return this.downKeys = [];
		},
		//Normalizes key codes to strings
		//Checks if events are listening to the current keys being pressed
		dispatch: function(e){
			var keyMap = _.invert(this.keyMap), code = e.which, keyString, key;

			if(!_.isUndefined(keyMap[code.toString()])){
				key = keyMap[code.toString()];
			}else{
				key = String.fromCharCode(code).toLowerCase();
			}

			this.downKeys.push(key);

			keyString = this.downKeys.join("+");

			if(!_.isUndefined(this.eventMap[keyString])){
				return this.eventAggregator[this.trigger](this.eventMap[keyString]);
			}

			return false;
		},
		//Normalizes support for adding an event listener (IE 5-8)
		addEvent: function(object, event, method){
		    if (object.addEventListener){
		      object.addEventListener(event, method, false);
		    }else if(object.attachEvent){
		      object.attachEvent('on'+event, function(){ method(window.event) });
		    }
		},
		//Map of special keys
		keyMap: {
	      'backspace': 8, 
	      'tab': 9, 
	      'clear': 12,
	      'enter': 13, 
	      'return': 13,
	      'esc': 27, 
	      'escape': 27, 
	      'space': 32,
	      'left': 37, 
	      'up': 38,
	      'right': 39, 
	      'down': 40,
	      'del': 46, 
	      'delete': 46,
	      'home': 36, 
	      'end': 35,
	      'pageup': 33, 
	      'pagedown': 34,
	      'shift': 16,
	      'alt': 18,
	      'ctrl': 17,
	      'meta': 91
		}
	});

	Backbone.Commander = Commander;

}).call(this);