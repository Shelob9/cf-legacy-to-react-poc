import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import useLegacyTextField from './hooks/useLegacyTextField';
import {
	getCheckboxValue,
	getFieldLabel
} from './domUtil';


const testFieldIdAttr = 'fld_3023758_1';
const checkboxFieldId = 'fld_8317391';
const checkboxFieldIdAttr = 'fld_8317391_1';

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
			{Object.keys(fields).map( fieldIdAttr=> {
				const value = fields[fieldIdAttr];
				const label = fieldLabels[fieldIdAttr];

				if( Array.isArray(value)){
					return <li key={fieldIdAttr}>
						<ul>
							{value.map(v => {
							return <li key={v}>{fieldLabels[v]}</li>
						})}
						</ul>

					</li>
				}
				return <li key={fieldIdAttr}><span>{label}</span>{value}</li>

			})}
		</ul>
	);
};




function Form({ values, onChange }) {
	const fieldLabels = useRef({});
	const setFieldLabels = newValues => {
		fieldLabels.current = { ...fieldLabels.current, ...newValues };
	};
	const [text] = useLegacyTextField(values[testFieldIdAttr], testFieldIdAttr,onChange, setFieldLabels);

	/**
	 * Checkbox field
	 *
	 * https://daveceddia.com/useeffect-hook-examples/
	 */
	const [checkboxes, setCheckboxes] = useState(values[checkboxFieldIdAttr]);
	const checkboxRef = useRef({ el: null, boxes: null });

	const updateCheckboxes = newValues => {
		setCheckboxes(newValues);
		onChange({ [checkboxFieldIdAttr]: newValues });
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
					if(checkboxes.includes(box.id)){
						box.checked = true;
					}else {
						box.checked = false;
					}

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
						[testFieldIdAttr]:text,
						[checkboxFieldIdAttr]:checkboxes
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
		[testFieldIdAttr]: 'Default Text!',
		[checkboxFieldIdAttr]: ['fld_8317391_1_opt1319483']
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
					onChange={e => setShowForm(!showForm)}
				/>
			</div>
			{showForm && <Form values={formValues} onChange={onChange} />}
			<p>{formValues[testFieldIdAttr]}</p>
			<p>{formValues[checkboxFieldIdAttr].length}</p>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
