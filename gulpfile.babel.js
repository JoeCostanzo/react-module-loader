import gulp       from 'gulp';
import sass       from 'gulp-sass';

const srcDir  = './src';
const destDir = './dist';

const conf = {
  // SASS
  srcSass:      `${srcDir}/sass`,
  destSass:     `${destDir}`,
};

gulp.task('styles', () =>
  gulp.src(`${conf.srcSass}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(conf.destSass)));

gulp.task('styles:watch', ['styles'], () =>
  gulp.watch(`${conf.srcSass}/**/*.scss`, ['styles']));

/**
 * Created by joec on 4/4/2017.
 */
