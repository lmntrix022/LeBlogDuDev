<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account ?
                <router-link class="router-link" :to="{name: 'login'}">Login</router-link>
            </p>
            <h2>Create your Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName" />
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName" />
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="userName" />
                    <user class="icon"/>
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                    <email class="icon"/>
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <password class="icon"/>
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
            </div>
            
            <button @click.prevent="registers">Sign Up</button>
            <div class="angle"> </div>
        </form>
        <div class="background">

        </div>
    </div>
</template>
<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
    name: "Register",
    components: {
        email,
        password,
        user,
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            error: null,
            errorMsg: "",
        };
    },
    methods: {
        async registers() {
            if (
                this.email !== "" &&
                this.password !== "" &&
                this.firstName !== "" &&
                this.lastName !== "" &&
                this.userName !== ""
            ) {
                
                this.error = false;
                this.errorMsg = "";
                const firebaseAuth = await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
                const result = await createUser;
                const dataBase = db.collection("users").doc(result.user.uid);
                await dataBase.set({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    userName: this.userName,
                    email: this.email,
                });
                this.$router.push({ name: "home" });
                return;
            }
            
            this.error = true;
            this.errorMsg = "Please fill out all the fields!";
            return;
        }
    }
}
</script>
<style lang="scss" scoped>
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

    .login-register{
        margin-bottom: 32px;

        .router-link {
            color: #000;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 2;
        @media (min-width: 900px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color:#303030;
            margin-bottom: 40px;
            @media (min-width: 900px) {
            font-size: 40px;
            }
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
        .forgot-password {
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32px;
            border-bottom: 1px solid transparent;
            transition: 0.5s ease all;

            &:hover {
                border-color: #303030;
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

    .background {
        display: none;
        flex: 3;
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