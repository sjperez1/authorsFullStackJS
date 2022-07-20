import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import DisplayTable from '../components/DisplayTable'
const Dashboard = () => {
    const [authorlist, setAuthorlist] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors`)
            .then(res=>setAuthorlist(res.data))
            .catch(err=>console.log(err))
    },[])

    const removeFromAuthor = (authorid) => {
        const filteredList = authorlist.filter((author, i) => {
            return(
                author._id !== authorid
            )
        })
        setAuthorlist(filteredList)
    }

    return (
        <div>
            <Link to={`/new`}>Add an author</Link> 
            <h3>We have quotes by:</h3>
            <DisplayTable authorlist={authorlist} removeFromAuthor={removeFromAuthor}/>
        </div>
    )
}

export default Dashboard