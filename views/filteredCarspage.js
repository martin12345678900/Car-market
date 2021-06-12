import { html } from 'https://unpkg.com/lit-html?module';
import { carListingsSearch } from '../data/requests.js';
import { carListingTemplate, loaderTemplate } from '../common/commonTemplates.js';
import { until } from '//unpkg.com/lit-html/directives/until?module';

const searchpageListingTemplate = (onSubmitFunc) => html`            
<section id="search-cars">
    <h1>Filter by year</h1>
    
    <form @submit=${onSubmitFunc}>
        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button class="button-list">Search</button>
        </div>
    </form>
</section>`

const searchResultsTemplate = (searchResults) => html`
<section>
    <h2>Results:</h2>

    
    <div class="listings">
    ${
        searchResults.length > 0
        ? searchResults.map(carListingTemplate)
        : html`<p class="no-cars"> No results.</p>`
    }
    </div>
</section>`

export async function filteredCarsPage(context) {
    context.renderContent(searchpageListingTemplate(onSubmitFunc));
    const returnSearchResultsTemplate = async (searchValue) => searchResultsTemplate(await carListingsSearch(searchValue));

    async function onSubmitFunc(event) {
        event.preventDefault();
        const searchValue = Number(new FormData(event.target).get('search'));

        context.renderContent(until(returnSearchResultsTemplate(searchValue), loaderTemplate()));
        context.page.redirect('/search?year=' + searchValue);
    }

}
