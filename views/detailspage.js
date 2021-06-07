import { html } from 'https://unpkg.com/lit-html?module';
import { carListingDetails, carListingDelete, getCarById } from '../data/requests.js';
import { until } from '//unpkg.com/lit-html/directives/until?module';
import { loaderTemplate } from '../common/commonTemplates.js';

const detailspageTemplate = (carData, isOwner, onDeleteFunc) => html`            
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${carData.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${carData.brand}</li>
            <li><span>Model:</span>${carData.model}</li>
            <li><span>Year:</span>${carData.year}</li>
            <li><span>Price:</span>${carData.price}$</li>
        </ul>
    
        <p class="description-para">${carData.description}.</p>
    
        ${
            isOwner
            ? html`        
            <div class="listings-buttons">
                <a href="/edit/${carData._id}" class="button-list">Edit</a>
                <a @click=${onDeleteFunc} href="javascript:void(0)" class="button-list">Delete</a>
            </div>`
            : null
        }
    </div>
</section>`;

export async function detailsPage(context) {
    const currentCar = await getCarById(context.params.id);
    const returnDetailsTemplate = async () => detailspageTemplate(await carListingDetails(context.params.id), sessionStorage.getItem('userId') == currentCar._ownerId, async () => {
        if (confirm('Are u sure u want to delete the car from the collection ?')) {
            await carListingDelete(context.params.id);
            context.page.redirect('/listings');
        }
    });

    context.renderContent(until(returnDetailsTemplate(), loaderTemplate()));
}