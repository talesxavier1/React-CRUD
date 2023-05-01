import "./fontawesome.css"


interface Ifontawesome {
    iconClass: string
}

const Fontawesome = (prps: Ifontawesome) => {
    return (
        <div className="icon_container_532DDBF3">
            <i className={prps.iconClass} />
        </div>
    )
}

export default Fontawesome;