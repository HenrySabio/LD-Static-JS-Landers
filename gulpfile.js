const { src, dest, watch, series, parallel, task } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sassUnicode = require("gulp-sass-unicode");
const minifyJs = require("gulp-uglify");
const fs = require("fs");

const path = require("path");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sorting = require('postcss-sorting');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const prettier = require('gulp-prettier');
const ignore = require('gulp-ignore');
const purgecss = require('gulp-purgecss');

function scssCleanup() {

  var processors = [
    autoprefixer(),
    sorting({
      "order": [
        "custom-properties",
        "dollar-variables",
        "declarations",
        "rules",
        "at-rules",
        {
          "type": "rule",
          "selector": /^&/
        },
        {
          "type": "rule",
          "selector": /^&:\w+$/
        },
        {
          "type": "rule",
          "selector": /^&:   : \w+$/
        },
        {
          "type": "at-rule",
          "name": "include",
        },
        {
          "type": "at-rule",
          "name": "include",
          "hasBlock": true,
          "position": "bottom"
        },
        {
          "type": "at-rule",
          "name": "\/^include media-breakpoint-\w+$/",
          "position": "bottom"
        },
        {
          "type": "at-rule",
          "name": "media",
          "position": "bottom"
        }
      ],
      "properties-order": [
        "content",
        "order",
        "z-index",
        "position",
        "top",
        "bottom",
        "left",
        "right",
        "display",
        "visibility",
        "backface-visibility",
        "opacity",
        "filter",
        "mix-blend-mode",
        "transform",
        "transform-style",
        "perspective",
        "flex-direction",
        "flex-flow",
        "justify-content",
        "align-items",
        "align-content",
        "flex-basis",
        "flex-wrap",
        "flex-grow",
        "flex-shrink",
        "grid",
        "grid-template",
        "grid-template-columns",
        "grid-auto-columns",
        "grid-template-rows",
        "grid-auto-rows",
        "grid-template-areas",
        "grid-auto-flow",
        "grid-gap",
        "outline",
        "outline-width",
        "outline-style",
        "outline-color",
        "outline-offset",
        "border",
        "border-top",
        "border-right",
        "border-bottom",
        "border-left",
        "border-radius",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-bottom-right-radius",
        "border-bottom-left-radius",
        "border-collapse",
        "margin",
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "padding",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
        "max-height",
        "min-height",
        "height",
        "max-width",
        "min-width",
        "width",
        "background",
        "background-image",
        "background-color",
        "background-position",
        "background-size",
        "background-repeat",
        "background-origin",
        "background-clip",
        "background-attachment",
        "resize",
        "box-sizing",
        "overflow",
        "overflow-x",
        "overflow-y",
        "scroll-behavior",
        "object-fit",
        "object-position",
        "float",
        "empty-cells",
        "list-style",
        "list-style-image",
        "list-style-type",
        "list-style-position",
        "text-indent",
        "word-break",
        "word-wrap",
        "word-spacing",
        "text-overflow",
        "hyphens",
        "white-space",
        "text-decoration",
        "vertical-align",
        "text-transform",
        "letter-spacing",
        "direction",
        "text-shadow",
        "font",
        "font-style",
        "font-family",
        "font-size",
        "line-height",
        "font-weight",
        "font-stretch",
        "font-kerning",
        "font-variant",
        "color",
        "cursor",
        "pointer-events",
        "transition",
        "transition-property",
        "transition-duration",
        "transition-timing-function",
        "transition-delay",
        "animation",
        "animation-name",
        "animation-duration",
        "animation-timing-function",
        "animation-delay",
        "animation-iteration-count",
        "animation-direction",
        "animation-fill-mode",
        "animation-play-state"
      ],
      "unspecified-properties-position": "bottom"
    })
  ];
  return src(['src/css/sass/**/*.scss', '!src/css/sass/vendor/**/*.scss']) // Glob pattern to match all .scss files in the sass folder and exclude files inside the vendor folder
    .pipe(ignore.exclude('src/css/sass/vendor/**/*.scss')) // Ignore files inside the vendor folder
    .pipe(postcss(processors, { syntax: require('postcss-scss') }))
    .pipe(prettier({
      tabWidth: 4,
      useTabs: true
    }))
    .pipe(dest(function (file) {
      return 'src/css/sass/';
    }))
    .on("end", () => {
      console.log("\n   ✅ - Styles cleaned up, purged, & vendor prefixes applied!\n");
    }); // Save the processed CSS in the same directory
};

// Compile Sass Task
function scssTask() {
  const scssFiles = [
    {
      src: "src/css/sass/style.scss",
      dest: "src/css/",
    },
    {
      src: "src/css/sass/vendor/_swiperjs/swiper.scss",
      dest: "src/css/vendor/",
    },
  ];

  const tasks = scssFiles.map((file) => {
    return src(file.src, { sourcemaps: true })
      .pipe(
        sass({ outputStyle: 'compressed' }).on("error", function (err) {
          console.log(`\n   ❌ - Oh no, something is wrong!\n\n`);
          console.error(err);
          this.emit("end");
        })
      )
      .pipe(sassUnicode())
      .pipe(
        dest(file.dest, { sourcemaps: "." }).on("error", function (err) {
          console.log(`\n   ❌ - Oh no, something is wrong!\n\n`);
          console.error(err);
          this.emit("end");
        })
      );
  });

  return Promise.all(tasks).then(() => {
    console.log("\n   ✅ - SCSS files compiled - ready for DEV!\n");
  });
}

