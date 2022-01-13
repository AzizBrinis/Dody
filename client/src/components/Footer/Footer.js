import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <h3 className="devInfo">Website made with ❤ by Aziz Brinis</h3>
            <p className="copyright">Dady Company Copyright © {currentYear}</p>
            <p className="copyright">Special Thanks to : Mayssa & Radhia & Aymen & Me</p>
        </footer>
    )
}

export default Footer;