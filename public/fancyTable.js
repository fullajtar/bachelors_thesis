<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"/>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
<script></script>
$(document).ready(function() {
    $('#fancyTable').DataTable({
        "language":{
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Slovak.json"
        },
        lengthMenu: [20,25,50,100]
    });
});