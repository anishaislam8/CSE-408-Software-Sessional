import React, { Component } from "react";
import axios from 'axios'
import { Link , NavLink, Redirect } from 'react-router-dom';
import './../../styles/login_signup.css';
import FooterISP from './footerISP';
import FooterAdmin from './footerAdmin';
import FooterUser from './footerUser';
import logo from './../../img/login.gif'

const Header = (props) => {
    return(
        <center>
            <div className="header" style={{"marginBottom":30}}>
                <h2 style={{"fontWeight":"bolder"}}>Fiber@Home</h2>
                
            </div>
        

            <div className="row" style={{"marginBottom":20}}>
                <div className="col">
                    <h5> <b>Log in{props.usertype}</b></h5>
                </div>
            </div>
            <div className="row" style={{"marginBottom":20}}>
                <div className="col">
                    <a className="text-dark" type="button" onClick={props.handleIsAdmin} style={{"paddingRight":20}}>Admin</a>
                    <a className="text-dark" type="button" onClick={props.handleIsIsp} style={{"paddingRight":20}}>ISP</a>
                    <a className="text-dark" type="button" onClick={props.handleIsUser}>User</a>
                </div>
            </div>
            
        </center> 
    );
}

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            isAdmin : true,
            isIsp : false,
            isUser : false,
            usertype:" as Admin",
            username:"",
            password:"",
            license_id:"",
            isps:"",
            users:"",
            nttn:"",
            errorVal:"",
            redirectNTTN:false,
            redirectISP:false,
            redirectUser:false,
        }

        this.handleIsAdmin = this.handleIsAdmin.bind(this);
        this.handleIsIsp = this.handleIsIsp.bind(this);
        this.handleIsUser = this.handleIsUser.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLicenseId = this.handleLicenseId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getISP = this.getISP.bind(this);
        this.getUser = this.getUser.bind(this);

    }

    componentDidMount(){
        let apiUrl = "http://localhost:7000/api/isp";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ isps: response.data.data })
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

        apiUrl = "http://localhost:7000/api/nttn";
        axios.get(apiUrl)
        .then(response => {
            this.setState({ nttn: response.data.data })
        })
        .catch((error) => {
          console.log(error);
        })

    }

    handleIsAdmin(e){
        e.preventDefault();
        this.setState({
            usertype:" as Admin",
            isAdmin : true,
            isIsp : false,
            isUser : false,
            errorVal : ""
        })
    }

    handleIsIsp(e){
        e.preventDefault();
        this.setState({
            usertype :" as ISP",
            isAdmin : false,
            isIsp : true,
            isUser : false,
            errorVal:""
        })
    }
    
    handleIsUser(e){
        e.preventDefault();
        this.setState({
            usertype : " as User",
            isAdmin : false,
            isIsp : false,
            isUser : true,
            errorVal:""
        })
    }

    handlePassword(e){
        
        if(e.target.value === ""){
            this.setState({
                password:"",
                errorVal:""
            })
        } else {
            this.setState({
                password:e.target.value,
                errorVal:""
            })
        }
    }

    handleLicenseId(e){
       
        if(e.target.value === ""){
            this.setState({
                license_id:"",
                errorVal:""
            })
        } else {
            this.setState({
                license_id:e.target.value,
                errorVal:""
            })
        }
    }

    handleUsername(e){
        if(e.target.value === ""){
            this.setState({
                username:"",
                errorVal:""
            })
        } else {
            this.setState({
                username:e.target.value,
                errorVal:""
            })
        }
    }

    getISP(license_id){
        for(let i= 0;i < this.state.isps.length; i++){
            if(this.state.isps[i].license_id === license_id){
                return this.state.isps[i]
            }
        }
        return {
            license_id:-1
        };

    }
    getUser(nid){
        for(let i= 0;i < this.state.users.length; i++){
            if(this.state.users[i].nid === nid){
                return this.state.users[i]
            }
        }
        return {
            nid:-1
        };

    }

    handleSubmit(e){
       
        
        if(e){
            e.preventDefault();
        }
       
        let apiUrl = "http://localhost:7000/api/hashedPass";
        
       
      
        if(this.state.usertype===" as Admin"){
           
            if(this.state.username && this.state.password){

                const object = {
                    entered : this.state.password,
                    saved : this.state.nttn[0].password
                }
                
                axios.post(apiUrl, object)
                .then(response => {
                   
                    if(response.data.message === "Matched" && this.state.username === this.state.nttn[0].username){
                        
                        this.setState({
                            username:"",
                            password:"",
                            license_id:"",
                            errorVal:"",
                            redirectNTTN:true
                        })
                        
                    } else {
                        
                        this.setState({
                            username:"",
                            password:"",
                            license_id:"",
                            errorVal:"Username and Password not matched!!"

                        })
                    
                    }
                })
                .catch((error) => {
                    this.setState({
                        username:"",
                        password:"",
                        license_id:"",
                        errorVal:"Username and Password not matched!!"

                    })
                  console.log(error);
                })

            }

        } else if(this.state.usertype===" as ISP"){

            if(this.state.license_id && this.state.password){

                const object = {
                    entered : this.state.password,
                    saved : this.getISP(this.state.license_id).password
                }
                
                axios.post(apiUrl, object)
                .then(response => {
                   
                    if(response.data.message === "Matched" && this.state.license_id === this.getISP(this.state.license_id).license_id){
                  
                        this.setState({
                            
                            errorVal:"",
                            redirectISP:true
                        })
                        
                    } else {
                        
                        this.setState({
                            username:"",
                            password:"",
                            license_id:"",
                            errorVal:"License ID and Password not matched!!"

                        })
                    
                    }
                })
                .catch((error) => {
                    this.setState({
                        username:"",
                        password:"",
                        license_id:"",
                        errorVal:"License ID and Password not matched!!"

                    })
                  console.log(error);
                })

            }
            
        } else if(this.state.usertype===" as User"){
            if(this.state.username && this.state.password){

                const object = {
                    entered : this.state.password,
                    saved : this.getUser(this.state.username).password
                }
                
                axios.post(apiUrl, object)
                .then(response => {
                   
                    if(response.data.message === "Matched" && this.state.username === this.getUser(this.state.username).nid){
                  
                        this.setState({
                            
                            errorVal:"",
                            redirectUser:true
                        })
                        
                    } else {
                        
                        this.setState({
                            username:"",
                            password:"",
                            license_id:"",
                            errorVal:"NID and Password not matched!!"

                        })
                    
                    }
                })
                .catch((error) => {
                    this.setState({
                        username:"",
                        password:"",
                        license_id:"",
                        errorVal:"NID and Password not matched!!"

                    })
                  console.log(error);
                })

            }
        }
    }
    render() {
        return (
            <div className="formPage" >
                {this.state.redirectNTTN ? <Redirect to='/nttn' /> : ""}
                {this.state.redirectISP ? <Redirect to={{
                            pathname: `/isp/${(this.getISP(this.state.license_id)._id).toString()}`,
                            state: {
                                data : this.getISP(this.state.license_id).name,
                                id : (this.getISP(this.state.license_id)._id).toString()
                            }
                            }} /> : ""}
                {this.state.redirectUser ? <Redirect to={{
                            pathname: `/user/${(this.getUser(this.state.username)._id).toString()}`,
                            state: {
                                data : this.getUser(this.state.username).name,
                                id : (this.getUser(this.state.username)._id).toString()
                            }
                            }} /> : ""}
                <div className="row">
                    <div className="col">
                    <img src={logo} alt="loading..." style={{"height":600, "marginLeft":150, "marginTop":100}}/>
                    </div>
                    <div className="col">
                    
                    
                    
                    
                     
                    <form autoComplete="off" className="inner" style={{"marginTop":100}} onSubmit={this.handleSubmit} hidden={!this.state.isAdmin}>
                        <Header 
                            errorVal={this.state.errorVal}
                            usertype={this.state.usertype}
                            handleIsAdmin = {this.handleIsAdmin}
                            handleIsIsp= {this.handleIsIsp}
                            handleIsUser = {this.handleIsUser}

                        />
                        <h5 style={{"fontWeight":"bolder", "color":"red", "marginTop":20 ,"marginBottom":20}}>{this.state.errorVal}</h5>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={this.state.username} onChange={this.handleUsername} className="form-control" placeholder="Enter username" required/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} className="form-control" placeholder="Enter password" minLength="6"  required/>
                        </div>

                        
                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{"marginTop" : 20}}>Sign in</button>
                       <FooterAdmin />
                    
                    </form>





                    <form autoComplete="off" className="inner" style={{"marginTop":100}} onSubmit={this.handleSubmit} hidden={!this.state.isIsp}>

                        <Header 
                            errorVal={this.state.errorVal}
                            usertype={this.state.usertype}
                            handleIsAdmin = {this.handleIsAdmin}
                            handleIsIsp= {this.handleIsIsp}
                            handleIsUser = {this.handleIsUser}

                        />
                        <h5 style={{"fontWeight":"bolder", "color":"red", "marginTop":20 ,"marginBottom":20}}>{this.state.errorVal}</h5>
                    
                        <div className="form-group">
                            <label>License ID</label>
                            <input type="text" value={this.state.license_id} onChange={this.handleLicenseId} className="form-control" placeholder="Enter license id" minLength="6" required />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} className="form-control" placeholder="Enter password" minLength="6"  required/>
                        </div>

                       

                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{"marginTop" : 20}}>Sign in</button>
                        <FooterISP />
                   
                    </form>






                    <form autoComplete="off" className="inner" style={{"marginTop":100}} onSubmit={this.handleSubmit}  hidden={!this.state.isUser}>

                        <Header 
                            errorVal={this.state.errorVal}
                            usertype={this.state.usertype}
                            handleIsAdmin = {this.handleIsAdmin}
                            handleIsIsp= {this.handleIsIsp}
                            handleIsUser = {this.handleIsUser}

                        />
                        <h5 style={{"fontWeight":"bolder", "color":"red", "marginTop":20 ,"marginBottom":20}}>{this.state.errorVal}</h5>

                    
                        <div className="form-group">
                            <label>NID</label>
                            <input type="text" value={this.state.username} onChange={this.handleUsername} className="form-control" placeholder="Enter NID Number" required minLength="10" maxLength="10"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} className="form-control" placeholder="Enter password" minLength="6"  required/>
                        </div>

                        
                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{"marginTop" : 20}}>Sign in</button>
                        <FooterUser />
                       
                       
                        
                    

                   
                    </form>
                    </div>
                </div>

                
                    
                
                    
                    </div>
              
                
         
           
        );
    }
}