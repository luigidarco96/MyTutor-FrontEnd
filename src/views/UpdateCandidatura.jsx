import React,{Component} from 'react';
import Upload from '../components/UploadDocuments/Upload';

class UpdateCandidatura extends Component{
    constructor(props){
        super(props);

    }
    
    render(){
        
        const notice_protocol=this.props.match.params.id;
        
        return(
            <Upload notice_protocol={notice_protocol}/>
        )
    }
}

export default UpdateCandidatura;