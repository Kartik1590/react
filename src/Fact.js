import React, { useState } from "react";
import supabase from "./supabase";
const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];
  
  

function Fact({fact,setFacts}){

  const [isUpdating,setIsUpdating]=useState(false);

  const handleVote=async(columnName)=>{
    setIsUpdating(true);
    const {data,error}= await supabase
    .from('todayfact')
    .update({[columnName]:fact[columnName] + 1})
    .eq('id',fact.id)
    
    setIsUpdating(false);
    if(!error) setFacts((facts)=>facts.map((f)=>(f.id===fact.id ? data[0]:f)))
    
  }
   
    
    return(

        <li key={fact.id} className="fact">
            <p>
                {fact.text}
                <a className="source" href={fact.source} target="_blank">(Source)</a>
                
            </p>
            <span className="tag" style={{backgroundColor:CATEGORIES.find((cat)=>cat.name===fact.category).color}}>{fact.category}</span>
            <div className="vote-button">
                <button className="btn-voting" onClick={()=>handleVote("voteplus")} disabled={isUpdating}>👍 {fact.voteplus}</button>
                <button className="btn-voting" onClick={()=>handleVote("votepp")} disabled={isUpdating}>🤯 {fact.votepp}</button>
                <button className="btn-voting" onClick={()=>handleVote("votedown")} disabled={isUpdating}>⛔ {fact.votedown}</button>
              </div>

        </li>
    
        );
}
export default Fact;