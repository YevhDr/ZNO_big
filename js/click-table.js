


    function click(data){

    d3.selectAll(".remove").remove();
    d3.selectAll(".pager_remove").remove();

    var parent_data = d3.select(this.parentNode).datum();
        var spec = parent_data.spec;
        console.log(spec);


        d3.select('.spec').append('p').attr('class', 'remove').text(spec);
        var dat = data.vnzs;


       var table2 = d3.select('.vnz')
           .append('table')
           .attr('class', "remove");

        var thead = table2.append('thead'),
            tbody = table2.append('tbody');

        thead.append('tr').selectAll('th')
            .data(['університет', 'бюджет', 'бюджет,%', 'контракт', 'контракт,%'])
            .enter()
            .append('th')
            .text(function (d) {
                return d;
            });

        var rows = tbody.selectAll('tr')
            .data(dat)
            .enter()
            .append('tr');

        rows.append('td')
            .text(function (d) {
                return d.vnz;
            });

        rows.append('td')
            .text(function (d) {
                return d.ms_bud;
            });

        rows.append('td')
            .text(function (d) {
                return d.ms_un_perc_bud + " %";
            });

        rows.append('td')
            .text(function (d) {
                return d.ms_cont;
            });

        rows.append('td')
            .text(function (d) {
                return d.ms_un_perc_cont + " %";
            });

        table2.selectAll("tbody tr")
            .sort(function(a, b) {
                return d3.descending(a.ms_cont, b.ms_cont);
            });

        ////////PAGINATION/////////////

        $('.remove').each(function() {
            var currentPage = 0;
            var numPerPage = 5;
            var $table = $(this);
            $table.bind('repaginate', function() {
                $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            });
            $table.trigger('repaginate');
            var numRows = $table.find('tbody tr').length;
            var numPages = Math.ceil(numRows / numPerPage);
            var $pager = $('<div class="pager_remove"></div>');
            for (var page = 0; page < numPages; page++) {
                $('<span class="page-number"></span>').text(page + 1).bind('click', {
                    newPage: page
                }, function(event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');
                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }
            $pager.insertBefore($table).find('span.page-number:first').addClass('active');
        });


    }



var file = "data/nested_zno.json";

d3.json(file, function(error, data) {
    if (error) throw error;





    data.forEach(function (d) {
        d.ms_bud = +d.ms_bud;
        d.ms_un_perc_bud = +d.ms_un_perc_bud;
		d.ms_cont = +d.ms_cont;
        d.ms_un_perc_cont = +d.ms_un_perc_cont;
		d.ms_perc_cont = +d.ms_perc_cont;
		d.ms_z_bud = +d.ms_z_bud;
		d.ms_z_cont = +d.ms_z_cont;
		d.ms_perc_bud = +d.ms_perc_bud;
   });

    var sortAscending = true;

    var table = d3.select('#chart')
        .append('table')
        .attr('class', 'table table-condensed');

// Append the table header and body.
    var tableHead = table.append('thead'),
        tableBody = table.append('tbody').attr("class", "searchable");

// Add the table header content.
    tableHead.append('tr').selectAll('th')
        .data(['спец-ть', 'бюджет', 'бюджет,%', 'контракт', 'контракт,%'])
        .enter()
        .append('th')
        .text(function (d) {
            return d;
        });

// Add the table body rows.
    var rows = tableBody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

// Add the stock name cell.


// Add the stock name cell.
    rows.append('td')
         .text(function (d) {
            return d.spec;
         })
         .on('click', click);


    rows.append('td')
        .text(function (d) {
            return d.ms_z_bud;
        });

    rows.append('td')
        .text(function (d) {
            return d.ms_perc_bud + " %";
        });


	rows.append('td')
        .text(function (d) {
            return d.ms_z_cont;
    });
	
	rows.append('td')
        .text(function (d) {
            return d.ms_perc_cont + " %";
    });

    table.selectAll("tbody tr")
        .sort(function(a, b) {
            return d3.descending(a.ms_z_cont, b.ms_z_cont);
        });

    ////////PAGINATION/////////////

    $('.table.table-condensed').each(function() {
        var currentPage = 0;
        var numPerPage = 5;
        var $table = $(this);
        $table.bind('repaginate', function() {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pager"></div>');
        for (var page = 0; page < numPages; page++) {
            $('<span class="page-number"></span>').text(page + 1).bind('click', {
                newPage: page
            }, function(event) {
                currentPage = event.data['newPage'];
                $table.trigger('repaginate');
                $(this).addClass('active').siblings().removeClass('active');
            }).appendTo($pager).addClass('clickable');
        }
        $pager.insertBefore($table).find('span.page-number:first').addClass('active');
    });



});
////////////////TABLE SEARCH////////////////

    $(document).ready(function () {

        (function ($) {

            $('#filter').keyup(function () {

                var rex = new RegExp($(this).val(), 'i');
                $('.searchable tr').hide();
                $('.searchable tr').filter(function () {
                    return rex.test($(this).text());
                }).show();

            })

        }(jQuery));

    });






