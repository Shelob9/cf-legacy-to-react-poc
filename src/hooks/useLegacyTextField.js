import {useEffect, useRef, useState} from "react";
import getFieldLabel from  '../domUtil/getFieldLabel';
export default  function useLegacyTextField(initialValue, idAttr,formChangeFunction, setFieldLabels) {
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
			setFieldLabels({
				[idAttr]: getFieldLabel(idAttr)
			});
			return () => {
				setFieldLabels({
					[idAttr]: getFieldLabel(idAttr)
				});
			};
		},
		[text]
	);

	return [text,updateText]
}
