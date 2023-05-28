import {useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import {ThreeDots} from 'react-loader-spinner'

import Table from '../Table'

import "react-toggle/style.css" 
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const Home = () => {
    const [showActiveEmployees, setShowActiveEmployees] = useState(true)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [employeesData, setEmployeesData] = useState([])

    useEffect(() => {
        const getEmployeesData = async() => {
            
            try {
                setApiStatus(apiStatusConstants.inProgress)
                const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
                const apiUrl = "https://testsyncoffice.netlify.app/.netlify/functions/api/getEmployeesData"
                const options = {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
                const response = await fetch(corsAnywhereUrl+apiUrl, options);
                const fetchedData = await response.json();
                const updatedData = fetchedData.employeeData
                setEmployeesData(updatedData);
                setApiStatus(apiStatusConstants.success)

            } catch (error) {
                console.log(error)
                setApiStatus(apiStatusConstants.failure)
            }
        }

        getEmployeesData()
    }, [])

    const renderSuccessView = () => (
        <div className='table-container'>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Status</th>
                </tr>
                {showActiveEmployees? employeesData.filter(eachEmployee => eachEmployee.status==='Active').map(eachEmployee => (
                    <Table key={eachEmployee.id} employeeDetails={eachEmployee} />
                )) : 
                employeesData.filter(eachEmployee => eachEmployee.status==='Inactive').map(eachEmployee => (
                    <Table key={eachEmployee.id} employeeDetails={eachEmployee} />
                ))
                }
            </table>
        </div>
    )

    const renderLoadingView = () => (
        <div className="loader-container">
          <ThreeDots color="#6ec1e4" height="80" width="80" />
        </div>
    )

    const renderFailureView =() => (
        <div className='failure-view'>
            <h1 className="failure-view-text">Check Your Connection</h1>
        </div>
    )

    const renderEmployeesList = () => {
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderSuccessView()
          case apiStatusConstants.failure:
            return renderFailureView()
          case apiStatusConstants.inProgress:
            return renderLoadingView()
          default:
            return null
        }
      }

    return (
        <div className='home-container'>
            <div className='home-header-container'>
                <p className='home-header-container-title'>Employees</p>
                <div className='toggle-container'>
                    <span>InActive</span>
                    <Toggle
                        className='toggle'
                        checked={showActiveEmployees}
                        icons={false}
                        onChange={() => {
                            setShowActiveEmployees(prevState => !prevState)
                        }} />
                    <span>Active</span>
                </div>
            </div>
            {renderEmployeesList()}
        </div>
    )
}

export default Home