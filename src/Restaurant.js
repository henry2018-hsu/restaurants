import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

function Restaurant(props){

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    console.log(`/restaurants/${props.id}`);
    useEffect(()=>{
        fetch(`http://calm-journey-61101.herokuapp.com/api/restaurants/${props.id}`)
        .then(res=>res.json())
        .then(result => {
            if(result && result.hasOwnProperty("_id")){ // a "data" property exists on the returned data
                setRestaurant(result);
                setFound(true); // we found some data
                setLoading(false); // no longer loading
            }else{
                setRestaurant(null);
                setFound(true); // we did not find any data
                setLoading(false); // no longer loading
            }
        });
    }, [props.id]); // rerun this effect if props.id changes

    if(loading){
        return "Loading Restaurant Data...";
    }else{
        if(found){
            if(!restaurant)    return `Unable to find Restaurant with id: ${props.id}`;
            return (
                <div>
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{restaurant.address.building} {restaurant.address.street}</Card.Subtitle>
                    </Card.Body>
                    </Card>
                    <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                    </MapContainer>
                    <br/>
                    <h3>Ratings</h3>
                    <CardDeck>
                        {restaurant.grades.map((grade)=>{
                                        return  <Card>
                                                    <Card.Body>
                                                        <Card.Title>Grade: {grade.grade}</Card.Title>
                                                        <Card.Subtitle className="mb-1 text-muted">Completed: {new Date(grade.date).toLocaleDateString()}</Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                    })}               
                    </CardDeck>
                </div>
                
            );
        }else{
            return <Redirect to={{ pathname: "/notFound"}} />
        }
    }
}

export default Restaurant;