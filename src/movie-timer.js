MovieTimer = function (){

    this.refs = {
        canvas: 'MovieTimer'
    };

    this.canvasProps = {
        width: 700,
        height: 500
    };

    fabric.Object.prototype.originX = 'center';
    fabric.Object.prototype.originY = 'center';

    this._createCanvas();
    this._drawGuidelines();
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

MovieTimer.prototype._drawGuidelines = function () {

    var verticalLine = new fabric.Line([
        (this.canvas.getWidth() / 2), 0, (this.canvas.getWidth() / 2), this.canvas.getHeight()
    ], {
            stroke: '#000'
    });

    var horizontalLine = new fabric.Line([
        0, (this.canvas.getHeight() / 2), this.canvas.getWidth(), (this.canvas.getHeight() / 2)
    ], {
        stroke: '#000'
    });

    this.canvas.add(verticalLine, horizontalLine);
};

MovieTimer.prototype._createArc = function () {

    //this.arc = new fabric.Circle({
    //    //selectable: false,
    //    radius: (this.canvas.getWidth() / 3),
    //    left: (this.canvas.getWidth() / 2),
    //    top: (this.canvas.getHeight() / 2),
    //    originX: 'center',
    //    originY: 'center',
    //    angle: -90,
    //    startAngle: 90,// default: 0
    //    //rotatingPointOffset: 0,
    //    //endAngle: Math.Pi,
    //    stroke: '#000',
    //    strokeWidth: 3,
    //    fill: ''
    //});

    //this.canvas.add(this.arc);

//    var path = new fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
//c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
//0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
//c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
//-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
//12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
//-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');
//
//    this.canvas.add(path.set({
//        left: (this.canvas.getWidth() / 2),
//        top: (this.canvas.getHeight() / 2)
//    }));

    this.arc = new fabric.Path(
        'M ' + (this.canvas.getWidth() / 2)+', '+(this.canvas.getHeight() / 2)+', '+
        'L44.58,0C36.67,0,29.5,3.22,24.31,8.41c-5.19,5.19-8.41,12.37-8.41,20.28');


    this.canvas.add(this.arc);
};

module.exports = MovieTimer;
