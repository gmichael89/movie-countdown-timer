(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
MovieTimer = function (){

    this.refs = {
        canvas: 'MovieTimer'
    };

    this.canvasProps = {
        width: 700,
        height: 500
    };

    this._createCanvas();
    this._createArc();
};

MovieTimer.prototype.countdown = function () {
    //this.animateArc();
};

MovieTimer.prototype.animateArc = function () {
    this.arc.animate('angle', 360, {
        duration: 1000,
        //onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
            //animateBtn.disabled = false;
        },
        //easing: fabric.util.ease[document.getElementById('easing').value]
    });
};

MovieTimer.prototype._createCanvas = function () {
    this.canvas = new fabric.Canvas(this.refs.canvas, {
        width: this.canvasProps.width,
        height: this.canvasProps.height,
        selection: false
    });

    this.canvas.calcOffset();
};

MovieTimer.prototype._createArc = function () {

    this.arc = new fabric.Circle({
        //selectable: false,
        radius: (this.canvas.getWidth() / 3),
        left: (this.canvas.getWidth() / 2),
        top: (this.canvas.getHeight() / 2),
        originX: 'center',
        originY: 'center',
        angle: -90,
        startAngle: 90,// default: 0
        //rotatingPointOffset: 0,
        //endAngle: Math.Pi,
        stroke: '#000',
        strokeWidth: 3,
        fill: ''
    });

    this.canvas.add(this.arc);
};

module.exports = MovieTimer;

},{}]},{},[1]);
