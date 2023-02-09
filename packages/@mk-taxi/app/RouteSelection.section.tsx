import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api"


export default function RouteSelection_section(){
  return (
    <LoadScript googleMapsApiKey="AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ">
      <GoogleMap
        mapContainerStyle={{
          width: '900px',
          height: '600px'
        }}
        center={ {
          lat: -3.745,
          lng: -38.523
        }}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    </LoadScript>
  )
}
