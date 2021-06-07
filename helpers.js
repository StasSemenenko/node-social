module.exports = {
	ifeq(a, b, options){
	  if (a == b) {
		return options.fn(this);
		}
	  return options.inverse(this);
	},
// 	hbs.registerHelper('trimString', function(passedString, startstring, endstring) {
// 		var theString = passedString.substring( startstring, endstring );
// 		return new Handlebars.SafeString(theString)
// 	 });
}