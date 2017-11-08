var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
    console.log("Horay - gulp file created");
});

gulp.task('html', function(){
    console.log("imagine something useful being done to your HTML here");
});

gulp.task('styles', function(){
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});

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