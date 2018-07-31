'use strict';

// https://github.com/gulpjs/gulp/blob/master/docs/README.md
let gulp = require('gulp');
// https://github.com/shama/webpack-stream
let webpackStream = require('webpack-stream');

let WebpackConfig = require('./WebpackConfig');
let descriptor = require('./package.json');
// Remove @nsoft/ space from project name before sending it to Webpack,
// to avoid creating `@nsoft/` subfolder in `dist` folder when running `gulp $projectName/build` task
descriptor.name = descriptor.name.replace('@nsoft/', '');

let config = new WebpackConfig(descriptor, {
  src: './src/',
  dist: './dist/'
});


gulp.task(
  `${config.name}/build`,
  function () {
    return gulp
      .src(config.path.src)
      .pipe(webpackStream(config.get()))
      .pipe(gulp.dest(config.path.dist));
  }
);

gulp.task(
  `${config.name}/watch`, function () {
    return gulp
      .watch(`${config.path.src}**/*.*`, [
        `${config.name}/build`
      ]);
  }
);
