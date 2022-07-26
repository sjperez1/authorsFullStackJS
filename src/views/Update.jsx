import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
// nptes from lecture:
// pre-populated form
// 1. grab id from params (useParams)
// 2. display info on load (useEffect)
// 3. input : useState
// 4. grab info from backend: axios

const Update = () => {
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const {id} = useParams() // id from URL
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(res => {
            const author = res.data
            setName(author.name)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault()
        // need to give for the req.body in the update function in the backend controller. It will run through validations and if what is sent does not meet the validations, .catch with .status(400) will be sent back here to the frontend.
        axios.put(`http://localhost:8000/api/authors/${id}/edit`, {name})
            .then(res=>navigate("/"))
            .catch(err=>{
                const errMsgArr = [] // empty array to hold error messages
                const errResponse = err.response.data.errors // err.response.data.errors is the path that we take through the error response to get to the dictionaries that hold all of the information of each error.
                for(const eachKey in errResponse) { // eachKey is represents each dictionary in the errResponse that shows a dictionary for each error.
                    errMsgArr.push(errResponse[eachKey].message) // for each errResponse dictionary, we want to target specifically the value that is associated with the message key to present to client. Push the messages to the array so that we can set errors as this new array.
                }
                setErrors(errMsgArr)
                console.log(err) // .catch is unsuccessful
            })
    }

    const handleCancel = () => {
        navigate("/")
    }

return (
    <div>
        {/* The prepopualted form works because above the different form requests are set based on pulling from the database, so the value on each input has a preexisting value to populate the form. */}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <button type="submit">Update</button>
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

export default Update