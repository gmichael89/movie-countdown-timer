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
