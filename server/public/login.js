// const login = document.getElementById('login');
const register = document.getElementById('register');

register.addEventListener('click',async ()=>{
    const name = document.getElementById('name').value;
    const pass = document.getElementById('password').value;

    console.log(name ,pass );
    try{
        const res = await axios.post('/register',{name,pass});
        console.log(res.data);
        if(res.data!=''){
            localStorage.setItem('token',res.data);
        }
    }
    catch(err){
        console.log(err);
    }
})

