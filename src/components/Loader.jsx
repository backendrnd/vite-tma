function Loader() {
    return (
        <section className="hero is-fullheight">
            <div className="hero hero-head is-primary">
                <div className="container p-4">
                    <p className="title">Shore.io</p>
                    <p className="subtitle">PON mining</p>
                </div>
            </div>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <button className="button is-loading is-ghost is-large">Loading</button>
                </div>
            </div>
        </section>
    );
}

export default Loader;
