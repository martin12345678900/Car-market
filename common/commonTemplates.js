import { html } from 'https://unpkg.com/lit-html?module';

export const loaderTemplate = () => html`<p class="loaderTemplate">Loading&hellip;</p>`;

export const carListingTemplate = (car) => html`        
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export function setUserData(infoProperties) {
    infoProperties.forEach(prop => sessionStorage.setItem(prop.name, prop.value));
}
