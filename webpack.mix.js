const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    node: {
        fs: "empty"
    },
    resolve: {
        alias: {
            "handlebars" : "handlebars/dist/handlebars.js"
        }
    },
});

mix.less('resources/less/app.less', 'public/css/app.css');

mix.react(
    'resources/js/orders.js',
    'public/js/order.js'
).sourceMaps();

mix.react(
    'resources/js/take_order.js',
    'public/js/take_order.js'
).sourceMaps();

mix.react(
    'resources/js/orders_resume.js',
    'public/js/orders_resume.js'
).sourceMaps();
