import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import Card from '../Card'

import './index.css';

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const Category = () => {
    const [category, setCategory] = useState("department");
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial) 
    const [departmentData, setDepartmentData] = useState([]);
    const [designationData, setDesignationData] = useState([]);

    useEffect(() => {
        const getDepartmentData = async () => {
            try {
                setApiStatus(apiStatusConstants.inProgress)
                const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
                const apiUrl = "https://testsyncoffice.netlify.app/.netlify/functions/api/getDepartmentData"
                const options = {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
                const response = await fetch(corsAnywhereUrl+apiUrl, options);
                const fetchedData = await response.json();
                const updatedData = fetchedData.departmentData
                setDepartmentData(updatedData);
                setApiStatus(apiStatusConstants.success)
                
            } catch (error) {
                setApiStatus(apiStatusConstants.failure)
            }
        };

        const getDesignationData = async () => {
            try {
                const options = {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
                const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
                const apiUrl = 'https://testsyncoffice.netlify.app/.netlify/functions/api/getDesignationData';
                const response = await fetch(corsAnywhereUrl + apiUrl, options)
                const fetchedData = await response.json();
                const updatedData = fetchedData.designationData
                console.log(updatedData)
                setDesignationData(updatedData);
            
            } catch (error) {
                console.log("Error fetching designation data:", error);
            }
        };

        getDepartmentData();
        getDesignationData();
    }, []);

    
    const onClickDepartment = () => {
        setCategory("department");
    };

    const onClickDesignation = () => {
        setCategory("designation");
    };

    const renderSuccessView =() => (
        <div className="cards-container">
            {category === "department" ? (
                departmentData.map(eachDepartment => (
                    <Card key={eachDepartment.id} details={eachDepartment} />
                ))
            ) : (
                designationData.map(eachDesignation => (
                    <Card key={eachDesignation.id} details={eachDesignation} />
                ))
            )}
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

    const renderCardsContainer = () => {
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
        <div className="category-container">
            <div className="tabs-container">
                <button
                    type="button"
                    onClick={onClickDepartment}
                    className={`tab-button ${category === "department" ? "active-tab-button" : null}`}
                >
                    Department
                </button>
                <button
                    type="button"
                    onClick={onClickDesignation}
                    className={`tab-button ${category === "designation" ? "active-tab-button" : null}`}
                >
                    Designation
                </button>
            </div>
            <hr className="horizontal-line" />
            {renderCardsContainer()}
        </div>
    );
};

export default Category;
