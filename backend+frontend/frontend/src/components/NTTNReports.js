import React from 'react'
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const pageSize = 5;
const Report = (props) => {

    return(
        
        <tr> 
            <td>{props.isp_name}</td>
            <td>{props.union_name}</td>
            <td>{props.average_rating}</td>
            <td>{props.problem_category}</td>
            <td>{props.details}</td>
            <td>{props.report_arrival_time}</td>
            <td><Link type="button" className="btn btn-warning" to={{
                pathname : "",
                state : {
                    report_id : props.report_id
                }}}>Solve</Link></td>
        </tr>
              
    );
    
}


class NTTNReports extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      rating : "",
      time : "",
      isps :[],
      unions : [],
      paginatedData : [],
      currentPage : 1,
      pages : [],
      pageCount : 0
    }

    this.handleChangeRatingOrder = this.handleChangeRatingOrder.bind(this);
    this.handleChangeArrivalTimeOrder = this.handleChangeArrivalTimeOrder.bind(this);
    this.getIspName = this.getIspName.bind(this);
    this.getUnionName = this.getUnionName.bind(this);
    this.getISPRating = this.getISPRating.bind(this);
    this.paginationReports= this.paginationReports.bind(this);
  }

  getIspName (isp_id) {
       

    for(let i = 0; i < this.state.isps.length; i++){
        if(this.state.isps[i]._id === isp_id){
            return this.state.isps[i].name
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

  getISPRating(isp_id){
    for(let i = 0; i < this.state.isps.length; i++){
        if(this.state.isps[i]._id === isp_id){
            return this.state.isps[i].average_rating
        }
    }
  }

  paginationReports(pageNo) {
    this.setState({
      currentPage : pageNo
    }, () => {
      const startIndex = (pageNo - 1) * pageSize;
      const newPaginatedData = _(this.state.data).slice(startIndex).take(pageSize).value();
      this.setState({
        paginatedData : newPaginatedData
      })
    })
    
  }
  

  handleChangeRatingOrder(e){
    // this.setState({
    //   rating : e.target.value
    // }, this.handleRatingTimeOrderChange)
    
    this.setState({
      rating : e.target.value
    }, () =>{
      if(e.target.value === "1"){
        this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.rating - b.rating)}))
      } else {
        this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.rating - a.rating)}))
      }

      //this.paginationReports(this.state.currentPage);
      
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
        this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.report_arrival_time.localeCompare(b.report_arrival_time))}));
      } else {
        this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.report_arrival_time.localeCompare(a.report_arrival_time))}));
        
      }
      //this.paginationReports(this.state.currentPage);
    })
   
  }

  

  componentDidMount() {
    let apiUrl = "http://localhost:7000/nttn/reports";
   
    axios.get(apiUrl)
    .then(response => {
      this.setState({ data: response.data.data }, () => {
        let pageCountVal = this.state.data ? Math.ceil(this.state.data.length / pageSize) : 0;
        let pagesVal = _.range(1, pageCountVal + 1);

        this.setState({
          pageCount : pageCountVal,
          pages : pagesVal 
        })
      });
      this.paginationReports(1);
      
    })
    .catch((error) => {
      console.log(error);
    })

    apiUrl = "http://localhost:7000/api/isp";
    axios.get(apiUrl)
    .then(response => {
        this.setState({
          isps : response.data.data
        })
        
    })
    .catch((error) => {
      console.log(error);
    })

    apiUrl = "http://localhost:7000/api/union";
    axios.get(apiUrl)
    .then(response => {
      this.setState({
        unions : response.data.data
      })
    })
    .catch((error) => {
      console.log(error);
    })

    
    
  }

  

  

  render(){
    return (
      <div className="container">

          <center><h3>Reports from ISP</h3><br></br></center>
           
          {/* create a form */}

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

        
          <div>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
              
                    <th>ISP Name</th>
                    <th>Union Name</th>
                    <th>Rating</th>
                    <th>Problem Category</th>
                    <th>Details</th>
                    <th>Report Arrival Time</th>
                    <th>Solve</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.paginatedData.map((report, index) => {
                    
                        return <Report 
                            key={report._id} 
                            isp_name={this.getIspName(report.isp_id)} 
                            union_name = {this.getUnionName(report.union_id)} 
                            problem_category = {(report.category === "0") ? "Low Bandwidth" : (report.category === "1" ? "Physical Connection Problem" : (report.category === "2" ? "Platform Related Problem" : "Others")) } 
                            report_arrival_time = {report.report_arrival_time} 
                            count={index + 1}
                            report_id={report._id}
                            details = {report.details}
                            average_rating={this.getISPRating(report.isp_id)}
                        />})
                    }
                </tbody>
            </table>

            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                <li className={this.state.currentPage === 1 ? "page-item disabled": "page-item"}>
                  <p className="page-link"  onClick={()=>this.paginationReports(this.state.currentPage - 1)} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Next</span>
                  </p>
                </li>
                {
                    this.state.pages.map((page) => {
                        return <li className={
                            page === this.state.currentPage ? "page-item active" : "page-item"
                        }><p className="page-link" onClick={()=>this.paginationReports(page)}>{page}</p></li>
                    })

                    
                }
                <li className={this.state.currentPage === this.state.pageCount ? "page-item disabled": "page-item"}>
                  <p className="page-link"  onClick={()=>this.paginationReports(this.state.currentPage + 1)} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </p>
                </li>
                   
                </ul>
            </nav>
        </div>
        {this.state.data.length === 0 && <h4>"No reports found"</h4>}
      </div>
  )
}
   
}

export default NTTNReports
