import style from "./BackDrop.module.css"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = () => {
    return (
        <div className={style['backdrop-container']}>
            <Backdrop sx={{
                color: '#fff', zIndex: 10000, height: "100%"
            }} open={true} >
                < CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );
}

export default BackDrop;