import { Modal } from '@mui/material';
import ButtonComponent from '../Button/ButtonComponent';
import style from './ModalComponent.module.css'


interface props {
    modalAberto: boolean
    closeOpenModal: () => void
    content?: JSX.Element
    btnSaveAction: () => void
}

const ModalComponent = (props: props) => {
    return (
        <>
            <Modal
                open={props.modalAberto}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1
                }}
            >
                <div className={style['modal-container']}>
                    <div className={style['modal-header']}>
                        <button onClick={() => { props.closeOpenModal() }}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div className={style['modal-content']}>
                        {props.content}
                    </div>
                    <div className={style['buttuns-area']}>
                        <ButtonComponent value='Salvar' variant='outlined' style={{ color: '#222834', backgroundColor: '#539553' }} onClick={() => { props.btnSaveAction() }} />
                        <ButtonComponent value='Voltar' variant='outlined' style={{ color: '#222834', backgroundColor: '#6c757d' }} onClick={() => props.closeOpenModal()} />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalComponent