$( document ).ready(function() {

var margin = { top: 20, right: 20, bottom: 50, left: 50 },
    ww = document.getElementById("scatter").clientWidth,
    outerHeight = 400,
    width = ww - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;



var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xCat = "x1",
    yCat = "y1",
    vnz = "vnz",
    spec = "spec",
    rCat = 3,
    colorCat = "#faa61a";



d3.csv("data/zno_scatterplot.csv", function(data) {
    data.forEach(function(d) {
        d.pzso_bud = +d.pzso_bud;
        d.ms_bud = +d.ms_bud;
        d.pzso_cont = +d.pzso_cont;
        d.ms_cont = +d.ms_cont;

    });

    var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
        xMin = d3.min(data, function(d) { return d[xCat]; }),
        xMin = xMin > 0 ? 0 : xMin,
        yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
        yMin = d3.min(data, function(d) { return d[yCat]; }),
        yMin = yMin > 0 ? 0 : yMin;

    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);

//    var color = d3.scale.category10();



    var zoomBeh = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", ww)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
            return d.spec + "<br>" + d.vnz;
        });

    svg.call(tip);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width)
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
        .attr("width", width)
        .attr("height", height);

    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
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
        .enter().append("circle")
        .classed("dot", true)
        // .attr("r", function (d) { return 6 * Math.sqrt(d[rCat] / Math.PI); })
        .attr('r', rCat)
        .attr("transform", transform)
        .style("fill",  colorCat)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    // var legend = svg.selectAll(".legend")
    //     .data(color.domain())
    //     .enter().append("g")
    //     .classed("legend", true)
    //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    //
    // legend.append("circle")
    //     .attr("r", 3.5)
    //     .attr("cx", width + 20)
    //     .attr("fill", colorCat);
    //
    // legend.append("text")
    //     .attr("x", width + 26)
    //     .attr("dy", ".35em")
    //     .text(function(d) { return d; });

    d3.select("#contract").on("click", contract);
    d3.select("#budget").on("click", budget);

    function contract() {
        xCat = "x2";
        yCat = "y2";
        colorCat = "#ff9999";
        var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
            xMin = d3.min(data, function(d) { return d[xCat]; }),
            xMin = xMin > 0 ? 0 : xMin,
            yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
            yMin = d3.min(data, function(d) { return d[yCat]; }),
            yMin = yMin > 0 ? 0 : yMin;

        zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

        var svg = d3.select("#scatter").transition();

        svg.select(".x.axis").duration(750).call(xAxis).select(".label").text("після школи");

        objects.selectAll(".dot").style('fill', colorCat).transition().duration(1000).attr("transform", transform);

    }

    function budget() {
        xCat = "x1";
        yCat = "y1";
        colorCat = "#faa61a";
        var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
            xMin = d3.min(data, function(d) { return d[xCat]; }),
            xMin = xMin > 0 ? 0 : xMin,
            yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
            yMin = d3.min(data, function(d) { return d[yCat]; }),
            yMin = yMin > 0 ? 0 : yMin;

        zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

        var svg = d3.select("#scatter").transition();

        svg.select(".x.axis").duration(750).call(xAxis).select(".label").text("після школи");

        objects.selectAll(".dot").style('fill', colorCat).transition().duration(1000).attr("transform", transform);
    }

    function zoom() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);

        svg.selectAll(".dot")
            .attr("transform", transform);
    }

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
                        .style("fill", colorCat)
                        .attr("r", rCat * 2);

                }
                i++;
            });
        } else {

            dots
                .style("visibility", "visible")
                .style("fill", colorCat)
                .attr("r", rCat);

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
                .style("fill", colorCat)
                .style("visibility", "visible")
                .attr("r", rCat);

        }
    }).keyup();


    d3.select(window).on('resize', resize);
    function resize() {

    }
});


});

