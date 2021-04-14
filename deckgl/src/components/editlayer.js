import React from "react";
import ReactDOM from "react-dom";
import DeckGL from "deck.gl";
import { EditableGeoJsonLayer } from "@nebula.gl/layers";
import { DrawPolygonMode } from "@nebula.gl/edit-modes";
import { Toolbox } from "@nebula.gl/editor";
import { StaticMap } from "react-map-gl";

const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZ2Vvcmdpb3MtdWJlciIsImEiOiJjanZidTZzczAwajMxNGVwOGZrd2E5NG90In0.gdsRu_UeU_uPi9IulBruXA";

const initialViewState = {
    longitude: -122.43,
    latitude: 37.775,
    zoom: 12
};

export function GeometryEditor() {
    const [features, setFeatures] = React.useState({
        type: "FeatureCollection",
        features: []
    });
    const [mode, setMode] = React.useState(() => DrawPolygonMode);
    const [modeConfig, setModeConfig] = React.useState({});
    const [selectedFeatureIndexes] = React.useState([]);

    const layer = new EditableGeoJsonLayer({
        // id: "geojson-layer",
        data: features,
        mode,
        selectedFeatureIndexes,

        onEdit: ({ updatedData }) => {
            setFeatures(updatedData);
        }
    });

    return (
        <>
            {layer}
            <Toolbox
                mode={mode}
                onSetMode={setMode}
                modeConfig={modeConfig}
                onSetModeConfig={setModeConfig}
                geoJson={features}
                onSetGeoJson={setFeatures}
                onImport={setFeatures}
            />
        </>
    );
}
