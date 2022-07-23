import {useState} from "react"
import { Formik,Form,Field,ErrorMessage } from "formik"
import * as yup from "yup"
import axios from "axios"
export default function ProjectIndex(){
    const [details,setDetails]=useState([])
    function submitProject(){
          fetch("http://localhost:9400/getprojects")
          .then((response)=>response.json())
          .then(data=>
            setDetails(data)
          )
    }
    //In axios its coming as {object Object} as response in console and in both axios and fetch method it's not showing data on UI
    return(
        <>
        <h2 className="container text-center text-success">Personal Project Management Tool</h2>
        <hr/>
        <div className="row">
          <Formik 
              initialValues={{
                Contributor:"",
                Project:'',
                Time:'',
                Description:'',
                Link:''
          }
          }
          validationSchema={yup.object({
            Contributor:yup.string().required(),
            Project:yup.string().required(),
            Time:yup.string(),
            Description:yup.string().required(),
            Link:yup.string().required()
          })}
          onSubmit={values=>
            {axios.post("http://localhost:9400/postproject",values)}
        }
          >
           <div className="col-6">
            <h2 className="text-center text-danger">Enter Project Details</h2>
            <Form className="container m-4 text-center">
                <dl>
                  <dt>Contributor's Name</dt>
                  <dd><Field type="text" name="Contributor"/></dd>
                  <dd><ErrorMessage name="Contributor"></ErrorMessage></dd>
                  <dt>Project Name</dt>
                  <dd><Field type="text" name="Project"/></dd>
                  <dd><ErrorMessage name="Project"></ErrorMessage></dd>
                  <dt>Time Taken</dt>
                  <dd><Field placeholder="In hours" type="text" name="Time"/></dd>
                  <dd><ErrorMessage name="Time"></ErrorMessage></dd>
                  <dt>Project Description</dt>
                  <dd><Field placeholder="Details like Components,achieved functionalities etc." type="text" name="Description"/></dd>
                  <dd><ErrorMessage name="Description"></ErrorMessage></dd>
                  <dt>Github Link</dt>
                  <dd><Field placeholder="Details like Components,achieved functionalities" type="text" name="Link"/></dd>
                  <dd><ErrorMessage name="Link"></ErrorMessage></dd>
                </dl>
                <button className="text-center btn btn-success">Submit</button>
            </Form>
           </div> 
           </Formik>
           <div className="col-6">
               <h2 className="text-center text-danger" style={{cursor:"pointer"}}onClick={submitProject}>Project Details</h2>
               <div className="overflow-auto" style={{height:'600px'}}>
               <div>
                  <table className="table table-bordered table-striped ">
                            <tr>
                              <th>Project Name</th>
                              <th>Contributor's Name</th>
                              <th>Web link</th>
                            </tr>
                  {   
                    details.map(project=> 
                        <>
                            <tr>
                              <td>{project.Project}</td>
                              <td><p>{project.Contributor}</p></td>
                              <td><a href={project.Link}>{project.Link}</a></td>
                            </tr>
                        </>
                    )
                }
                </table>
               </div>
               </div>
           </div>
        </div>
        <hr/>
        <hr/>
        </>
    )
}