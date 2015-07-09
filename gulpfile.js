var gulp = require('gulp');
var browserify = require('browserify');
var bundle = browserify('./src/movie-timer.js').bundle();
var sass  = require('gulp-sass');
var source = require('vinyl-source-stream');
var chalk = require('chalk');

gulp.task('sass', function(){
    return gulp.src(['src/styles/main.scss'])
                .pipe(sass())
                .pipe(gulp.dest('./dest/'));
});

gulp.task('browserify', function() {
    return browserify([
            './src/movie-timer.js'
        ])
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dest/'));
});

gulp.task('watch:scripts', function(){
    gulp.watch(['./src/movie-timer.js'], ['browserify'])
		.on('change', logChangedFile);
});

var logChangedFile = function(evt){
    console.log(evt);
	console.log(chalk.red('[watcher]') +' File ' + chalk.blue(evt.path.match(/[a-z\-]*(\.js)$/)) + ' was ' + evt.type + ', compiling...');
};

gulp.task('default', ['sass', 'browserify']);

gulp.task('watch', ['watch:scripts']);
