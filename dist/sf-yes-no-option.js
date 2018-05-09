angular.module("sfYesNoOptionTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/templates/sf-yes-no-option.html","<div class=\"form-group\"\n     ng-controller=\"YesNoRadioController\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(),\n                \'has-success\': form.disableSuccessState !== true && hasSuccess(),\n                \'has-feedback\': form.feedback !== false }\"\n     sf-field-model\n     schema-validate=\"form\" >\n  <pre>{{form|json}}</pre>\n  <div class=\"row\">\n    <div class=\"col-xs-6\">\n      <span class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</span>\n    </div>\n    <div class=\"col-xs-6\">\n      <label class=\"radio-inline\">\n        <input type=\"radio\" sf-field-model ng-model=\"$$value$$\" name=\"inlineRadioOptions\" id=\"inlineRadio1\" value=\"yes\"> Yes\n      </label>\n      <label class=\"radio-inline\">\n        <input type=\"radio\" sf-field-model ng-model=\"$$value$$\" name=\"inlineRadioOptions\" id=\"inlineRadio2\" value=\"no\"> No\n      </label>\n      <label ng-if=\"form.na\" class=\"radio-inline\">\n        <input type=\"radio\" sf-field-model ng-model=\"$$value$$\" name=\"inlineRadioOptions\" id=\"inlineRadio3\" value=\"na\"> N/A\n      </label>\n    </div>\n  </div>\n  <span class=\"help-block\" sf-message=\"form.description\"></span>\n</div>\n");}]);
angular.module('sfYesNoOption', [
  'schemaForm',
  'sfYesNoOptionTemplates'
]).config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

    var sfYesNoOption = function (name, schema, options) {
      if (schema.type === 'string' && schema.format == 'yesNoOption') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'yesNoOption';
        // if (options.global.validators) {
        //   f.$validators = options.global.validators;
        // }
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(sfYesNoOption);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',           // Name of the decorator you want to add to.
      'yesNoOption',                      // Form type that should render this add-on
      'src/templates/sf-yes-no-option.html',  // Template name in $templateCache
      sfBuilderProvider.stdBuilders   // List of builder functions to apply.
    );

  }])
  .controller('YesNoRadioController', ['$scope', function ($scope) {
    $scope.$watch('ngModel.$modelValue', function () {
      if ($scope.ngModel.$validate) {
        // Make sure that allowInvalid is always true so that the model is preserved when validation fails
        $scope.ngModel.$options = $scope.ngModel.$options || {};
        $scope.ngModel.$options = {allowInvalid: true};
        $scope.ngModel.$validate();
        if ($scope.ngModel.$invalid) { // The field must be made dirty so the error message is displayed
          $scope.ngModel.$dirty = true;
          $scope.ngModel.$pristine = false;
        }
      }
      else {
        $scope.ngModel.$setViewValue(ngModel.$viewValue);
      }
    }, true);

    $scope.$watch('form', function () {
      $scope.form.disableErrorState = $scope.form.hasOwnProperty('readonly') && $scope.form.readonly;
    });
  }]);
