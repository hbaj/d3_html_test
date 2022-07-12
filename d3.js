var data = [5,3,7,1,3];

var svg = d3.select(".d3-container").append("svg");
svg.attr("width", 660)
.attr("height", 400)
.append("g")
.attr("transform", "translate(20,20)")

svg.selectAll('circle')
.data(data)
.join('circle')
.attr('r',5)
.attr('cy', 300)
.transition()
.attr('cx',r => r*10)
svg.append("text")
        // .attr("x", (20 / 2))             
        .attr("y", 20)
        // .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Value vs Date Graph");


const svgLegend = d3.select("svg").append("g")
svgLegend.attr("transform", "translate(360,80)")
.append("rect")
.attr("width", 40)
.attr("height", 10)
