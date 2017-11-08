var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    //activating gulp.watch function intiates browserSync.
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
            }
    });
    //reload index.html file whenever a change is made
    watch('./app/index.html', function(){
        browserSync.reload();
    });
    //start cssInject whenever a change is made to any css file
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject');
    });
});


// apply the final style.css to the webpage.
// add gulp styles task as a prerequisite
gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

