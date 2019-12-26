// variable  declairatioin
const { src, dest, task, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


const PATH = {
    HTML: 'src/**/*.html',
    img : 'src/img/*',
    font: 'src/font/**',
    css : 'src/css/*',
    scss: 'src/sass/**/*.scss'
}


function HTML(){
    return src(PATH.HTML)
    .pipe(dest('dist/'));
};

function img(){
    return src(PATH.img)
    .pipe(dest('dist/img'));
}

function font(){
    return src(PATH.font)
    .pipe(dest('dist/font'));
}

function css(){
    return src(PATH.css)
    .pipe(dest('dist/css'));
}

function scss(){
	return src(PATH.scss)
	.pipe(sass())
    .pipe(dest('dist/css/'));
};

function watcher(){
    watch(PATH.scss, scss);
    watch(PATH.HTML, HTML);
    watch(PATH.img, img);
    watch(PATH.css, css);
    watch(PATH.font, font);
}

task('watch', series(watcher));

// Static Server
task('server', function() {

    browserSync.init({
        server: "./dist",
        port: 8000,
        open: false,
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: ['./dist']
    });
});

// create default task
exports.default = parallel('watch', 'server');