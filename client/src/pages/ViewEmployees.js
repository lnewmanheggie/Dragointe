import React, { useState, useEffect } from 'react';
import useAuth from '../utils/useAuth';
import EmployeeApi from '../utils/EmployeeApi';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import EmpTable from '../components/employeeTable/EmployeeTable';
import SearchBar from '../components/searchBar/SearchBar';


function ViewEmployees() {
    const styles = {

        cell: {
            fontWeight: 'bold'
        },

        container: {
            backgroundColor: "white",
        },

        link: {
            textDecoration: 'none'
        }
    };

    const [values, setValues] = useState({ search: '' });
    const [filteredEmployees, setFiltered] = useState([]);
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        loadEmployees();

    }, [])

    function loadEmployees() {
        EmployeeApi.getEmployees()
            .then(res => {
                setEmployees(res.data)
                setFiltered(res.data)
            })
            .catch(err => console.log(err));
    };

    const handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        setValues({
            ...values,
            [name]: value
        });

        const filteredArr = filteredEmployees.filter(x => x.firstName.toLowerCase().startsWith(value))
        setEmployees(filteredArr)

    }

    const deleteEmployee = async (e) => {
        const email = e.target.value

        try {
            await EmployeeApi.delete(email);
            const newData = await EmployeeApi.getEmployees();
            const newDataArr = newData.data;
            setEmployees(newDataArr)

        } catch (error) {
            console.log(error);
        }
    }


    useAuth();

    return (
        <div>
            <Navbar />
            <Header heading={'View Employees'} />
            <SearchBar
                value={values.search}
                handleInputChange={handleInputChange} />

            <div className='mt-3'>
                <div className='table'>
                    <div className='cell'>
                        <h2 className="table-heading" style={styles.cell}>First Name</h2>
                    </div>
                    <div className='cell'>
                        <h2 className="table-heading" style={styles.cell}>Last Name</h2>
                    </div>
                    <div className='cell'>
                        <h2 className="table-heading" style={styles.cell}>Company</h2>
                    </div>
                    <div className='cell'>
                        <h2 className="table-heading" style={styles.cell}>Email</h2>
                    </div>
                    <div className='cell'>
                        <h2 className="table-heading" style={styles.cell}>Delete</h2>
                    </div>
                    <EmpTable employee={employees} deleteEmployee={(e) => deleteEmployee(e)} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ViewEmployees;