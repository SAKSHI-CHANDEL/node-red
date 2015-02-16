/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: { src: ['test/**/*_spec.js'] },
            core: { src: ["test/_spec.js","test/red/**/*_spec.js"]},
            nodes: { src: ["test/nodes/**/*_spec.js"]}
        },
        jshint: {
            options: {
                // http://www.jshint.com/docs/options/
                "asi": true,      // allow missing semicolons
                "curly": true,    // require braces
                "eqnull": true,   // ignore ==null
                "forin": true,    // require property filtering in "for in" loops
                "immed": true,    // require immediate functions to be wrapped in ( )
                "nonbsp": true,   // warn on unexpected whitespace breaking chars
                //"strict": true, // commented out for now as it causes 100s of warnings, but want to get there eventually
                "loopfunc": true, // allow functions to be defined in loops
                "sub": true       // don't warn that foo['bar'] should be written as foo.bar
            },
            all: [
                'Gruntfile.js',
                'red.js',
                'red/**/*.js',
                'nodes/**/*.js',
                'public/red/**/*.js'
            ],
            
            core: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'red.js',
                        'red/**/*.js'
                    ]
                }
            },
            nodes: {
                files: {
                    src: [ 'nodes/**/*.js' ]
                }
            },
            editor: {
                files: {
                    src: [ 'public/red/**/*.js' ]
                }
            },
            tests: {
                files: {
                    src: ['test/**/*.js']
                },
                options: {
                    "expr": true
                }
            }
        },
        concat: {
            options: {
                separator: ";",
            },
            dist: {
              src: ["public/red/main.js","public/red/settings.js","public/red/user.js","public/red/comms.js","public/red/ui/state.js","public/red/nodes.js","public/red/history.js","public/red/validators.js","public/red/ui/menu.js","public/red/ui/keyboard.js","public/red/ui/tabs.js","public/red/ui/view.js","public/red/ui/sidebar.js","public/red/ui/palette.js","public/red/ui/tab-info.js","public/red/ui/tab-config.js","public/red/ui/editor.js","public/red/ui/library.js","public/red/ui/notifications.js","public/red/ui/touch/radialMenu.js"],
              dest: "public/red/red.js"
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/red/red.min.js': 'public/red/red.js'
                }
            }
        }

    });
    
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['test-core','test-editor','test-nodes']);
    
    grunt.registerTask('test-core', ['jshint:core','simplemocha:core']);
    grunt.registerTask('test-editor', ['jshint:editor']);
    grunt.registerTask('test-nodes', ['simplemocha:nodes']);
    
};
