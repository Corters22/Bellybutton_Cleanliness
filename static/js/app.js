//Create var for data from json file
const fullData = data;

// Create variables for different parts of the data to be used later
var names = fullData.names;
var meta = fullData.metadata;
var samples = fullData.samples;
var otu_ids = samples.map(sample => sample.otu_ids);
var sampleValues = samples.map(sample => sample.sample_values);
var otuLabels = samples.map(sample => sample.otu_labels);
var metaID = meta.map(patient => patient.id);
var sampleID = samples.map(sample => sample.id);

// Create dropdown list
names.forEach(function(name) {
    d3.select("#selDataset").insert('option').property("value", name).text(name);
});

// Create event to call value from dropdown list

var dropDownMenu = d3.select('#selDataset').node();
var subjectID = dropDownMenu.value;
var filteredSamples = samples.filter(sample => sample.id === subjectID);
var filteredMeta = meta.filter(patient => patient.id === parseInt(subjectID));
console.log('subject id', subjectID);

// Create init function for default page
function init(){
    barChart();
    buildDemo();
    bubbleChart();
}
init();

//1. Horizontal bar chart with top 10 OTU_id's and sample value
function barChart () {
    // var filteredSamples = samples.filter(samples.map(sample => sample.id) === subjectID);
    var data = [{
        y: filteredSamples[0].otu_ids.slice(0, 10).map((id) => {
            return `OTU ${id}`}),
        x: filteredSamples[0].sample_values.slice(0, 10),
        type: "bar",
        orientation: "h", 
        text: filteredSamples[0].otu_labels.slice(0, 10)
    }]
    var layout = {
        title: "OTU Samples",
        xaxis: {
            title:"Sample Values"
            },
        }
    
    Plotly.newPlot('bar', data, layout);
}

// 2. Build Demographic info
function buildDemo() {
    metaList = []
    var demoInfo = d3.select('#sample-metadata');
    Object.entries(filteredMeta[0]).forEach(([key, value]) => {
        metaList.push(`${key}: ${value}`);
    });
    
    for (var i=0; i < metaList.length; i++){
        demoInfo.insert('p').text(metaList[i]);
    }
    console.log(metaList);
}

// 3. Build bubble chart
function bubbleChart () {
    var data = [{
        x: filteredSamples[0].otu_ids, 
        y: filteredSamples[0].sample_values,
        mode: "markers",
        type: "bubble",
        marker: {
            size: filteredSamples[0].sample_values, 
            color: filteredSamples[0].otu_ids},
        text: filteredSamples[0].otu_labels
    }]
    var layout = {
        xaxis: {
            title: "OTU ID"
        }
    }
    Plotly.newPlot("bubble", data, layout);
}

// 4. Rebuild plots based on event change
d3.selectAll('#selDataset').on('change', optionChanged);
function optionChanged () {
    // d3.event.preventDefault();
    // Create event to call value from dropdown list

    var dropDownMenu = d3.select('#selDataset').node();
    var subjectID = dropDownMenu.value;
    var filteredSamples = samples.filter(sample => sample.id === subjectID);
    var filteredMeta = meta.filter(patient => patient.id === parseInt(subjectID));
    console.log("new subject id", subjectID)
    d3.selectAll('p').text('');
    Plotly.restyle("bar", )
}