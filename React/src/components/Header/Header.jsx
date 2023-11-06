import logo from '../../assets/cludatte.png'

function Header (props) {
    return (
        <nav className='navbar navbar-expand-lg bg-dark'>
        <div className='container-fluid'>
            <a className='navbar-brand text-light' href='#'>
                <img src={logo} width='30' height='30' className='d-inline-block align-top' alt='logo'/>
                CarMaster 
            </a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 mx-2'>
                <li className='nav-item'>
                    <a className='nav-link text-light mx-2' href='#'>Home</a>
                </li>
                <li>
                    <a className='nav-link text-light mx-2' href='#'>Login</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default Header;