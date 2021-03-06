import {useEffect, useRef, useState} from "react";
import getFieldLabel from  '../domUtil/getFieldLabel';

/**
 * Hook that manages text fields that exist on the DOM as HTML
 *
 * @param {String|number} initialValue
 * @param {string} idAttr Id attribute
 * @param {Function} formChangeFunction onChange function for form
 * @return {*[]}
 */
export default  function useLegacyTextField(initialValue, idAttr,formChangeFunction) {
	const [text, setText] = useState(initialValue);
	const updateText = newValue => {
		setText(newValue);
		formChangeFunction({[idAttr]: newValue});
	};
	const textRef = useRef(null);

	useEffect(
		() => {
			textRef.current = document.getElementById(idAttr);
			textRef.current.value = text;
			textRef.current.onkeypress = e => updateText(e.target.value);
			return () => {

			};
		},
		[text]
	);

	return [text,updateText]
}
