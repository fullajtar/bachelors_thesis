function checkextension() {
    var file = document.querySelector("#expenseFile");
    if ( /\.(jpe?g|png|gif)$/i.test(file.files[0].name) === false ) { alert("not an image!"); }
}
// credits to: https://stackoverflow.com/a/40753305