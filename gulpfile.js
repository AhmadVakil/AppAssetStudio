// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var less   = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  gulp.src('./less/main.less')
  	//.pipe(sourcemaps.init())
    .pipe(less())
    
   	.pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false,
         remove: false,
    }))
    //.pipe(sourcemaps.write())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('integrate-less', function () {
    gulp.src('./less/integrate.less')
        .pipe(less())
        .on('error', function (err) {
            this.emit('end');
        })
        .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false,
             remove: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream:true}));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'js/editor/resources/colors.js',
        'js/editor/resources/gradients.js',
    	'js/vendor/jquery.js',
        'js/vendor/jquery-ui.js',
        'js/vendor/file-saver.js',
        'js/vendor/pagination.js',
        'js/vendor/spectrum.js',
        'js/vendor/hammer.js',
        'js/vendor/scrollbar.js',
    	'js/vendor/angular.min.js',
        'js/vendor/angular-animate.js',
        'js/vendor/angular-aria.js',
        'js/vendor/angular-material.js',
        'js/vendor/angular-sortable.js',
    	'js/vendor/fabric.js',
    	'js/editor/App.js',
        'js/editor/LocalStorage.js',
        'js/editor/Settings.js',
        'js/editor/Keybinds.js',
        'js/editor/Canvas.js',
        'js/editor/crop/cropper.js',
        'js/editor/crop/cropzone.js',
        'js/editor/crop/cropController.js',
        'js/editor/basics/RotateController.js',
        'js/editor/basics/CanvasBackgroundController.js',
        'js/editor/basics/ResizeController.js',
        'js/editor/basics/RoundedCornersController.js',
        'js/editor/zoomController.js',
        'js/editor/TopPanelController.js',
        'js/editor/directives/Tabs.js',
        'js/editor/directives/PrettyScrollbar.js',
        'js/editor/directives/ColorPicker.js',
        'js/editor/directives/FileUploader.js',
        'js/editor/directives/TogglePanelVisibility.js',
        'js/editor/directives/ToggleSidebar.js',
        'js/editor/text/Text.js',
        'js/editor/text/TextController.js',
        'js/editor/text/TextAlignButtons.js',
        'js/editor/text/TextDecorationButtons.js',
        'js/editor/text/Fonts.js',
        'js/editor/drawing/Drawing.js',
        'js/editor/drawing/DrawingController.js',
        'js/editor/drawing/RenderBrushesDirective.js',
        'js/editor/History.js',
        'js/editor/Saver.js',
        'js/editor/filters/FiltersController.js',
        'js/editor/filters/Filters.js',
        'js/editor/shapes/SimpleShapesController.js',
        'js/editor/shapes/StickersController.js',
        'js/editor/shapes/StickersCategories.js',
        'js/editor/shapes/SimpleShapes.js',
        'js/editor/shapes/Polygon.js',
        'js/editor/objects/ObjectsPanelController.js',
	])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({stream:true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
	browserSync({
        proxy: "pixie.dev"
    });

    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('less/**/integrate.less', ['integrate-less']);
});

// Default Task
gulp.task('default', ['less', 'scripts', 'watch']);