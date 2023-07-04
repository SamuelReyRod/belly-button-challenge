// Horizontal bar chart with a dropdown menu to display the top 10 OTUs

function fetchData(sample) {
    d3.json(
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    ).then((data) => {
      const samples = data.samples;
      const sampleArray = samples.filter((sampleDict) => sampleDict.id == sample);
      const result = sampleArray[0];
      const otuIDs = result.otu_ids;
      const otuLabels = result.otu_labels;
      const sampleValues = result.sample_values;
  
      const bubbleLayout = {
        title: "Top 10 Bacteria Diversity",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30, l: 150 },
      };
  
      const bubbleData = [
        {
          x: otuIDs,
          y: sampleValues,
          text: otuLabels,
          mode: "markers",
          marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: "Earth",
          },
        },
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
      const yticks = otuIDs
        .slice(0, 10)
        .map((otuID) => `OTU ${otuID}`)
        .reverse();
      const barData = [
        {
          y: yticks,
          x: sampleValues.slice(0, 10).reverse(),
          text: otuLabels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        },
      ];
  
      const barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 },
      };
  
      Plotly.newPlot("bar", barData, barLayout);
    });
  }
  
  function buildMetadata(sample) {
    d3.json(
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    ).then((data) => {
      const metadata = data.metadata;
      const resultArray = metadata.filter(
        (sampleDictionary) => sampleDictionary.id == sample
      );
      const result = resultArray[0];
      const PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
  
      for (const key in result) {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      }
  
      buildGauge(result.wfreq);
    });
  }
  
  function init() {
    const selector = d3.select("#selDataset");
  
    d3.json(
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    ).then((data) => {
      const sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      const firstSample = sampleNames[0];
      fetchData(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    fetchData(newSample);
    buildMetadata(newSample);
  }
  
  init();
  