import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';


class Customers extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.loadCustomers();
  }
  
  // Load customers from REST API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json()) 
    .then((responseData) => { 
      this.setState({ 
        customers: responseData.content}); 
    })   
  }

  // Delete customer
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this customer?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',                            
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCustomers())
        .catch(err => console.error(err)) 

        toast.success("Delete succeed", {
          position: toast.POSITION.TOP_LEFT
        });        
      }
    })   
  }

  // Create new customer
  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers', 
    {   method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
    })
    .then(
      toast.success("New customer added!", {
        position: toast.POSITION.TOP_LEFT
      })         
    )
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

    // Update customer
  updateCustomer(customer, link) {
    fetch(link, 
    { method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer)
    })
    .then(
      toast.success("Information updated", {
        position: toast.POSITION.TOP_LEFT
      })         
    )
    .catch( err => console.error(err))
  }

     // Add new training to customer
     addTraining(training) {
      fetch('https://customerrest.herokuapp.com/api/trainings',
      { method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training)
      })
      .then(
        toast.success("Training added", {
          position: toast.POSITION.TOP_LEFT
        })         
      )
      .catch( err => console.error(err))
    }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}                
      />
    );
  }  

  render() {
    return (
      <div className="App-body">
        <div className="row">
          <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
        </div>
        <ReactTable data={this.state.customers}
        columns={[
            {
              columns: [
                {
                  accessor: "links[0].href",
                  show: false,
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 130,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<AddTraining addTraining={this.addTraining} loadCustomers={this.loadCustomers} customer={(value)} />)
                },
                {
                  Header: "First Name",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Last Name",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.renderEditable
                },
                {
                  Header: "E-mail",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value, row}) => (<button className="btn btn-default btn-basic" onClick={()=>{this.updateCustomer(row, value)}}>Save</button>)
                },              
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-danger" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }              
              ]
            }
          ]}
          filterable
          defaultPageSize={6}
          style={{margin: "0px 10px", height: "450px" }}
          className="-highlight" > 
        </ReactTable>
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default Customers;