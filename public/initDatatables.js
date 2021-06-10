$(document).ready(function() {
    $('#fancyTable').DataTable({
        "order": [[1,"desc"]],
        "language":{
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Slovak.json"
        },
        lengthMenu: [20,25,50,100]
    });
});