import {useState, useEffect} from 'react'; 
import { Redirect, useHistory } from "react-router-dom";
import queryString from 'query-string';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';


function Restaurants(props){
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([null]);
    const [page, setPage] = useState([1]);
    const [found, setFound] = useState(false);

    const perPage = 10;

    let history = useHistory();
    
    let query = queryString.parse(props.query);
    let borough = query.borough;

    let url;
    
    if(borough) {
        url = `http://calm-journey-61101.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`;
    }   
    else {
        url = `http://calm-journey-61101.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
    }
    useEffect(()=>{        
        fetch(url)
        .then(res=>res.json())
        .then(result => {
            if(result){  
                setRestaurants(result);
                setFound(true);  
                setLoading(false);  
            }else{
                setRestaurants(null);
                setFound(true); 
                setLoading(false);  
            }
        })
    }, [page, borough, url]); 
    

    if(loading){
        return "Loading Restaurants...";
    }else{       
        if(found){
            console.log(JSON.stringify(restaurants));
            if(restaurants === undefined || restaurants.length == 0)    
                return (
                    <div>
                        <h3>No Restaurants Found</h3>
                    </div>);
        return (            
            <div>
                <Card.Title>Restaurant List</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Full list of restaurants. Optionally sorted by borough </Card.Subtitle>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Borough</th>
                            <th>Cuisine</th>

                        </tr>
                    </thead>
                    <tbody>                       
                        {restaurants.map((restaurant, index)=>{
                            const restaurantList = (
                                                    <tr key={index} onClick={()=> {
                                                        console.log(`/restaurant/${restaurant._id}`);
                                                        history.push(`/restaurant/${restaurant._id}`);
                                                    }}>
                                                        <td>{index + 1}</td>
                                                        <td>{restaurant.name}</td>
                                                        <td>{restaurant.address.building} {restaurant.address.street}</td>
                                                        <td>{restaurant.borough}</td>
                                                        <td>{restaurant.cuisine}</td>
                                                    </tr> );
                            return restaurantList})} 
                    </tbody>
                </Table>
                
                <Pagination>
                    <Pagination.Prev  onClick={previousPage}/>
                    <Pagination.Item><strong>{page}</strong></Pagination.Item>
                    <Pagination.Next  onClick={nextPage}/>
                </Pagination>
            </div>            
        );
        }else{
            return <Redirect to={{ pathname: "/notFound"}} />
        }
    }
    function previousPage() {
        if(+page > 1)    setPage(+page - 1);
    }
    function nextPage() {
        setPage(+page + 1);
    }
}
export default Restaurants;