let productIdPrefix = '';
let productIdIncrement = '';
let categoryId = '';

let productIdHtml = '';

//print ID
function printID () {

  productIdHtml = ''; //reset html

  productIdPrefix = $('#productIdPrefix').val ();
  categoryId = $('#categoryId').val ();
  productIdIncrement = parseInt ($('#productIdIncrement').val ());


  for (var i = 1; i <= productIdIncrement; i++)
  {
    productIdHtml += `<div class='productCell'>${productIdPrefix}-
    <div class='productCellId'>${categoryId}${i}</div></div>`;
    
  }

  productIdHtml = '<div class="productCellContainer">' + productIdHtml + '</div>';

  $('#productIdTable').html (productIdHtml);
  $('#printIdQuery').hide ();

  


}

