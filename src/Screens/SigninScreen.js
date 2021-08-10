import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signin } from "../actions/userActions"

function SigninScreen(props){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state=> state.userSignin)
    const {loading, userInfo, error} = userSignin
    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/" 

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
        return() => {

        }
    }, [userInfo,props.history, redirect])

    const submitHandler = () =>{
        dispatch(signin(email,password))
    }

    return(
          <div className="form">
                  <ul className="form-container">
                      <li>
                          <h2>Sign-In</h2>
                      </li>
                      <li>
                          {loading && <div>Loading..</div>}
                          {error && <div>{error}</div>}
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
                          <button type="button" onClick={submitHandler} className="button primary">Signin</button>
                      </li>
                      <li>
                          New to Amazona?
                      </li>
                      <li>
                          <Link to={redirect === "/" ? "/register" : "/register?redirect="+ redirect} className="button secondary text-center">Create your Amazona account</Link>
                      </li>
                  </ul>
          </div>
    )
}

export default SigninScreen