const inhabitants = [
  {
    value: 328_200_000,
    country: "US",
    color: "#2e2ea8",
  },
  {
    value: 60_360_000,
    country: "IT",
    color: "#009245",
  },
  {
    value: 83_020_000,
    country: "DE",
    color: "#ffcc01",
  },
  {
    value: 10_230_000,
    country: "SE",
    color: "#015292",
  },
];

d3
  .select("div")
  .selectAll("p")
  .data(inhabitants)
  .enter()
  .append("p")
  .text(data => Intl.NumberFormat("it-IT").format(data.value))
  .append("img")
  .attr("src", data => `https://www.countryflags.io/${data.country.toLowerCase()}/flat/32.png`);

/********
 D3-SCALE
 ********/

const scales = {
  x: d3.scaleBand().rangeRound([ 0, 500 ]).domain(inhabitants.map(_ => _.country)).padding(0.1),
  y: d3.scaleLinear().range([ 300, 0 ]).domain([ 0, inhabitants.sort((a, b) => b.value - a.value)[0].value + 1_000_000 ]),
};

d3
  .select("svg")
  .style("width", "500px")
  .style("height", "300px")
  .selectAll(".bar")
  .data(inhabitants)
  .enter()
  .append("rect")
  .attr("width", scales.x.bandwidth())
  .attr("height", data => 300 - scales.y(data.value))
  .attr("x", data => scales.x(data.country))
  .attr("y", data => scales.y(data.value))
  .attr("fill", data => data.color);
