<template>
    <div>
      <h1>SPLASH</h1>
    </div>
</template>
<script>
import BaseComponent from "../components/base/BaseComponent";

export default {
    name: "splash",
    extends: BaseComponent,
    data() {
        return {
            
        };
    },

    mounted() {
        // Vue.$toast.success('Welcome to toastificaiton in VUE!');
        setTimeout( () => {
          this.route('login')
        }, 5000)
    },
    validations() {
        return {
            form: this.rules,
        };
    },
    methods: {
        async signUp() {
            console.log("Sign in", this.signInForm);

            try {
                console.log("Sign in: ", this.signInForm);
                let res = await this.network().signInUser(this.signInForm);
                console.log({ res });
                await this.processRequest(res);
                this.verificationModal();
            } catch (e) {
                this.utility().presentFailureToast(e.message);
            }
        },
        async login() {
            let self = this;
            console.log(this.auth, "REQUEST DATA!");
            const res = await this.network().login(this.auth);
            console.log(res, "check");
            this.processRequest(res);
        },
        processRequest(res) {
            return new Promise(async (resolve) => {
                var user = res.user;
                user.token = res.token;
                localStorage.setItem("_token", res.token);
                console.log(user, "USER DATA");
                await this.network().addFcmToken({
                    fcm_token: localStorage.getItem("_fcm_token"),
                });
                // this.utility().presentSuccessToast("Welcome " + user.name);
                await this.sqlite().setUserInDatabase(user);
                this.route("dashboard");
                //point to taken
            });
        },

        validate: function (e) {
            if (this.auth.email && this.auth.password) {
                return this.login();
            }

            this.errors = {
                email: [],
                password: [],
            };

            if (!this.auth.email) {
                this.errors.email.push("Email is required.");
            }
            if (!this.auth.password) {
                this.errors.password.push("Password is  required.");
            }

            e.preventDefault();
        },
    },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.17/tailwind.min.css");
@import "splash.css";

.login-page-outer {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
}

.login-scroll {
    overflow-y: scroll;
}

.login-scroll::-webkit-scrollbar {
    display: none;
}
</style>
