module.exports = tools = {
	isJSON: function(obj) {
		try {
			JSON.parse(obj);
		} catch (e) {
			return false;
		}
		return true;
	}
}
