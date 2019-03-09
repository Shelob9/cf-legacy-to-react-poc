import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const fieldId = 'fld_3023758_1';
import './styles.css';
const TXT_FIELD = `
<div data-field-wrapper="fld_3023758" class="form-group" id="fld_3023758_1-wrap">
	<label id="fld_3023758Label" for="${fieldId}" class="control-label">CF Field</label>
	<input    type="text" data-field="fld_3023758" class=" form-control" id="${fieldId}" name="fld_3023758" value="" data-type="text"   aria-labelledby="fld_3023758Label" >			</div>
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
