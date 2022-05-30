# Geovisto Geo Downloader Tool
Module for the [Geovisto core library](https://github.com/geovisto/geovisto).

Provides user interface for downloading points or polygons from OverpassAPI (OSM) of selected country. Geographical objects can be downloaded from more than one administrative levels. (e.g. districts, regions, towns, ...) 
For polygons, tool provides additional simplification of borders and automatic generating of hierarhy configuration used in Geovisto Hierarchy Tool. ([link](https://github.com/geovisto/geovisto-hierarchy))

This repository is a snapshot of Geoviosto ``tools/downloader`` derived from the development repository: [geovisto/geovisto-map](https://github.com/geovisto/geovisto-map).

## Usage

```js
import {
    GeovistoGeoDownloaderTool
} from 'geovisto-tool-geo-downloader';

// create instance of map with given props
const map = Geovisto.createMap({
  // ...
  tools?: Geovisto.createMapToolsManager([
    // instances of Geovisto tools (extensions) which will be directly used in the map
    // Instance of downloader tool
    GeovistoGeoDownloaderTool.createTool({
        id: "geovisto-tool-geo-downloader"
    }),
  ])
});

// rendering of the map
map.draw(Geovisto.getMapConfigManagerFactory().default({
  // initial settings of the map can be overriden by the map config - JSON structure providing user settings

  tools?: [
    // config of Geovisto tools (extensions) used in the map
    {
        "type": "geovisto-tool-geo-downloader",
        "id": "geovisto-tool-geo-downloader",
        "enabled": true
    }
));
```



## Installation

```
npm install --save geovisto-tool-geo-downloader
```

This package serves as an extension of Geovisto core using the API for Geovisto tools (extensions). Follow Geovisto core on [Github](https://github.com/geovisto/geovisto).

## License
[MIT](https://github.com/geovisto/geovisto-geo-downloader/blob/master/LICENSE)
