'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        jshint: {
            options: {
                strict: true,
                node: true,
                camelcase: false,
                unused: true,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                quotmark: true,
                regexp: true,
                undef: true,
                trailing: true,
                smarttabs: true,
                globals: {
                    describe: false,
                    it: false,
                    before: false,
                    beforeEach: false,
                    after: false,
                    afterEach: false
                }
            },
            all: [
                'gruntfile.js',
                'app/**/*.js',
                'config/**/*.js',
                'test/**/*.js'
            ]
        },
        mochaTest: {
            tphubExternalApiTests: {
                options: {
                    reporter: 'spec',
                    require: 'coverage/blanket'
                },
                src: [
                    'test/**/*.js'
                ]
            },
            tphubExternalCoverageHtml: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'coverage/coverage.html'
                },
                src: [
                    'test/**/*.js'
                ]
            },
            tphubExternalCoverageJson: {
                options: {
                    reporter: 'json-cov',
                    quiet: true,
                    captureFile: 'coverage/coverage.json'
                },
                src: [
                    'test/**/*.js'
                ]
            }
        },
        env: {
            options: {},
            dev: {
                NODE_ENV: 'development'
            },
            test: {
                NODE_ENV: 'test'
            },
            production: {
                NODE_ENV: 'production'
            }
        },
        watch: {
            files: [
                'app/**/*.js',
                'config/**/*.js',
                'test/**/*.js',
                'gruntfile.js'
            ],
            tasks: [
                'test'
            ]
        },
        shell: {}
    });

    grunt.registerTask('test', [
        'env:test',
        'mochaTest'
    ]);

    grunt.registerTask('build', [
        'env:production',
        'jshint'
    ]);

    grunt.registerTask('default', [
        'build',
        'test',
        'watch'
    ]);
};