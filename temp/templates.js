module.run(function($templateCache) {
  'use strict';

  $templateCache.put('queryCheckListTpl.html',
    "<div class=checkbox><ul><li ng-repeat=\"(key,value) in queryconfig.querydata\"><input type=checkbox ng-model=queryconfig.querydata[key] ng-click=checkListClicked()>{{key}}</li></ul></div>"
  );


  $templateCache.put('queryColorPickerTpl.html',
    "<div><div ng-repeat=\"(key,value) in queryconfig.querydata\" class=cp-container><div class=cp-box ng-class=\"queryconfig.querydata[key] ? 'cp-selected' : 'cp-unselected'\" ng-click=\"queryconfig.querydata[key] = !queryconfig.querydata[key]; colorPickerClicked(key);\" ng-model=queryconfig.querydata[key] style=background-color:{{key}}></div></div><div style=clear:both></div></div>"
  );


  $templateCache.put('queryCreatorTpl.html',
    "<div ng-repeat=\"qc in queryConfigs\"><h4>{{qc.queryname}}</h4><div ng-if=\"qc.querycomponent == 'checklist'\"><div query-checklist queryconfig=qc></div></div><div ng-if=\"qc.querycomponent == 'colorpicker'\"><div query-colorpicker queryconfig=qc></div></div><div ng-if=\"qc.querycomponent == 'rangeslider'\"><div query-rangeslider queryconfig=qc></div></div></div>"
  );


  $templateCache.put('queryRangeSliderTpl.html',
    "<div style=\"width:90%; margin:auto\"><div rzslider rz-slider-model=queryconfig.querydata.min rz-slider-high=queryconfig.querydata.max rz-slider-options=queryconfig.querydata.options></div></div>"
  );

});