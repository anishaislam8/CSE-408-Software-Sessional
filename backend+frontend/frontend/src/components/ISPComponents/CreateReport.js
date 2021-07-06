import React from 'react'
import axios from 'axios'
import _ from 'lodash';
import { Link , NavLink } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import ISPHeader from './Header';




class ISPCreateReport extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isp_id : "",
            name : "",
            isps : [],
            unions:[],
            isEligible:false,
            category:"",
            union_id:"",
            isp_unions:[],
            problemCategoryError:"",
            provideDetailsError:"",
            unionError:"",
            details:"",
            modalTitle : "",
            modalBody:"",
            contracts:[],
            done:false

        }

        this.handleChangeProblemCategory =this.handleChangeProblemCategory.bind(this);
        this.handleChangeUnion = this.handleChangeUnion.bind(this);
        this.handleChangeDetails = this.handleChangeDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getISP = this.getISP.bind(this);
        this.getIspName = this.getIspName.bind(this);
        this.getUnion= this.getUnion.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount(){

        let apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })



        

         apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
           
            this.setState({ isps: response.data.data , name : this.props.location.state.data})
        })
        .catch((error) => {
          console.log(error);
        })

       


        apiUrl = "http://localhost:7000/api/ispContracts";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ contracts: response.data.data, isp_id : this.props.location.state.id }, () => {
            
                let newcontracts = this.state.contracts.filter((contract) => contract.isp_id.toString() === this.state.isp_id);
      
                let isp = this.getISP(this.state.isp_id);
             
                this.setState({
                    isp_unions : [... new Set(newcontracts.map((contract) => contract.union_id))]
                });
                
    
                if(isp.connection_establishment_time){
                    this.setState({
                        isEligible : true
                    })
                }
            })
        })
        .catch((error) => {
          console.log(error);
        })

        
    }

    getIspName = (isp_id) => {
       

        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() === isp_id){
                
                return this.state.isps[i].name
            }
        }
    }

    getISP(isp_id){
        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id.toString() === isp_id){
                //console.log("hit");
                return this.state.isps[i]
            }
        }
    }

    getUnion(union_id){
        //console.log(this.state.unions.length);
        for(let i = 0; i < this.state.unions.length; i++){
            if(this.state.unions[i].union_id === union_id){
                //console.log("Here ",this.state.unions[i]);           
                return this.state.unions[i].name
            
            }
        }
    }

    
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.category){
            this.setState({
                problemCategoryError:"Please select a problem category"
            })
        }
        if(!this.state.union_id){
            this.setState({
                unionError : "Please provide a union name"
            })
        }
        if(!this.state.details.trim()){
            this.setState({
                provideDetailsError : "Please provide details of the problem you are facing"
            })
        }
        if(this.state.category && this.state.union_id && this.state.details.trim()){

            let apiUrl = "http://localhost:7000/isp/reports";
            let object = {
                isp_id : this.state.isp_id,
                union_id : this.state.union_id,
                category : this.state.category,
                details : this.state.details
            }
            axios.post(apiUrl, object)
            .then(response => {
                if(response.data.data.length === 0){
                    // problem submitting the report
                    this.setState({
                        modalTitle:"Error",
                        modalBody:"There was an error while submitting the report, please try again!"
                    }, () => {
                        this.setState({
                            done:true
                        })
                    })
                }
                else {
                    // clear all inputs and open modal
                    this.setState({
                        
                        union_id : "",
                        category : "",
                        details : "",
                        provideDetailsError:"",provideDetailsError:"",unionError:"",
                        modalTitle:"Success",
                        modalBody:"Your report has been sent to NTTN"
                    }, () => {
                        this.setState({
                            done:true
                        })
                    })
                }
            })
            .catch((error) => {
            console.log(error);
            })
           
        }
    }

    handleChangeProblemCategory(e){
        this.setState({
            category : e.target.value
        }, () => {
            this.setState({
                problemCategoryError:""
            })
        })
    }

    handleChangeUnion(e){
        this.setState({
            union_id:e.target.value
        }, () => {
            this.setState({
                unionError : ""
            })
        })
    }

    handleChangeDetails(e){
        this.setState({
            details:e.target.value
        }, () => {
            this.setState({
                provideDetailsError : ""
            })
        })
    }

    handleClose(){
        this.setState({
            done : false,
         
        })
    }
   

    render(){
        return(
            <div>
               <ISPHeader data={this.state.name} id={this.state.isp_id} />
                
               <br></br>
               <br></br>
               <br></br>
               <div className="container">
               {this.state.isEligible === false && <center><h1>Sorry! You are not connected yet!!</h1></center>}
            
               <div className="container" hidden={!this.state.isEligible} >
                    <center><h2>Report a problem</h2></center>
                
                <Form onSubmit={this.handleSubmit}>
                    
                     <Form.Group style={{"margin":30, "marginLeft":200, "marginRight" : 200}}>
                          <Form.Label>Select Problem Category</Form.Label>
                          <Form.Control as="select" value={this.state.category} onChange={this.handleChangeProblemCategory}>
                          <option disabled hidden value="">Problem Type</option>
                          <option value="0">Low Bandwidth</option>
                          <option value="1">Physical Connection Related Problem</option>
                          <option value="2">Platform Related Problem</option>
                          <option value="3">Others</option>
                          </Form.Control>
                          <Form.Text style={{"color":"red"}}>
                          {this.state.problemCategoryError}
                        </Form.Text>
                      </Form.Group>
                     
                    <Form.Group controlId="exampleForm.ControlSelect2" style={{"margin":30, "marginLeft":200, "marginRight" : 200}}>
                        <Form.Label>Select Union</Form.Label>
                        <Form.Control as="select" value={this.state.union_id} onChange={this.handleChangeUnion}>
                          <option value="" disabled hidden>Select Union</option>
                          {
                              this.state.isp_unions.map((union) => <option key={union} value={union}>{this.getUnion(union)}</option>)
                          }
                          </Form.Control>
                          <Form.Text style={{"color":"red"}}>
                          {this.state.unionError}
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="exampleForm.ControlTextarea1" style={{"margin":30, "marginLeft":200, "marginRight" : 200}}>
                        <Form.Label>Provide Details</Form.Label>
                        <Form.Control as="textarea" value = {this.state.details} rows={3} onChange={this.handleChangeDetails} />
                        <Form.Text style={{"color":"red"}}>
                        {this.state.provideDetailsError}
                        </Form.Text>
                    </Form.Group>
                    

                    <Form.Group>
                      
                      <Button variant="success" type="submit" style={{"margin":30, "marginLeft":200, "marginRight" : 200}}>
                      <AiIcons.AiOutlineSend size={30}/>  Submit
                        </Button>
                    </Form.Group>
                    </Form>

               
                    <Modal show={this.state.done} onHide={this.handleClose} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {this.state.modalBody}
                        </Modal.Body>
                        <Modal.Footer>
                        <Link type="button" onClick={this.handleClose} className="btn btn-warning" to={{
                            pathname: `/isp/${this.state.isp_id}`,
                            state : {
                                data : this.state.name,
                                id : this.state.isp_id

                            }}}><AiIcons.AiOutlineHome size={20}/>  Go to Home</Link>

                        <Link type="button" onClick={this.handleClose} className="btn btn-info" to={{
                             pathname: `/isp/${this.state.isp_id}/viewReport`,
                             state: {
                                data : this.state.name,
                                id : this.state.isp_id
                             }}}><GoIcons.GoReport size={20}/>  View Reports</Link>
                        </Modal.Footer> 
                    </Modal>
                    
                    
                    
                </div>
         
                
               </div>
                
            </div>
        );
    }
}

export default ISPCreateReport