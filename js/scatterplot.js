$( document ).ready(function() {

var margin = { top: 20, right: 20, bottom: 50, left: 50 },
    ww = document.getElementById("scatter").clientWidth ,
    outerHeight = document.getElementById("scatter").clientWidth / 1.5,
    width = ww - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;



var x = d3.scale.linear()
    .range([0, ww]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xCat = "x1",
    yCat = "y1",
    vnz = "vnz",
    spec = "spec",
    rCat = 3
    // , colorCat = "#faa61a"
    ;



d3.csv("data/zno_for scatterplot(new)-2.csv", function(data) {
    data.forEach(function(d) {
        d.x1 = +d.x1;
        d.y1 = +d.y1;
        d.x2 = +d.x2;
        d.y2 = +d.y2;
        d.pzso_cont = +d.pzso_cont;
        d.ms_cont = +d.ms_cont;

    });

    var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
        // xMin = d3.min(data, function(d) { return d[xCat]; }) ,
        xMin = -3,
        yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
        // yMin = d3.min(data, function(d) { return d[yCat]; }),
        yMin = -3;

    x.domain([xMin, 150]);
    y.domain([yMin, yMax]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-ww);

//    var color = d3.scale.category10();



    // var zoomBeh = d3.behavior.zoom()
    //     .x(x)
    //     .y(y)
    //     .scaleExtent([-3, 500])
    //     .on("zoom", zoom);

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", ww)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // .call(zoomBeh);

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
            return "Cпец-ть: " + d.spec + ";" + "<br>" + d.code + "; " + "<br>" + d.vnz + "; " + "<br>" +
                "мол.спец-тів: " + d[yCat]+ ";"  + "<br>" + "після школи: " + d[xCat]+ ";";
        });

    svg.call(tip);

    // var tooltip = d3.select("body").append("div")
    //     .attr("class", "tooltips")
    //     .style("opacity", 0);

    svg.append("rect")
        .attr("width", ww)
        .attr("height", height);

    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", ww - 50)
        .attr("y", margin.bottom - 10)
        .style("text-anchor", "end")
        // .text(xCat)
        .text("після школи")
        .attr("class", "axis");

    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        // .text(yCat);
        .text("молодші спеціалісти")
        .attr("class", "axis");

    var objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", ww)
        .attr("height", height);

    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", ww)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");

    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);

    var dots = objects.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        // .filter(function (d) { return d[yCat] > 0 && d[xCat] > 0 ; })
        .classed("dot", true)
        // .attr("r", function (d) { return 6 * Math.sqrt(d[rCat] / Math.PI); })
        // .attr("r", function (d) { if (d[rCat] >= 50) { return 5; } else { return 3; } })
        .attr('r', 3)
        .attr("transform", transform)
        .style("fill",  function (d) {
            if (d[yCat] / ((d[xCat] + d[yCat]) / 100) > 27) {
                return "#ed164e";
            } else {
                return "#8e8f91"; } })

        // .on("click", function(d) {
        //     tooltip.transition().duration(200).style("opacity", .9);
        //     tooltip.html("Cпец-ть: " + d.spec + ";" + "<br>" + d.code + "; " + "<br>" + d.vnz + "; " + "<br>" +
        //                     "мол.спец-тів: " + d[yCat]+ ";"  + "<br>" + "після школи: " + d[xCat]+ ";")
        //         .style("left", (d3.event.pageX + 10) + "px")
        //         .style("top", (d3.event.pageY + 10) + "px");
        //             })
        //
        // .on("mouseout", function(d) {
        //     tooltip.transition().duration(500).style("opacity", 0);
        // });
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    // var color = [1,2];
    // var legend = svg.selectAll(".legend")
    //     .data(color)
    //     .enter().append("g")
    //     .classed("legend", true);
    //     // .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    //
    // legend.append("circle")
    //     .attr("r", 3.5)
    //     .attr("cx", ww)
    //     .attr("fill", color);
    //
    // legend.append("text")
    //     .attr("x", ww)
    //     .attr("dy", ".35em")
    //     .text("порог");

    d3.select("#contract").on("click", contract);
    d3.select("#budget").on("click", budget);

    function contract() {
        xCat = "x2";
        yCat = "y2";
        colorCat = "#a4a5a7";
        var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
            // xMin = d3.min(data, function(d) { return d[xCat]; }),
            xMin = -3,
            yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
            // yMin = d3.min(data, function(d) { return d[yCat]; }),
            yMin = -3;

        // zoomBeh.x(x.domain([xMin, 150])).y(y.domain([yMin, yMax]));

        var svg = d3.select("#scatter").transition();

        svg.select(".x.axis").duration(750).call(xAxis).select(".label").text("після школи");

        objects.selectAll(".dot")
            .style('fill',  function (d) {
                if (d[yCat] / ((d[xCat] + d[yCat]) / 100) > 39.8) {
                    return "#ed164e";
                } else {
                    return "#8e8f91"; } })
            .transition().duration(1000)
            .attr("transform", transform);

    }

    function budget() {
        xCat = "x1";
        yCat = "y1";
        colorCat = "#faa61a";
        var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
            // xMin = d3.min(data, function(d) { return d[xCat]; }),
            xMin = -3,
            yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
            // yMin = d3.min(data, function(d) { return d[yCat]; }),
            yMin = -3;

        // zoomBeh.x(x.domain([xMin, 150])).y(y.domain([yMin, yMax]));

        var svg = d3.select("#scatter").transition();

        svg.select(".x.axis").duration(750).call(xAxis).select(".label").text("після школи");

        objects.selectAll(".dot")
            .style('fill',  function (d) {
                if (d[yCat] / ((d[xCat] + d[yCat]) / 100) > 27) {
                    return "#ed164e";
                } else {
                    return "#8e8f91"; } })
            .transition().duration(1000)
            .attr("transform", transform);
    }

    // function zoom() {
    //     svg.select(".x.axis").call(xAxis);
    //     svg.select(".y.axis").call(yAxis);
    //
    //     svg.selectAll(".dot")
    //         .attr("transform", transform);
    // }

    function transform(d) {
        return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
    }

////////////////// search try////
    $("#filter").keyup(function () {
        var value = $(this).val();

        if(value){
            var i = 0;
            var re = new RegExp(value,"i");


            data.forEach(function(d){
                // find all laws with this string
                //if (d[4].indexOf(value) == -1){ // color gray if not a match
                if (!d.spec.match(re) ){ // color gray if not a match
                    d3.select(dots[0][i])
                        .style("visibility", "hidden");



                } else {
                    d3.select(dots[0][i])
                        .style("visibility", "visible")
                        .style("fill",  function (d) {
                            if (d[yCat] / ((d[xCat] + d[yCat]) / 100) > 27) {
                                return "#ed164e";
                            } else {
                                return "#8e8f91"; } })
                        .attr("r", 6);

                }
                i++;
            });
        } else {

            dots
                .style("visibility", "visible")
                .style("fill",  function (d) {
                    if (d[yCat] / ((d[xCat] + d[yCat]) / 100) > 27) {
                        return "#ed164e";
                    } else {
                        return "#8e8f91"; } })
                .attr("r", 3);

        }
    }).keyup();


    $("#filter2").keyup(function () {
        var value = $(this).val();

        if(value){
            var i = 0;
            var re = new RegExp(value,"i");


            data.forEach(function(d){
                // find all laws with this string
                //if (d[4].indexOf(value) == -1){ // color gray if not a match
                if (!d.vnz.match(re) ){ // color gray if not a match
                    d3.select(dots[0][i])
                        .style("visibility", "hidden");

                } else {
                    d3.select(dots[0][i])
                        .style("opacity", 0.7)
                        .style("visibility", "visible")
                        .attr("r", rCat * 2);

                }
                i++;
            });
        } else {

            dots
                .style("fill",  function (d) {
                    if (d[yCat] / ((d[xCat] + d[yCat]) / 100) > 27) {
                        return "#ed164e";
                    } else {
                        return "#8e8f91"; } })
                .style("visibility", "visible")
                .attr("r", rCat);

        }
    }).keyup();


    d3.select(window).on('resize', resize);
    function resize() {

    }
});

d3.select("#scatter svg").select(".dots")
    .append("circle")
    .attr("cx", ww + 20)
    .attr("cy", height)
    .attr("r", 20)
    .attr("fill", "#ed164e");

});

