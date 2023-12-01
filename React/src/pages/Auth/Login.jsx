function Login(props) {
    return (
        <div className="container mt-3 bg-dark p-3">
            <p className="text-light text-center h3">Login</p>
            <div>
                <form className="form-control bg-dark border-dark">
                    <p className="text-light h5">Username</p>
                    <input type="text" className="form-control bg-secondary border-secondary text-light" />
                    <p className="text-light h5 mt-4">Password</p>
                    <input type="password" className="form-control bg-secondary border-secondary text-light" />
                    <div className="text-center">
                        <input type="submit" className="btn btn-primary btn-lg mt-4" value="Submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;