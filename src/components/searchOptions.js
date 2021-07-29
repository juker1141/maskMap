const center = {
  lat: 22.626780089095906,
  lng: 120.31808747527931,
};

const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};

const options = {
  bounds: defaultBounds,
  componentRestrictions: { country: "tw" },
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
  types: ["establishment"],
};

export default options;

