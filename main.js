// Import needed libraries
import page from '//unpkg.com/page/page.mjs';
import { render } from 'https://unpkg.com/lit-html?module';

// import view(page) handlers
import { homePage } from './views/homepage.js';
import { registerPage } from './views/registerpage.js';
import { loginPage } from './views/loginpage.js';
import { detailsPage } from './views/detailspage.js';
import { editPage } from './views/editpage.js';
import { myPage } from './views/mypage.js';
import { createPage } from './views/createpage.js';
import { listingsPage } from './views/listingspage.js';
import { filteredCarsPage } from './views/filteredCarspage.js';

// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
    sessionStorage.clear();
    setUserNav();
    page.redirect('/home');
});
// set routing table
page('/', decorateContextFunction, homePage);
page('/home', decorateContextFunction, homePage);
page('/register', decorateContextFunction, registerPage);
page('/login', decorateContextFunction, loginPage);
page('/details/:id', decorateContextFunction, detailsPage);
page('/edit/:id', decorateContextFunction, editPage);
page('/my-page', decorateContextFunction, myPage);
page('/create', decorateContextFunction, createPage);
page('/listings', decorateContextFunction, listingsPage);
page('/filtered-cars', decorateContextFunction, filteredCarsPage);

// Start Application
setUserNav();
page.start();


function decorateContextFunction(context, next) {
    context.renderContent = (content) => render(content, document.getElementById('site-content'));
    context.setUserNavigation = setUserNav;
    next();
}

function setUserNav() {
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-message').textContent = `Welcome again, ${sessionStorage.getItem('username')}`;
        document.getElementById('welcome-message').style.display = 'block';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
        document.getElementById('welcome-message').style.display = 'none';
    }
}