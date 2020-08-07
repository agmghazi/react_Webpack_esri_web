import React, { useState, useEffect } from "react";
import "../css/main.scss";
import Map from "esri/Map";
import mapview from "esri/views/MapView";
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

export default function Maps() {
  useEffect(() => {
    document.body.style.padding = "0";
    document.body.style.margin = "0";
    const layer = new GraphicsLayer();
    let map1 = new Map({
      basemap: "streets",
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

    const sketch = new Sketch({
      layer: layer,
      view: view,
      creationMode: "update",
    });

    const sketchExpand = new Expand({
      expandIconClass: "esri-icon-sketch-rectangle",
      label: "أدوات الرسم",
      view: view,
      content: sketch,
      mode: "floating",
    });

    const compass = new Compass({
      view: view,
    });

    const basemapGallery = new BasemapGallery({
      view: view,
    });

    const basemapExpand = new Expand({
      view: view,
      content: basemapGallery,
      expanded: false,
      label: "الخرائط",
    });

    const homeWidget = new Home({
      view: view,
    });

    const scaleBar = new ScaleBar({
      view: view,
      unit: "metric",
    });

    const bookmarks = new Bookmarks({
      view: view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
      bookmarks: [],
    });
    const BookmarksExpands = new Expand({
      view: view,
      content: bookmarks,
      expanded: false,
    });
    // bonus - how many bookmarks in the webmap?
    MapImage2.when(function () {
      if (MapImage2.bookmarks && MapImage2.bookmarks.length) {
        console.log("Bookmarks: ", MapImage2.bookmarks.length);
      } else {
        console.log("No bookmarks in this webmap.");
      }
    });
    const CoordinateWidget = new CoordinateConversion({
      view: view,
    });
    const CoordinateExpand = new Expand({
      expandIconClass: "esri-icon-tracking",
      label: "الاحداثيات",
      view: view,
      content: CoordinateWidget,
      mode: "floating",
    });

    const AreameasurementWidget = new AreaMeasurement2D({
      view: view,
    });
    const AreameasurementExpand = new Expand({
      expandIconClass: "esri-icon-measure-area",
      label: "قياس مساحات",
      view: view,
      content: AreameasurementWidget,
      mode: "floating",
    });

    const DistanceWidget = new DistanceMeasurement2D({
      view: view,
    });
    const DistanceExpand = new Expand({
      expandIconClass: "esri-icon-measure-line",
      label: "قياس مسافات",
      view: view,
      content: DistanceWidget,
      mode: "floating",
    });
    view.on("click", function (event) {
      //console.log(event);
      let longitudes = event.mapPoint.longitude;
      let latitudes = event.mapPoint.latitude;
      console.log(longitudes);
      console.log(latitudes);
      console.log(convertToDms(latitudes, false));
    });
    view.ui.add([
      {
        component: DistanceExpand,
        position: "top-left",
        index: 5,
      },
      {
        component: AreameasurementExpand,
        position: "top-left",
        index: 6,
      },
      {
        component: sketchExpand,
        position: "top-left",
        index: 5,
      },
      {
        component: compass,
        position: "top-left",
        index: 4,
      },
      {
        component: basemapExpand,
        position: "top-left",
        index: 3,
      },
      {
        component: homeWidget,
        position: "top-left",
        index: 3,
      },
      {
        component: scaleBar,
        position: "bottom-left",
        index: 2,
      },
      {
        component: BookmarksExpands,
        position: "top-left",
        index: 2,
      },
      {
        component: CoordinateExpand,
        position: "bottom-right",
        index: 2,
      },
    ]);
  });
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
function convertToDms(dd, isLng) {
  let dir = dd < 0 ? (isLng ? "W" : "S") : isLng ? "E" : "N";

  let absDd = Math.abs(dd);
  let deg = absDd | 0;
  let frac = absDd - deg;
  let min = (frac * 60) | 0;
  let sec = frac * 3600 - min * 60;
  // Round it to 2 decimal points.
  sec = Math.round(sec * 100) / 100;
  return deg + "°" + min + "'" + sec + '"' + dir;
}
