(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
MoveTimer = function(){
        var refs = {
            canvas: 'MovieTimer'
        };

        var canvas = {
            height: 300,
            width: 200
        };

        this.init = function(){
            var canvas = new fabric.Canvas(refs.canvas);

            var rect = new fabric.Rect({
                top : 100,
                left : 100,
                width : 60,
                height : 70,
                fill : 'red'
            });

            canvas.add(rect);

        };

        return this.init();
};

module.exports = MoveTimer;

},{}]},{},[1]);
