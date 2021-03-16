import React, { useState, useEffect } from 'react';
import useAuth from '../utils/useAuth';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import { Link, useLocation } from 'react-router-dom';
import { Input, TextArea,} from "../components/Form";
import Button from "../components/Button";
import UserApi from "../utils/UserApi";



function AddEmployee() {
    const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      manager: false,
      password: ''
  })

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setValues({...values, [name]: value})
  };

    useAuth();

    const handleAddEmployee = async(e) =>{
      e.preventDefault();
      try {
        let response = await UserApi.getUsers()
        const userCompany = response.data.currentUser.company;
        console.log(randomPassword())
        } catch (error) {
        console.log(error);
      }
    }

    function randomPassword(){
      const charString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz1234567890!@#$%&*";
    let passGenerated = "";
    for (let i = 0; i < 20; i++) {
    passGenerated += charString.charAt(Math.floor(Math.random() * charString.length)); 
    } 
    passGenerated += "CHANGEME"
    setValues({...values, password: passGenerated})
  } 
  

    return(
        <div>
          {console.log(values)};
            <Navbar />
            <Header heading={'Add Employee'}/>
            <form onSubmit={handleAddEmployee}>
            <Input
                onChange={handleInputChange}
                name="firstName"
                value={values.firstName}
                type="text"
                placeholder="Employee first name (required)"
              />
            <Input
                onChange={handleInputChange}
                name="lastName"
                value={values.lastName}
                type="text"
                placeholder="Employee last name (required)"
            />
            <Input
                onChange={handleInputChange}
                name="email"
                value={values.email}
                type="text"
                placeholder="Employee email (required)"
            />
            <div>
              <label class="radio">
              <input 
                    onChange={handleInputChange}
                    type="radio"
                    value= "true"
                    name= "manager"
                /> Manager
              </label>
            </div>
            <div>
              <label class="radio">
              <input 
                    onChange={handleInputChange}
                    type="radio"
                    value= "false"
                    name= "manager"
                /> Employee
              </label>
            </div>
            <Button 
              name="Add Employee"
              type="submit" 
              color="#fb8500"/>
            <h3>{values.password}</h3>
            </form>


            <Footer />
            
        </div>
    )
}

export default AddEmployee;