import React,{useState} from 'react';
import {Provider} from './context'
import Input from './Input'
import Button from './Button'
function Form(props) {
  const [formData, setFormData] = useState({name:'',pwd:''});
  return (
    <Provider value={{
      formData,
      onFormDataChange:(name,value)=> setFormData({...formData,[name]:value}),
      submit:()=> props.onSubmit&&props.onSubmit(formData)
      } } >
        {props.children}
    </Provider>
  );
}
Form.Input=Input;
Form.Button=Button;

export default Form;
