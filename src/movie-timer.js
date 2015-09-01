/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
var extend = function ( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

MovieTimer = function (){
    this.isAnimating = false;
    this.circleCollection = [];
    this.verticalLinesCollection = [];

    this.settings = {
        canvasHeight: 500,
        canvasWidth: 700,
        countdownStartTime: 5,
        numberOfJumpingVerticalLines: 10,
    };

    this.refs = {
        canvas: 'MovieTimer'
    };

    this.endAngle = 0;

    // fabric.Object.prototype.originX = 'center';
    // fabric.Object.prototype.originY = 'center';
    fabric.Object.prototype.selectable = false;

    this._createCanvas();
    this._setCommonPoints();
    this._drawGuidelines();
    this._drawCircles();
    this._drawVerticalLines();
    this._createCountdownText();
    this._createArc();
};

MovieTimer.prototype._createCanvas = function () {
    this.canvas = new fabric.Canvas(this.refs.canvas, {
        width: this.settings.canvasWidth,
        height: this.settings.canvasHeight
    });

    this.canvas.calcOffset();
};

MovieTimer.prototype.countdown = function () {
    this.animateArc();
    // this.animateCircles();
    this.animateVerticalLines();
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
        onChange: function(value) {

            self.endAngle = value;
            self.canvas.renderAll();
        },
        onComplete: function() {

            if (self.settings.countdownStartTime > 0) {
                self.isAnimating = true;
                --self.settings.countdownStartTime;
                self.countdownText.setText((self.settings.countdownStartTime).toString());
                self.animateArc();
            }
            else {
                self.countdownText.setVisible(false);
                self.isAnimating = false;
            }
        }
    });
};

MovieTimer.prototype.animateCircles = function () {
    var self = this;
    this.circleCollection.forEach(function(circle){
        // debugger;
        var ranNum = (Math.floor(Math.random() * 11) - 5);
        var direction = (Math.round(Math.random())) ? 'left' : 'top';
        // debugger;
        console.log(direction, self['center' + (direction == 'left' ? 'X' : 'Y')] - ranNum);

        circle.animate(direction, self['center' + (direction == 'left' ? 'X' : 'Y')] - ranNum, {
            duration: 100,
            onChange: self.canvas.renderAll.bind(self.canvas),
            onComplete: function onComplete() {
                var innerRanNum = (Math.floor(Math.random() * 11) - 5);
                var innerDirection = (Math.round(Math.random())) ? 'left' : 'top';

                console.log(direction, self['center' + (direction == 'left' ? 'X' : 'Y')] - ranNum);

                circle.animate(innerDirection, self['center' + (innerDirection == 'left' ? 'X' : 'Y')] - innerRanNum, {
                    duration: 100,
                    onComplete: onComplete
                });
            }
        });
    });
};

MovieTimer.prototype.animateVerticalLines = function () {
    var self = this;
    this.verticalLinesCollection.forEach(function(line){
        // debugger;
        var ranXPosition = Math.floor(Math.random() * self.canvas.getWidth());

        line.animate({
            'left': ranXPosition
        }, {
            duration: 100,
            abort: function(){
                console.log('stop');
            },
            onChange: self.canvas.renderAll.bind(self.canvas),
            onComplete: function onComplete() {

                if (self.isAnimating){
                    this.abort;
                }

                var innerRanXPosition = Math.floor(Math.random() * self.canvas.getWidth());

                line.animate({
                    'left': innerRanXPosition
                }, {
                    duration: 100,
                    onComplete: onComplete
                });
            }
        });
    });
};

MovieTimer.prototype._createCountdownText = function () {
    this.countdownText = new fabric.Text((this.settings.countdownStartTime).toString(), {
        visible: true,
        fontSize: 100,
        //lineHeight: 19,
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

MovieTimer.prototype._drawVerticalLines = function () {

    for (var i = 0, len = this.settings.numberOfJumpingVerticalLines; i < len; i++){

        var xPosition = Math.floor(Math.random() * this.canvas.getWidth());

        var verticalLine = new fabric.Line([
            xPosition, 0, xPosition, this.canvas.getHeight()
        ], {
            stroke: '#000'
        });

        this.verticalLinesCollection.push(verticalLine);
        this.canvas.add(verticalLine);
    }

};


MovieTimer.prototype._drawCircles = function () {

    var circleProps = {
        left: (this.canvas.getWidth() / 2),
        top: (this.canvas.getHeight() / 2),
        stroke: '#000',
        strokeWidth: 3,
        fill: 'rgba(0,0,0,0)',
        originX: 'center',
        originY: 'center',
        angle: -90,
        opacity: 0.5
    };

    var outerCircle = new fabric.Circle(extend({
        radius: (this.canvas.getWidth() / 3) - 10,
    }, circleProps));

    var innerCircle = new fabric.Circle(extend({
        radius: (this.canvas.getWidth() / 4) - 10,
    }, circleProps));

    this.circleCollection.push(outerCircle, innerCircle);

    this.canvas.add(outerCircle, innerCircle);
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
