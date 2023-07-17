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
const Form=({setFacts,setShowForm})=>{
    const [text,setText]=useState("");
    const [source,setSource]=useState("");
    const [category,setCategory]=useState("");
    const[isUploading,setIsUploading]=useState(false);
    const textLength=text.length;
    function isValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
      }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(text && textLength<=200 && isValidHttpUrl(source) && category) {
          
          // const newFact={
          //             id: 6,
          // text,
          // source,
          // category,
          // votesInteresting: 0,
          // votesMindblowing: 0,
          // votesFalse: 0,
          // createdIn: new Date().getFullYear()}

         const {data:newFact,error}= await supabase.from('todayFact').insert([{text,source,category}]).select(); 
         setIsUploading(false);

          if(!error) setFacts((facts)=>[newFact[0],...facts]);

          setText("");
          setSource("");
          setCategory("");

          setShowForm(false);
        };

       
    }
    return( 
        <form className="fact_form" onSubmit={handleSubmit} >
    <input type="text" placeholder="Share a fact with world..." value={text} onChange={(e)=> setText(e.target.value)} disabled={isUploading}/>
    <span>{200-textLength}</span>
    <input type="text" placeholder="Trustworthy Source..." value={source} onChange={(e)=>setSource(e.target.value)} disabled={isUploading}/>
    <select name="" id="" onChange={(e)=>setCategory(e.target.value)} disabled={isUploading}>
        <option value="">Choose category</option>
        {CATEGORIES.map((cat)=>(<option key={cat.name} value={cat.name}  >{cat.name.toUpperCase()}</option>))}
        
    </select>
    <button className="btn btn--large " disabled={isUploading}>Post</button>
</form>
    )
}
export default Form;