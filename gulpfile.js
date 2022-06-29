const { src, dest, watch, parallel } = require("gulp");
//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Javascript
const terser = require("gulp-terser-js");

//Imagenes
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

const css = function (done) {
  //Identificar archivo SASS
  //Compilarlo
  //Almacenarlo en el disco
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));
  done();
};

const versionWebp = function (done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
};

const versionImagenmin = function (done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  done();
};

const versionAvif = function (done) {
    const opciones = {
      quality: 50,
    };
    src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
    done();
  };

const javascript = function (done) {
  src("src/js/**/*.js")
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest("build/js"));
  done();
};

const dev = function (done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
};

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionImagenmin = versionImagenmin;
exports.versionAvif = versionAvif
exports.js = javascript;

exports.dev = parallel(versionImagenmin, versionWebp,versionAvif, javascript, dev);
