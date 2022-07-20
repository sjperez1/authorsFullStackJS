import axios from "axios"
import React from "react"
import {Link} from "react-router-dom"
//lecture notes:
// 1. grab info on load (axios + useEffect)
// 2. store info with useState

const DisplayTable = (props) => {
    const {authorlist, removeFromAuthor} = props

    const handleDelete = (deleteId) => {
        // notes from lecture:
        // 1. Delete from database
        // 2. Update the list at the parent
        axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
            .then(res=>removeFromAuthor(deleteId))
            .catch(err=>console.log(err))
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Actions Available</th>
                </tr>
            </thead>
            <tbody>
                {
                    // since songlist is an array of objects, map can be used to go through the array.
                    authorlist.map((author, i)=>{
                        return(
                            <tr key={i}>
                                <td> {author.name}</td>
                                <td> <Link to={`/edit/${author._id}`}>Edit</Link><button onClick={() => handleDelete(author._id)}>Delete</button></td>
                                {/* need to make handle delete into an anonymous function because if you were to just put the id in parentheses nect to the function name, it would automatically execute for all. */}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default DisplayTable