'use strict';

// https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/

// ------------- the classic extend function

function extend(destination, source) {
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
    return destination;
}
// function extend2(destination, source) { return Object.assign(destination, source); }

var RoundButton = function(radius, label) {
    this.radius = radius;
    this.label = label;
};


//extend(RoundButton.prototype, circleFns);
//extend(RoundButton.prototype, buttonFns);

// ------------- Functional Mixins

// classes
function Vehicle() {}
function House() {}

// mixins
function withLights(color = 'white') {
    this.lightsOn = function() { console.log(`${color} lights on`); };
    this.lightsOff = function() { console.log(`${color} lights off`); };
}

// applying mixins to classes
withLights.call(Vehicle.prototype);
withLights.call(House.prototype, 'red');

// instantiating objects
let car = new Vehicle();
car.lightsOn();

let house = new House();
house.lightsOn();

// also its possible to Object.assign(House.prototype, someMethodsObject)