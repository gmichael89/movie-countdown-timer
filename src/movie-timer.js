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
