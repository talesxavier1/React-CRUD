import { useContext } from "react";
import BackDrop from "../Components/Components/BackDrop/BackDrop";
import { AuthContext } from "../Contexts/Auth";
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'

const RouterGuard = (props: any) => {
    const StorageData = sessionStorage.getItem("userToken");
    const authContext = useContext(AuthContext);

    const { data, isFetching } = useQuery(
        ["validateToken", props.children.type.name],
        async () => {
            if (!StorageData) { return false; }
            let result = await authContext?.validateUserToken(StorageData);
            if (!result) {
                sessionStorage.removeItem("userToken");
                return false;
            }
            return true;
        },
        { refetchOnWindowFocus: false, cacheTime: 2000 }
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



