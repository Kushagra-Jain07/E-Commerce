import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../actions/userActions"

function RegisterScreen(props){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userRegister = useSelector(state=> state.userRegister)
    const {loading, userInfo, error} = userRegister
    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/" 

    useEffect(() => {
        if(userInfo && redirect !== "/"){
            props.history.push("/signin?redirect=shipping")
        }else if(userInfo && redirect === "/"){
            props.history.push("/signin")   
        }
        return() => {

        }
    }, [userInfo,props.history,redirect])

    const submitHandler = () =>{
        if(rePassword === password){
            dispatch(register(name,email,password))
        }
        
    }

    return(
          <div className="form">
                  <ul className="form-container">
                      <li>
                          <h2>Create Account</h2>
                      </li>
                      <li>
                          {loading && <div>Loading..</div>}
                          {error && <div>{error}</div>}
                      </li>
                      <li>
                          <label htmlFor="name">Name</label>
                          <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                      </li>
                      <li>
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                      </li>
                      <li>
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" id="password" onChange={(e)=> setPassword(e.target.value)} />
                      </li>
                      <li>
                          <label htmlFor="rePassword">Re-enter Password</label>
                          <input type="password" name="re-Password" id="re-Password" onChange={(e)=> setRePassword(e.target.value)} />
                      </li>
                      <li>
                          <button type="button" onClick={submitHandler} className="button primary">Register</button>
                      </li>
                      <li>
                          Already Have an Account? 
                          <Link to={redirect === "/" ? "/signin" : "/signin?redirect="+ redirect} className="button secondary text-center">Sign-in</Link>
                      </li>
                  </ul>
          </div>
    )
}

export default RegisterScreen