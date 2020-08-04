import React, { Component } from "react";
import "../css/main.scss";
import Map from "esri/Map";
import mapview from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import MapImageLayer from "esri/layers/MapImageLayer";
import Sketch from "esri/widgets/Sketch";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import Expand from "esri/widgets/Expand";
import AreaMeasurement2D from "esri/widgets/AreaMeasurement2D";
import DistanceMeasurement2D from "esri/widgets/DistanceMeasurement2D";
import Compass from "esri/widgets/Compass";
import BasemapGallery from "esri/widgets/BasemapGallery";
import Home from "esri/widgets/Home";
import ScaleBar from "esri/widgets/ScaleBar";
import Bookmarks from "esri/widgets/Bookmarks";
import CoordinateConversion from "esri/widgets/CoordinateConversion";

class Maps extends Component {
  componentDidMount() {
    document.body.style.padding = "0";
    document.body.style.margin = "0";

    const layer = new GraphicsLayer();

    var nasemLineSymbol = {
      type: "simple",
      symbol: {
        type: "simple-line",
        cap: "round",
        color: [0, 0, 255, 0.3],
        width: "100px",
        style: "solid",
      },
    };

    let template = {
      // autocasts as new PopupTemplate()
      title: "Trail run",
      content: "asas",
      // actions: [measureThisAction],
    };

    var Building_LinesLabel = {
      symbol: {
        type: "text",
        color: "black",
        haloColor: "white",
        haloSize: "1.5px",
        font: {
          size: "13px",
          family: "Noto Sans",
          style: "italic",
          weight: "normal",
        },
      },
      labelPlacement: "above-center",
      labelExpressionInfo: {
        expression: "$feature.MATERIAL_E",
      },
    };

    const Building_point = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker/FeatureServer/1",
    });
    const survyPoint = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker/FeatureServer/2",
    });
    const Building_Lines = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker/FeatureServer/3",
      outFields: ["*"],
      popupEnabled: true,
      id: "NamseLineLayer",
      renderer: nasemLineSymbol,
      labelingInfo: [Building_LinesLabel],
      outFields: ["MATERIAL_E", "FEEDSOURCE"],
      popupTemplate: template,
    });
    const Building = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker/FeatureServer/4",
    });
    const Building_polygon = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker/FeatureServer/5",
    });
    let map1 = new Map({
      basemap: "streets",
      // layers: [
      // Building_point,
      // survyPoint,
      // Building_Lines,
      // Building,
      // Building_polygon,
      // ],
      layers: [layer],
    });
    console.log(map1);
    const MapImage2 = new MapImageLayer({
      url: "http://localhost:6080/arcgis/rest/services/DataWorker/MapServer",
      sublayers: [
        {
          id: 2,
          popupTemplate: {
            title: "ahmed2",
            content: " people lived in this county in 2007",
          },
        },
      ],
    });
    map1.add(MapImage2);

    const MapImage1 = new MapImageLayer({
      url: "http://localhost:6080/arcgis/rest/services/DataWorker/MapServer",
      sublayers: [
        {
          id: 1,
          popupTemplate: {
            title: "ahmed1",
            content: "people lived in this county in 2007",
          },
        },
      ],
    });
    map1.add(MapImage1);
    const MapImage3 = new MapImageLayer({
      url: "http://localhost:6080/arcgis/rest/services/DataWorker/MapServer",
      sublayers: [
        {
          id: 3,
          popupTemplate: {
            title: "ahmed3",
            content: "people lived in this county in 2007",
          },
        },
      ],
    });
    map1.add(MapImage3);
    const MapImage4 = new MapImageLayer({
      url: "http://localhost:6080/arcgis/rest/services/DataWorker/MapServer",
      sublayers: [
        {
          id: 4,
          popupTemplate: {
            title: "ahmed4",
            content: "people lived in this county in 2007",
          },
        },
      ],
    });
    map1.add(MapImage4);
    const MapImage5 = new MapImageLayer({
      url: "http://localhost:6080/arcgis/rest/services/DataWorker/MapServer",
      sublayers: [
        {
          id: 5,
          popupTemplate: {
            title: "ahmed5",
            content: "people lived in this county in 2007",
          },
        },
      ],
    });
    map1.add(MapImage5);

    let view = new mapview({
      container: "viewDiv",
      map: map1,
      zoom: 10,
      center: [50.03602559770744, 26.38306796977232], // longitude, latitude
    });
    console.log(view);
    MapImage2.when(function () {
      view.goTo(MapImage2.fullExtent).catch(function (error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    });

    var measurementWidget = new AreaMeasurement2D({
      view: view,
    });
    view.ui.add(measurementWidget, "top-right");

    var sketch = new Sketch({
      layer: layer,
      view: view,
      creationMode: "update",
    });

    var bgExpand = new Expand({
      expandIconClass: "esri-icon-sketch-rectangle",
      view: view,
      content: sketch,
    });

    view.ui.add(bgExpand, "top-right");

    var compass = new Compass({
      view: view,
    });

    // adds the compass to the top left corner of the MapView
    view.ui.add(compass, "top-left");

    var basemapGallery = new BasemapGallery({
      view: view,
    });

    const basemapExpand = new Expand({
      view: view,
      content: basemapGallery,
      expanded: false,
    });
    // Add the widget to the top-right corner of the view
    view.ui.add(basemapExpand, "top-right");

    var homeWidget = new Home({
      view: view,
    });

    // adds the home widget to the top left corner of the MapView
    view.ui.add(homeWidget, "top-left");

    var scaleBar = new ScaleBar({
      view: view,
      unit: "metric",
    });
    // Add widget to the bottom left corner of the view
    view.ui.add(scaleBar, {
      position: "bottom-left",
    });

    const bookmarks = new Bookmarks({
      view: view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
      bookmarkCreationOptions: {
        takeScreenshot: true,
        captureExtent: false,
        screenshotSettings: {
          width: 100,
          height: 100,
        },
      },
    });

    const bkExpands = new Expand({
      view: view,
      content: bookmarks,
      expanded: false,
    });

    // Add the widget to the top-right corner of the view
    view.ui.add(bkExpands, "top-right");

    // bonus - how many bookmarks in the webmap?
    MapImage2.when(function () {
      if (MapImage2.bookmarks && MapImage2.bookmarks.length) {
        console.log("Bookmarks: ", MapImage2.bookmarks.length);
      } else {
        console.log("No bookmarks in this webmap.");
      }
    });

    var ccWidget = new CoordinateConversion({
      view: view,
    });

    // Adds widget in the bottom left corner of the view
    view.ui.add(ccWidget, "bottom-left");

    var measurementWidget = new DistanceMeasurement2D({
      view: view,
    });
    view.ui.add(measurementWidget, "top-right");
  }
  render() {
    return (
      <div>
        <div
          id="viewDiv"
          style={{
            height: "100%",
            width: "100%",
            padding: "0",
            margin: "0",
            position: "absolute",
          }}
        >
          <div id="basemapGalleryDiv"></div>
        </div>
      </div>
    );
  }
}

export default Maps;
