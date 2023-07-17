import React, { useEffect, useState } from "react";
import supabase from "./supabase";
import "./styles.css"
import "./queries.css"

import FactList from "./FactList";
import Header from "./Header";
import CategoryFilter from "./CategoryFilter";
import Form from "./Form"
import Loader from "./Loader";
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

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];


function App() {
  const [showForm, setShowForm]=useState(false);
  const [facts,setFacts]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [currentCategory,setCurrentCategory]=useState("all")
  useEffect(()=>{
    const getFacts=async()=>{
      setIsLoading(true);
      let Query=supabase.from("todayFact").select("*")
      if(currentCategory!=="all"){
        Query=Query.eq('category',currentCategory)
      }
let { data: todayFact, error } = await Query
.order("voteplus",{ascending:false})
.limit(100);
if(!error) setFacts(todayFact)
else alert("There was an Error")
setIsLoading(false);
    }
    getFacts()
  },[currentCategory])

  return (
    <div>
    <Header text={"Share a fact"} click={()=>setShowForm((show)=>!show)} texts={showForm ? "Close":"share a fact"} />
    {showForm ? <Form setFacts={setFacts} setShowForm={setShowForm} /> : null}
    
    <main className="main">
    <CategoryFilter setCurrentCategory={setCurrentCategory} />
    {isLoading?<Loader />:<FactList facts={facts} />}
    
    
    </main>
    
  </div>
  );
}


export default App;
