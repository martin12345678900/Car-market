import { html } from 'https://unpkg.com/lit-html?module';
import { login } from '../data/requests.js';
import { setUserData } from '../common/commonTemplates.js';

const loginpageTemplate = (submitFunction, errorMessage) => html`            
<section id="login">
    <div class="container">
        <form @submit=${submitFunction} id="login-form" action="#" method="post">
            ${ errorMessage ? html`<div style="color: red">${errorMessage}</div>` : null }
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>
    
            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">
    
            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export async function loginPage(context) {
    context.renderContent(loginpageTemplate(onSubmitFunc));

    async function onSubmitFunc(event) {
        event.preventDefault();
        try {
            const [username, password] = [... new FormData(event.target).values()];
            const userData = await login({ username, password });
            setUserData([{name: 'authToken', value: userData.accessToken}, {name: 'username', value: userData.username}, {name: 'userId', value: userData._id}]);
            
            event.target.reset();
            context.setUserNavigation();
            context.page.redirect('/home');
        } catch (error) {
            context.renderContent(loginpageTemplate(onSubmitFunc, error.message));
        }
    }
}