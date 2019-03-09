import {useEffect, useRef, useState} from "react";

import getFieldLabel from "../domUtil/getFieldLabel";

/**
 * Hook that manages checkboxes that exist on the DOM as HTML
 *
 * @param {Array} initialValues
 * @param {string} idAttr Id attribute
 * @param {Function} formChangeFunction onChange function for form
 * @param {Function} setFieldLabels Function to set field values from DOM (Remove?)
 * @return {*[]}
 */
export default function useLegacyCheckboxes(initialValues,idAttr, formChangeFunction, setFieldLabels) {
	const [checkboxes, setCheckboxes] = useState(initialValues);
	const checkboxRef = useRef({el: null, boxes: null});

	const updateCheckboxes = newValues => {
		setCheckboxes(newValues);
		formChangeFunction({[idAttr]: newValues});
	};
	useEffect(
		() => {
			checkboxRef.current = {
				el: document.getElementById(idAttr),
				boxes: document.querySelectorAll(
					`#${idAttr}-wrap input`
				)
			};
			const {boxes} = checkboxRef.current;
			if (boxes.length) {
				let boxLabels = {
					[idAttr]: getFieldLabel(idAttr)
				};
				boxes.forEach(box => {
					box.checked = checkboxes.includes(box.id);
				});
				setFieldLabels(boxLabels);
			}

			function getValuesFormCheckboxes(boxes) {
				let values = [];
				if (boxes.length) {
					boxes.forEach(box => {
						if (box.checked) {
							values.push(box.id);
						}
					});
				}
				return values;
			}

			if (boxes.length) {
				boxes.forEach(box => {
					box.addEventListener('change', () =>
						updateCheckboxes(getValuesFormCheckboxes(boxes))
					);
				});
			}
			return () => {};
		},
		[1]
	);

	return [checkboxes,setCheckboxes];
}
