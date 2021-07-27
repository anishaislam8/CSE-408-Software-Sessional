import React from 'react'
import axios from 'axios'
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as VscIcons from 'react-icons/vsc';
import Header from './Header';


const pageSize = 5;

const ISPRow = (props) => {

    return(
        
        <tr> 
            
            <td>{props.isp_name}</td>
            <td>{props.license_id}</td>
            <td>{new Date(props.physical).toString().split(" ").slice(0,5).join(" ")}</td>
           
            <td>{props.connectionStatus}</td>
            <td>{props.average_rating || "N/A"}</td>
            <td><Link type="button" className="btn btn-info" to={{
                pathname : "/nttn/ispList/details",
                state : {
                    isp_id : props.isp_id
                }}}><BsIcons.BsFillEyeFill size={30}/>  View Details</Link></td>
        </tr>
              
    );
    
}

class ISPList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filteredISPs:[],
            isps : [],
            unions : [],
           
            paginatedData : [],
            currentPage : 1,
            pages : [],
            pageCount : 0,
            rating : "",
            ratingAll : "",
            time:"",
            timeAll : "",
            districts : [],
            divisions : [],
            upazillas : [],
            searchUnions : [],
            connection_status:"",
            searchdistricts : [],
            searchdivisions : [],
            searchupazillas : [],
       
            showAreaSearch : false,
            showSortRatingOrder:false,
            
            showDate : false,
           
            selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"",
            searchText:"", connections :[],
            
            selectedStartDate:new Date(),selectedEndDate:new Date()
           
        }
        this.handleChangeRatingOrder = this.handleChangeRatingOrder.bind(this);
        this.handleChangeArrivalTimeOrder = this.handleChangeArrivalTimeOrder.bind(this);
        this.handleChangeRatingOrderAll = this.handleChangeRatingOrderAll.bind(this);
        this.handleChangeArrivalTimeOrderAll = this.handleChangeArrivalTimeOrderAll.bind(this);
        this.handleChangeSearchText = this.handleChangeSearchText.bind(this);
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
        this.handleChangeDivision = this.handleChangeDivision.bind(this);
        this.handleChangeUpazilla = this.handleChangeUpazilla.bind(this);
        this.handleChangeUnion = this.handleChangeUnion.bind(this);
        this.handleChangeISPType = this.handleChangeISPType.bind(this);
       
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate=  this.handleEndDate.bind(this);
     
        this.loadnewData = this.loadnewData.bind(this);
       
        
        this.paginationISPs= this.paginationISPs.bind(this);
        this.showAreaSearchDiv = this.showAreaSearchDiv.bind(this);
        this.showSortDiv = this.showSortDiv.bind(this);
        this.findFromDivision = this.findFromDivision.bind(this);
        this.findFromDistrict = this.findFromDistrict.bind(this);
      
        this.showData = this.showData.bind(this);
        // this.show1Data = this.show1Data.bind(this);
        // this.show-1Data = this.show-1Data.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        
        

    
        

    }

    

    componentDidMount() {
      let apiUrl = "http://localhost:7000/nttn/connectionsISP";

      axios.get(apiUrl)
      .then(response => {
        this.setState({ connections: response.data.data });
       
      })
      .catch((error) => {
        console.log(error);
      })

        apiUrl = "http://localhost:7000/api/isp";

        axios.get(apiUrl)
        .then(response => {
            this.setState({ isps: response.data.data, filteredISPs : response.data.data }, () => {
            let pageCountVal = this.state.isps ? Math.ceil(this.state.isps.length / pageSize) : 0;
            let pagesVal = _.range(1, pageCountVal + 1);
    
            this.setState({
              pageCount : pageCountVal,
              pages : pagesVal 
            })
          });
          this.paginationISPs(1);
        })
        .catch((error) => {
          console.log(error);
        })
        


        apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data, searchUnions : response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        
        apiUrl = "http://localhost:7000/api/division";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ divisions: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/district";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ districts: response.data.data, searchdistricts:response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/subdistrict";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ upazillas: response.data.data, searchupazillas:response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

       
    }

    loadnewData(e){
      if(e){
        e.preventDefault();
      }
      
      //console.log("called");
      let apiUrl = "http://localhost:7000/api/isp/sortBy";
      let connectionStatus = this.state.connection_status === "" ? undefined : this.state.connection_status
      
      const object = {
        district_id : this.state.selectedDistrict,
        division_id :  this.state.selectedDivision,
        union_id :  this.state.selectedUnion,
        upazilla_id :  this.state.selectedUpazilla,
        connection_status : connectionStatus
      }
      //console.log(object);

      axios.post(apiUrl, object)
      .then(response => {
        //console.log(response.data.data);
        this.setState({filteredISPs:response.data.data }, () => {
          
          //console.log("here");
          let pageCountVal = this.state.filteredISPs ? Math.ceil(this.state.filteredISPs.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal 
          }, () => {
            this.paginationISPs(1);
          })
        
        });
        
        
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ isps: [] });
      })
    }


    showData(){

      let apiUrl = "http://localhost:7000/api/isp";
    

      axios.get(apiUrl)
      .then(response => {
       
        this.setState({
          filteredISPs:response.data.data, 
          searchdistricts:this.state.districts, 
          searchupazillas : this.state.upazillas, 
          searchUnions : this.state.unions, 
         
        }, () => {
          
          //console.log("here");
          let pageCountVal = this.state.filteredISPs ? Math.ceil(this.state.filteredISPs.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal,
            searchText:"",
            showAreaSearch : false,
            showSortRatingOrder:false,
            showDate : false,
            showISP : false,
            rating : "",
            ratingAll : "",
            time:"",
            timeAll : "",
         
            connection_status:"",
            selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"",
            selectedStartDate:new Date(), selectedEndDate:new Date()

          }, () => {
            this.paginationISPs(1);
          })
        
        });
        
        
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ isps: [] });
      })
    }

    handleChangeISPType(e){
      this.setState({
        connection_status : e.target.value
      },() => {
        this.loadnewData();
      })
    }

    getConnection= (connection_id) => {
      for(let i= 0; i < this.state.connections.length; i++){
          if(this.state.connections[i]._id.toString() ===connection_id.toString()){
              return this.state.connections[i]
          }
      }
  }


    handleChangeSearchText(e){
      if(e.target.value===""){
        this.setState({
          searchText:""
        })
        this.showData();
      } else {
        this.setState({
          searchText : e.target.value,
          filteredISPs : this.state.isps.filter((isp) => {
            return isp.name.toLowerCase().includes((e.target.value).toLowerCase()) || 
            (isp.average_rating && isp.average_rating.toString().toLowerCase().includes((e.target.value).toLowerCase())) ||
            isp.license_id.toLowerCase().includes((e.target.value).toLowerCase()) ||
            (isp.connection_establishment_time && isp.connection_establishment_time.toString().toLowerCase().includes((e.target.value).toLowerCase())) ||
            isp.physical_connection_establishment_time.toString().toLowerCase().includes((e.target.value).toLowerCase()) ||
            this.getConnection(isp.physical_connection_details[0].connection_id).head_office_mobile.includes((e.target.value).toLowerCase()) || 
            this.getConnection(isp.physical_connection_details[0].connection_id).head_office_telephone.includes((e.target.value).toLowerCase()) || 
            this.getConnection(isp.physical_connection_details[0].connection_id).office_mobile.includes((e.target.value).toLowerCase()) || 
            this.getConnection(isp.physical_connection_details[0].connection_id).office_telephone.includes((e.target.value).toLowerCase()) || 
            this.getConnection(isp.physical_connection_details[0].connection_id).contact_person_mobile.includes((e.target.value).toLowerCase()) || 
            this.getConnection(isp.physical_connection_details[0].connection_id).contact_person_telephone.includes((e.target.value).toLowerCase())


          })
        }, () => {
          let pageCountVal = this.state.filteredISPs ? Math.ceil(this.state.filteredISPs.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal 
          }, () => {
            this.paginationISPs(1);
          })
          
        });
      }
    }


   

    findFromDivision(division){
      let districts = this.state.districts.filter((district) => district.division_id === division);
      let upazillas = this.state.upazillas.filter((upazilla) => districts.map((district) => district.district_id).includes(upazilla.district_id));
      let unions = this.state.unions.filter((union) =>  upazillas.map((upazilla) => upazilla.upazilla_id).includes(union.upazilla_id));
     
      return [upazillas, unions];
    }

    findFromDistrict(district){
     
      let upazillas = this.state.upazillas.filter((upazilla) => upazilla.district_id === district);
      let unions = this.state.unions.filter((union) =>  upazillas.map(upazilla => upazilla.upazilla_id).includes(union.upazilla_id));
     

      return [unions];
    }

    
   

    handleChangeDivision(e){
      let ans = this.findFromDivision(e.target.value);
      //console.log(ans);
      this.setState({
        selectedDivision : e.target.value,
        searchdistricts :  this.state.districts.filter((district) => district.division_id === e.target.value),
        searchupazillas: ans[0],
        searchUnions : ans[1],
       
        selectedDistrict:"", selectedUpazilla:"",selectedUnion:""
        
      })
        
      
    }

    

    handleChangeDistrict(e){
      let ans = this.findFromDistrict(e.target.value);
      this.setState({
        selectedDistrict : e.target.value,
        searchupazillas :  this.state.upazillas.filter((upazilla) => upazilla.district_id === e.target.value),
        searchUnions : ans[0],
     
        selectedUpazilla:"",selectedUnion:""
        
      })

    }

    handleChangeUpazilla(e){
      this.setState({
        selectedUpazilla : e.target.value,
        searchUnions :  this.state.unions.filter((union) => union.upazilla_id === e.target.value),
       
        selectedUnion:""
        
      })
    }

    handleChangeUnion(e){
      this.setState({
        selectedUnion : e.target.value
        
      })
    }

    showAreaSearchDiv = () => {
      if(this.state.showAreaSearch){
        this.setState({ showAreaSearch: false });
      } else {
        this.setState({showAreaSearch : true});
      }

      
    };

    showSortDiv = () => {
      if(this.state.showSortRatingOrder){
        this.setState({ showSortRatingOrder: false });
      } else {
        this.setState({showSortRatingOrder : true});
      }

      
    };

    showDatePicker = () => {
      if(this.state.showDate){
        this.setState({ showDate: false });
      } else {
        this.setState({showDate : true});
      }

      
    };

    showISPArea = () => {
      if(this.state.showISP){
        this.setState({ showISP: false });
      } else {
        this.setState({showISP : true});
      }

      
    };

   

  
    handleChangeRatingOrder(e){
        this.setState({
          rating : e.target.value,
          ratingAll: "", time : "", timeAll : ""
        }, () =>{
          if(e.target.value === "1"){
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.average_rating - b.average_rating)}))
          } else {
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) =>b.average_rating - a.average_rating)}))
          }
    
          //this.paginationISPs(this.state.currentPage);
          
        })
        
        
      }

      handleChangeRatingOrderAll(e){
        this.setState({
          ratingAll : e.target.value,
          searchText:"",
          showAreaSearch : false,
         
          showDate : false,
          showISP : false,
          timeAll : "",
          ratingAll : "",
          time:"",
         
       
          connection_status:"",
          selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"",
          selectedStartDate:new Date(), selectedEndDate:new Date()
        }, () =>{
          if(e.target.value === "1"){
            this.setState((prevstate) => ({filteredISPs : prevstate.isps.sort((a,b) => a.average_rating - b.average_rating)}))
          } else {
            this.setState((prevstate) => ({filteredISPs : prevstate.isps.sort((a,b) => b.average_rating - a.average_rating)}))
          }
    
          this.paginationISPs(1);
          
        })
        
        
      }

      handleChangeArrivalTimeOrder(e){
        this.setState({
          time : e.target.value,
          rating: "", ratingAll : "", timeAll : ""
        }, () =>{
          if(this.state.connection_status === ("1" || "0")){
            if(e.target.value === "1"){
              this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.connection_establishment_time.localeCompare(b.connection_establishment_time))}))
            } else {
              this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.connection_establishment_time.localeCompare(a.connection_establishment_time))}))
            }
          } else {
            if(e.target.value === "1"){
              this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.physical_connection_establishment_time.localeCompare(b.physical_connection_establishment_time))}))
            } else {
              this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.physical_connection_establishment_time.localeCompare(a.physical_connection_establishment_time))}))
            }
          }
          
    
          //this.paginationISPs(this.state.currentPage);
          
        })
        
        
      }

      handleChangeArrivalTimeOrderAll(e){
        this.setState({
          timeAll : e.target.value,
          searchText:"",
          showAreaSearch : false,
          showISP : false,
          showDate : false,
       
          rating : "",
          ratingAll : "",
          time:"",
         
       
          connection_status:"",
          selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"",
          selectedStartDate:new Date(), selectedEndDate:new Date()
        }, () =>{
          if(this.state.connection_status === ("1" || "0")){
            if(e.target.value === "1"){
              this.setState((prevstate) => ({filteredISPs : prevstate.isps.sort((a,b) => a.connection_establishment_time.localeCompare(b.connection_establishment_time))}))
            } else {
              this.setState((prevstate) => ({filteredISPs : prevstate.isps.sort((a,b) => b.connection_establishment_time.localeCompare(a.connection_establishment_time))}))
            }
          } else {
            if(e.target.value === "1"){
              this.setState((prevstate) => ({filteredISPs : prevstate.isps.sort((a,b) => a.physical_connection_establishment_time.localeCompare(b.physical_connection_establishment_time))}))
            } else {
              this.setState((prevstate) => ({filteredISPs : prevstate.isps.sort((a,b) => b.physical_connection_establishment_time.localeCompare(a.physical_connection_establishment_time))}))
            }
          }
          
    
          this.paginationISPs(1);
          
        })
        
        
      }

      handleChangeDate(){
        //console.log(new Date(this.state.selectedStartDate.replace(/-/g, '\/')));
        var start = new Date(this.state.selectedStartDate).setHours(0,0,0,0);

        var end = new Date(this.state.selectedEndDate).setHours(0,0,0,0);

       

        if(start > end){
          [start, end] = [end, start];
        }
        

        this.setState({
          
          filteredISPs:this.state.filteredIsps.filter((isp)=>{
            var current;
            if(this.state.connection_status === ("1" || "0")) current = new Date(isp.connection_establishment_time).getTime(); 
            else current = new Date(isp.physical_connection_establishment_time).getTime();
            //console.log(start, end, current);
            //if(current <= end && current >= start) console.log("hit")
            return  current <= end && current >= start
          })
        }, () => {
          let pageCountVal = this.state.filteredISPs ? Math.ceil(this.state.filteredISPs.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal 
          }, () => {
            this.paginationISPs(1);
          })
        });

          
      }

      
    paginationISPs(pageNo) {
        this.setState({
          currentPage : pageNo
        }, () => {
          const startIndex = (pageNo - 1) * pageSize;
          
          const newPaginatedData = this.state.filteredISPs.length === 0 ? [] :  _(this.state.filteredISPs).slice(startIndex).take(pageSize).value();
          //console.log ("Paginated :" ,newPaginatedData);
          this.setState({
            paginatedData : newPaginatedData
          })
        })
        
      }

      
 
    

      handleStartDate(date){
        
        
        if(!date){
         // console.log("here", date);
          date = new Date()
        } 
         
        this.setState({selectedStartDate : date})
        
      }

      handleEndDate(date){
        
        if(!date){
         // console.log("here", date);
          date = new Date()
        }
         
        this.setState({selectedEndDate : date})
      }

   
    
    render() {
        return(
          <div>
            <Header />
            <br></br>
            <br></br>
            <br></br>
               <div className="container">
               <center><h3 className="display-6" style={{"marginTop" : 20}}>ISP List</h3></center>
                <center>
                  <div className="row">
                  <div className="col">
                  <input type="text" className="form-control" style={{"marginLeft":0,"marginTop": 0,"marginBottom":70, "width" : 700}} value={this.state.searchText} onChange={this.handleChangeSearchText} placeholder="Search ISPs"/>
                </div>
                   
                  </div>
                 </center>
                <div className = "row">
                <div className="col">
                <Button variant="warning" onClick={this.showAreaSearchDiv} style={{"marginBottom":20,"width" : 240}} ><FaIcons.FaSearchLocation size={30}/>{this.state.showAreaSearch ? "  Hide Search Bar" : "  Search by Location"}</Button>
                </div>
                <div className="col">
                <Button variant="warning" onClick={this.showSortDiv} style={{"marginBottom":20,  "width" : 240}} ><FaIcons.FaArrowsAltV size={30}/>{this.state.showSortRatingOrder ? "  Hide Sorting" : "  Sort ISPs"}</Button>
                </div>
                <div className="col">
                <Button variant="warning" onClick={this.showDatePicker} style={{"marginBottom":20, "width" : 240}} ><FcIcons.FcCalendar size={30}/>{this.state.showDate ? "  Hide Date Search" : "  Search By Date"}</Button>       
                 </div>
                <div className="col">
                <Button variant="warning" onClick={this.showISPArea} style={{"marginBottom":20,  "width" : 240}} ><VscIcons.VscGroupByRefType size={30}/>{this.state.showISP ? "  Hide ISP Type" : "  ISP Type"}</Button>       
                </div>
                <div className="col">
                    <Button variant="success" onClick={this.showData} style={{"marginBottom":20, "width" : 240}} ><BsIcons.BsClipboardData size={30}/>  Show All</Button>
                </div>
               
               
                  
                 </div>
                <div hidden={!(this.state.showAreaSearch)} style={{"backgroundColor":"#e6e6e6", "padding":10, "borderRadius":5, "marginBottom":20}}>
                  <Form>
                      <Form.Row>
                      <Col>
                      <Form.Group style={{"marginRight":20, "marginLeft":20}}>
                          <Form.Label>Division</Form.Label>
                          <Form.Control as="select" value={this.state.selectedDivision} onChange={this.handleChangeDivision}>
                          <option disabled hidden value={""}>Select Division</option>
                          {
                            this.state.divisions.map((division) =><option key={division.division_id} value={division.division_id}>{division.name}</option>)
                          }
                          </Form.Control>
                      </Form.Group>
                      </Col>

                      <Col>
                      <Form.Group style={{"marginRight":20}} >
                          <Form.Label>District</Form.Label>
                          <Form.Control as="select" value={this.state.selectedDistrict} onChange={this.handleChangeDistrict}>
                          <option value={""} disabled hidden>Select District</option>
                          {
                            this.state.searchdistricts.map((district) => <option key={district.district_id} value={district.district_id}>{district.name}</option>)
                          }
                          </Form.Control>
                      </Form.Group>
                      </Col>

                      
                      <Col>
                      <Form.Group style={{"marginRight":20}}>
                          <Form.Label>Upazilla</Form.Label>
                          <Form.Control as="select" value={this.state.selectedUpazilla} onChange={this.handleChangeUpazilla}>
                          <option value={""} disabled hidden>Select Upazilla</option>
                          {
                            this.state.searchupazillas.map((upazilla) => <option key={upazilla.upazilla_id} value={upazilla.upazilla_id}>{upazilla.name}</option>)
                          }
                          </Form.Control>
                      </Form.Group>
                      </Col>

                      
                      <Col>
                      <Form.Group style={{"marginRight":20}}>
                          <Form.Label>Union</Form.Label>
                          <Form.Control as="select" value={this.state.selectedUnion} onChange={this.handleChangeUnion}>
                          <option value={""} disabled hidden>Select Union</option>
                          {
                            this.state.searchUnions.map((union) => <option key={union.union_id} value={union.union_id}>{union.name}</option>)
                          }
                          </Form.Control>
                      </Form.Group>
                      </Col>

                     
                      <Col>
                      <Form.Group>
                      
                        <Button variant="warning" type="submit" onClick={this.loadnewData} style={{"marginTop":30, "marginLeft":100, "width":200,"marginRight":20}}>
                        <BsIcons.BsSearch size={30}/>  Search
                          </Button>
                      </Form.Group>
                      
                      </Col>
                      
                                        
                      </Form.Row>
                  </Form>
              
                </div>
                

                <div hidden={!this.state.showSortRatingOrder} style={{"backgroundColor":"#e6e6e6", "padding":10, "borderRadius":5,"marginBottom":20}}>
                  <Form style={{"padding" : 10}}>
                      <Form.Row>

                      {this.state.connection_status!== "-1" && <Col>
                      <Form.Group style={{"marginRight" : 40}}>
                          <Form.Label>Sort This Page By Rating</Form.Label>
                          <Form.Control as="select" value={this.state.rating} onChange={this.handleChangeRatingOrder}>
                          <option value=""  disabled hidden>Select Rating Order</option>
                          <option value="1">Ascending</option>
                          <option value="-1">Descending</option>
                          </Form.Control>
                      </Form.Group>
                      </Col>}


                      <Col >
                    <Form.Group style={{ "marginRight" : 40}}>
                        <Form.Label>Sort This Page By Time</Form.Label>
                        <Form.Control as="select" value={this.state.time} onChange={this.handleChangeArrivalTimeOrder}>
                        <option value="" disabled hidden>Select Arrival Time Order</option>
                        <option value="-1">Descending</option>
                        <option value="1">Ascending</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>


                   {this.state.connection_status!== "-1" && <Col >
                    <Form.Group style={{"marginRight" : 40}}>
                        <Form.Label>Sort  Data By Rating</Form.Label>
                        <Form.Control as="select" value={this.state.ratingAll} onChange={this.handleChangeRatingOrderAll}>
                        <option value="" disabled hidden>Select Rating Order</option>
                        <option value="-1">Descending</option>
                        <option value="1">Ascending</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>}

                    <Col >
                    <Form.Group>
                        <Form.Label>Sort  Data By Time</Form.Label>
                        <Form.Control as="select" value={this.state.timeAll} onChange={this.handleChangeArrivalTimeOrderAll}>
                        <option value="" disabled hidden>Select Arrival Time Order</option>
                        <option value="-1">Descending</option>
                        <option value="1">Ascending</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                      </Form.Row>
                    </Form>
                </div>

               <div hidden={!this.state.showDate} style={{"backgroundColor":"#e6e6e6", "padding":10, "borderRadius":5,"marginBottom":20, "width": 500}}>
                <div className="row">
                  <div className="col"  style={{"margin":10, "width" : 250}}>
                  <label htmlFor="startDate">Select Start Date </label>
                  <DatePicker className="form-control" id="startDate"
                      selected={this.state.selectedStartDate}
                      onChange={(date)=>this.handleStartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      isClearable
                      required
                      showYearDropdown
                      scrollableMonthYearDropdown
                      maxDate={new Date()}
                      />
                  </div>

                  <div className="col"  style={{"margin":10, "width" : 250}}>
                  <label htmlFor="endDate">Select End Date </label>
                  <DatePicker className="form-control" id="endDate"
                      selected={this.state.selectedEndDate}
                      onChange={(date)=>this.handleEndDate(date)}
                      dateFormat="dd/MM/yyyy"
                      isClearable
                      required
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableMonthYearDropdown
                      />
                  </div>

                  <div className="col">
                    <center>
                  <Button variant="warning" type="submit" onClick={this.handleChangeDate} style={{"margin":10, "width":300}}>
                  <BsIcons.BsSearch size={30}/>  Search
                   </Button>
                   </center>
                  </div>
                </div>
               </div>

               <div hidden={!(this.state.showISP)} style={{"backgroundColor":"#e6e6e6", "padding":10, "width":300, "borderRadius":5, "marginBottom":20}}>
                  <Form>
                      <Form.Row>
                      <Col>
                      <Form.Group style={{"marginRight":20, "marginLeft":20}}>
                          <Form.Label>Select ISP type</Form.Label>
                          <Form.Control as="select" value={this.state.connection_status} onChange={this.handleChangeISPType}>
                          {/* <option disabled hidden value="">Select ISPs</option> */}
                          <option value="">Any</option>
                          <option value="1">Connected</option>
                          <option value="0">Disonnected</option>
                          <option value="-1">Registered</option>
                          {/* <option value="Unselect">Unselect</option> */}
                          </Form.Control>
                      </Form.Group>
                      </Col>

                     
                    </Form.Row>
                  </Form>
                </div>

                
                
                
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                    <tr>
                       
                        <th>ISP Name</th>
                        <th>License ID</th>
                        <th>Manual Connection Started</th>
                       
                        <th>Connection Status</th>
                        <th>Average Rating</th>
                        <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.paginatedData.length > 0 && this.state.paginatedData.map((isp, index) => {
                           
                            return <ISPRow 
                            key={isp._id} 
                            isp_name={isp.name} 
                            license_id = {isp.license_id} 
                            connection_started = {isp.connection_establishment_time}
                            average_rating = {isp.average_rating}
                            count={index + 1}
                            connectionStatus={isp.connection_status === true ? "Connected" :(isp.connection_establishment_time ? "Disconnected" : "Registered")}
                            physical = {isp.physical_connection_establishment_time}
                            isp_id={isp._id}
                        />})
                        }
                    </tbody>
                </table>

                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                    <li className={this.state.currentPage === 1 ? "page-item disabled": "page-item"}>
                    <p className="page-link"  onClick={()=>this.paginationISPs(this.state.currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Next</span>
                    </p>
                    </li>
                    {
                        this.state.pages.map((page) => {
                            return <li key={page} className={
                                page === this.state.currentPage ? "page-item active" : "page-item"
                            }><p className="page-link" onClick={()=>this.paginationISPs(page)}>{page}</p></li>
                        })

                        
                    }
                    <li className={this.state.currentPage === this.state.pageCount ? "page-item disabled": "page-item"}>
                    <p className="page-link"  onClick={()=>this.paginationISPs(this.state.currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </p>
                    </li>
                    
                    </ul>
                </nav>
                {this.state.filteredISPs.length === 0 && <h4>"No isps found"</h4>}
            </div>
          </div>
           
        );
    }
}

export default ISPList;
