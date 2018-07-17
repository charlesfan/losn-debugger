module.exports = tools = function() {}

tools.prototype.isJSON = function(obj) {
	try {
		JSON.parse(x);
	} catch (e) {
		return false;
	}
	return true;
}
