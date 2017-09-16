type map
type mapView
external map : <basemap: string> Js.t -> map = "esri/Map" [@@bs.new] [@@bs.module]
external mapView : <container: string; map: map> Js.t -> mapView = "esri/views/MapView" [@@bs.new] [@@bs.module]

let m = map [%bs.obj { basemap = "dark-gray"}]
let view = mapView [%bs.obj {container = "viewDiv"; map = m}]