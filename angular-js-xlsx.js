/**
 * @license Angular JS XLSX v0.1
 * (c) 2010-2014. https://github.com/wjianjie/angular-js-xlsx
 * License: MIT
 */

'use strict';

angular.module('angular-js-xlsx', [])
    .factory('ngxlsx', [function () {

        var xlsx = window.XLSX;

        var service = {

            read: function(data, read_opts) {
                return  xlsx.read( data, read_opts );
            },
            sheet_to_json: function(sheet) {
                return  xlsx.utils.sheet_to_json( sheet);
            }
        };

        return service;

    }])
    .directive('xlsx', [  'ngxlsx', function ( ngxlsx ) {
        return {
            scope: {
                opts: '='
            },
            link: function ($scope, $elm, $attrs) {
                $elm.on('change', function (changeEvent) {

                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function () {
                            var file = evt.target.result;
                            var workbook = ngxlsx.read(file, {type: 'binary'});
                            var data = ngxlsx.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

                            $scope.opts.data = data;
                        });
                    };

                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            }
        }
    }]);
    