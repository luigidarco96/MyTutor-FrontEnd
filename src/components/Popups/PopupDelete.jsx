import React,{ Component } from 'react';
import Button from '../CustomButton/CustomButton';
class PopupDelete extends Component{
    render(){
        return(
            <div className='popup'>
                <div className='popupInner'>
                    <div><Button className='buttonHover' onClick={this.props.closePopup} bsSize="sm" bsStyle="primary" style={{borderColor:'#274F77', position:'absolute',right:'8px',top:'8px',borderRadius:'10px'}}>x</Button></div>
                    <div style={{marginLeft:'55px',paddingTop:'45px'}}>
                    <p>{this.props.text}</p>
                    </div>
                    <div style={{marginLeft:'11px'}}>
                        <Button  bsStyle="primary" className='buttonHover' style={{marginRight:'2px',borderRadius:'10px',width:'140px',borderColor:'#274F77'}}>Si</Button>
                        <Button  onClick={this.props.closePopup} bsStyle="primary" className='buttonHover' style={{borderRadius:'10px',width:'140px',borderColor:'#274F77'}}>No</Button>
                    </div>
                </div>

            </div>
        )

    }
}
export default PopupDelete;