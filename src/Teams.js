import React from 'react'
function Teams(props) {
    console.log("hii",props);
    var carts=props.carts;
    console.log(carts);
if(carts.length===0){
  return(
    <div id="Teams">select team members first</div>
  ) 
}
  return (
    <div>
    <div id="Teams"> TEAM (People with unique domain)</div>
    
    {carts.map((cart) => {
          return (
<div className='parents-1'>
        <div>
            <img src={cart.avatar} alt={"company"} />
        </div>
        <div className='parents-2'>
            <h3 className='parents-3'>{cart.first_name} {cart.last_name}</h3>
            <h2 className='parents-4'>{cart.domain}</h2>
            <p className='parents-5'>
               Email: {cart.email}
            </p> 
            <div className='parents-7'> 
                <span className='parents-8'> {cart.gender} </span>
            </div>  
        </div> 
    </div>
      );
    })}
    </div>
  )
}

export default Teams
