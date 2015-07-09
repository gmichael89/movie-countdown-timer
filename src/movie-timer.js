MoveTimer = function(){

        var refs = {
            canvas: 'MovieTimer'
        };

        this.init = function(){
            var canvas = new fabric.Canvas(refs.canvas);

            var circle = new fabric.Circle({
                radius: 20, fill: 'green', left: 100, top: 100
            });

            canvas.add(circle);
        };

        return this.init();
};

module.exports = MoveTimer;
