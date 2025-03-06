import {Outlet} from "react-router-dom";


const NavLayout=()=>{
    return(
        <div>
            <span>NavLayout</span>
            <Outlet/>
        </div>
    )
}
export default NavLayout