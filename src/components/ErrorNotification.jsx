const ErrorNotification = ({ error, setError }) => {
    return error ? (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="notification is-danger">
                    <button className="delete" onClick={() => setError(null)}></button>
                    {error}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    ) : (
        ''
    );
};

export default ErrorNotification;
