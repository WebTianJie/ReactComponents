import React from 'react';
import Form from '../Form/index'
function FormContext() {
  return (
   <Form onSubmit={(formData)=> console.log("formData",formData)}>
     姓名:<Form.Input type='text' name='name' placeholder="请输入姓名" /><br/>
     密码:<Form.Input type='password' name='pwd' placeholder='请输入密码' /><br />
     <Form.Button>提交</Form.Button>
   </Form>
  );
}

export default FormContext;
