/*
 * CSVJSON Application - CSV to JSON
 *
 * Copyright (c) 2014 Martin Drapeau
 */
APP.csv2json = function() {
	
	var uploadUrl = '/csv2json/upload',
  		sepMap = {
  			comma: ',',
  			semiColon: ';',
  			tab: '\t'
  		},
  		$file = $('#fileupload'),
  		$separator = $('select[name=separator]'),
  		$parseNumbers = $('input[type=checkbox][name=parseNumbers]'),
      $parseJSON = $('input[type=checkbox][name=parseJSON]'),
  		$transpose = $('input[type=checkbox][name=transpose]'),
  		$output = $('input[type=radio][name=output]'),
  		$csv = $('#csv'),
  		$result = $('#result'),
  		$clear = $('#clear, a.clear'),
  		$convert = $('#convert, a.convert'),
			$minify = $('#minify');
	
	$convert.click(function(e) {
		e.preventDefault();
		
		var csv = _.trim($csv.val()),
  			separator = $separator.find('option:selected').val(),
  			options = {
  				transpose: $transpose.is(':checked'),
  				hash: $output.filter(':checked').val() == 'hash',
  				parseNumbers: $parseNumbers.is(':checked'),
          parseJSON: $parseJSON.is(':checked')
  			},
  			json;
		if (separator != 'auto') options.separator = sepMap[separator];
		
		try {
			json = CSVJSON.csv2json(csv, options);
		} catch(error) {
			APP.reportError($result, error);
			return false;
		}
		
		var result = JSON.stringify(json, null, $minify.is(':checked') ? undefined : 2);
		$result.removeClass('error').val(result).change();
	});
	
	APP.start({
		$convert: $convert,
		$clear: $clear,
		$saveElements: $('input.save, textarea.save'),
		upload: {
			$file: $file,
			url: uploadUrl,
			$textarea: $csv
		}
	});
};