import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const testFieldIdAttr = 'fld_3023758_1';
const checkboxFieldId = 'fld_8317391';
const checkboxFieldIdAttr = 'fld_8317391_1';

import './styles.css';
const TXT_FIELD = `
<div data-field-wrapper="fld_3023758" class="form-group" id="fld_3023758_1-wrap">
	<label id="fld_3023758Label" for="${testFieldIdAttr}" class="control-label">CF Field</label>
	<input    type="text" data-field="fld_3023758" class=" form-control" id="${testFieldIdAttr}" name="fld_3023758" value="" data-type="text"   aria-labelledby="fld_3023758Label" >			</div>
</div>`;

const CHECKBOX_FIELD = `<div data-field-wrapper="fld_8317391" class="form-group" id="fld_8317391_1-wrap">
	<label id="fld_8317391Label" for="fld_8317391_1" class="control-label">Checkbox</label>
	<div class="">
											<div class="checkbox">
				
                <label for="fld_8317391_1_opt1519463">
                            <input type="checkbox" data-label="a" data-field="fld_8317391" id="fld_8317391_1_opt1519463" class="fld_8317391_1" name="fld_8317391[opt1519463]" value="a" data-type="checkbox" data-checkbox-field="fld_8317391_1" data-calc-value="1">
                    a                </label>

                					</div>
																	<div class="checkbox">
				
                <label for="fld_8317391_1_opt1595081">
                            <input  type="checkbox" data-label="b" data-field="fld_8317391" id="fld_8317391_1_opt1595081" class="fld_8317391_1" name="fld_8317391[opt1595081]" value="b" data-type="checkbox" data-checkbox-field="fld_8317391_1" data-calc-value="2">
                    b                </label>

                					</div>
																	<div class="checkbox">
				
                <label for="fld_8317391_1_opt1319483">
                            <input type="checkbox" data-label="c" data-field="fld_8317391" id="fld_8317391_1_opt1319483" class="fld_8317391_1" name="fld_8317391[opt1319483]" value="c" data-type="checkbox" data-checkbox-field="fld_8317391_1" data-calc-value="c">
                    c                </label>

                					</div>
											</div>
</div>`;

const SummaryField = (fields, fieldLabels) => {
	return (
		<ul>
			<li>
				{fieldLabels[testFieldIdAttr]}: {fields.text}{' '}
			</li>
			<li>
				{fieldLabels[checkboxFieldIdAttr]}:
				<ul>
					{fields.checkboxes.map(box => (
						<li key={box}>{fieldLabels[box]}</li>
					))}
				</ul>
			</li>
		</ul>
	);
};

function getFieldLabel(idAttr) {
	return document.querySelectorAll(`[for="${idAttr}"]`)[0].innerHTML;
}

function getCheckboxValue(idAttr) {
	return document.getElementById(idAttr).value;
}
function Form({ values, onChange }) {
	const fieldLabels = useRef({});
	const setFieldLabels = newValues => {
		fieldLabels.current = { ...fieldLabels.current, ...newValues };
	};
	/**
	 * Text field
	 *
	 * https://daveceddia.com/useeffect-hook-examples/
	 */
	const [text, setText] = useState(values.text);
	const updateText = newValue => {
		setText(newValue);
		onChange({ text: newValue });
	};
	const textRef = useRef(null);

	useEffect(
		() => {
			textRef.current = document.getElementById(testFieldIdAttr);
			textRef.current.value = text;
			textRef.current.onkeypress = e => updateText(e.target.value);
			setFieldLabels({
				[testFieldIdAttr]: getFieldLabel(testFieldIdAttr)
			});
			return () => {
				setFieldLabels({
					[testFieldIdAttr]: getFieldLabel(testFieldIdAttr)
				});
			};
		},
		[text]
	);

	/**
	 * Checkbox field
	 *
	 * https://daveceddia.com/useeffect-hook-examples/
	 */
	const [checkboxes, setCheckboxes] = useState(values.checkboxes);
	const checkboxRef = useRef({ el: null, boxes: null });

	const updateCheckboxes = newValues => {
		setCheckboxes(newValues);
		onChange({ checkboxes: newValues });
	};
	useEffect(
		() => {
			checkboxRef.current = {
				el: document.getElementById(checkboxFieldIdAttr),
				boxes: document.querySelectorAll(
					`input[data-field="${checkboxFieldId}"]`
				)
			};
			const { boxes } = checkboxRef.current;
			if (boxes.length) {
				let boxLabels = {
					[checkboxFieldIdAttr]: getFieldLabel(checkboxFieldIdAttr)
				};
				boxes.forEach(box => {
					boxLabels[box.id] = getCheckboxValue(box.id);
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
					box.checked = undefined !== checkboxes.find(b => box.id === b);
					box.addEventListener('change', () =>
						updateCheckboxes(getValuesFormCheckboxes(boxes))
					);
				});
			}
			return () => {
				console.log('Checkbox effect unmounted');
			};
		},
		[1]
	);

	return (
		<div className="form">
			<div>
				{React.cloneElement(
					<div dangerouslySetInnerHTML={{ __html: TXT_FIELD }} />
				)}
				{React.cloneElement(
					<div dangerouslySetInnerHTML={{ __html: CHECKBOX_FIELD }} />
				)}
			</div>

			<div>
				{SummaryField(
					{
						text,
						checkboxes
					},
					fieldLabels.current
				)}
			</div>
		</div>
	);
}

function App() {
	const [showForm, setShowForm] = useState(true);
	const [formValues, setFormValues] = useState({
		text: 'Default Text!',
		checkboxes: ['fld_8317391_1_opt1319483']
	});

	const onChange = newValues => {
		setFormValues({ ...formValues, ...newValues });
	};
	return (
		<div className="App">
			<div>
				<label htmlFor="show-form">Show Form</label>
				<input
					type={'checkbox'}
					id="show-form"
					showForm
					onChange={e => setShowForm(!showForm)}
				/>
			</div>
			<p>{showForm}</p>
			{showForm && <Form values={formValues} onChange={onChange} />}
			<p>{formValues.text}</p>
			<p>{formValues.checkboxes.length}</p>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
