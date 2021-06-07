import { html } from 'https://unpkg.com/lit-html?module';
import { getAllListings } from '../data/requests.js';
import { until } from '//unpkg.com/lit-html/directives/until?module';
import { carListingTemplate, loaderTemplate } from '../common/commonTemplates.js';

const mylistingsTemplate = (listingsArr) => html`            
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${
            listingsArr.filter(car => car._ownerId == sessionStorage.getItem('userId')).length > 0
            ? listingsArr.filter(car => car._ownerId == sessionStorage.getItem('userId')).map(carListingTemplate)
            : html`<p class="no-cars"> You haven't listed any cars yet.</p>`
        }
    </div>
</section>`;


export const myPage = (context) => context.renderContent(until(returnMyListingsTemplate(), loaderTemplate()))

const returnMyListingsTemplate = async () => mylistingsTemplate(await getAllListings());