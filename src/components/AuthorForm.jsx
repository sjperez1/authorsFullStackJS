import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
// notes from lecture:
// 1. input: useState
// 2. axios
// optional: redirect: useNavigate
import {Link} from "react-router-dom"

const AuthorForm = () => {
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleSubmit =(e) =>{
        e.preventDefault()
        // post the new to the backend
        axios.post(`http://localhost:8000/api/authors`, {name})
            .then(res=>{
                console.log(res.data)
                navigate("/")
            })
            .catch(err=>{
                const errMsgArr = []
                const errResponse = err.response.data.errors
                for(const eachKey in errResponse) {
                    errMsgArr.push(errResponse[eachKey].message)
                }
                setErrors(errMsgArr)
                console.log(err) // .catch is unsuccessful
            })
        // reset the form so that the form clears on submission
        setName("")
    }

    const handleCancel = () => {
        navigate("/")
    }

    return (
        <div>
            <Link to={`/`}>Home</Link>
            <h3>Add a new author:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
            {
                errors.map((err, i) => {
                    return(
                        <p style={{color: "red"}} key={i}>{err}</p>
                    )
                })
            }
        </div>
    )
}

export default AuthorForm