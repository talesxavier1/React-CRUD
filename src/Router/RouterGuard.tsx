import { useContext } from "react";
import BackDrop from "../Components/Components/BackDrop/BackDrop";
import { AuthContext } from "../Contexts/Auth";
import { useQuery } from 'react-query'
import { Navigate, useLocation } from 'react-router-dom'

const RouterGuard = (props: any) => {
    const StorageData = sessionStorage.getItem("userToken");
    const authContext = useContext(AuthContext);
    const location = useLocation();

    const { data, isFetching } = useQuery(
        ["validateToken", location.pathname],
        async () => {
            if (!StorageData) { return false; }
            let result = await authContext?.validateUserToken(StorageData);
            if (!result) {
                sessionStorage.removeItem("userToken");
                return false;
            }
            return true;
        },
        { refetchOnWindowFocus: false, cacheTime: 0 }
    );


    if (isFetching) {
        return <BackDrop />;
    } else {
        if (data) {
            return props.children;
        } else {
            return <Navigate to='/login' />
        }
    }
}


export default RouterGuard;



