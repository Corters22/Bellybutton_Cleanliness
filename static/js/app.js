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
var initSubjectID = dropDownMenu.value;
var initSamples = samples.filter(sample => sample.id === initSubjectID);
var initMeta = meta.filter(patient => patient.id === parseInt(initSubjectID));
console.log('init subject id', initSubjectID);

// Create init function for default page
function init(){
    barChart(initSamples);
    buildDemo(initMeta);
    bubbleChart(initSamples);
    gaugeChart(initMeta);
}
init();

//1. Horizontal bar chart with top 10 OTU_id's and sample value
function barChart (filteredList) {
    // var filteredSamples = samples.filter(samples.map(sample => sample.id) === subjectID);
    var data = [{
        y: filteredList[0].otu_ids.slice(0, 10).map((id) => {
            return `OTU ${id}`}),
        x: filteredList[0].sample_values.slice(0, 10),
        type: "bar",
        orientation: "h", 
        text: filteredList[0].otu_labels.slice(0, 10),
        marker: {color: "#dc143c"}
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
function buildDemo(filteredList) {
    metaList = []
    var demoInfo = d3.select('#sample-metadata');
    Object.entries(filteredList[0]).forEach(([key, value]) => {
        metaList.push(`${key}: ${value}`);
    });
    
    for (var i=0; i < metaList.length; i++){
        demoInfo.insert('p').text(metaList[i]);
    }
}

// 3. Build bubble chart
function bubbleChart (filteredList) {
    var data = [{
        x: filteredList[0].otu_ids, 
        y: filteredList[0].sample_values,
        mode: "markers",
        type: "bubble",
        marker: {
            size: filteredList[0].sample_values, 
            color: filteredList[0].otu_ids},
        text: filteredList[0].otu_labels
    }]
    var layout = {
        xaxis: {
            title: "OTU ID"
        }
    }
    Plotly.newPlot("bubble", data, layout);
}

//Bonus - build Gauge Chart
function gaugeChart (filteredList) {
    var data = [{
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null,9],
            tickmode: "array",
            ticktext: [1, 2, 3, 4, 5, 6, 7, 8],
            nticks: 8,
            ticks: "inside",
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8],
            }
        },
        value: filteredList[0].wfreq,
        title: {text: "Belly Button Washing<br>Frequency per Week", font: {
            family: "Arial", size: 30, color: "#228b22"
        }},
        
    }]
    Plotly.newPlot('gauge', data)
};

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
    barChart(filteredSamples);
    buildDemo(filteredMeta);
    bubbleChart(filteredSamples);
    gaugeChart(filteredMeta);
        
}