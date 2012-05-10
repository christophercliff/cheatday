var express = require('express'),
    fs = require('fs'),
    app,
    mode = 'production';
    //mode = 'development';

global.nap = require('nap');

nap({
    mode: mode,
    publicDir: '/CheatDay/www',
    fingerprint: true,
    assets: {
        js: {
            lib: [
                '/app/javascripts/lib/cordova.js',
                '/app/javascripts/lib/require.js',
                '/app/javascripts/lib/jquery.js',
                '/app/javascripts/lib/underscore.js',
                '/app/javascripts/lib/hammer.js',
                '/app/javascripts/lib/**/*'
            ],
            app: [
                '/app/javascripts/app/models/**/*',
                '/app/javascripts/app/collections/**/*',
                '/app/javascripts/app/routers/**/*',
                '/app/javascripts/app/views/**/*',
                '/app/javascripts/app/init.js'
            ]
        },
        css: {
            app: [
                '/app/stylesheets/**/*'
            ]
        },
        jst: {
            app: [
                '/app/templates/**/*'
            ]
        }
    }
});

nap['package']();

app = module.exports = express.createServer();

app.configure(function() {
    app.use(nap.middleware);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express['static'](__dirname + '/CheatDay/www'));
});

app.configure('development', function() {
    return app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    return app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Express'
    }, function(error, contents){
        if (mode === 'production')
        {
            fs.writeFileSync('CheatDay/www/index.html', contents != null ? contents : '');
        }
    });
    return res.render('index', {
        title: 'Express'
    });
});

app.listen(3002);

console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);