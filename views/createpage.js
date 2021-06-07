import { html } from 'https://unpkg.com/lit-html?module';
import { createCarListing } from '../data/requests.js';

const createpageTemplate = (onSubmitFunc, errorMessage) => html`            
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmitFunc} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>
            ${ errorMessage ? html`<div style="color: red;">${errorMessage}</div>` : null }
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">
    
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">
    
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">
    
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">
    
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">
    
            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function createPage(context) {
    context.renderContent(createpageTemplate(onSubmitFunc));

    async function onSubmitFunc(event) {
        event.preventDefault();
        try {
            const [brand, model, description, year, imageUrl, price] = [... new FormData(event.target).values()];
            if ([...new FormData(event.target).values()].some(value => value.trim() == '')) {
                throw new Error('All fields are required!');
            }

            await createCarListing({brand, model, description, year, imageUrl, price});
            event.target.reset();
            context.page.redirect('/listings');
        } catch (error) {
            context.renderContent(createpageTemplate(onSubmitFunc, error.message));
        }
    }
}