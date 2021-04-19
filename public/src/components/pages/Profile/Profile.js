import React, { useState , useEffect} from 'react';
import './Profile.css';
import avatar from '../../../assets/img/avatar.png';
import {getUser,getToken, setUserStorage} from '../../../services/helpers/StorageFunctions';


export const Profile = () => {
    const [user, setUser] = useState(getUser()); 
    const [token, setToken] = useState('');

    useEffect(() => {
        setUser(getUser());
        setToken(getToken());
    },[''])
    
    
    const [file, setFile] = useState(null);
    const[image,setImage] = useState(null);
    const convertBinaryImage = (e) => {
        if(!e.target.files[0]) return;
        setUpdateData({...updateData, img: null})
        const file = e.target.files[0]
        setFile(file);
        console.log(file)
        let reader = new FileReader()
        reader.readAsDataURL(file)
    
        let bin = null
    
        reader.onload = function() {
          bin = reader.result
          setImage(bin)
          
        }
      
        reader.onerror = function() {
          bin = null
        }
    }

    const uploadImage =(img, token) => {
        
        return fetch(`http://localhost:10002/api/v1/storage`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:img
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    }

     
    const uploadFile = async () => {
        if(!file) {
            updateUser(updateData);
            return;
        }

        let formData = new FormData();
        formData.append('document', file);
        console.log(file, token)
        await uploadImage(formData, token)
            .then(res => {
                updateUser({...updateData, img: res.filename});
            })
            .catch(err => {
                console.log(err);
            });    
        }

    const [updateData,setUpdateData] = useState({
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        birthday:new Date(user.birthday).toLocaleDateString(),
        password:user.password,
        password2:"",
        _id: user._id,
        img:user.img
    })
    

    const updateUser = async(updateData) => {
        console.log(updateData.img)
            fetch(`http://localhost:10003/api/v1/users/current-user`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            })
            .then(r => r).then((result)=> {
                if(result){
                    setUser(updateData);
                    setUpdateData(updateData)
                    localStorage.setItem("user", JSON.stringify(updateData));
                }
            })
    }

    const handleUpdateUser = async(e) => {
        e.preventDefault()
        await uploadFile()   
      }


    
    return(
        <div className='wraper'>
        <div className='container'>
            <div className="reg-row">
                <h2 className='log-title'>My Profile</h2>
            </div>
        <form className="form-profile" onSubmit={handleUpdateUser}>
            <div className="col span-1-of-3">
                <div className='avatar'>
                    <img src={updateData.img ? `http://localhost:10002/api/v1/storage/${updateData.img}` : image || avatar} className='image-avatar'/>
                    <input type='file' className='avatar-btn' onChange={(e) => convertBinaryImage(e)}></input>
                </div>
            </div>
            <div className='col span-1-of-3'>
                    
                <label>First Name</label>
                <input 
                type="text" 
                id='firstName' 
                className='form-control' 
                value={updateData.first_name} 
                onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}>
                </input>
                <label>Email</label>
                <input 
                type="email" 
                id='email' 
                className='form-control' 
                value={updateData.email} 
                onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}>
                </input>
                <label>Password</label>
                <input 
                type="password" 
                id='password' 
                value={updateData.password} 
                className='form-control'  
                onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}>
                </input>  
                <div className='button-div'>
                <input type="submit" value="Save" className='update-acc'/>
                </div>
            </div>
            <div className="little-left">
                <label>Last Name</label>
                <input 
                type="text" 
                id='lastName' 
                className='form-control' 
                value={updateData.last_name} 
                onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}>
                </input>
                <label>Birthday</label>
                <input 
                type="date" 
                id='birthday' 
                className='form-control' 
                value={updateData.birthday} 
                onChange={(e) => setUpdateData({ ...updateData, birthday: e.target.value })}>
                </input>
                <label>Repeat Password</label>
                <input 
                type="password" 
                id='repeatPassword'  
                value={updateData.password} 
                className='form-control' 
                onChange={(e) => setUpdateData({ ...updateData, password2: e.target.value })}>
                </input>              
            </div>
        </form>
        </div>
        </div>        
        
    );  
};

export default Profile;