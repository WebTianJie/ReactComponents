import React from 'react';
import {Consumer} from './context'
function Button(props) {
  return (
    <Consumer>
      {(ctx)=>{
        return <button onClick={()=> ctx.submit()}>
            {props.children}
        </button>
      }}
    </Consumer>
  );
}

export default Button;
