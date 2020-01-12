import React, { Component } from "react";


class Error404 extends Component{
    render(){
        let user = JSON.parse(localStorage.getItem('user'));
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
            float: 'right',
            marginTop: '8%',
        }
        return(
               <span style={styleDivError}>
                    <span style={styleErrorText}>404
                        <p style={stylePError}>
                            Pagina non trovata<br/>
                            <ul>
                                <li>
                                <span style={{fontSize:'large',color:'black'}}>Controllare che la pagina a cui si vuole accedere sia corretta</span>
                                </li>
                                <li>
                                <span style={{fontSize:'large',color:'black'}}>Accedi nuovamente alla pagina dei <span style={{cursor:'pointer'}} onClick={()=>{window.location.replace('http://localhost:3000/'+user.role[0].toLowerCase()+user.role.slice(1)+'/notices')}}>bandi</span></span>
                                </li>
                            </ul> 
                        </p>
                    </span>
                </span>
        )
    }
}

export default Error404;