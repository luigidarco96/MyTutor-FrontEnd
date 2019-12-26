import React,{ Component } from 'react';
import Button from '../CustomButton/CustomButton'

class PopupInsertEmail extends Component{
    render(){
        const styleInputTextEmail={
            borderRadius:'10px',
            position:'relative',
            left:'21%',
            border:'1px solid #274F77',
            paddingLeft:'3px',
        }
        return(
            <div className='popup'>
                <div className='popupInner' style={{height:'155px'}}>
                    <div><Button className='buttonHover' onClick={this.props.closePopup} bsSize="sm" bsStyle="primary" style={{borderColor:'#274F77', position:'absolute',right:'8px',top:'8px',borderRadius:'10px'}}>x</Button></div>
                    <div style={{marginLeft:'55px',paddingTop:'45px'}}>
                    <p>{this.props.text}</p>
                    </div>
                    <div>
                        <input type='text' style={styleInputTextEmail}></input>
                    </div>
                    <div style={{marginLeft:'31%', marginTop:'2px'}}>
                        <Button bsStyle="primary" className='buttonHover' style={{borderRadius:'10px',width:'100px',borderColor:'#274F77'}}>Inserisci</Button>                   </div>
                    </div>

            </div>
        )

    }

}

export default PopupInsertEmail;