// Sass Task without Sourcemaps
function scssNoSourcemapTask() {
  const scssFiles = [
    {
      src: "src/css/sass/style.scss",
      dest: "src/css/",
    },
    {
      src: "src/css/sass/vendor/_swiperjs/swiper.scss",
      dest: "src/css/vendor/",
    },
  ];

  const tasks = scssFiles.map((file) => {
    return src(file.src)
      .pipe(
        sass({ outputStyle: 'compressed' }).on("error", function (err) {
          console.log(`\n   ❌ - Oh no, something is wrong!\n\n`);
          console.error(err);
          this.emit("end");
        })
      )
      .pipe(sassUnicode())
      .pipe(
        dest(file.dest).on("error", function (err) {
          console.log(`\n   ❌ - Oh no, something is wrong!\n\n`);
          console.error(err);
          this.emit("end");
        })
      );
  });

  return Promise.all(tasks).then(() => {
    console.log("\n   ✅ - SCSS files compiled without sourcemaps!\n");
  });
}

// Watch Task
function watchTask() {
  // Watch for changes in Sass files
  watch(
    "src/css/sass/**/*.scss",
    series(scssTask)
  );

  // Watch for changes in JavaScript files (only immediate children)
  watch(
    "src/js/*.js",
    { deep: false },
    series(minifyJsTask)
  );

  console.log("\n   👀 - Watching SCSS/JS files for changes...\n");
  console.log("   ----------------------------------------\n");
}

// Clean Sourcemap Task
function cleanSourcemapTask(cb) {
  const cssDirectory = "src/css";

  // Function to delete .map files recursively in a directory
  function deleteMapFiles(directory) {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        deleteMapFiles(filePath); // Recurse into subdirectories
      } else if (path.extname(file) === ".map") {
        try {
          fs.unlinkSync(filePath);
          console.log(`   ✅ - Sourcemap file "${filePath}" deleted.\n`);
        } catch (unlinkError) {
          console.error(`   ❌ - Error occurred while deleting sourcemap file "${filePath}": \n`);
          console.error(unlinkError);
        }
      }
    });
  }

  console.log(`\n   🚀 - Deleting .map files in the CSS directory and its subdirectories: \n`);
  deleteMapFiles(cssDirectory);

  cb(); // Callback to signal completion of the task
}

function purgeUnusedCssDev() {
  return src('src/css/style.css')
    .pipe(purgecss({
      content: ['src/pages/**/*.html']
    }))
    .pipe(dest('src/css/'))
    .on("end", () => {
      console.log("\n   ✅ - Unused CSS purged!\n");
    });
}

function purgeUnusedCssProd() {
  return src('dist/css/style.css')
    .pipe(purgecss({
      content: ['dist/**/*.html']
    }))
    .pipe(dest('dist/css/'))
    .on("end", () => {
      console.log("\n   ✅ - Unused CSS purged!\n");
    });
}

// Define the paths for source and destination
const sourcePath = './src/**/*';
const distPath = './dist/';

// Define the file patterns to exclude
const excludePatterns = [
  // exclude sass folder
  '**/sass/**', // exclude sass files
  '**/sass', // exclude sass folder
  '**/*.md', // exclude markdown files (readme files)
];

// Clean the dist folder
function cleanDist() {
  return src(distPath, { read: false, allowEmpty: true })
    .pipe(
      clean().on("error", function (err) {
        console.log(`\n   ❌ - Oh no, something is wrong!\n\n`);
        console.error(err);
        this.emit("end");
      })
    );
};

// Copy the production ready files to the dist folder
function exportDist() {
  return src(`${sourcePath}`)
    .pipe(ignore.exclude(excludePatterns))
    .pipe(
      dest(distPath)
    ).on("end", () => {
      console.log("\n   ✅ - Files cleaned and exported to `dist` folder - ready for PRODUCTION!\n");
    });
};

// Minify Js Task
function minifyJsTask() {
  return src("src/js/*.js")
    .pipe(minifyJs().on("error", function (err) {
      console.log(`\n   ❌ - Oh no, something is wrong!\n\n`);
      console.error(err);
      this.emit("end");
    }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest("src/js/_min/"))
    .on("end", () => {
      console.log("\n   ✅ - JS files minified!\n");
    });
};

// Cleanup Task
exports.cleanup = series(scssCleanup);

// Development Task
exports.dev = series(scssCleanup, scssTask, purgeUnusedCssDev, minifyJsTask, watchTask);

// Production Task
exports.prod = series(scssCleanup, cleanSourcemapTask, scssNoSourcemapTask, minifyJsTask, cleanDist, exportDist, purgeUnusedCssProd);
