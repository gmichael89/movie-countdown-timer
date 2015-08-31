(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
MovieTimer = function (){

    this.settings = {
        canvasHeight: 500,
        canvasWidth: 700,
        countdownStartTime: 10,
    };

    this.refs = {
        canvas: 'MovieTimer'
    };

    this.endAngle = 0;

    // fabric.Object.prototype.originX = 'center';
    // fabric.Object.prototype.originY = 'center';

    this._createCanvas();
    this._setCommonPoints();
    this._drawGuidelines();
    this._createCountdownText();
    this._createArc();
};

MovieTimer.prototype.countdown = function () {
    this.animateArc();
};

MovieTimer.prototype._setCommonPoints = function () {
    this.centerX = (this.canvas.getWidth() / 2);
    this.centerY = (this.canvas.getHeight() / 2);
};

MovieTimer.prototype.animateArc = function () {
    var self = this;
    fabric.util.animate({
        startValue: 0,
        endValue: 2 * Math.PI,
        duration: 1000,
        onChange: function(value){
            self.endAngle = value;
            self.canvas.renderAll();
        },
        onComplete: function(){
            if (self.settings.countdownStartTime > 0) {
                --self.settings.countdownStartTime;
                self.countdownText.setText((self.settings.countdownStartTime).toString());
                self.animateArc();
            }
        }
    });

};

MovieTimer.prototype._createCanvas = function () {
    this.canvas = new fabric.Canvas(this.refs.canvas, {
        width: this.settings.canvasWidth,
        height: this.settings.canvasHeight,
        selection: false
    });

    this.canvas.calcOffset();
};

MovieTimer.prototype._createCountdownText = function () {
    this.countdownText = new fabric.Text((this.settings.countdownStartTime).toString(), {
        originX: 'center',
        originY: 'center',
        left: (this.canvas.getWidth() / 2),
        top: (this.canvas.getHeight() / 2)
    });

    this.canvas.add(this.countdownText);
};

MovieTimer.prototype._drawGuidelines = function () {

    var verticalLine = new fabric.Line([
        this.centerX, 0, this.centerX, this.canvas.getHeight()
    ], {
        stroke: '#000',
        selectable: false
    });

    var horizontalLine = new fabric.Line([
        0, this.centerY, this.canvas.getWidth(), this.centerY
    ], {
        stroke: '#000',
        selectable: false
    });

    this.canvas.add(verticalLine, horizontalLine);
};

MovieTimer.prototype._createArc = function () {
    var self = this;

    this.arc = new fabric.Circle({
        radius: (this.canvas.getWidth() * 2),
        left: (this.canvas.getWidth() / 2),
        top: (this.canvas.getHeight() / 2),
        originX: 'center',
        originY: 'center',
        angle: -90,
        fill: 'brown',
        opacity: 0.4,
        clipTo: function(context){
            // the center is relative to the object - hence 0, 0 instead of the 100, 100
            context.moveTo(0, 0);

            // the endAngle is the global variable we animate from 0 to 360 degrees (2 * PI)
            context.arc(0, 0, (self.canvas.getWidth() * 2), 0, self.endAngle);
        }
    });

    this.canvas.add(this.arc);
};

module.exports = MovieTimer;

},{}]},{},[1]);
