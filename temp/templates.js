module.run(function($templateCache) {
  'use strict';

  $templateCache.put('queryCheckListTpl.html',
    "<div class=checkbox><ul><li ng-repeat=\"(key,value) in queryconfig.querydata\"><input type=checkbox ng-model=queryconfig.querydata[key] ng-click=checkListClicked()>{{key}}</li></ul></div>"
  );


  $templateCache.put('queryColorPickerTpl.html',
    "<div><div ng-repeat=\"(key,value) in queryconfig.querydata\" class=cp-container><div class=cp-box ng-class=\"queryconfig.querydata[key] ? 'cp-selected' : 'cp-unselected'\" ng-click=\"queryconfig.querydata[key] = !queryconfig.querydata[key]; colorPickerClicked(key);\" ng-model=queryconfig.querydata[key] style=background-color:{{key}}></div></div><div style=clear:both></div></div>"
  );


  $templateCache.put('queryCreatorTpl.html',
    "<div ng-repeat=\"qc in queryConfigs\"><h4>{{qc.queryname}}</h4><div ng-if=\"qc.querycomponent == 'checklist'\"><div query-checklist queryconfig=qc queryindex=$index></div></div><div ng-if=\"qc.querycomponent == 'colorpicker'\"><div query-colorpicker queryconfig=qc queryindex=$index></div></div><div ng-if=\"qc.querycomponent == 'rangeslider'\"><div query-rangeslider queryconfig=qc queryindex=$index></div></div></div>"
  );


  $templateCache.put('queryRangeSliderTpl.html',
    "<div style=\"width:90%; margin:auto\"><div rzslider rz-slider-model=queryconfig.querydata.min rz-slider-high=queryconfig.querydata.max rz-slider-options=queryconfig.querydata.options></div></div>"
  );


  $templateCache.put('rzSliderTpl.html',
    "<div class=rzslider><span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class=\"rz-bar rz-selection\" ng-style=barStyle></span></span> <span class=\"rz-pointer rz-pointer-min\" ng-style=minPointerStyle></span> <span class=\"rz-pointer rz-pointer-max\" ng-style=maxPointerStyle></span> <span class=\"rz-bubble rz-limit rz-floor\"></span> <span class=\"rz-bubble rz-limit rz-ceil\"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat=\"t in ticks track by $index\" class=rz-tick ng-class=\"{'rz-selected': t.selected}\" ng-style=t.style ng-attr-uib-tooltip=\"{{ t.tooltip }}\" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body=\"{{ t.tooltip ? true : undefined}}\"><span ng-if=\"t.value != null\" class=rz-tick-value ng-attr-uib-tooltip=\"{{ t.valueTooltip }}\" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span> <span ng-if=\"t.legend != null\" class=rz-tick-legend>{{ t.legend }}</span></li></ul></div>"
  );

});