var gulp = require('gulp'),
  uglify = require('gulp-uglify');

gulp.task('default', function(){
  gulp.src('public/js/content.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/bundle.js'));
});