var gulp=require('gulp');
var browserSync=require('browser-sync');
var sass=require('gulp-sass');
var autoprefixer=require('gulp-autoprefixer');
var minifyCss=require('gulp-minify-css');
var rename=require('gulp-rename');
var concat=require('gulp-concat');
var imagemin=require('gulp-imagemin');
var cache=require('gulp-cache');
var fileInclude=require('gulp-file-include');
// vue文件的编译及js的混合
var webpack=require('webpack');
var webpackConfig=require('./webpack.config.js');
gulp.task('webpack',function(callback){
	var myConfig=Object.create(webpackConfig);
    webpack(myConfig,function(err,stats){
    	callback();
    })
});
// sass的编译与合并压缩
gulp.task('styles',function(){
	return gulp.src('src/sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(minifyCss())
	.pipe(concat('main.css'))
    .pipe(rename(function(path){
    	path.basename+=".min";
    	path.extname=".css";
    }))
	.pipe(gulp.dest("dist/css"))
});
// 图片无损坏压缩
gulp.task('images',function(){
	return gulp.src('src/images/*')
	.pipe(cache(imagemin({optimizationLevel:3,progressive:true,trueminterlaced:true})))
	.pipe(gulp.dest('dist/images'))
});
gulp.task('html',function(){
     return gulp.src('src/html/*.html')
     .pipe(fileInclude({
     	prefix: '@@',
     	basepath: '@file'
     }))
     .pipe(gulp.dest("./"))
})
// 监听热加载
gulp.task('watch',function(){
	browserSync.init({
		server: {baseUrl: "./"}
	})
	gulp.watch('src/images/*',['images']);
	gulp.watch('src/sass/*.scss',['styles']);
	gulp.watch('src/html/*.html',['html']);
	gulp.watch('src/js/**',['webpack']);
	gulp.watch(['src/**','./*.html']).on('change',browserSync.reload);
})               