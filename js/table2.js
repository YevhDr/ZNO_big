google.charts.load('current', {'packages':['table']});
        google.charts.setOnLoadCallback(drawTable);

        function drawTable() {
            var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1m6sMLwWjgYJ-3e5vN0tfhNS5LYgxwcvAjjMfsSuaz7c/edit#gid=1686522868');
            var options = {
                pageSize: 20,
                page:'enable',
                sortColumn: 1,
                sortAscending: false
            };

            query.send(handleQueryResponse);


            function handleQueryResponse(response) {
                if (response.isError()) {
                    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    return;
                }

                // Create our data table.
                var data = response.getDataTable();
                var table  = new google.visualization.Table(document.getElementById('table2_div'));


                table.draw(data, options);

            }
        }