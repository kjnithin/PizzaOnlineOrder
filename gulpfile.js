var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    cssnano = require('gulp-cssnano'),
    clean = require('gulp-clean');


gulp.task('Linting', function(){
   return gulp.src(['*.js', 'client/src/js/**/*.js','app/**/*.js'])
        .pipe(jshint({sub:true,esversion: 6}))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('Cleaning', function(){
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('minifyFiles', function(){
    return gulp.src('client/index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('copyFont',function(){
   return gulp.src('client/lib/font-awesome/fonts/*')
       .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copyViews',function(){
    return gulp.src('client/views/**/*')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('copyImages',function(){
    return gulp.src('client/images/*')
        .pipe(gulp.dest('dist/images'));
});
gulp.task('default',function(callback){
    runSequence('Linting','Cleaning','minifyFiles','copyFont','copyViews','copyImages',callback);
});