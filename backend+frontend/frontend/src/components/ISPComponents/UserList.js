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
import ISPHeader from './Header';

const pageSize = 5;

const Connection = (props) => {

    return(
        
        <tr> 
            <td>{props.count}</td>
            <td>{props.user_name}</td>
            <td>{props.area_name}</td>
             
            {/* <td>{new Date(props.request_arrival_time).toString().split(" ").slice(0,5).join(" ")}</td>
            <td>{props.connection_status}</td> */}

            <td><Link type="button" style={{"width" : 250}} className="btn btn-info" to={{
              pathname: `/isp/${props.isp_id}/userList/details`,
              state: {
                  data : props.name,
                  id : props.isp_id,
                  connection_id : props.connection_id,
                  user_id : props.user_id
              }}}><BsIcons.BsFillEyeFill size={20}/>   View Details</Link></td>
           
            {/* <td><Link type="button" className="btn btn-success" to={{
                pathname : "",
                state : {
                    connection_id : props.connection_id
                }}}><AiIcons.AiFillNotification/>  Accept</Link></td>
            <td><Link type="button" className="btn btn-danger" to={{
                pathname : "",
                state : {
                    connection_id : props.connection_id
                }}}><AiIcons.AiFillNotification/>  Reject</Link></td> */}
        </tr>
              
    );
    
}

