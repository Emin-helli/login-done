import axios from "axios"
const axiosClient=axios.create({
    baseURL:'http://10.0.2.2:1337/api',
   //baseURL:'http://localhost:1337/api',
    headers:{
        'Authorization':'Bearer '+ process.env.EXPO_PUBLIC_STRAPI_API_KEY
    }
})


const GetUserInfo=(email)=>axiosClient.get('/user-lists?filters[userEmail][$eq]='+email)

const CreateNewUser=(data)=>axiosClient.post('/user-lists',{data:data})

const GetFeaturedCategoryList=()=>axiosClient.get('/i-amodels?filters[isFeature][$eq]=true&populate=*');

const GetIAModels=(type)=>axiosClient.get('/i-amodels?filters['+type+'][$eq]=true&populate=*');
export default{
    GetUserInfo,
    CreateNewUser,
    GetFeaturedCategoryList,
    GetIAModels,
}



