var app = angular.module('qcDemo', ['qcModule', 'ui.bootstrap','rzModule' ]);

app.controller('MainCtrl', function($scope) {
    $scope.$on('update-query', function(e) {
        
              $scope.stringJSON = JSON.stringify($scope.queryConfigs, null, 4)
              
              $scope.inputQueryString= JSON.stringify( $scope.queryConfigs, function( key, value ) {
                    if( key === "$$hashKey" ) {
                        return undefined;
                    }

                    return value;
              });
              
              $scope.updateQuery(true)
              
              
        });
    
    $scope.queryConfigs = {};
    $scope.inputQueryString = JSON.stringify( [
        {
            queryname: "Jeans",
            querydata: {
                "Men": false,
                "Women": false,
                "Boys": false,
                "Girls": false,
            },
            querycomponent: "checklist"
        },
        {
            queryname: "Brand",
            querydata: {
                "Levi's": false,
                "Hollister": false,
                "Americal Eagle": false,
                "Wrangler": false,
                "Calvin Klein":false
            },
            querycomponent: "checklist",
            "query": ""
        },
        {
            queryname: "Price",
            querydata: {
                min: 100,
                max: 180,
                options: {
                    floor: 0,
                    ceil: 450
                }
            },
            querycomponent: "rangeslider"
        },
        {
            queryname: "Colors",
            querydata: {
                "#FFFFFF": false,
                "#C0C0C0": false,
                "#808080": false,
                "#000000": false,
                "#FF0000": false,
                "#800000": false,
                "#FFFF00": false,
                "#808000": false,
                "#00FF00": false,
                "#008000": false,
                "#00FFFF": false,
                "#008080": false,
                "#0000FF": false,
                "#000080": false,
                "#FF00FF": false,
                "#800080": false
            },
            querycomponent: "colorpicker"
        }
    ]
);
    
        
/*            [
                {
                    "queryname": "Type",
                    "querydata": {
                        "ABC dsfhkhds shdkf dkf": false,
                        "PQR hkjsdfhk sdhkf shdjkfh": false,
                        "RST dfkhskdfhkdsf": false
                    },
                    "querycomponent": "checklist"
                },
                {
                    "queryname": "Fabric",
                    "querydata": {
                        "Silk": false,
                        "Cotton": false,
                        "Nylon": false
                    },
                    "querycomponent": "checklist"
                }
            ]*/
        $scope.updateQuery = function(updateOutput){  
            $scope.queryConfigs = JSON.parse($scope.inputQueryString);
            if(updateOutput){
                $scope.stringJSON = JSON.stringify($scope.queryConfigs, null, 4);
                $scope.inputQueryString = $scope.stringJSON  
            } else {
                $scope.inputQueryString = JSON.stringify($scope.queryConfigs, null, 4);  
            }
                
                    
            //  $scope.$broadcast("update-query")      
            //$scope.stringJSON = JSON.stringify($scope.queryConfigs, null, 4)
            $scope.queryConfigs = JSON.parse($scope.inputQueryString);

        }
         $scope.updateQuery(false)
})
