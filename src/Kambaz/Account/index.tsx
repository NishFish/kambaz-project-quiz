import Profile from "./Profile";
import Signin from "./Signin";
import { Routes, Route, Navigate } from "react-router";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux"
import Users from "./users";

export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen">
            <table>
                <tr>
                    <td valign="top">
                        <AccountNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
                            <Route path="/Signin" element={<Signin />} />
                            <Route path="/Signup" element={<Signup />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/Users" element={<Users />} />
                            <Route path="/Users/:uid" element={<Users />} />
                        </Routes>

                    </td>
                </tr>
            </table>
        </div>
    );
}
