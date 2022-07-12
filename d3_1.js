// Dimension of the whole chart. Only one size since it has to be square
const marginWhole = { top: 10, right: 10, bottom: 10, left: 10 },
  sizeWhole = 920 - marginWhole.left - marginWhole.right;

// Create the svg area
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", sizeWhole + marginWhole.left + marginWhole.right)
  .attr("height", sizeWhole + marginWhole.top + marginWhole.bottom)
  .append("g")
  .attr("transform", `translate(${marginWhole.left},${marginWhole.top})`)
  .attr("class", "canvas-g");

const address = d3
  .csv(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
  )
  .then((response) => response);

const printAddress = async () => {
  var data = await address;
  console.log("datos consola a= \n", data);
  const nested = Array.from(
    d3.group(data, (k) => k.Species),
    ([key, value]) => ({ key, value })
  );

  console.log("datos nested consola a= \n", nested);

  nested.forEach((element) => {
    console.log("element:", element.key);
  });

  console.log("length nested=", nested.length);
  console.log(
    "length nested=",
    d3.groups(data, (k) => k.Species)
  );
  console.log("length nested=", [...new Set(nested.map((a) => a.key))]);
  const dominio = [...new Set(nested.map((a) => a.key))];
  for (i in dominio) {
    console.log("length nested=", dominio[i]);
  }
  // What are the numeric variables in this dataset? How many do I have
  const allVar = ["Sepal_Length", "Sepal_Width", "Petal_Length", "Petal_Width"];
  const numVar = nested.length;

  // Now I can compute the size of a single chart
  mar = 80;
  size = sizeWhole / numVar;

  // ----------------- //
  // Scales
  // ----------------- //

  // Create a scale: gives the position of each pair each variable
  const position = d3
    .scalePoint()
    .domain(allVar)
    .range([0, sizeWhole - size]);

  // Color scale: give me a specie name, I return a color
  const color = d3
    .scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range(["#402D54", "#D18975", "#8FD175"]);

  console.log("all Var=", allVar);
  // ------------------------------- //
  // Add charts
  // ------------------------------- //
  for (i in allVar) {
    for (j in allVar) {
      // Get current variable name
      const var1 = allVar[i];
      const var2 = allVar[j];
      // Add X Scale of each graph
      xextent = d3.extent(data, function (d) {
        return +d[var1];
      });
      var x = d3
        .scaleLinear()
        .domain(xextent)
        .nice()
        .range([0, size - 2 * mar]);

      // Add Y Scale of each graph
      yextent = d3.extent(data, function (d) {
        return +d[var2];
      });
      var y = d3
        .scaleLinear()
        .domain(yextent)
        .nice()
        .range([size - 2 * mar, 0]);

      console.log("i,j", i, ",", j);
      const tmp = svg
        .append("g")
        .attr(
          "transform",
          `translate(${position(var1) + mar},${position(var2) + mar})`
        );

      // Add X and Y axis in tmp
      tmp
        .append("g")
        .attr("transform", "translate(" + 0 + "," + (size - mar * 2) + ")")
        .call(d3.axisBottom(x).ticks(3));
      tmp.append("g").call(d3.axisLeft(y).ticks(3));

      // Add circle
      tmp
        .selectAll("myCircles")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(+d[var1]);
        })
        .attr("cy", function (d) {
          return y(+d[var2]);
        })
        .attr("r", 3)
        .attr("fill", function (d) {
          return color(d.Species);
        });
    }
  }
};
printAddress();
