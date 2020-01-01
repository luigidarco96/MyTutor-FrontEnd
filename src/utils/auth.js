import axios from "axios";

export const dictionaryPath ={
    student : 'Student',
    professor: 'Professor',
    ddi: 'DDI',
    admin: 'Teaching Office',
}

export const isLogin = (path) => {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));
    path = path.Path.split("/")[1];
    if (token != null && dictionaryPath[''+path]===user.role){
        return true;
    }
    else if(token != null && dictionaryPath[''+path]!=user.role){
        return 'Not Authorized';
    }
    else
        return false;
}

export const login = (userEmail, userPassword) =>{
    axios
    .post('http://localhost:3001/api/auth/login', {
      user: {
        email: userEmail,
        password: userPassword,
      }
    })
    .then(blob =>{
            localStorage.setItem('status', blob.data.status);
            localStorage.setItem('token',blob.data.token);
            localStorage.setItem('user', JSON.stringify(blob.data.user));
            let user = JSON.parse(localStorage.getItem('user'));
            switch(user.role){
     
                case 'DDI': window.location.replace("http://localhost:3000/ddi/notices");
                    break;
                case 'Professor': window.location.replace("http://localhost:3000/professor/notices");
                    break;
                case 'Student': window.location.replace("http://localhost:3000/student/notices");    
                    break;
                case 'Teaching Office': window.location.replace("http://localhost:3000/admin/notices");
                    break;
            }

        });
        
        
}


export const logout = () =>{
    localStorage.removeItem('status');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.replace("http://localhost:3000/home");

}