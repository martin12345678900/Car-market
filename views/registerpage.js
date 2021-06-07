import { html } from 'https://unpkg.com/lit-html?module';
import { register } from '../data/requests.js';
import { setUserData } from '../common/commonTemplates.js';

const registerpageTemplate = (submitFunction, errorMessage) => html`            
<section id="register">
    <div class="container">
        <form @submit=${submitFunction} id="register-form">
            ${ errorMessage ? html`<div style="color: red">${errorMessage}</div>` : null }
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>
    
            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>
    
            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>
    
            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>
    
            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export async function registerPage(context) {
    context.renderContent(registerpageTemplate(onSubmitFunc));

    async function onSubmitFunc(event) {
        event.preventDefault();
        try {
            const [username, password, repeatPass] = [...new FormData(event.target).values()];

            if ([...new FormData(event.target).values()].some(value => value.trim() == '')) {
                throw new Error('All fields are required!');
            } else if (password !== repeatPass) {
                throw new Error("Passwords don't match!");
            }
            
            const userData = await register({ username, password });
            setUserData([{name: 'authToken', value: userData.accessToken}, {name: 'username', value: userData.username}, {name: 'userId', value: userData._id}]);

            event.target.reset();
            context.setUserNavigation();
            context.page.redirect('/home');
        } catch (error) {
            context.renderContent(registerpageTemplate(onSubmitFunc, error.message));
        }
    }
}