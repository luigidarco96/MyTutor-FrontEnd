import React,{ Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { logout } from '../utils/auth';

class Error401 extends Component{
    render(){
        let user = JSON.parse(localStorage.getItem('user'));
        const positionImgStyle={
            fontWeight: "400",
            margin: "5px 0px",
            padding: "2px 15px",
            fontSize: "50px",
            textDecoration:"none",
            color:"white",
        }
        const spanStyle={
            padding:"0px 0px" ,
            marginBottom: "12px",
        }
        const styleDivError={
            top: '34%',
            position: 'absolute',
            left: '18%',
            
        }
        const styleErrorText={
            fontSize: '200px',
            fontWeight: '400',
            color:'#274F77',
          
        }
        const stylePError={
            fontSize: '35px',
            color: '#274F77',
            float:'right',
            marginTop: '8%',
        }
        return(
            <div>
                <Navbar className="custom-navbar" fluid style={{backgroundColor: "#274F77"}}>
                    <Navbar.Header>
             
                        <div style={spanStyle}>
                            <a href="http://localhost:3000/home" style={positionImgStyle}> 
                                <img style={{height: "50px"}}src="/assets/images/logo_progetto_tutorato_light.png" alt="logo_image" />
                                <span style={{fontSize:"15px", marginTop: "30px", marginLeft: "4px",position: "absolute"}}> MYTUTOR</span> 
                            </a> 
                        </div>
                    
                    </Navbar.Header>
                </Navbar>
                <span style={styleDivError}>
                    <span style={styleErrorText}>401  
                        <p style={stylePError}>
                            Accesso non autorizzato<br/>
                            <ul>
                                <li>
                                <span style={{fontSize:'large',color:'black'}}>Effettuare il <div href='' style={{cursor:'pointer'}} onClick={logout}>logout</div> e connettersi con un altro account</span>
                                </li>
                                <li>
                                <span style={{fontSize:'large',color:'black'}}>Accedi nuovamente alla pagina dei <div  style={{cursor:'pointer'}} onClick={()=>{window.location.replace('http://localhost:3000/'+user.role[0].toLowerCase()+user.role.slice(1)+'/notices')}}>bandi</div></span>
                                </li>
                            </ul> 
                        </p>
                    </span> 
                </span>   
                

                   
               
            </div>
        )
    }
}
export default Error401;