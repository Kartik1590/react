import React, { useState } from "react";
import Fact from "./Fact"


const FactList=({facts,setFacts})=>{
    if(facts.length===0) return <p className="message">
        No facts for this category
    </p>

    return( 
        <section>
    <ul className="fact-list">
        {facts.map((fact)=>(
            <Fact key={fact.id} fact={fact} setFacts={setFacts} />

        ))}
    </ul>
    
</section>
    )
}
export default FactList;