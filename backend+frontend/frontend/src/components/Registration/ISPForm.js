import React, { Component } from 'react'
import FormISPDetails from './FormISPDetails'
import FormConnectionDetails from './FormConnectionDetails'
import FormPersonnelDetails from './FormPersonnelDetails'
import FormTechnicalDetails from './FormTechnicalDetails'
import FormDeclaration from './FormDeclaration'
import Success from './Success'
import axios from 'axios'

export class ISPForm extends Component {

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
        wire_type:"",//0-DSL, 1-ADSL, 2-OpticalFiber,4-UTP,5-STP
        selectedDivision:"", selectedDistrict:"", selectedUpazilla:"", selectedUnion:"",

        //constants
        districts:[],
        searchdistricts:[],
        divisions:[],
        upazillas:[],
        searchupazillas:[],
        unions:[],
        searchunions:[]
        
        

    }

    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/union";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ unions: response.data.data, searchunions : response.data.data })
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

   

    findFromDivision = (division) => {
        let districts = this.state.districts.filter((district) => district.division_id === division);
        let upazillas = this.state.upazillas.filter((upazilla) => districts.map((district) => district.district_id).includes(upazilla.district_id));
        let unions = this.state.unions.filter((union) =>  upazillas.map((upazilla) => upazilla.upazilla_id).includes(union.upazilla_id));
       
        return [upazillas, unions];
    }

    findFromDistrict = (district) => {
    
        let upazillas = this.state.upazillas.filter((upazilla) => upazilla.district_id === district);
        let unions = this.state.unions.filter((union) =>  upazillas.map(upazilla => upazilla.upazilla_id).includes(union.upazilla_id));
        

        return [unions];
    }
  
     
  
      handleChangeDivision = (e) => {
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
  
      
  
      handleChangeDistrict = (e) => {
        let ans = this.findFromDistrict(e.target.value);
        this.setState({
          selectedDistrict : e.target.value,
          searchupazillas :  this.state.upazillas.filter((upazilla) => upazilla.district_id === e.target.value),
          searchunions : ans[0],
         
          selectedUpazilla:"",selectedUnion:""
          
        })
  
      }
  
      handleChangeUpazilla = (e) => {
        this.setState({
          selectedUpazilla : e.target.value,
          searchunions :  this.state.unions.filter((union) => union.upazilla_id === e.target.value),
          
          selectedUnion:""
          
        })
      }
  
      handleChangeUnion = (e) => {
        this.setState({
          selectedUnion : e.target.value,
        })
      }

      saveISP = () => {
        let apiUrl = "http://localhost:7000/api/registerISP";
        const object = {
            isp_name : this.state.isp_name,
            license_number : this.state.license_number,
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
            wire_type : this.state.wire_type,
            division_id : this.state.selectedDivision,
            district_id : this.state.selectedDistrict,
            union_id : this.state.selectedUnion,
            upazilla_id : this.state.selectedUpazilla
        }
        axios.post(apiUrl, object)
        .then(response => {
            console.log("Saved : ", response.data.data);
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
            wire_type,//0-DSL, 1-ADSL, 2-OpticalFiber,3-UTP,4-STP
            selectedDivision, selectedDistrict, selectedUpazilla, selectedUnion,

            //constants
            districts,
            searchdistricts,
            divisions,
            upazillas,
            searchupazillas,
            unions,
            searchunions
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
            wire_type,//0-DSL, 1-ADSL, 2-OpticalFiber,4-UTP,5-STP
            selectedDivision, selectedDistrict, selectedUpazilla, selectedUnion,

            //constants
            districts,
            searchdistricts,
            divisions,
            upazillas,
            searchupazillas,
            unions,
            searchunions
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
                        handleChangeDivision={this.handleChangeDivision}
                        handleChangeDistrict= {this.handleChangeDistrict}
                        handleChangeUpazilla={this.handleChangeUpazilla}
                        handleChangeUnion={this.handleChangeUnion}
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
            case 4:
                return (
                    <FormTechnicalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        values={values}
                    />
                );
            case 5:
                return (
                    <FormDeclaration
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange = {this.handleChange}
                        saveISP = {this.saveISP}
                        values={values}
                    />
                );
            case 6:
                return (
                    <Success/>
                );
        }

    }
}

export default ISPForm
