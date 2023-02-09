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
          lat: 43.511227,
          lng: 16.482284,
        }}
        zoom={13}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    </LoadScript>
  )
}
