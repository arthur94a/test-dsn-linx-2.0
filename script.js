const apiUrl = './products.json';

function loadProducts(url) {
    fetch(url)
    .then(response => response.json())
    .then(body => {
        body.forEach(prd => {
            const installment = prd.price / 10;
            const hasProduct = prd.available === false ? 'unavailable' : '';
            const discountPercent = ((100 * prd.price)/prd.oldPrice) - 100 ;
            const discount = Math.round(discountPercent);
            const hasDiscount = discount != 0 ? '' : 'whitout';

            const hasFreeShipping = prd.details.freeShipping === true;
            const freeShipping  = hasFreeShipping ? 'true' : '';
            const contentFlag = hasFreeShipping ? 'Frete Grátis' : '';

            const product = `
            <div class="item ${hasProduct}">
                <div class="flags">
                    <span class="free-shipping ${freeShipping}">${contentFlag}</span>
                    <span class="flag-discount ${hasDiscount}">${discount}% OFF</span>
                </div>
                <div class="thumbnail">
                    <img src="${prd.image_url}" referrerpolicy="no-referrer">
                    <button class="buy-btn show-btn">ver produto</button>
                </div>
                <div class="content">
                    <div class="product-name">${prd.name}</div>
                    <div class="prices">
                        <div class="oldprice">R$ ${prd.oldPrice.toLocaleString('pt-BR')}</div>
                        <div class="price">R$ ${prd.price.toLocaleString('pt-BR')}</div>
                        <div class="installments">10x de R$ ${installment.toLocaleString('pt-BR')} sem juros</div>
                        <button class="buy-btn">ver produto</button>
                    </div>
                </div>
            </div>
            `;

            const productsElement = document.querySelector('.products-container')
            productsElement.insertAdjacentHTML( 'beforeend', product );
        });
    });
}
        

window.onload = loadProducts(apiUrl);