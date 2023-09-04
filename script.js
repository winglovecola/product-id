let productIdPrefix = '';
let productIdIncrementFrom = '';
let productIdIncrementTo = '';
let categoryId = '';

let productIdHtml = '';

//print ID
function printID () {

  productIdHtml = ''; //reset html

  productIdPrefix = $('#productIdPrefix').val ();
  categoryId = $('#categoryId').val ();
  productIdIncrementFrom = parseInt ($('#productIdIncrementFrom').val ());
  productIdIncrementTo = parseInt ($('#productIdIncrementTo').val ());


  for (var i = productIdIncrementFrom; i <= productIdIncrementTo; i++)
  {
    productIdHtml += `<div class='productCell'>${productIdPrefix}-
    <div class='productCellId'>${categoryId}${i}</div></div>`;
    
  }

  productIdHtml = '<div class="productCellContainer">' + productIdHtml + '</div>';

  $('#productIdTable').html (productIdHtml);
  $('#printIdQuery').hide ();

  


}

