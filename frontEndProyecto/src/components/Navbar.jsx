import '../assets/navBar.css';
import { CiUser } from "react-icons/ci";
import { FaNewspaper } from "react-icons/fa";
import { CiCalculator1 } from "react-icons/ci";
import { FaQuestion } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { verificarRol } from '../services/user';
export function NavBar() {
    
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(true);
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        const verAdmin = async () => {
            const res = await verificarRol(token);
            console.log(res.rol);
           
                if (res.rol == 'admin') {
                    console.log('entro');
                   setShow(true);
                }else{
                    setShow(false);
                }
            
        }
        verAdmin();
    }, []);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar">
                <div className="logo" onClick={() => {navigate('/')}} style={{cursor:"pointer"}}>Portal de estudiantes</div>
                <ul className="nav-links">
                    <li  id='noti'><a onClick={() => {navigate('/')}} style={{cursor:"pointer"}}><FaNewspaper/> Noticias</a></li>
                    {show && <li id='adminoti'><a  onClick={() => {navigate('/adminPreguntas')}} style={{cursor:"pointer"}}><FaNewspaper/> Administrar noticias</a></li>}
                    <li id='calc'><a  href="calculadora"><CiCalculator1/> Calculadora</a></li>
                    <li id='faq'><a  onClick={() => {navigate('/FAQ')}}  style={{cursor:"pointer"}}><FaQuestion/> Preguntas y respuestas</a></li>
                    {show && <li id='modfaq'><a  onClick={() => {navigate('/adminModerador')}} style={{cursor:"pointer"}}><FaNewspaper/> Moderar preguntas</a></li>}
                    <li  id='cerrar'><a onClick={logout}  style={{cursor:"pointer"}}><CiUser></CiUser> Cerrar sesion</a></li>
                </ul>
            </nav>
        </>
    )
}