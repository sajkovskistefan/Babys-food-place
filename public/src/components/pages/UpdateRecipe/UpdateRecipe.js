import React, { useState , useEffect} from 'react';
import ROUTES from '../../../constants/routes';
import { getToken } from '../../../services/helpers/StorageFunctions';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import back from '../../../assets/img/icon_back_white.svg';

export const UpdateRecipe = (props) => {
    const location = useLocation();
    const id = location.state.details
    console.log(id)
    const token = getToken();
    const dispatch = useDispatch();
    const [updateRecipeData,setUpdateRecipeData] = useState({
        _id: id,
        recipe_title:"",
        category:"",
        prep_time:"",
        no_people:"",
        short_description:"",
        recipe:"",
        img:""
    })
    useEffect(()=>{
        fetchRecipeForUpdate(id)
    },[])


    const fetchRecipeForUpdate = (id) => {
          fetch(`http://localhost:10004/api/v1/recipes/${id}`,
            {
                method:'GET',
                headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            }).then(res => 
                 res.json())
                .then(data => {
                    setUpdateRecipeData(data)
                }).catch(err => {
                    console.log(err)
                })
        
    }
    console.log(updateRecipeData)
const [file, setFile] = useState(null);
const [fileName, setFileName] = useState('');
const[image, setImage] = useState(null);
const convertBinaryImage = (e) => {
    if(!e.target.files[0]) return;
    setUpdateRecipeData({...updateRecipeData, img: ''})
    setFile(e.target.files[0])
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])

    let bin = null

    reader.onload = function() {
      bin = reader.result
      setImage(bin);
    }       
    reader.onerror = function() {
      bin = null
    }
  }

      

      const uploadImage = (img, token) => {
         return fetch(`http://localhost:10002/api/v1/storage`,{
             method:'POST',
             headers:{
                'Authorization':`Bearer ${token}`
             },
             body:img
         })
         .then(res => {
             return res.json()
         })
     }

     
      const uploadFile = async () => {
          if(!file){
            updateRecipe(updateRecipeData)
            return;
          }
        let formData = new FormData();
        formData.append('document', file);

       await uploadImage(formData, token)
            .then(res => {
                updateRecipe({...updateRecipeData, img:res.filename});
            })
            .catch(err => {
                console.log(err);
            });
      }
     

   const updateRecipe = async (updateRecipeData) => {
       fetch(`http://localhost:10004/api/v1/recipes/${id}`,{
           method:'PUT',
           headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify(updateRecipeData)
       }).then(res => {
           if(res){
            setUpdateRecipeData(updateRecipeData)
           }
           
       }).catch(err => {
           console.log(err);
       })
   }
        const handleUpdateRecipe = (e) => {
        e.preventDefault()
        uploadFile().then(
        props.history.push('/my_recipes'));
    }


    return(
        <div className='update-recipe'>
            <div className="div-title">
            <h2 className="title-recipes">My Recipes</h2>
           <Link to={ROUTES.MY_RECIPES}> <div className='plus-back'><img className='znak' src={back} alt=""/></div></Link>
            </div>
            <form onSubmit={handleUpdateRecipe} >
            <div className='container-recipe'>    
             <div className='recipe-image'>   
                <label className='label'>Recipe Image</label>
                     <img src={updateRecipeData.img ? `http://localhost:10002/api/v1/storage/${updateRecipeData.img}` : image || ''} className='image-recipe'></img> 
                    <input type='file'   className='recipe-img-btn' onChange={(e) => convertBinaryImage(e)}></input> 
                </div> 
                <div className='recipe-center'>
                    <label className='label'>Recipe Title</label>
                    <input type='text' value={updateRecipeData.recipe_title} onChange={(e) => setUpdateRecipeData({ ...updateRecipeData, recipe_title: e.target.value })} className='input-recipe-title'></input>
                    <div className='center-middle'>
                   <span> <label className='label'>Category</label>
                    <select className='input-category' placeholder='Category' value={updateRecipeData.category} onChange={(e) => setUpdateRecipeData({ ...updateRecipeData, category: e.target.value })}>
                        
                        <option value="breakfast">Breakfast</option>
                        <option value="brunch">Brunch</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select></span>
                    <span>
                    <label className='label'>Preparation Time</label>
                    <input type='number' className='prep-time-input' value={updateRecipeData.prep_time} onChange={(e) => setUpdateRecipeData({ ...updateRecipeData, prep_time: e.target.value })}/>
                    </span>
                    <span>
                    <label className='label'>No.People</label>
                    <input type='number' className='prep-time-input' value={updateRecipeData.no_people} onChange={(e) => setUpdateRecipeData({ ...updateRecipeData, no_people: e.target.value })}/>
                    </span>
                    </div>
                    <label className='label'>Short Description</label>
                    <textarea className='descr-text' value={updateRecipeData.short_description} onChange={(e) => setUpdateRecipeData({ ...updateRecipeData, short_description: e.target.value })}></textarea>
                    <input type="submit" value="SAVE" className='save-recipe'/>
                </div>
                <div className='right-recipe'>
                    <label className='label'>Recipe</label>
                    <textarea className='recipe-text' value={updateRecipeData.recipe} onChange={(e) => setUpdateRecipeData({ ...updateRecipeData, recipe: e.target.value })}>
                        
                    </textarea>
                </div>    
                
            </div>
            </form>
        </div>
    )
}

export default UpdateRecipe;