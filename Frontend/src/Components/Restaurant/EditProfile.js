import React, {useState} from'react';
import Axios from 'axios';
import {Col} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import './EditProfile.css'
import Nav from './Nav';


function EditProfile(){

    const[imgPreview,setImagePreview]=useState(null);
	const[error, setError]=useState(false);
	const[profileImg,setProfileImg]=useState("");
    
    


    const handleImageChange= async (e)=>{
        if(e.target.files && e.target.files.length > 0){
            console.log("check name",e.target.files[0]['name'])
            setProfileImg(e.target.files[0]);
          }
          const selected=e.target.files[0];
          const ALLOWED_TYPES=["image/png", "image/jpeg", "iamge/jpg"];
		if(selected&&ALLOWED_TYPES.includes(selected.type)){
			let reader=new FileReader();
			reader.onloadend=()=>{
				setImagePreview(reader.result);

			}
			reader.readAsDataURL(selected);
		}else{
			setError(true);
			console.log("file not supported");
		}
	}


	const uploadImage=()=>{
        const formData = new FormData();
        formData.append("originalname",profileImg);
        console.log("image here",profileImg)
        Axios.post("http://3.135.17.82:3001/editRestImg",formData).then((response)=>{
  
            console.log(response.data.imagePath);
            const imagePath = response.data.imagePath;
            Axios.defaults.headers.common.authorization = localStorage.getItem('token');
            Axios.post("http://3.135.17.82:3001/restPic",{
              id:localStorage.getItem('id'),picture:imagePath,})

});
		
		}

    //const[wname,setName]=useState(" ");
    const[newname,setNewName]=useState(" ");
    const[newemail,setNewEmail]=useState(" ");
    const[newphone,setNewPhone]=useState(" ");
    const[newloc,setNewLoc]=useState(" ");
    const[dType,setType]=useState("");
    const[newdesc,setNewDesc]=useState(" ");
    const[newtime,setNewTime]=useState(" ");

    const editName=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editName",
{id:localStorage.getItem('id'),newName:newname}).then((response)=>{
     
console.log(response.data);

});

Axios.post("http://localhost:3001/editOrderSummaryRestName",
{name:localStorage.getItem('name'),newName:newname}).then((response)=>{
    console.log(response.data);

});

Axios.post("http://3.135.17.82:3001/editDishesRestName",
{name:localStorage.getItem('name'),newName:newname}).then((response)=>{
    console.log(response.data);

});

Axios.post("http://3.135.17.82:3001/editFavRestName",
{name:localStorage.getItem('name'),newName:newname}).then((response)=>{
    console.log(response.data);

});
localStorage.setItem('name',newname);
    }

    const editEmail=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editEmail",
{id:localStorage.getItem('id'),newemail:newemail}).then((response)=>{
  
console.log(response.data);

});
    }

    const editPhone=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editPhone",
{id:localStorage.getItem('id'),newPhone:newphone}).then((response)=>{
  
console.log(response.data);

});
    }
    const editLoc=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editLoc",
{id:localStorage.getItem('id'),newLoc:newloc}).then((response)=>{
  
console.log(response.data);

});
    }

    const editType=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editType",
{name:localStorage.getItem('name'),type:dType}).then((response)=>{
  
console.log(response.data);

});
    }

    const editDesc=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editDesc",
{id:localStorage.getItem('id'),newDesc:newdesc}).then((response)=>{
  
console.log(response.data);

});
    }
    const editTime=()=>{
        console.log("Editing called");
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');  
        Axios.post("http://3.135.17.82:3001/editTime",
{id:localStorage.getItem('id'),newTime:newtime}).then((response)=>{
  
console.log(response.data);

});
    }

    return(
        <><Nav/>
        <Container>
        <div class="editprofile" style={{color:"seagreen", height:"100vh"}}>

        <Col md={4}>
		<div className="container">
			{error && <p className="errorMsg" >File Not Supported</p> }
		<div 
		className="imgPreview" 
		style={{background: imgPreview ? "url("+imgPreview+")": "black"}}
		>
				{!imgPreview && (
					<><p>Upload Profile Photo</p>
					<label htmlFor="fileUpload" className="customFileUpload">Upload Image</label>
					<input type="file" id="fileUpload" onChange={(e)=>{handleImageChange(e)}}></input>
					<span>(jpeg, jpeg or png</span></>
				) }
							

			</div>
			<button className="button" onClick={()=>{uploadImage()}}>Save Image</button>
			</div>
			</Col>

        <Col md={8}>
        <h3>Edit Your Profile</h3>

            <form onSubmit={editName}>
                <div className="form-group" >
                    <label className="label">New Name:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewName(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form> 
              

            <form onSubmit={editEmail}>
                <div className="form-group" >
                    <label className="label">Email ID:</label>
                    <input type="email" class="input" onChange={(e)=>{
                    setNewEmail(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editPhone}>
                <div className="form-group" >
                    <label className="label">Contact Details:</label>
                    <input type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="input" onChange={(e)=>{
                    setNewPhone(e.target.value); }} placeholder="123-876-9876" ></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editLoc}>
                <div className="form-group" >
                    <label className="label">Location:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewLoc(e.target.value); }}></input>
                    <button type="submit"  className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editType}>
                <div className="form-group" >
                    <label className="label">Type:</label>
                    <select type="text" className="delivery"  onChange={(e)=>{
                    setType(e.target.value); }}>
    <option >Select Delivery Option</option>
    <option value="Delivery">Delivery</option>
	<option value="Take Out">Pick Up</option>
    <option value="Delivery and Pick Up">Delivery and Pick Up</option>
    
</select>
                    <button type="submit"  className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editDesc}>
                <div className="form-group" >
                    <label className="label">Description:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewDesc(e.target.value); }}></input>
                    <button type="submit" className="button">Edit</button>
                </div>
            </form>

            <form onSubmit={editTime}>
                <div className="form-group" >
                    <label className="label">Open Hours:</label>
                    <input type="text" class="input" onChange={(e)=>{
                    setNewTime(e.target.value); }} placeholder="eg: 9am to 5pm"></input>
                    <button type="submit" className="button">Edit</button>
                </div>
             
            </form>
            
            </Col>

           


        </div></Container></>
    );
}

export default EditProfile;