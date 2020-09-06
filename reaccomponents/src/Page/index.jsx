import React, { useState } from 'react'
import Form from '../component/hookform/form'
import { GENDER, HOOPY, DGREE, YEARSSERVICEGRADUATION } from '../until'
const formData = [
	{
		id: 'code_001',
		label: '姓名:',
		name: 'name',
		type: 'input',
		isRequired: false,
		maxLength: 18,
	},
	{
		id: 'code_002',
		label: '性别',
		name: 'gender',
		type: 'radio',
		data: GENDER,
	},
	{
		id: 'code_0022',
		label: '性别01',
		name: 'gender01',
		type: 'radio',
		data: GENDER,
	},
	{
		id: 'code_003',
		label: '爱好01:',
		name: 'hoppy',
		type: 'checkbox',
		data: HOOPY,
	},
	{
		id: 'code_004',
		label: '爱好02:',
		name: 'hoppy02',
		type: 'checkbox',
		data: HOOPY,
	},
	{
		id: 'code_005',
		label: '学历',
		name: 'educate',
		type: 'select',
		data: DGREE,
	},
	{
		id: 'code_006',
		label: '工作经验',
		name: 'workYears',
		type: 'select',
		data: YEARSSERVICEGRADUATION,
	},
]
export default function PageIndex() {
	const data = {
		name: '',
		gender: 'female',
		gender01: '',
		hoppy: [],
		hoppy02: [],
		educate: 'special',
		workYears: 'three_five',
	}
	const [state, setState] = useState({ ...data })
	const onChange = (e) => {
		e.persist()
		const { name, value, type } = e.target
		if (type === 'checkbox') {
			if (e.target.checked) {
				const newData = [...state[name], value]
				setState({
					...state,
					[name]: newData,
				})
			} else {
				let newData = state[name].filter((item) => item !== value)
				setState({
					...state,
					[name]: newData,
				})
			}
		} else {
			setState({
				...state,
				[name]: value,
			})
		}
	}
	const onSubmit = () => {
		console.log('state', state)
	}
	return (
		<div className="components-wrap">
			<Form data={state} formData={formData} onChange={onChange} />
			<button onClick={onSubmit}>提交</button>
		</div>
	)
}
