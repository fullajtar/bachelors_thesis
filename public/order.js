function removeItem(element){
    element.parentElement.remove()
    updateNumbering()
    console.log(element)
    updateAll(null)
}

function updateNumbering(){
    const table = document.getElementById('table-of-contents');
    for (let i = 1, row; row = table.rows[i] , i < table.rows.length - 1; i++){
        row.cells[0].innerText = i
    }
}

function addItem(){
    const table = document.getElementById('table-of-contents');
    let count = table.rows.length
    const row = table.insertRow(count-1)

    const cellRank = row.insertCell(0)
    cellRank.className = "border-black border-2";
    cellRank.innerHTML = ''+(count-1);

    const cellCode = row.insertCell(1)
    cellCode.className = "border-black border-2";
    cellCode.innerHTML = '<input class="w-20 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="itemBarcode" id="itemBarcode" type="text" placeholder="Kód položky">';

    const cellName = row.insertCell(2)
    cellName.className = "border-black border-2";
    cellName.innerHTML = '<input class="w-24 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="itemName" type="text" placeholder="Názov"  required>'

    const cellQuantity = row.insertCell(3)
    cellQuantity.className = "border-black border-2";
    cellQuantity.innerHTML = '<input class="w-16 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="quantity" type="number" placeholder="Množstvo" min="0" step="0.1" required onchange="updateAll(this)">'

    const cellUnit = row.insertCell(4)
    cellUnit.className = "border-black border-2";
    cellUnit.innerHTML = '<input class="w-10 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="itemUnit" type="text" placeholder="Jednotka" required>'


    const cellCost = row.insertCell(5)
    cellCost.className = "border-black border-2";
    cellCost.innerHTML = '<input class="w-20 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="itemPriceWithoutTax" type="number" value="0" min="0" step="0.01" required onchange="updateAll(this)">'

    const cellSingleItemWithTax = row.insertCell(6)
    cellSingleItemWithTax.className = "border-black border-2";
    cellSingleItemWithTax.innerHTML = '-.--'



    const cellTotalCost = row.insertCell(7)
    cellTotalCost.className = "border-black border-2 itemSum";
    cellTotalCost.innerHTML = '-.--'

    const cellAbsTax = row.insertCell(8)
    cellAbsTax.className = "border-black border-2";
    cellAbsTax.innerHTML = '-.--'

    const cellTax = row.insertCell(9)
    cellTax.className = "border-black border-2";
    cellTax.innerHTML = '<input class="w-14 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="itemTax" type="number" value="20" min="0" required onchange="updateAll(this)">'

    const cellDiscount = row.insertCell(10)
    cellDiscount.className = "border-black border-2";
    cellDiscount.innerHTML = '<input class="w-16 border-2 border-gray-400 bg-gray-200 rounded hover:bg-gray-100 hover:shadow-sm" name="discount" type="number" value="0" min="0" max="100" required onchange="updateAll(this)">'

    const cellTotalWithVat = row.insertCell(11)
    cellTotalWithVat.className = "border-black border-2 itemSumWithVatAndDiscount";
    cellTotalWithVat.innerHTML = '-.--'

    const cellRemove = row.insertCell(12)
    cellRemove.className = 'cursor-pointer';
    cellRemove.addEventListener("click", function (){
        this.parentElement.remove();
        updateNumbering();
    });
    cellRemove.innerHTML = 'X';

    const cellBody = row.insertCell(13)
    cellBody.innerHTML = '<input name="itemBody" type="hidden" value="-">'

    const cellNote = row.insertCell(14)
    cellNote.innerHTML = '<input name="itemNote" type="hidden" value="-">'
}

function updateAll (element){
    if (!element || !element.parentElement){
        updateTotalSumPrice();
        updateSummary()
        return
    }
    const row = element.parentElement.parentElement
    const barCode = row.children[1].firstChild;
    const itemName = row.children[2].firstChild;

    const quantity = row.children[3].firstChild;
    const itemUnit = row.children[4].firstChild;
    const itemPriceWithoutTax = row.children[5].firstChild;
    const singleItemWithTax = row.children[6];//textfield
    const sumWithoutVat = row.children[7]; //textfield
    const absVat = row.children[8]; //textfield
    const itemVat = row.children[9].firstChild;
    const discount = row.children[10].firstChild;
    const itemWithVatAndDiscount = row.children[11];//textfield

    updateSingleItemWithTax(itemVat.value , itemPriceWithoutTax.value, singleItemWithTax)
    updateMultiplePriceWithoutVat(itemPriceWithoutTax.value, quantity.value, sumWithoutVat)
    updateAbsVat(itemVat.value, quantity.value, itemPriceWithoutTax.value, absVat)
    updateTotalWithVat(itemVat.value, quantity.value, itemPriceWithoutTax.value, discount.value, itemWithVatAndDiscount)
    updateTotalSumPrice();
    updateSummary()
}

function updateSingleItemWithTax(tax, priceWithoutTax, element){
    const result = (1+tax/100) * priceWithoutTax
    element.innerHTML = result.toFixed(2)
}

function  updateMultiplePriceWithoutVat(price, quantity, element){
    element.innerHTML = (price * quantity).toFixed(2);
}

function updateAbsVat(vat, quantity, priceForUnit, element){
    const totalWithoutVat = quantity * priceForUnit;
    const total = totalWithoutVat * (1 + vat/100);
    const result = total - totalWithoutVat;
    element.innerHTML = result.toFixed(2);
}

function updateTotalWithVat(vat, quantity, priceForUnit, discount, element){

    vat = vat/100
    let result = (quantity * priceForUnit) * (1 + vat);
    result =  result * (1 - discount/100)
    element.innerText= result.toFixed(2);
}

function updateTotalSumPrice(){
    const elements =  document.getElementsByClassName('itemSumWithVatAndDiscount')
    if (!elements){
        return;
    }
    let sum = 0;
    for (const element of elements){
        sum += parseFloat(element.innerHTML);
    }
    document.getElementById('totalSumPrice').innerHTML = sum.toFixed(2);
}

function updateSummary(){
    //updatePriceWIthoutVat()
    const elements =  document.getElementsByClassName('itemSum')
    if (!elements){
        return;
    }

    let sum = 0;
    for (const element of elements){
        sum += parseFloat(element.innerHTML);
    }


//


    console.log("1")
    const totalWithVat = document.getElementById('totalSumPrice').innerHTML;
    document.getElementById('summaryWithVat').innerHTML = totalWithVat
    console.log("2")
    // const tmp = parseFloat(totalWithVat)// - document.getElementById('deposit').value  ;
    // console.log(typeof tmp)
    document.getElementById('summaryToPay').innerHTML = totalWithVat;
    console.log("3")
}

function updatePriceWIthoutVat(){
    const discounts = document.getElementsByName('discount')
    const costs = document.getElementsByClassName('itemSum')
    if (discounts.length != costs.length){
        alert('Error updatnutia policka: "Suma bez DPH"')
        return
    }
    let sum = 0;
    for (let i=0; i< discounts.length ; i++){
        const price = parseFloat(costs[i].innerHTML)
        const discount = parseFloat(discounts[i].value)
        sum += price * (1 - discount/100)
    }
    document.getElementById('summaryWithoutVat').innerHTML = sum.toFixed(2);
}