import { html } from 'https://unpkg.com/lit-html?module';
import { carListingEdit } from '../data/requests.js';

const editpageTemplate = (onSubmitFunc, errorMessage) => html`            
<section id="edit-listing">
    <div class="container">
    
        <form @submit=${onSubmitFunc} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
    
            ${ errorMessage ? html`<div style="color: red;">${errorMessage}</div>` : null }
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="">
    
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="">
    
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="">
    
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="">
    
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="">
    
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="">
    
            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editPage(context) {
    context.renderContent(editpageTemplate(onSubmitFunc));

    async function onSubmitFunc(event) {
        event.preventDefault();
        try {
            const [brand, model, description, year, imageUrl, price] = [...new FormData(event.target).values()];
            if ([...new FormData(event.target).values()].some(value => value.trim() == '')) {
                throw new Error('All fields are required!');
            }

            await carListingEdit(context.params.id, {brand, model, description, year, imageUrl, price});
            event.target.reset();
            context.page.redirect('/listings');
        } catch (error) {
            context.renderContent(editpageTemplate(onSubmitFunc, error.message));
        }
    }
}