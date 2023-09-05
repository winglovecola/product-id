let productIdPrefix = '';
let productIdIncrementFrom = '';
let productIdIncrementTo = '';
let categoryId = '';

let productIdHtml = '';

//print ID
function printID () {

  productIdHtml = ''; //reset html



  productIdPrefix = $('#productIdPrefix').val ().trim ();

  const productIdPrefixLast = productIdPrefix.substring (productIdPrefix.length - 1, productIdPrefix.length);

  $('#idError').html ('');  
  if (productIdPrefix.trim ().length == 0)
  {
    $('#idError').html ("ID cannot be empty");
    return; 
  }
  else if (productIdPrefixLast != '-')
  {
    $('#idError').html ("ID must end with the symbol dash '-'");
    return; 
  }


  categoryId = $('#categoryId').val ();
  productIdIncrementFrom = parseInt ($('#productIdIncrementFrom').val ());
  productIdIncrementTo = parseInt ($('#productIdIncrementTo').val ());

  

  for (var i = productIdIncrementFrom; i <= productIdIncrementTo; i++)
  {
    productIdHtml += `<div class='productCell'>${productIdPrefix}
    <div class='productCellId'>${categoryId}${i}</div></div>`;
    
  }

  productIdHtml = '<div class="productCellContainer">' + productIdHtml + '</div>';

  $('#productIdTable').html (productIdHtml);
  $('#printIdQuery').hide ();

  


}


function idExample () {

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const dateHtml = year.substring (2, 4) + month + day;
  $('#idExample').html (`<span style='color:#C0C0C0'>Ex:</span> Wing-${dateHtml}-`);
}


idExample ();