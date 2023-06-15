<template>
    <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <Loading v-if="loading"/>
        
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Already have an account ?
                    <router-link class="router-link" :to="{name: 'login'}">Login</router-link>
                </p>
                <h2>Reset Password </h2>
                <p>
                    Forgot your password? Enter your email to reset it
                </p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <email class="icon"/>
                    </div>
                    
                </div>
                
                <button @click.prevent="resetPassword">reset</button>
                <div class="angle"> </div>
            </form>
            <div class="background">

            </div>
        </div>
    </div>
    
</template>
<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: "forgotPassword",
    data() {
        return {
            email: null,
            modalActive: false,
            modalMessage: "",
            loading: null,
        }
    },
    components: {
        email,
        Modal,
        Loading,
    },
    methods: {
        resetPassword() {
            this.loading = true;
            firebase.auth().sendPasswordResetEmail(this.email)
            .then(() => {
                this.modalMessage = "If your account exist, you will receive a email";
                this.loading = false;
                this.modalActive = true;
            }).catch(err => {
                this.modalMessage = err.message;
                this.loading = false;
                this.modalActive = true;
            });
        },
        closeModal() {
            this.modalActive = !this.modalActive;
            this.email = ""; 
        }
    }
};
</script>
<style lang="scss" scoped>

.reset-password {
    position: relative;
    .login-register{
        margin-bottom: 32px;

        .router-link {
            color: #000;
        }
    }
    .form-wrap {
        overflow: hidden;
        display: flex;
        height: 100vh;
        justify-content: center;
        align-self: center;
        margin: 0 auto;
        width: 90%;
        @media (min-width: 900px) {
            width: 100%;
        }
        
        form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        @media (min-width: 900px) {
            padding: 0 50px;
            }
        }
        .reset {
            h2 {
                text-align: center;
                font-size: 32px;
                color:#303030;
                margin-bottom: 40px;
                @media (min-width: 900px) {
                    font-size: 40px;
                }
                margin-bottom: 8px;
                
            }
            p {
                text-align: center;
                margin-bottom: 32px;
            }
            .inputs {
            width: 100%;
            max-width: 350px;
            

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }
        }
        .angle {
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;
            @media (min-width: 900px) {
                display: initial;
            }

        }
    }
    
    }
    .background {
        display: none;
        flex: 1.5;
        opacity: 0.9;
        background-size: cover;
        background-image: url("../assets/background2.png");
        width: 100%;
        height: 100%;
        @media (min-width: 900px) {
        display: initial;
        }
}

</style>