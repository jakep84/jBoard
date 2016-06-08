var gulp = require('gulp');

var config = {
  paths: {
  html: './src/*.html',
  js: './src/scripts/*.js',
  css: './src/css/*.css',
  dist: './public'
  }
}
// defines html
gulp.task('html', function () {
 return gulp.src(config.paths.html)
  .pipe(gulp.dest(config.paths.dist))
});

//defines js
gulp.task('js', function () {
  return gulp.src(config.paths.js)
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
})

//defines css
gulp.task('css', function() {
    return gulp.src(config.paths.css)
    .pipe(gulp.dest(config.paths.dist + '/css'))
})
          
          
          
gulp.task('default', ['html', 'js', 'css']);
