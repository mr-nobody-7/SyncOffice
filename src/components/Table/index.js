import './index.css'

const Table = props => {
    const {employeeDetails} = props
    const {id, name, email, department, designamtion, status } = employeeDetails

    return(
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td><a href={`mailto:${email}`} className="email">{email}</a></td>
            <td>{department}</td>
            <td>{designamtion}</td>
            <td>{status}</td>
        </tr>
    )
}

export default Table