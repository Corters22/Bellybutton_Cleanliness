# How often should you clean your belly button

![bellybutton pic](static/images/belly%20button%20pic.PNG)

## Data
The following project is used to show how the Plotly library and D3 in JavaScript can create dynamic charts for a dashboard. The data used can be found [here](samples.json). This data was generated from a real study ["Belly Button Biodiversity"](http://robdunnlab.com/projects/belly-button-biodiversity/). This study looked into the different types of microbes living in the belly button. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. The data also includes demographics of the subject, including the washing frequency.

## Charts/Visualizations
The charts can be updated by choosing a subject ID number from the dropdown box.

### Demographics
The demographics include subject ID, ethnicity, gender, age, location, bbtype (belly button type) (i = innie, o = outie), wfreq (washing frequency per week).

![demo pic](static/images/screen%20shot%20demo.PNG)

### Bar Chart
The bar chart shows the top 10 OTUs and the values of the samples. Some have less than 10 total OTUs. If you hover over the bar you can see the type of OTUs found in the samples.

![bar chart](static/images/screen%20shot%20bar.PNG)

### Gauge Chart
This chart displays how often the subject washed his/her bellybutton per weekend via a gauge chart.

![gauge chart](static/images/screen%20shot%20gauge.PNG)

### Bubble Chart
This also shows the OTUs and the values of the samples. The size of the bubbles coincides with the size of the values and the colors coincide with the OTU ID. If you hover over the bubble, you can see the type of OTUs found in the samples.

![bubble chart](static/images/screen%20shot%20bubble.PNG)

## Deployment
You can go directly to the dashboard [here](https://corters22.github.io/plotly-challenge/index.html)
