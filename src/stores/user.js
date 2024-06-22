import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user : {
            isAuthenticated : true,
            first_name : "Juancito",
            last_name : null,
            email: null,
            role: null,
            
        }
    }),
    actions: {
        initStore() {

            this.user.email = localStorage.getItem('user.email')
            // this.user.first_name = localStorage.getItem('user.first_name') 
            this.user.last_name = localStorage.getItem('user.last_name') 
            this.user.role = localStorage.getItem('user.role')
            if (localStorage.getItem('user.last_name')){
                this.user.isAuthenticated = true 
            }

            console.log('Usuario inicializado:',this.user); 

        },
        login(data){
            this.user.email = data.email
            this.user.first_name = data.first_name
            this.user.last_name = data.last_name 
            this.user.role = data.role
            localStorage.setItem('user.email',data.refresh)
            localStorage.setItem('user.first_name',data.refresh)
            localStorage.setItem('user.last_name',data.refresh)
            localStorage.setItem('user.role',data.refresh)
            this.user.isAuthenticated = true
        },
        logout(){
            this.user.email = null
            this.user.first_name = null
            this.user.last_name = null 
            this.user.role = null
            this.user.isAuthenticated = false
            localStorage.setItem('user.email','')
            localStorage.setItem('user.first_name','')
            localStorage.setItem('user.last_name','')
            localStorage.setItem('user.role','')
        },
    }
})