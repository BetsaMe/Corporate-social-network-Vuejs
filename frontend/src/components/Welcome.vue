<template>
    <div class="container-fluid welcome">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-lg-block bg-login-image">
                                <img class="welcomeImage" src="/images/welcome.jpg" alt="dog">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Bienvenue au reseau Groupomania!</h1>
                                    </div>
                                    <form class="user text-center">
                                        <router-link class=" btn rounded-pill px-4 mx-2 my-4 btnlogin" to="/login">Login</router-link>
                                        <router-link class="btn rounded-pill px-4 my-4 btnsign" to="/signup">Signup</router-link> 
                                        <hr>
                                        <a href="#" class="btn btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Connectez-vous avec Google
                                        </a>
                                        <a href="#" class="btn btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i>Connectez-vous avec Facebook
                                        </a>
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small logout" href="#">Mot de passe oublié?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>


<style>
.btnlogin{
    width: 80%;
    margin: 0;
    border: 1px solid #d14650;
    color: #d14650;
}
.btnlogin:hover{
    background-color: #d14650;
    color: #fff;
}
.btnsign{
    width: 80%;
    margin: 0;
    background-color: #d14650;
    color: #fff;
}
.btnsign:hover{
    background-color: #d55861;
    color: #fff;
}
.welcome{
    margin-top: 50px;
}
.welcomeImage{
    object-fit: contain;
    width: 100%;
}
hr{
    color: #091f43;
}
</style>

