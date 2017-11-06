import extend from 'extend';
// Stylesheets
require('./main.scss');

class MovieTimer {

    isAnimating = false;
    circleCollection = [];
    verticalLinesCollection = [];

    baseConfig = {
        canvasHeight: 500,
        canvasWidth: 700,
        countdownStartTime: 5,
        numberOfJumpingVerticalLines: 10,
    };

    endAngle = 0;

    constructor(userConfig = {}) {

        this.config = extend({}, this.baseConfig, userConfig);

        // if (!this._canModuleInitialise()) {
        //     console.warn(`Element provided does not exist. An element
        //         must be passed along with the config object when initialising
        //         the module.`);
        //         return false;
        // }

        this._createCanvas();
        if (!this.canvas) {
            return;
        }

        this._setFabricObjectDefaults();
        this._setCommonPoints();
        this._drawGuidelines();
        this._drawCircles();
        this._drawVerticalLines();
        this._createCountdownText();
        this._createArc();

        // Begin animation
        this.countdown();

    }

    // _canModuleInitialise() {
    //     let canvasEl = document.querySelector(this.config.canvasElement);
    //
    //     console.log(canvasEl);
    //
    //     return canvasEl;
    // }

    _setFabricObjectDefaults() {

        fabric.Object.prototype.originX = 'center';
        fabric.Object.prototype.originY = 'center';

    }

    countdown () {

        this.isAnimating = true;

        this._animateArc();
        //this._animateCircles();
        this._animateVerticalLines();
    };

    _getAbsoluteCenterValues() {

        return {
            left: Math.ceil(this.canvas.getWidth() / 2),
            top: Math.ceil(this.canvas.getHeight() / 2)
        }

    }

    _createCanvas() {

        try {
            this.canvas = new fabric.StaticCanvas(this.config.canvasElement, {
                width: this.config.canvasWidth,
                height: this.config.canvasHeight
            });

            // this.canvas.on('*', (options) => {
            //     console.log(options);
            // });

            this.canvas.calcOffset();

        }
        catch(e) {

            console.warn(`Canvas element not created. ${e}`);

        }
    };

    _setCommonPoints () {

        this.centerX = Math.ceil(this.canvas.getWidth() / 2);
        this.centerY = Math.ceil(this.canvas.getHeight() / 2);

    };

    _resetCanvas () {

        this.countdownText.setVisible(true);
        this.isAnimating = false;

    };

    _animateArc () {

        fabric.util.animate({
            startValue: 0,
            endValue: (2 * Math.PI),
            duration: 1000,
            onChange: (value) => {

                this.endAngle = value;
                this.canvas.renderAll();

            },
            onComplete: () => {

                if (this.config.countdownStartTime > 0) {
                    --this.config.countdownStartTime;
                    this.countdownText.fire('decrement-time', {
                        time: this.config.countdownStartTime
                    });
                    this._animateArc();
                }
                else {
                    this._resetCanvas();
                }
            }
        });
    };

    // _animateCircles () {
    //     var self = this;
    //     this.circleCollection.forEach(function(circle){
    //         // debugger;
    //         var ranNum = (Math.floor(Math.random() * 11) - 5);
    //         var direction = (Math.round(Math.random())) ? 'left' : 'top';
    //         // debugger;
    //         console.log(direction, self['center' + (direction == 'left' ? 'X' : 'Y')] - ranNum);
    //
    //         circle.animate(direction, self['center' + (direction == 'left' ? 'X' : 'Y')] - ranNum, {
    //             duration: 100,
    //             onChange: self.canvas.renderAll.bind(self.canvas),
    //             onComplete: function onComplete() {
    //                 var innerRanNum = (Math.floor(Math.random() * 11) - 5);
    //                 var innerDirection = (Math.round(Math.random())) ? 'left' : 'top';
    //
    //                 console.log(direction, self['center' + (direction == 'left' ? 'X' : 'Y')] - ranNum);
    //
    //                 circle.animate(innerDirection, self['center' + (innerDirection == 'left' ? 'X' : 'Y')] - innerRanNum, {
    //                     duration: 100,
    //                     onComplete: onComplete
    //                 });
    //             }
    //         });
    //     });
    // };

    _animateVerticalLines () {
        var self = this;
        this.verticalLinesCollection.forEach((line) => {

            line.animate(this._getVerticalLineAnimationSettings(), {
                duration: 150,
                onChange: this.canvas.renderAll.bind(this.canvas),
                onComplete: function onComplete() {

                    if (!self.isAnimating) {

                        return;
                    }

                    line.animate(self._getVerticalLineAnimationSettings(), {
                        duration: 150,
                        onComplete: this.onComplete
                    });
                }
            });

            line.on('object:moving', (options) => {
                console.log(options);
            });
        });
    };

    _getVerticalLineAnimationSettings() {

        return {
            left:  Math.floor(Math.random() * this.canvas.getWidth()),
            opacity: (Math.floor(Math.random() *  (1 - 0.1 + 1)) + 0.1)
        }

    }

    _createCountdownText () {

        if (this.config.countdownStartTime > 500) {
            console.warn('You have chosen a large value.')
        }

        this.countdownText = new fabric.Text(
            this.config.countdownStartTime.toString(),
            extend({}, this._getAbsoluteCenterValues(), {
                //visible: true,
                fontSize: 100
            })
        );

        this.countdownText.on('decrement-time', (event) => {
            this.countdownText.setText((event.time).toString());
        }, this);

        this.canvas.add(this.countdownText);
    };

    _drawGuidelines () {

        var verticalLine = new fabric.Line(
            [
                this.centerX, 0, this.centerX, this.canvas.getHeight()
            ],
            {
                stroke: '#000'
            });

        var horizontalLine = new fabric.Line(
            [
                0, this.centerY, this.canvas.getWidth(), this.centerY
            ], {
                stroke: '#000'
            });

        this.canvas.add(verticalLine, horizontalLine);
    };

    _drawVerticalLines () {

        for (var i = 0, len = this.config.numberOfJumpingVerticalLines; i < len; i++){

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

    _drawCircles () {

        var circleProps = extend({}, this._getAbsoluteCenterValues(), {
            stroke: '#000',
            strokeWidth: 3,
            fill: 'rgba(0,0,0,0)',
            angle: -90,
            opacity: 0.5
        });

        var outerCircle = new fabric.Circle(extend({
            radius: (this.canvas.getWidth() / 3) - 10,
        }, circleProps));

        var innerCircle = new fabric.Circle(extend({
            radius: (this.canvas.getWidth() / 4) - 10,
        }, circleProps));

        this.circleCollection.push(outerCircle, innerCircle);

        this.canvas.add(outerCircle, innerCircle);
    };

    _createArc () {
        var self = this;
        var arcRadius = Math.ceil(self.canvas.getWidth() * 0.7);

        this.arc = new fabric.Circle(extend({}, this._getAbsoluteCenterValues(), {
            evented: false,
            radius: arcRadius,
            angle: -90,
            fill: 'brown',
            opacity: 0.4,
            clipTo: (context) => {

                // the center is relative to the object - hence 0, 0 instead of the 100, 100
                context.moveTo(0, 0);

                // the endAngle is the global variable we animate from 0 to 360 degrees (2 * PI)
                context.arc(0, 0, arcRadius, 0, self.endAngle);
            }
        }));

        this.canvas.add(this.arc);
    };

};


window.MovieTimerHolder = new MovieTimer({
    canvasElement: 'MovieTimerPlaceholder',
    countdownStartTime: 5
});
