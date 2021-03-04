import React from 'react';
import PropTypes from 'prop-types'
 import {Consumer} from './context'
function Input(props) {
  return (
   <Consumer>
     {
       (ctx)=>{
          return <input 
          value={ctx.formData[props.name]}
           type={props.type} 
           placeholder={props.placeholder}
           onChange={(e)=> ctx.onFormDataChange(props.name,e.target.value)} />
       }
     }
   </Consumer>
  );
}
Input.defaultProps={
  type:'text',
  placeholder:'请输入'
}
Input.propTypes={
  name:PropTypes.string.isRequired,
  placeholder:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired
}
export default Input;
