import React, { Component } from 'react'
import FormISPDetails from './FormISPDetails'
import FormConnectionDetails from './FormConnectionDetails'
import FormPersonnelDetails from './FormPersonnelDetails'
import { Link , Redirect} from 'react-router-dom'
import axios from 'axios'
import FormTechnicalDetails from './FormTechnicalDetails'

export class ISPEditProfile extends Component {

    state = {

        // fixed
        step : 1,
        isp_name:"",
        license_number:"",
        head_office_address:"",
        head_office_telephone:"+8802",
        head_office_mobile:"+880",
        head_office_email:"",
       
       
        office_address:"",
        office_telephone:"+8802",
        office_mobile:"+880",
        office_email:"",
        contact_person_name:"",
        contact_person_address:"",
        contact_person_telephone:"+8802",
        contact_person_mobile:"+880",
        contact_person_email:"",
      
        isp_id : "",
        name : "",
        connection_id : "",
        isp : "",
        isps : [],
        connections : [],
        password : "",
        redirectISP:false
        
        
        

    }

    componentDidMount(){
       
        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ 
              isps: response.data.data, 
              isp_id : this.props.location.state.id,
              name : this.props.location.state.data
            }, () => {
                this.setState({
                    isp : this.state.isps.filter((isp) => isp._id.toString() === this.state.isp_id)[0],
                
                }, () => {
                    //console.log(this.state.isp)
                    this.setState({
                        connection_id : this.state.isp.physical_connection_details[0].connection_id
                    }, () => {
                        apiUrl = "http://localhost:7000/nttn/connectionsISP";
       
                        axios.get(apiUrl)
                        .then(response => {
                            //console.log("ISP" ,this.state.isp)
                        this.setState({ connections : response.data.data, connection_id : this.state.isp.physical_connection_details[0].connection_id }, () => {
                            //console.log("con id", this.state.connection_id);
                            this.setState({
                                isp_name:this.getConnection(this.state.connection_id).isp_name,
                                license_number:this.getConnection(this.state.connection_id  ).license_number,
                                head_office_address:this.getConnection(this.state.connection_id  ).head_office_address,
                                head_office_telephone:this.getConnection(this.state.connection_id  ).head_office_telephone,
                                head_office_mobile:this.getConnection(this.state.connection_id  ).head_office_mobile,
                                head_office_email:this.getConnection(this.state.connection_id  ).head_office_email,
                            
                            
                                office_address:this.getConnection(this.state.connection_id  ).office_address,
                                office_telephone:this.getConnection(this.state.connection_id  ).office_telephone,
                                office_mobile:this.getConnection(this.state.connection_id  ).office_mobile,
                                office_email:this.getConnection(this.state.connection_id  ).office_email,
                                contact_person_name:this.getConnection(this.state.connection_id  ).contact_person_name,
                                contact_person_address:this.getConnection(this.state.connection_id  ).contact_person_address,
                                contact_person_telephone:this.getConnection(this.state.connection_id  ).contact_person_telephone,
                                contact_person_mobile:this.getConnection(this.state.connection_id  ).contact_person_mobile,
                                contact_person_email:this.getConnection(this.state.connection_id  ).contact_person_email,
                            })
                        })
                        })
                        .catch((error) => {
                        console.log(error);
                        })
                    })
                })
            })
        })
        .catch((error) => {
          console.log(error);
        })

       
    }

    

    // Proceed to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step + 1
        });
    }

    // Go back to the previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step : step - 1
        });
    }

    // handle fields change
    handleChange = input => e => {
        this.setState({
            [input] : e.target.value
        });
    }

    getConnection = (connection_id) => {
        //console.log("called : ", connection_id)
        for(let i= 0; i < this.state.connections.length; i++){
            //console.log("Current : ",this.state.connections[i]._id.toString())
            if(this.state.connections[i]._id.toString() === connection_id.toString()){
                //console.log("hit");
                return this.state.connections[i]
            }
        }
    }


   

    
      saveISP = () => {
        let apiUrl = "http://localhost:7000/isp/edit";
        const object = {
           
            head_office_address : this.state.head_office_address,
            head_office_telephone: this.state.head_office_telephone,
            head_office_mobile : this.state.head_office_mobile,
            head_office_email : this.state.head_office_email,
            office_address : this.state.office_address,
            office_telephone: this.state.office_telephone,
            office_mobile : this.state.office_mobile,
            office_email : this.state.office_email,
            contact_person_name : this.state.contact_person_name,
            contact_person_address : this.state.contact_person_address,
            contact_person_telephone : this.state.contact_person_telephone,
            contact_person_mobile : this.state.contact_person_mobile,
            contact_person_email : this.state.contact_person_email,
            connection_id : this.state.connection_id,
            isp_id : this.state.isp_id,
            password : this.state.password
           
        }
        axios.post(apiUrl, object)
        .then(response => {
            console.log("Saved : ", response.data.message);
            this.setState({
                redirectISP : true
            })
        })
        .catch((error) => {
          console.log(error);
        })
      }

    render() {
      
        const {step} = this.state;
        const {
                    // fixed
            isp_name,
            license_number,
            head_office_address,
            head_office_telephone,
            head_office_mobile,
            head_office_email,
           
            office_address,
            office_telephone,
            office_mobile,
            office_email,
            contact_person_name,
            contact_person_address,
            contact_person_telephone,
            contact_person_mobile,
            contact_person_email,
            isp_id,
            name,
            password
            
          
        } = this.state;

        const values = {
            // fixed
            isp_name,
            license_number,
            head_office_address,
            head_office_telephone,
            head_office_mobile,
            head_office_email,
           
            office_address,
            office_telephone,
            office_mobile,
            office_email,
            contact_person_name,
            contact_person_address,
            contact_person_telephone,
            contact_person_mobile,
            contact_person_email,
            isp_id,
            name,
            password
           
        };

        switch(step) {
            case 1:
                return (
                    <FormISPDetails
                        nextStep={this.nextStep}
                        handleChange = {this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <FormConnectionDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                       
                        values={values}
                    />
                )
            case 3:
                return (
                    <FormPersonnelDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        values={values}
                        
                    />
                );
            case 4 :
                return(  
                    <div>
                       

                        <FormTechnicalDetails 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange = {this.handleChange}
                            values={values}
                            saveISP = {this.saveISP}
                        />
                    </div>
                )
            case 5 :
                return(
                    <Redirect to={{
                        pathname: `/isp/${this.state.isp_id}`,
                        state: {
                            data : this.state.isp_name,
                            id : this.state.isp_id
                        }
                        }} />
                )
           
          
           
        }

    }
}

export default ISPEditProfile
