const Notification = ({ text, setText, title = 'Error', className = 'is--danger' }) => {
    return text ? (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className={'message ' + className}>
                    <div className="message-header">
                        <p>{title}</p>
                        <button className="delete" aria-label="delete" onClick={() => setText(null)}></button>
                    </div>
                    <div className="message-body">{text}</div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setText(null)}></button>
        </div>
    ) : (
        ''
    );
};

export const ErrorNotification = ({ error, setError }) => {
    return Notification({ text: error, setText: setError, title: 'Error', className: 'is-danger' });
};

export const InfoNotification = ({ text, setText }) => {
    return Notification({ text: text, setText: setText, title: 'Message', className: 'is-info' });
};

export default Notification;
