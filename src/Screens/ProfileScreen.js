import React from "react"
import {useSelector} from "react-redux"

function ProfileScreen(){
    const userSignin = useSelector(state=> state.userSignin)
    const {userInfo} = userSignin

    return(
        <div className="profilescreen">
            <ul className="profile">
                <li>
                    <img src="/images/profilepic.jpg" alt="pp"></img>
                </li>
                <li>
                    <div>Username: {userInfo.name}</div>
                </li>
                <li>
                    <div>Email: {userInfo.email}</div>
                </li>
            </ul>
        </div>
    )
}

export default ProfileScreen