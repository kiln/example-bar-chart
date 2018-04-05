import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3-array";

var svg, margin, width, height;
var x, y;
var g;

export var data = {};
// If your template includes data tables, use this variable to access the data.
// Each of the 'datasets' in data.json file will be available as properties of the data.

export var state = {
  bar_fill: "#333333"
  // The current state of template. You can make some or all of the properties
  // of the state object available to the user as settings in settings.js.
};

export function update() {
  // The update function is called whenever the user changes a data table or settings
  // in the visualisation editor, or when changing slides in the story editor.

  // Tip: to make your template work nicely in the story editor, ensure that all user
  // interface controls such as buttons and sliders update the state and then call update.
  console.log("oi")
  x.domain(data.values.map(function(d) { return d.x; }));
  y.domain([0, max(data.values, function(d) { return d.y; })]);

  g.select(".axis.axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

  g.select(".axis.axis--y")
      .call(axisLeft(y).ticks(10, "%"))
      
  selectAll(".axis--y .tick text")
      .attr("y", "0.32em")
      .attr("dy", null)
      .attr("alignment-baseline", "baseline")
      .attr("text-anchor", "end");

  selectAll(".axis--x .tick text")
      .attr("y", 18)
      .attr("dy", null)
      .attr("text-anchor", "middle");

  selectAll("text").attr("font-family", "Futura");

  var bars = g.selectAll(".bar")
    .data(data.values)
    
  var bars_enter = bars.enter().append("rect");

  var bars_update = bars.merge(bars_enter);

  bars_update
      .attr("class", "bar")
      .attr("fill", state.bar_fill)
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.y); });
}

export function draw() {
	// The draw function is called when the template first loads

	svg = select("svg").attr("width", window.innerWidth);
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

	x = scaleBand().rangeRound([0, width]).padding(0.1),
	    y = scaleLinear().rangeRound([height, 0]);

	g = svg.select("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	update();

	window.onresize = function() { draw() };
}
