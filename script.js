
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
  $('#rightCornerLabel').val('');
  
  $('#shelfSpotCustom').val('');

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

var tableId = 0;


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
  const shelfSpotCustom = $('#shelfSpotCustom').val();
  const byName = $('#byName').val();
  const date = $('#date').val();
  const itemIdFrom = $('#itemIdFrom').val();
  const itemIdTo = $('#itemIdTo').val();
  var rightCornerLabelValue = $('#rightCornerLabel').val();

  if (rightCornerLabelValue === '$') {
    rightCornerLabelValue = '$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  }

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
    <span class='rightCornerLabel'>${rightCornerLabelValue}</span>
    <span class='shelfId'>${category}-${location}-${shelfId}-${shelfLevel}${shelfSpotCustom}-</span>
    <div class='productCellId'>${byName}-${date}-${incrementId}</div>
    <div class='productCellOpitons'>
      <span class='productCellOpitonClone'>Clone</span> <span class='productCellOpitonRemove'>Remove</span> <span class='productCellOpitonCopy'>Copy</span>
    </div>
    </div>`;
  }

  productIdHtml = '<div id="productCellContainer' + tableId + '" class="productCellContainer"><button class="removeBtn" style="display:none; color:red; cursor: pointer;">Remove</button><button class="printBtn" style="display:none; color:#00008B; cursor: pointer;">Print</button>' + productIdHtml + '</div>';

  $('#productIdTable').append(productIdHtml);
  $('#printIdQuery').hide();

  updatePrintButtonState();


  tableId++;

  // Add hover event to show/hide remove button
  $('.productCellContainer').hover(
    function() {
      $(this).find('.removeBtn').show();
      $(this).find('.printBtn').show();
      $(this, '.productCell').find('.productCellOpitons').show();
      $('#productIdTable').find('.productCellOpitonRemove').hide();
      $('#productIdTableClonesCellsWrap').find('.productCellOpitonRemove').show();
      
    }, 
    function() {
      $(this).find('.removeBtn').hide();
      $(this).find('.printBtn').hide();
      $(this, '.productCell').find('.productCellOpitons').hide();
    }
  );


  $('#productIdTableClones').hover(
    function() {
      $(this).find('.emptyBtn').show();
      $(this).find('.printBtn').show();
    }, 
    function() {
      $(this).find('.emptyBtn').hide();
      $(this).find('.printBtn').hide();
      
    }
  );


  // Add click event to remove product cell
  $('.removeBtn').click(function() {
    $(this).closest('.productCellContainer').remove();

    updatePrintButtonState();
  });

  $('.emptyBtn').click(function() {
    $('#productIdTableClonesCells').empty();

  });



  $(document).on('click', '.productCellOpitonRemove', function() {
    // Remove the parent .productCell element
    $(this).closest('.productCell').remove();
  });
  
  

 
    $(document).on('click', '.productCellOpitonCopy', function() {
    // Get the combined text from .shelfId and .productCellId
    const shelfIdText = $(this).closest('.productCell').find('.shelfId').text();
    const productCellIdText = $(this).closest('.productCell').find('.productCellId').text();
    const combinedText = shelfIdText + productCellIdText;

    // Create a temporary input element to copy the text
    const tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(combinedText).select();
    
    // Copy the text to clipboard
    document.execCommand('copy');
    
    // Remove the temporary input element
    tempInput.remove();

    // Optional: You can display an alert or message to show that the text was copied
    alert('Copied to clipboard: ' + combinedText);
  });



 
    $(document).on('click', '.productCellOpitonClone', function() {
    // Find the parent .productCell element
    $(this).prop('disabled', true);
    
    const productCell = $(this).closest('.productCell');
    
    // Clone the .productCell
    const clonedProductCell = productCell.clone();
    
    // Optionally modify the cloned element (e.g., change IDs, classes, etc.)
    // Example: You may want to clear or modify specific fields in the clone
    
    // Append the cloned div to the same container or a parent container
    $('#productIdTableClonesCells').append(clonedProductCell);
    //console.log ('cloned')

      // Optionally, you can enable the clone button again after a certain time (e.g., 2 seconds)
  setTimeout(() => {
    $(this).prop('disabled', false); // Re-enable the button after the timeout
  }, 100);  // Time in milliseconds (e.g., 2000ms = 2 seconds)
});


const printButtons = document.querySelectorAll('.printBtn');
    // Loop through each print button and add the event listener
printButtons.forEach(button => {
  button.addEventListener('click', function() {
    //console.log('testtest');
    
    // Get the parent element (productCellContainer)
    const parentContainer = this.closest('.productCellContainer');
    
    // Get the ID of the parent element
    const parentId = parentContainer.id;
    
    // Log the parent ID (or use it as needed)
    //console.log('Parent ID: ' + parentId);

    // Get the element you want to print
    const node = document.getElementById(parentId);
    
    // Clone the node to avoid modifying the original content
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title><link rel="stylesheet" href="style.css" /></head><body>');
    printWindow.document.write(node.outerHTML);
    printWindow.document.write('<div id="optionTable"> <input id="btnPrint" type="button" value="PRINT" onClick="printSpecificTable ()" style="font-size: 20px; width: 100px; cursor: pointer;"></div><script src="jquery-3.6.0.js"></script><script src="script.js"></script><script>$(".removeBtn").hide();$(".printBtn").hide();$(".emptyBtn").hide();$(".productCellOpitons").hide();</script></body></html>');

    // Wait for content to load, then trigger print
    //printWindow.document.close();
    //printWindow.print();
    
    // You can also proceed with printing logic here if necessary
  });
});
} 

function printIdTable() {
  //const printContent = document.getElementById('productIdTable').innerHTML;
  //const originalContent = document.body.innerHTML;

  //document.body.innerHTML = printContent;

  $('#optionTable').hide();
  $('#productIdTableClones').hide();
  
  window.print();
  $('#optionTable').show();
  $('#productIdTableClones').show();
  //location.reload(); // Reload the page to restore event handlers
}

function printSpecificTable() {
  //$('.removeBtn').hide();
  //$('.printBtn').hide();

  $('#optionTable').hide();
  window.print();
  $('#optionTable').show();

}


function defaultDate () {

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const dateHtml = year.substring (2, 4) + month + day;
  $('#date').val (dateHtml);
}


$(document).ready(function() {
  // When the dropdown value changes
  $('#shelfSpot').change(function() {
      // Set the value of #shelfSpotCustom to the selected value of #shelfSpot
      $('#shelfSpotCustom').val($('#shelfSpot').val());
  });
});