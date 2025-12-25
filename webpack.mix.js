const mix = require("laravel-mix");

mix.ts("src/index.ts", "dist/")
    .setPublicPath("dist")
       .webpackConfig({
          output: {
             library: {
                type: "module",
             }
          },
          experiments: {
             outputModule: true
          }
       });
