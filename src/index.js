import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const fieldId = 'fld_3023758_1';
import './styles.css';
const TXT_FIELD = `
<div data-field-wrapper="fld_3023758" class="form-group" id="fld_3023758_1-wrap">
	<label id="fld_3023758Label" for="${fieldId}" class="control-label">CF Field</label>
	<input    type="text" data-field="fld_3023758" class=" form-control" id="${fieldId}" name="fld_3023758" value="" data-type="text"   aria-labelledby="fld_3023758Label" >			</div>
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
                            <input type="checkbox" data-label="b" data-field="fld_8317391" id="fld_8317391_1_opt1595081" class="fld_8317391_1" name="fld_8317391[opt1595081]" value="b" data-type="checkbox" data-checkbox-field="fld_8317391_1" data-calc-value="2">
                    b                </label>

                					</div>
																	<div class="checkbox">
				
                <label for="fld_8317391_1_opt1319483">
                            <input type="checkbox" data-label="c" data-field="fld_8317391" id="fld_8317391_1_opt1319483" class="fld_8317391_1" name="fld_8317391[opt1319483]" value="c" data-type="checkbox" data-checkbox-field="fld_8317391_1" data-calc-value="c">
                    c                </label>

                					</div>
											</div>
</div>`;

function App() {
	const [text, setText] = useState('Default Text');
	const cfField = useRef(null);
	const inputFieldRef = useRef(null);

	//https://daveceddia.com/useeffect-hook-examples/
	useEffect(
		() => {
			cfField.current = document.getElementById('fld_3023758_1');
			cfField.current.value = text;
			cfField.current.onkeypress = e => setText(e.target.value);
			return () => {};
		},
		[text]
	);

	return (
		<div className="App">
			{React.cloneElement(
				<div dangerouslySetInnerHTML={{ __html: TXT_FIELD }} />
			)}
			<div>
				<label htmlFor="normal-field">Normal Field</label>
				<input
					id="normal-field"
					ref={inputFieldRef}
					value={text}
					onChange={e => setText(e.target.value)}
				/>
			</div>

			<div>
				<ul>
					<li>This is the value both text inputs should have:</li>
					<li>Text: {text} </li>
				</ul>
			</div>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
