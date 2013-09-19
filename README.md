Backbone.Commander
==================

Maps key combinations to event names used by the event aggregator of your choice.

#How to Use

By default, Backbone.Commander uses App.vent with the method "trigger" for firing events.

######When your App is initialized
```javascript

var eventMap = {
  "ctrl+k": "eventName:one",
  "ctrl+alt+y": "eventName:two",
  "shift+up": "eventName:three"
};

new Backbone.Commander(eventMap);
```

######Within your views & layouts
```javascript
this.bindTo(App.vent, "eventName:one", this.function, this);
```

######With a custom event aggregator
```javascript

var vent = _.clone(Backbone.Events),
    eventMap = {
      "ctrl+k": "eventName:one",
      "ctrl+alt+y": "eventName:two",
      "shift+up": "eventName:three"
    };

new Backbone.Commander(eventMap, {
  method: vent,
  trigger: "trigger"
});
```
