/**
 * Angular JS Query Creator directive
 *
 * (c) Yogesh Patel <ygpatel@gmail.com>
 * http://github.com/ygpatel/query-creator
 *
 * Licensed under the MIT license
 */
/*jslint unparam: true */
/*global angular: false, console: false, define, module */
(function(root, factory) {
    // UMD boilerplate from https://github.com/angular-slider/angularjs-slider    
    'use strict';
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        // to support bundler like browserify
        var angularObj = require('angular');
        if ((!angularObj || !angularObj.module) && typeof angular != 'undefined') {
            angularObj = angular;
        }
        module.exports = factory(angularObj);
    } else {
        // Browser globals (root is window)
        factory(root.angular);
    }

}(this, function(angular) {
    'use strict';
    var module = angular.module('qcModule', [])

    .directive('queryCreator', function() {
            return {
                restrict: 'AE',
                scope: true,
                link: function(scope, element, attrs) {
                    console.log("in query creator"); 
                },
                templateUrl: 'queryCreatorTpl.html',
                controller: function($scope) {
                    console.log("in query creator");    
                }

            }

        }

    )

    .directive('queryChecklist', ['$rootScope', function($rootScope) {
                return{
                    restrict: 'EA',
                    require:'^queryCreator',
                    scope: {
                        queryconfig : "="
                    },
                    templateUrl: 'queryCheckListTpl.html',
                    link: function(scope,element,attrs){
                        console.log("in query checklist"); 
                    },
                    controller : function($scope, $element, $rootScope){
                       $scope.checkListClicked = function($rootScope) {
                           this.$parent.$root.$broadcast('update-query');
                       }
                    }
                }
            }
    ])

    .directive('queryColorpicker', ['$rootScope', function($rootScope) {
                return{
                    restrict: 'EA',
                    require:'^queryCreator',
                    scope: {
                        queryconfig : "=",
                    },
                    templateUrl: 'queryColorPickerTpl.html',
                    controller : function($scope, $element, $rootScope){
                       $scope.colorPickerClicked = function(key) {
                          
                           $rootScope.$broadcast('update-query');
                       }
                    },
                    link: function(scope, element, attrs){
                        //alert("here");
                    }
                }
            }])
    
    .directive('queryRangeslider', ['$rootScope', function($rootScope) {
                return{
                    restrict: 'EA',
                    require:'^queryCreator',
                    scope: {
                        queryconfig : "=",
                    },
                    templateUrl: 'queryRangeSliderTpl.html',
                    controller : function($scope, $element, $rootScope){
                        $scope.$on("slideEnded", function(e) {
                             e.currentScope.$root.$broadcast('update-query'); 
                        });                                   
                        
                    }
                    
                    
                }
            }]);

    return module.name
}));