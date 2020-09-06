import React from 'react'

export default function Form(props) {
	const { formData, onChange, data } = props
	function renderRadioAndCheckBox(data, name, value, type) {
		return data.map((item, index) => (
			<span key={item.value}>
				<input
					type={type}
					onChange={onChange}
					name={name}
					key={item.value}
					value={item.value}
					checked={
						type === 'radio'
							? item.value === value
							: value.includes(item.value)
					}
				/>
				<span key={item.value + index}>{item.text}</span>
			</span>
		))
	}
	function renderSelectOption(data, name, value) {
		return data.map((item) => (
			<option key={item.value} value={item.value}>
				{item.text}
			</option>
		))
	}
	function renderFrom(formData) {
		return formData.map((item) => {
			const name = item.name
			const value = data[name]
			switch (item.type) {
				case 'input':
					return (
						<div className="form-item" key={item.id}>
							<label>{item.label}</label>
							<input
								maxLength={item.maxLength}
								name={name}
								value={data[name]}
								onChange={onChange}
							/>
						</div>
					)
				case 'radio':
					return (
						<div className="form-item" key={item.id}>
							{renderRadioAndCheckBox(
								item.data,
								name,
								value,
								'radio'
							)}
						</div>
					)
				case 'checkbox':
					return (
						<div className="form-item" key={item.id}>
							{renderRadioAndCheckBox(
								item.data,
								name,
								value,
								'checkbox'
							)}
						</div>
					)
				case 'select':
					return (
						<select
							key={item.id}
							name={name}
							value={value}
							onChange={onChange}
						>
							{renderSelectOption(item.data, name, value)}
						</select>
					)
				default:
					break
			}
		})
	}

	return <div>{renderFrom(formData)}</div>
}
