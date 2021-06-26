import React from 'react'
import axios from 'axios'
import _ from 'lodash';
import { Form } from 'react-bootstrap';
import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';

const pageSize = 5;

const Feedback = (props) => {

    return(
        
        <tr> 
            
            <td>{props.isp_name}</td>
            <td>{props.user_name}</td>
            <td>{props.area_name}</td>
            <td>{props.rating}</td>
            <td>{props.details}</td>
            <td>{props.feedback_arrival_time}</td>
            <td><Link type="button" className="btn btn-danger" to={{
                pathname : "",
                state : {
                    feedback_id : props.feedback_id
                }}}>Warn ISP</Link></td>
        </tr>
              
    );
    
}

class Feedbacks extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            feedbacks : [],
            isps : [],
            users :[],
            unions : [],
            areas : [],
            paginatedData : [],
            currentPage : 1,
            pages : [],
            pageCount : 0,
            rating : "",
            time : ""
        }
        this.handleChangeRatingOrder = this.handleChangeRatingOrder.bind(this);
        this.handleChangeArrivalTimeOrder = this.handleChangeArrivalTimeOrder.bind(this);

        this.getIspName = this.getIspName.bind(this);
        this.getUnionName = this.getUnionName.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getAreaName = this.getAreaName.bind(this);
        this.paginationFeedbacks= this.paginationFeedbacks.bind(this);

    }

    

    componentDidMount() {
        let apiUrl = "http://localhost:7000/nttn/feedbacks";

        axios.get(apiUrl)
        .then(response => {
          this.setState({ feedbacks: response.data.data }, () => {
            let pageCountVal = this.state.feedbacks ? Math.ceil(this.state.feedbacks.length / pageSize) : 0;
            let pagesVal = _.range(1, pageCountVal + 1);
    
            this.setState({
              pageCount : pageCountVal,
              pages : pagesVal 
            })
          });
          this.paginationFeedbacks(1);
        })
        .catch((error) => {
          console.log(error);
        })
        

        apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ isps: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/area";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ areas: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/user";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ users: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })
        
    }

    handleChangeRatingOrder(e){
        this.setState({
          rating : e.target.value
        }, () =>{
          if(e.target.value === "1"){
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.rating - b.rating)}))
          } else {
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.rating - a.rating)}))
          }
    
          //this.paginationFeedbacks(this.state.currentPage);
          
        })
        
        
      }
    
    
      handleChangeArrivalTimeOrder(e){
        // this.setState({
        //   time : e.target.value
        // },this.handleRatingTimeOrderChange)
        this.setState({
          time : e.target.value
        }, () =>{
          if(e.target.value === "1"){
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.feedback_arrival_time.localeCompare(b.feedback_arrival_time))}));
          } else {
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.feedback_arrival_time.localeCompare(a.feedback_arrival_time))}));
            
          }
          //this.paginationFeedbacks(this.state.currentPage);
        })
       
      }

    paginationFeedbacks(pageNo) {
        this.setState({
          currentPage : pageNo
        }, () => {
          const startIndex = (pageNo - 1) * pageSize;
          const newPaginatedData = _(this.state.feedbacks).slice(startIndex).take(pageSize).value();
          this.setState({
            paginatedData : newPaginatedData
          })
        })
        
      }

      
    getIspName = (isp_id) => {
       

        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id === isp_id){
                return this.state.isps[i].name
            }
        }
    }


    getUserName = (user_id) => {
       

        for(let i = 0; i < this.state.users.length; i++){
            if(this.state.users[i]._id === user_id){
                return this.state.users[i].name
            }
        }
    }

    getAreaName = (area_id) => {
       

        for(let i = 0; i < this.state.areas.length; i++){
            if(this.state.areas[i]._id === area_id){
                return this.state.areas[i].name
            }
        }
    }

    getUnionName(union_id) {
   

        for(let i = 0; i < this.state.unions.length; i++){
            if(this.state.unions[i].union_id === union_id){
                return this.state.unions[i].name
            }
        }
      }

   
    
    render() {
        return(
            <div className="container">
                <center><h3>Feedbacks from Users</h3><br></br></center>

                <Form>
                    <Form.Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" onChange={this.handleChangeRatingOrder}>
                        <option value="0">None</option>
                        <option value="1">Ascending</option>
                        <option value="-1">Descending</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group>
                        <Form.Label>Arrival Time</Form.Label>
                        <Form.Control as="select" onChange={this.handleChangeArrivalTimeOrder}>
                        <option value="0">None</option>
                        <option value="1">Ascending</option>
                        <option value="-1">Descending</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    
                    </Form.Row>
                </Form>
                
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                        
                        <th>ISP Name</th>
                        <th>User Name</th>
                        <th>Area Name</th>
                        <th>Rating By User</th>
                        <th>Feedback</th>
                        <th>Feedback Arrival Time</th>
                        <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.paginatedData.map((feedback, index) => {
                           
                            return <Feedback 
                                key={feedback._id} 
                                isp_name={this.getIspName(feedback.isp_id)} 
                                user_name = {this.getUserName(feedback.user_id)} 
                                rating = {feedback.rating} 
                                area_name = {this.getAreaName(feedback.area_id)}
                                details = {feedback.details}
                                feedback_arrival_time = {feedback.feedback_arrival_time} 
                                count={index + 1}
                                feedback_id={feedback._id}
                            />})
                        }
                    </tbody>
                </table>

                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                    <li className={this.state.currentPage === 1 ? "page-item disabled": "page-item"}>
                    <p className="page-link"  onClick={()=>this.paginationFeedbacks(this.state.currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Next</span>
                    </p>
                    </li>
                    {
                        this.state.pages.map((page) => {
                            return <li className={
                                page === this.state.currentPage ? "page-item active" : "page-item"
                            }><p className="page-link" onClick={()=>this.paginationFeedbacks(page)}>{page}</p></li>
                        })

                        
                    }
                    <li className={this.state.currentPage === this.state.pageCount ? "page-item disabled": "page-item"}>
                    <p className="page-link"  onClick={()=>this.paginationFeedbacks(this.state.currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </p>
                    </li>
                    
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Feedbacks
