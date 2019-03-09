import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import {
	useLegacyTextField,
	useLegacyCheckboxes
} from './hooks';
import {
	getCheckboxValue,
	getFieldLabel
} from './domUtil';


const textFieldId = 'fld_3023758_1';
const checkboxFieldId = 'fld_8317391';
const checkboxFieldIdAttr = 'fld_8317391_1';

const TXT_FIELD = `
<div data-field-wrapper="fld_3023758" class="form-group" id="fld_3023758_1-wrap">
	<label id="fld_3023758Label" for="${textFieldId}" class="control-label">CF Field</label>
	<input    type="text" data-field="fld_3023758" class=" form-control" id="${textFieldId}" name="fld_3023758" value="" data-type="text"   aria-labelledby="fld_3023758Label" >			</div>
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
	const [text] = useLegacyTextField(values[textFieldId], textFieldId,onChange, setFieldLabels);

	const [checkboxes] = useLegacyCheckboxes(values[checkboxFieldIdAttr],checkboxFieldIdAttr, onChange, setFieldLabels);

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
						[textFieldId]:text,
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
		[textFieldId]: 'Default Text!',
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
			<p>{formValues[textFieldId]}</p>
			<p>{formValues[checkboxFieldIdAttr].length}</p>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
