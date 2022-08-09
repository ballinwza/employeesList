 import './App.css';
 import Axios from 'axios'
 import {useState} from 'react'

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState("")
  const [salary, setSalary] = useState(0)
  const [newSalary, setNewSalary] = useState(0)
  const [employees, setEmployees] = useState([]) 

  const getEmployees = ()=>{
    Axios.get('http://localhost:3001/employees').then((res)=>{
      setEmployees(res.data)
    });
  } 

  const addEmployee = ()=>{
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary
    }).then(()=>{
      setEmployees([
        ...employees,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          salary: salary
        }
      ])
    })
  }

  const updateSalary =(id)=>{
    Axios.put("http://localhost:3001/update",{salary: newSalary, id: id }).then((res)=>{
      setEmployees(
        employees.map((val)=>{
          return val.id === id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            salary: val.newSalary
          } : val;
        })
      )
    })
  } 

  const deleteEmployee =(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((res)=>{
      setEmployees(
        employees.filter((val)=>{
          return val.id !== id
        })
      )
    })
  }
  return (
    <div className="App container">
      <h1>Employees Information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input id="name" type="text" className="form-control" placeholder="Enter name" onChange={(event)=>{setName(event.target.value)}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age:</label>
            <input id="age" type="number" className="form-control" placeholder="Enter age" onChange={(event)=>{setAge(event.target.value)}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <input id="country" type="text" className="form-control" placeholder="Enter country" onChange={(event)=>{setCountry(event.target.value)}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position:</label>
            <input id="position" type="text" className="form-control" placeholder="Enter position" onChange={(event)=>{setPosition(event.target.value)}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">Salary:</label>
            <input id="salary" type="number" className="form-control" placeholder="Enter salary" onChange={(event)=>{setSalary(event.target.value)}}/>
            
          </div>
          <button className="btn btn-success" onClick={addEmployee}>Add Employee</button>
        </form>
        <hr/>
        <div className="employee">
          <button className="btn btn-primary" onClick={getEmployees}>Show employees</button>
          
          {employees.map((val, key)=>{
            return (
              <div className='employees card'> 
                <div className='card-body text-left'>
                  <p className='card-text'>Name: {val.name}</p>
                  <p className='card-text'>Age: {val.age}</p>
                  <p className='card-text'>Country: {val.country}</p>
                  <p className='card-text'>Position: {val.position}</p>
                  <p className='card-text'>Salary: {val.salary}</p>
                  <div className='d-flex mt-3'>
                    <input className='form-control' type="number" placeholder='15000...' onChange={(event)=>{setNewSalary(event.target.value)}}/>
                    <button className='btn btn-warning' 
                    onClick={()=>{
                      updateSalary(val.id)
                      setTimeout(getEmployees(), 10000)
                    }}>Update</button>

                    <button className='btn btn-danger' 
                    onClick={()=>{
                      deleteEmployee(val.id)
                      setTimeout(getEmployees(), 10000)
                    }}>Delete
                    </button> 
                  </div> 
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
