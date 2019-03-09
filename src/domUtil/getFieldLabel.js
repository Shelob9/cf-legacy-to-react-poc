module.exports = function getFieldLabel(idAttr) {
	return document.querySelectorAll(`[for="${idAttr}"]`)[0].innerHTML;
};
