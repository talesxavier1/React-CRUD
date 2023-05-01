
import style from './Wrapper.module.css'


interface WrapperProps {
    WrapperShow: JSX.Element
}
const Wrapper = (wrapperProps: WrapperProps) => {
    return (
        <>
            {wrapperProps.WrapperShow}
        </>
    );
}

export default Wrapper;