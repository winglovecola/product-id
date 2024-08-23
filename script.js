
let itemIdIncrementFrom = '';
let itemIdIncrementTo = '';

let productIdHtml = '';

//print ID

document.getElementById('byName').addEventListener('input', function() {
  this.value = this.value.toUpperCase();
});


function updatePrintButtonState() {
  const productIdTableContent = $('#productIdTable').html().trim();
  const printButton = $('#btnPrint');

  if (productIdTableContent === '') {
      printButton.prop('disabled', true);
  } else {
      printButton.prop('disabled', false);
  }
}

function reset() {
  // Reset input fields
  $('#shelfId').val('');
  $('#shelfLevel').val('');
  $('#byName').val('');
  $('#date').val('');
  $('#itemIdFrom').val('');
  $('#itemIdTo').val('');

  // Reset dropdown selections
  $('#category').prop('selectedIndex', -1); // Deselects any selected option
  $('#location').prop('selectedIndex', -1); // Deselects any selected option
  $('#shelfSpot').prop('selectedIndex', -1); // Deselects any selected option

  // Clear any error messages
  $('#htmlErrorCategory').html('');
  $('#htmlErrorLocation').html('');
  $('#htmlErrorShelfId').html('');
  $('#htmlErrorShelfLevel').html('');
  $('#htmlErrorShelfSpot').html('');
  $('#htmlErrorName').html('');
  $('#htmlErrorDate').html('');
  $('#htmlErrorItemId').html('');

  // Clear the productIdTable
  $('#productIdTable').empty();

  defaultDate ();
}


function addIdTable() {
  productIdHtml = ''; // Reset HTML

  // Validation
  let isValid = true;
  let errorMessage = '';

  const category = $('#category').val();
  const location = $('#location').val();
  const shelfId = $('#shelfId').val();
  const shelfLevel = $('#shelfLevel').val();
  const shelfSpot = $('#shelfSpot').val();
  const byName = $('#byName').val();
  const date = $('#date').val();
  const itemIdFrom = $('#itemIdFrom').val();
  const itemIdTo = $('#itemIdTo').val();

  if (!category) {
    isValid = false;
    $('#htmlErrorCategory').html('Please select a category');
  }
  else
  {
    $('#htmlErrorCategory').html('');
  }

  if (!location) {
    isValid = false;
    $('#htmlErrorLocation').html('Please select a location');
  }
  else
  {
    $('#htmlErrorLocation').html('');
  }

  if (!shelfId.trim()) {
    isValid = false;
    $('#htmlErrorShelfId').html('Shelf ID cannot be empty');
  }
  else
  {
    $('#htmlErrorShelfId').html('');
  }

  if (!shelfLevel.trim()) {
    isValid = false;
    $('#htmlErrorShelfLevel').html('Shelf Level cannot be empty');
  }
  else
  {
    $('#htmlErrorShelfLevel').html('');
  }

  if (!shelfSpot) {
    isValid = false;
    $('#htmlErrorShelfSpot').html('Please select a shelf spot');
  }
  else
  {
    $('#htmlErrorShelfSpot').html('');
  }

  if (!byName.trim()) {
    isValid = false;
    $('#htmlErrorName').html('Name cannot be empty');
  }
  else
  {
    byName.toUpperCase();
    $('#htmlErrorName').html('');
  }

  if (!date.trim()) {
    isValid = false;
    $('#htmlErrorDate').html('Date cannot be empty');
  }
  else
  {
    $('#htmlErrorDate').html('');
  }

  if (!itemIdFrom.trim() || isNaN(itemIdFrom)) {
    isValid = false;
    $('#htmlErrorItemId').html('Item # From cannot be empty and must be a number');
  }
  else
  {
    $('#htmlErrorItemId').html('');
  }

  if (!itemIdTo.trim() || isNaN(itemIdTo)) {
    isValid = false;
    $('#htmlErrorItemId').html('Item # To cannot be empty and must be a number');
  }
  else
  {
    $('#htmlErrorItemId').html('');
  }



  itemIdIncrementFrom = parseInt(itemIdFrom);
  itemIdIncrementTo = parseInt(itemIdTo);

  if (itemIdIncrementFrom > itemIdIncrementTo) {
    isValid = false;
    $('#htmlErrorItemId').html('Item # From cannot be greater than Item # To');
  }


  if (!isValid) {
    return;
  }


  for (let i = itemIdIncrementFrom; i <= itemIdIncrementTo; i++) {
    const incrementId = i.toString().padStart(2, '0');

    productIdHtml += `<div class='productCell'>
    <span class='shelfId'>${category}-${location}-${shelfId}-${shelfLevel}${shelfSpot}-</span>
    <div class='productCellId'>${byName}-${date}-${incrementId}</div>
    </div>`;
  }

  productIdHtml = '<div class="productCellContainer"><button class="removeBtn" style="display:none; color:red; cursor: pointer;">Remove</button>' + productIdHtml + '</div>';

  $('#productIdTable').append(productIdHtml);
  $('#printIdQuery').hide();

  updatePrintButtonState();


  // Add hover event to show/hide remove button
  $('.productCellContainer').hover(
    function() {
      $(this).find('.removeBtn').show();
    }, 
    function() {
      $(this).find('.removeBtn').hide();
    }
  );

  // Add click event to remove product cell
  $('.removeBtn').click(function() {
    $(this).closest('.productCellContainer').remove();

    updatePrintButtonState();
  });
} 

function printIdTable() {
  //const printContent = document.getElementById('productIdTable').innerHTML;
  //const originalContent = document.body.innerHTML;

  //document.body.innerHTML = printContent;

  $('#optionTable').hide();
  window.print();
  $('#optionTable').show();
  //location.reload(); // Reload the page to restore event handlers
}


function defaultDate () {

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const dateHtml = year.substring (2, 4) + month + day;
  $('#date').val (dateHtml);
}


