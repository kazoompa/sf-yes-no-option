Schema Form Typeahead Add-on
===================================
 
**sf-yes-no-option** add-on 

Installation
------------

```
$ bower install sf-yes-no-option --save
```

Alternatively:

```
$ bower install https://github.com/obiba/sf-typeahed.git#<release-number> --save
```


Make sure to include `sf-yes-no-option.min.js` in your index file and load the module in your application:

```
var myModule = angular.module('myModule', [
 ...
 'sfYesNoOption',
]);
```

Usage
-----

The schema:

```
"name": {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "format": "yesNoOption",
      "title": "Prescribed medication intake or other health products",
      "description": "Name or alias"
    }
  }
}
```

The Definition:

```
{
  "type":"yesNoOption",
  "key":"name"
}
```

To provide the typeahead auto complete values you need to pass them to the form default options:

```
$scope.sfOptions = {formDefaults: { values: ['Bob','Jim','Jack']}};

```