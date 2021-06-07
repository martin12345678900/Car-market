import { html } from 'https://unpkg.com/lit-html?module';
import { until } from '//unpkg.com/lit-html/directives/until?module';
import { loaderTemplate, carListingTemplate } from '../common/commonTemplates.js';
import { getAllListings } from '../data/requests.js';

const listingsPageTemplate = (carListings) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${
            carListings.length > 0
            ? carListings.map(carListingTemplate)
            : html`<p class="no-cars">No cars in database.</p>`
        }
    </div>
</section>`;

export const listingsPage = (context) => context.renderContent(until(returnCarTemplate(), loaderTemplate()))

const returnCarTemplate = async () => listingsPageTemplate(await getAllListings());