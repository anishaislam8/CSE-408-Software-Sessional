import React from 'react'
import bgimage from './../img/placeholder.png'

function Homepage() {
    return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{margin : 50}}>

        <div class="row">
            <div class="col s12 m6" style={{paddingTop : "10%", paddingLeft : "10%"}}>
                <h1>Welcome to Fiber@Home</h1>
                <p>
                We provide high speed internet to every union of Bangladesh.
                </p>
            </div>
            <div class="col s12 m6" style = {{paddingRight : "5%"}} >
                <img src={bgimage} alt="Logo" height="100%" width="90%" />
            </div>
        </div>
       
    </div>

   
    )
}

export default Homepage
