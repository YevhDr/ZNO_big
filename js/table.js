d3.csv("data/totalMs_to_totalSt.csv", function(dataSet) {

    dataSet.forEach(function (d) {
        d.total_st = +d.total_st;
        d.percent = +d.percent;
        d.mol_sp = +d.mol_sp

    });

    $('#example').DataTable({
        "order": [[ 1, "desc" ]],
        data: dataSet,
        columns: [
            {mData: "vnz", title: "університет"},
            {mData: "mol_sp", title: "к-ть мол. спец."},
            {mData: "percent", title: "від заг. к-ті бакалаврів,%"}

        ]
    })

});