class UserList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            connections : [],
            filteredConnections : [],
            isps : [],
            users :[],
            unions : [],
            areas : [],
            paginatedData : [],
            currentPage : 1,
            pages : [],
            pageCount : 0,
           
            timeAll:"",
            time : "",
            districts : [],
            divisions : [],
            upazillas : [],
            searchUnions : [],
            searchAreas : [],
            searchdistricts : [],
            searchdivisions : [],
            searchupazillas : [],
            searchISPs:[],
            showAreaSearch : false,
            showSortRatingOrder:false,
            showDate : false,
            showReport:false,
            showPackage:false,
            selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"", selectedArea:"",
            searchText:"",
            selectedStartDate:new Date(),selectedEndDate:new Date(),
            selectedPackage:"",
            packages:[],
            connection_status:"",
            name:"",
            isp_id:"",
            isp:""
           
        }
      
        this.handleChangeArrivalTimeOrder = this.handleChangeArrivalTimeOrder.bind(this);
       
        this.handleChangeArrivalTimeOrderAll = this.handleChangeArrivalTimeOrderAll.bind(this);
        this.handleChangeSearchText = this.handleChangeSearchText.bind(this);
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
        this.handleChangeDivision = this.handleChangeDivision.bind(this);
        this.handleChangeUpazilla = this.handleChangeUpazilla.bind(this);
        this.handleChangeUnion = this.handleChangeUnion.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangeISP = this.handleChangeISP.bind(this);
        this.loadnewData = this.loadnewData.bind(this);
        this.getIspName = this.getIspName.bind(this);
        this.getUnionName = this.getUnionName.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getAreaName = this.getAreaName.bind(this);
        this.paginationconnections= this.paginationconnections.bind(this);
        this.showAreaSearchDiv = this.showAreaSearchDiv.bind(this);
        this.showSortDiv = this.showSortDiv.bind(this);
        this.findFromDivision = this.findFromDivision.bind(this);
        this.findFromDistrict = this.findFromDistrict.bind(this);
        this.findFromUpazilla = this.findFromUpazilla.bind(this);
        this.showAllData = this.showAllData.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleChangePackage = this.handleChangePackage.bind(this);
        this.showReportArea = this.showReportArea.bind(this);
        this.showPackageArea = this.showPackageArea.bind(this);
        this.handleChangeReportType = this.handleChangeReportType.bind(this);
        

    }

    

    componentDidMount() {

      console.log(this.props.location)

        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ 
              isps: response.data.data, 
              searchISPs : response.data.data,
              isp_id : this.props.location.state.id,
              name : this.props.location.state.data 
            }, () => {
                this.setState({
                    isp : this.state.isps.filter((isp) => isp._id.toString() === this.state.isp_id)[0]
                })
            })
        })
        .catch((error) => {
          console.log(error);
        })

        apiUrl = "http://localhost:7000/api/userConnections";
        const object = {
            isp_id : this.state.isp_id || this.props.location.state.id
        }
        axios.post(apiUrl, object)
        .then(response => {
          this.setState({ connections: response.data.data, filteredConnections : response.data.data }, () => {
            let pageCountVal = this.state.connections ? Math.ceil(this.state.connections.length / pageSize) : 0;
            let pagesVal = _.range(1, pageCountVal + 1);
    
            this.setState({
              pageCount : pageCountVal,
              pages : pagesVal 
            })
          });
          this.paginationconnections(1);
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

        apiUrl = "http://localhost:7000/api/area";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ areas: response.data.data, searchAreas : response.data.data })
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

        apiUrl = "http://localhost:7000/api/user";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ users: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

       
        
    }

    loadnewData(e){
      if(e){
        e.preventDefault();
      }
     
      let apiUrl = "http://localhost:7000/isp/connections/sortBy";
      let connectionStatus = this.state.connection_status === "" ? undefined : this.state.connection_status

      const object = {
        district_id : this.state.selectedDistrict,
        division_id :  this.state.selectedDivision,
        union_id :  this.state.selectedUnion,
        area_id:  this.state.selectedArea,
        upazilla_id :  this.state.selectedUpazilla,
       connection_status : connectionStatus,
      
       isp_id:this.state.isp_id
      }
      //console.log(object);

      axios.post(apiUrl, object)
      .then(response => {
       
        this.setState({filteredConnections:response.data.data }, () => {
          
          //console.log("here");
          let pageCountVal = this.state.filteredConnections ? Math.ceil(this.state.filteredConnections.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal 
          }, () => {
            this.paginationconnections(1);
          })
        
        });
        
        
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ connections: [] });
      })
    }

    showAllData(){

      let apiUrl = "http://localhost:7000/api/userConnections";
      const object = {
        isp_id : this.state.isp_id || this.props.location.state.id
    }
      axios.post(apiUrl, object)
      .then(response => {
       
        this.setState({
          filteredConnections:response.data.data, 
          searchdistricts:this.state.districts, 
          searchupazillas : this.state.upazillas, 
          searchUnions : this.state.unions, 
          searchAreas:this.state.areas 
        }, () => {
          
          //console.log("here");
          let pageCountVal = this.state.filteredConnections ? Math.ceil(this.state.filteredConnections.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal,
            searchText:"",
            showAreaSearch : false,
            showSortRatingOrder:false,
            showDate : false,
            rating : "",
            ratingAll : "",
            timeAll:"",
            time : "",
            selectedPackage:"",
            showReport:"",
            showPackage:"",
            connection_status:"All",
           
            selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"", selectedArea:"",selectedISP:"",
            selectedStartDate:new Date(), selectedEndDate:new Date()

          }, () => {
            this.paginationconnections(1);
          })
        
        });
        
        
      })
      .catch((error) => {
        console.log(error);
        //this.setState({ connections: [] });
      })
    }


    handleChangeSearchText(e){
      if(e.target.value===""){
        this.setState({
          searchText:""
        })
        this.showAllData();
      } else {
        console.log(this.state.connections);
        this.setState({
          
          searchText : e.target.value,
          filteredConnections : this.state.connections.filter((connection) => {
            return connection.user_name.toLowerCase().includes((e.target.value).toLowerCase()) || 
            this.getAreaName(connection.area_id).toLowerCase().includes((e.target.value).toLowerCase()) ||
            connection.contact_person_mobile.includes((e.target.value).toLowerCase()) ||
            connection.nid_number.includes((e.target.value))
          })
        }, () => {
          let pageCountVal = this.state.filteredConnections ? Math.ceil(this.state.filteredConnections.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal 
          }, () => {
            this.paginationconnections(1);
          })
          
        });
      }
    }

  

    handleStartDate(date){
        
        
      if(!date){
        date = new Date()
      } 
       
      this.setState({selectedStartDate : date})
      
    }

    handleEndDate(date){
      
      if(!date){
        date = new Date()
      }
       
      this.setState({selectedEndDate : date})
    }


    handleChangeArea(e){
      this.setState({
        selectedArea : e.target.value
      })


    }

    findFromDivision(division){
      let districts = this.state.districts.filter((district) => district.division_id === division);
      let upazillas = this.state.upazillas.filter((upazilla) => districts.map((district) => district.district_id).includes(upazilla.district_id));
      let unions = this.state.unions.filter((union) =>  upazillas.map((upazilla) => upazilla.upazilla_id).includes(union.upazilla_id));
      let areas = this.state.areas.filter((area) => unions.map((union) => union.union_id).includes(area.union_id));
      return [upazillas, unions, areas];
    }

    findFromDistrict(district){
     
      let upazillas = this.state.upazillas.filter((upazilla) => upazilla.district_id === district);
      let unions = this.state.unions.filter((union) =>  upazillas.map(upazilla => upazilla.upazilla_id).includes(union.upazilla_id));
      let areas = this.state.areas.filter((area) => unions.map(union => union.union_id).includes(area.union_id));

      return [unions, areas];
    }

    findFromUpazilla(upazilla){
      let unions = this.state.unions.filter((union) =>  union.upazilla_id === upazilla);
      let areas = this.state.areas.filter((area) => unions.map(union => union.union_id).includes(area.union_id));

      return [areas];

    }
   

    handleChangeDivision(e){
      let ans = this.findFromDivision(e.target.value);
      //console.log(ans);
      this.setState({
        selectedDivision : e.target.value,
        searchdistricts :  this.state.districts.filter((district) => district.division_id === e.target.value),
        searchupazillas: ans[0],
        searchUnions : ans[1],
        searchAreas : ans[2],
        selectedDistrict:"", selectedUpazilla:"",selectedUnion:"", selectedArea:"",
        
      })
        
      
    }

    

    handleChangeDistrict(e){
      let ans = this.findFromDistrict(e.target.value);
      this.setState({
        selectedDistrict : e.target.value,
        searchupazillas :  this.state.upazillas.filter((upazilla) => upazilla.district_id === e.target.value),
        searchUnions : ans[0],
        searchAreas : ans[1],
        selectedUpazilla:"",selectedUnion:"", selectedArea:""
        
      })

    }

    handleChangeUpazilla(e){
      this.setState({
        selectedUpazilla : e.target.value,
        searchUnions :  this.state.unions.filter((union) => union.upazilla_id === e.target.value),
        searchAreas : this.findFromUpazilla(e.target.value)[0],
        selectedUnion:"", selectedArea:""
        
      })
    }

    handleChangeUnion(e){
      this.setState({
        selectedUnion : e.target.value,
        searchAreas :  this.state.areas.filter((area) => area.union_id === e.target.value),
        selectedArea:""
        
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

   

    handleChangeISP(e){
      this.setState({
        selectedISP : e.target.value,
      }, () => {
        this.loadnewData();
      })
    }

    handleChangePackage(e){
      this.setState({
        selectedPackage : e.target.value,
      }, () => {
        this.loadnewData();
      })
    }

   

      handleChangeArrivalTimeOrder(e){
        this.setState({
          time : e.target.value,
           timeAll : ""
        }, () =>{
          if(e.target.value === "1"){
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => a.request_arrival_time.localeCompare(b.request_arrival_time))}))
          } else {
            this.setState((prevstate) => ({paginatedData : prevstate.paginatedData.sort((a,b) => b.request_arrival_time.localeCompare(a.request_arrival_time))}))
          }
    
          //this.paginationconnections(this.state.currentPage);
          
        })
        
        
      }

      handleChangeArrivalTimeOrderAll(e){
        this.setState({
          timeAll : e.target.value,
          time : ""
        }, () =>{
          if(e.target.value === "1"){
            this.setState((prevstate) => ({filteredConnections : prevstate.filteredConnections.sort((a,b) => a.request_arrival_time.localeCompare(b.request_arrival_time))}))
          } else {
            this.setState((prevstate) => ({filteredConnections : prevstate.filteredConnections.sort((a,b) => b.request_arrival_time.localeCompare(a.request_arrival_time))}))
          }
    
          this.paginationconnections(1);
          
        })
        
        
      }

      handleChangeDate(e){
        var start = new Date(this.state.selectedStartDate).setHours(0,0,0,0);

        var end = new Date(this.state.selectedEndDate).setHours(0,0,0,0);

        if(start > end){
          [start, end] = [end, start];
        }
        this.setState({
          filteredConnections:this.state.filteredConnections.filter((connection)=>{
            var current = new Date(connection.request_arrival_time).getTime(); 
            return  current <= end && current >= start
          })
        }, () => {
          let pageCountVal = this.state.filteredConnections ? Math.ceil(this.state.filteredConnections.length / pageSize) : 0;
          let pagesVal = _.range(1, pageCountVal + 1);
  
          this.setState({
            pageCount : pageCountVal,
            pages : pagesVal 
          }, () => {
            this.paginationconnections(1);
          })
        });

          
      }
    
      handleChangeReportType(e){
        this.setState({
          connection_status : e.target.value
        },() => {
          this.loadnewData();
        })
      }
  

    
    

    paginationconnections(pageNo) {
        this.setState({
          currentPage : pageNo
        }, () => {
          const startIndex = (pageNo - 1) * pageSize;
          
          const newPaginatedData = this.state.filteredConnections.length === 0 ? [] :  _(this.state.filteredConnections).slice(startIndex).take(pageSize).value();
          //console.log ("Paginated :" ,newPaginatedData);
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
            if(this.state.areas[i]._id.toString() === area_id.toString()){
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

      showReportArea(){
        this.setState({
          showReport : !this.state.showReport
        })
      }

      showPackageArea(){
        this.setState({
          showPackage : !this.state.showPackage
        })
      }

   
    
    render() {
        return(
            <div className="container">
               <ISPHeader data={this.state.name} id={this.state.isp_id} />
                
                <br></br>
                <br></br>
                <br></br>
                <center><h3 className="display-6" style={{"marginBottom" : 50, "marginTop" : 50}}>User List</h3></center>

                <div className="row">
                    <div className="col">
                    <input type="text" className="form-control" style={{"marginLeft":0,"marginTop": 0,"marginBottom":30, "width" : 700}} value={this.state.searchText} onChange={this.handleChangeSearchText} placeholder="Search Connection Requests"/>
                    </div>
                    <div className="col">
                    <Button variant="success" onClick={this.showAllData} style={{"marginBottom":20}} ><BsIcons.BsClipboardData size={20}/>  Show All Data</Button>
                    </div>
                  </div>
                <div className = "row">
                <div className="col">
                <Button variant="warning" onClick={this.showAreaSearchDiv} style={{"marginBottom":20, "marginRight":10,"width" : 230}} ><FaIcons.FaSearchLocation size={30}/>{this.state.showAreaSearch ? "  Hide Search Bar" : "  Search by Location"}</Button>
                </div>
                <div className="col">
                <Button variant="warning" onClick={this.showSortDiv} style={{"marginBottom":20, "marginRight":10, "width" : 230}} ><FaIcons.FaArrowsAltV size={30}/>{this.state.showSortRatingOrder ? "  Hide Sorting" : "  Sort Connections"}</Button>
                </div>
                <div className="col">
                <Button variant="warning" onClick={this.showDatePicker} style={{"marginBottom":20, "marginRight":10, "width" : 230}} ><FcIcons.FcCalendar size={30}/>{this.state.showDate ? "  Hide Date Search" : "  Search By Date"}</Button>       
                </div>
               
                <div className="col">
                <Button variant="warning" onClick={this.showReportArea} style={{"marginBottom":20,  "width" : 230}} ><BsIcons.BsCardChecklist size={30}/>{this.state.showReport ? "  Hide Request Type" : "  Show Request Types"}</Button>       
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
                          <Form.Label>Area</Form.Label>
                          <Form.Control as="select" value={this.state.selectedArea} onChange={this.handleChangeArea} >
                          <option value="" disabled hidden>Select Area</option>
                          {this.state.searchAreas.length === 0 && <option value="" disabled>No Areas found</option>}
                          {
                            
                          
                            this.state.searchAreas.map((area) =><option key={area._id} value={area._id}>{area.name}</option>)
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

                      {/* <Col>
                      <Form.Group style={{"marginRight" : 40}}>
                          <Form.Label>Sort This Page By Rating</Form.Label>
                          <Form.Control as="select" value={this.state.rating} onChange={this.handleChangeRatingOrder}>
                          <option value=""  disabled hidden>Select Rating Order</option>
                          <option value="1">Ascending</option>
                          <option value="-1">Descending</option>
                          </Form.Control>
                      </Form.Group>
                      </Col> */}


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


                    {/* <Col >
                    <Form.Group style={{"marginRight" : 40}}>
                        <Form.Label>Sort All Data By Rating</Form.Label>
                        <Form.Control as="select" value={this.state.ratingAll} onChange={this.handleChangeRatingOrderAll}>
                        <option value="" disabled hidden>Select Rating Order</option>
                        <option value="-1">Descending</option>
                        <option value="1">Ascending</option>
                        </Form.Control>
                    </Form.Group>
                    </Col> */}

                    <Col >
                    <Form.Group>
                        <Form.Label>Sort All Data By Time</Form.Label>
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

               <div hidden={!(this.state.showReport)} style={{"backgroundColor":"#e6e6e6", "padding":10, "width":300, "borderRadius":5, "marginBottom":20}}>
                  <Form>
                      <Form.Row>
                      <Col>
                      <Form.Group style={{"marginRight":20, "marginLeft":20}}>
                          <Form.Label>Select User type</Form.Label>
                          <Form.Control as="select" value={this.state.connection_status} onChange={this.handleChangeReportType}>
                          {/* <option disabled hidden value="">Select Reports</option> */}
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
                        <th>#</th>
                        <th>User Name</th>
                        <th>Area Name</th>
                        {/* <th>Request Arrival Time</th>
                        <th>Connection Status</th> */}
                        <th>Details</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.paginatedData.length > 0 && this.state.paginatedData.map((connection, index) => {
                           
                            return <Connection 
                                key={connection._id} 
                                user_name={connection.user_name}   
                                area_name = {this.getAreaName(connection.area_id)}
                                request_arrival_time = {connection.request_arrival_time} 
                                connection_status = {(connection.connection_status === true && connection.rejected === false) ? "Accepted" : ((connection.connection_status === true && connection.rejected === true) ? "Rejected" : "Unsolved" ) }
                                count={index + 1}
                                connection_id={connection._id}
                                isp_id = {this.state.isp_id}
                                user_id ={connection.user_id}
                                name = {this.state.name}
                            />})
                        }
                    </tbody>
                </table>

                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                    <li className={this.state.currentPage === 1 ? "page-item disabled": "page-item"}>
                    <p className="page-link"  onClick={()=>this.paginationconnections(this.state.currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Next</span>
                    </p>
                    </li>
                    {
                        this.state.pages.map((page) => {
                            return <li key={page} className={
                                page === this.state.currentPage ? "page-item active" : "page-item"
                            }><p className="page-link" onClick={()=>this.paginationconnections(page)}>{page}</p></li>
                        })

                        
                    }
                    <li className={this.state.currentPage === this.state.pageCount ? "page-item disabled": "page-item"}>
                    <p className="page-link"  onClick={()=>this.paginationconnections(this.state.currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </p>
                    </li>
                    
                    </ul>
                </nav>
                {this.state.filteredConnections.length === 0 && <h4>"No users found"</h4>}
            </div>
        );
    }
}

export default UserList;
