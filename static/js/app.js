const path = '../samples.json';

// Step 1: Plotly

function init() {

// Use the D3 library to read in samples.json.
d3.json(path).then(function(data) {
    var fullData = data;
    var names = fullData.names;
    var meta = fullData.metadata;
    var samples = fullData.samples;
    var otu_ids = samples.map(sample => sample.otu_ids);
    var sampleValues = samples.map(sample => sample.sample_values);
    var otuLabels = samples.map(sample => sample.otu_labels);
    console.log("meta for 1st pt", meta[0]);

    //Create a horizontal bar chart with a dropdown menu to display the 
    // top 10 OTUs found in that individual.

    var data = [{
        y: otu_ids[0].slice(0, 10).map((id) => {
            return `OTU ${id}`}),
        x: sampleValues[0].slice(0, 10),
        type: "bar",
        orientation: "h"
    }]
    var layout = {
        title: "OTU Samples",
        xaxis: {
            title:"Sample Values"
            },
        }
    
    function barPlot(){
        Plotly.newPlot('bar', data, layout);
    }
    barPlot();

    function buildDemo() {
        var demoInfo = d3.select('#sample-metadata');
        
    }

    d3.select("#sample-metadata").text(Object.entries(meta[0]))
})};

init();

//dropdown value === data.samples[0].id - for the charts
// === data.metadata.id, maybe use unpack