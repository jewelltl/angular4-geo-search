
"use strict";

// require all nested models

var models = [

];

var l = models.length;
for (var i = 0; i < l; i++) {
    var model = "./" + models[i];
    require(model)();
}
