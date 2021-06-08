import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Report = (props) => {

    return(
        
        <tr> 
            <td>{props.count}</td>
            <td>{props.isp_name}</td>
            <td>{props.union_name}</td>
            <td>{props.problem_category}</td>
            <td>{props.report_arrival_time}</td>
        </tr>
              
    );
    
}

// const reportList =  (props) => {
//     return props.map(async (currentReport) => {
//         let isp_name, union_name, problem_category;

        
//         const apiUrl = "http://localhost:7000/nttn/reports";
//         fetch(apiUrl)
//         .then((res) => res.json())
//         .then((reports) => {
//             setReports(reports.data);
//         });


//         let obj =  {
//             isp_id : currentReport.isp_id
//         }
//         axios.post('https://localhost:7000/api/isp', obj)
//             .then(response => {
//                 console.log(typeof response.data);
//                 isp_name = response.data.name;
//             } );

//         //union_name
//         obj = {
//             union_id : currentReport.union_id
//         }
//         axios.post('https://localhost:7000/api/union', obj)
//             .then(response => union_name = response.data.name );


//         // problem_category
//         if(currentReport.problem_category === "0") {
//             problem_category = "Low Bandwidth";
//         } else if(currentReport.problem_category === "1") {
//             problem_category = "Physical Connection Problem";
//         } else if(currentReport.problem_category === "2") {
//             problem_category = "Platform Related Problem";
//         } else {
//             problem_category = "Others";
//         }


//         let modified = {
//             isp_name,
//             union_name,
//             problem_category,
//             report_arrival_time : currentReport.report_arrival_time
//         }

//       return <Report report={modified} key={currentReport._id}/>;

//     })
// }


// const Reports = () => {
//     const [reports, setReports] = useState([]);
//     const [isps, setIsps] = useState([]);
//     const [unions, setUnions] = useState([]);

//     useEffect(async () => {
//         await getAllReports();
//         await getAllIsps();
//         await getAllUnions();
//     }, []);

//     const getAllReports = async () => {
//        const apiUrl = "http://localhost:7000/nttn/reports";
//         fetch(apiUrl)
//         .then((res) => res.json())
//         .then((reports) => {
//             setReports(reports.data);
//         });

//     }
//     const getAllIsps = async () => {
//         const apiUrl = "http://localhost:7000/api/isp";
//         fetch(apiUrl)
//         .then((res) => res.json())
//         .then((isps) => {
//             console.log(isps.data);
//             setIsps(isps.data);
//         });

//     }
//     const getAllUnions = async () => {
//         const apiUrl = "http://localhost:7000/api/union";
//         fetch(apiUrl)
//         .then((res) => res.json())
//         .then((unions) => {
//             setUnions(unions.data);
//         });

//     }

//     return(
//         <div>
//         <center><h3>Reports from ISP</h3><br></br></center>
        
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th></th>
//               <th>ISP Name</th>
//               <th>Union Name</th>
//               <th>Problem Category</th>
//               <th>Report Arrival Time</th>
//             </tr>
//           </thead>
          
//           <tbody>
          
//              { 
//                 reports.map((report, index) => {
//                     let isp_name, union_name;
//                     isp_name = isps.filter((isp) => isp._id === report.isp_id)[0].name;
//                     union_name = unions.filter((union) => union.union_id === report.union_id)[0].name;
//                     <Report 
//                         key={report._id} 
//                         isp_name={isp_name} 
//                         union_name = {union_name} 
//                         problem_category = {(report.category === "0") ? "Low Bandwidth" : (report.category === "1" ? "Physical Connection Problem" : (report.category === "2" ? "Platform Related Problem" : "Others")) } 
//                         report_arrival_time = {report.report_arrival_time} 
//                         count={index + 1}
//                     />})
//              }
//             </tbody>


//             </table>
          
        
//       </div>
//     );
// }

class Reports extends React.Component {

    state = {
        reports : [],
        isps : [],
        unions : [],
        district : undefined,
        division : undefined,
        subdistrict : undefined,
        union : undefined,
        time : undefined
    }
  

    componentDidMount() {
        let apiUrl = "http://localhost:7000/nttn/reports/sortBy";
        axios.post(apiUrl,{})
        .then(response => {
          this.setState({ reports: response.data.data })
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
        
    }

      
    getIspName = (isp_id) => {
       

        for(let i = 0; i < this.state.isps.length; i++){
            if(this.state.isps[i]._id === isp_id){
                return this.state.isps[i].name
            }
        }
    }


    getUnionName = (union_id) => {
       

        for(let i = 0; i < this.state.unions.length; i++){
            if(this.state.unions[i].union_id === union_id){
                return this.state.unions[i].name
            }
        }
    }

   
    
    render() {
        return(
            <div>
                <center><h3>Reports from ISP</h3><br></br></center>
                
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th></th>
                        <th>ISP Name</th>
                        <th>Union Name</th>
                        <th>Problem Category</th>
                        <th>Report Arrival Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.reports.map((report, index) => {
                           
                            return <Report 
                                key={report._id} 
                                isp_name={this.getIspName(report.isp_id)} 
                                union_name = {this.getUnionName(report.union_id)} 
                                problem_category = {(report.category === "0") ? "Low Bandwidth" : (report.category === "1" ? "Physical Connection Problem" : (report.category === "2" ? "Platform Related Problem" : "Others")) } 
                                report_arrival_time = {report.report_arrival_time} 
                                count={index + 1}
                            />})
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Reports
