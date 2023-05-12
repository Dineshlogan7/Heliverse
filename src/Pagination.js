import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import {Link} from "react-scroll";
import JsonData from "./heliverse_mock_data.json";
import "./pagination.css";

import Teams from "./Teams";
function Pagination() {
  const ref = useRef(null);
  const [todos, setTodos] = useState(JsonData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const todosPerPage = 20;
  const [carts, setCarts] = useState([]);
  

function handleTeam(){
  if(carts.length===0){
    alert("select team");
  }
}
  function handleClick(todo) {
    var count = 1;

    carts.map((cart) => {
      if (cart.domain === todo.domain) {
        count = 0;
        alert('two people of same domain cannot be in the same team');
      }
    })
    if (count === 1) {
      setCarts(current => [...current, todo]);
    }

  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }


  const todosData = useMemo(() => {
    let computedTodos = todos;

    if (searchTerm) {
      computedTodos = computedTodos.filter(
        todo =>
          todo.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCompleted === "Male") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Male" && todo.gender === 'Male'
      )
    }

    if (filterCompleted === "Female") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Female" && todo.gender === 'Female'
      )
    }
    /*************************/
    if (filterCompleted === "IT" && filterCompleted === "IT") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "IT" && todo.domain === 'IT'
      )
    }

    if (filterCompleted === "Sales") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Sales" && todo.domain === 'Sales'
      )
    }
    if (filterCompleted === "Finance") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Finance" && todo.domain === 'Finance'
      )
    }

    if (filterCompleted === "Management") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Management" && todo.domain === 'Management'
      )
    }
    if (filterCompleted === "UI Designing") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "UI Designing" && todo.domain === 'UI Designing'
      )
    }

    if (filterCompleted === "Marketing") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Marketing" && todo.domain === 'Marketing'
      )
    }
    if (filterCompleted === "Business Development") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "Business Development" && todo.domain === 'Business Development'
      )
    }
    if (filterCompleted === "true") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "true" && todo.available === true
      )
    }
    if (filterCompleted === "false") {
      computedTodos = computedTodos.filter(
        todo =>
          filterCompleted === "false" && todo.available === false
      )
    }


    setTotalTodos(computedTodos.length);

    //Current Page slice
    return computedTodos.slice(
      (currentPage - 1) * todosPerPage,
      (currentPage - 1) * todosPerPage + todosPerPage
    );
  }, [todos, currentPage, searchTerm, filterCompleted]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    setSearchTerm("");
    setFilterCompleted("");
    setCurrentPage(1);
  };
  return (
    <div className="container">
      <h3>Pagination and filters</h3>
      <div className="mb-3">
        <label htmlFor="search" className="form-label">
          Search
        </label>
        <input
          type="text"
          className=""
          id="search"
          placeholder="Search Title"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="">
        <label htmlFor="search" className="form-label">
          Gender
        </label>
        <select
          className=""
          value={filterCompleted}
          onChange={(e) => {
            setFilterCompleted(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option defaultValue=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="search" className="form-label">
          Domain
        </label>
        <select
          className="form-select"
          value={filterCompleted}
          onChange={(e) => {
            setFilterCompleted(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option defaultValue=""></option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Marketing">Marketing</option>
          <option value="Business Development">Business Development</option>
        </select>

        <label htmlFor="search" className="">
          Availablity
        </label>
        <select
          className=""
          value={filterCompleted}
          onChange={(e) => {
            setFilterCompleted(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option defaultValue=""></option>
          <option value="true">TRUE</option>
          <option value="false">False</option>
        </select>
      </div>
      <div className="">
        <button
          type="button"
          className=""
          onClick={resetFilter}
        >
          Reset Filters
        </button>
      </div>
      <div><button onClick={()=>handleTeam()}><Link  to="Teams" spy={true} smooth={true}>Team</Link></button>
      </div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <ul key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </ul>
          ))}
        </ul>
      </nav>
      {todosData
        .map((todo) => {
          return (
            <div className='parents-1'>
              <div>
                <img src={todo.avatar} alt={"company"} />
              </div>
              <div className='parents-2'>
                <h3 className='parents-3'>{todo.first_name} {todo.last_name}</h3>
                <h2 className='parents-4'>{todo.domain}</h2>
                <p className='parents-5'>
                  Email: {todo.email}
                </p>
                <div className='parents-7'>
                  <span className='parents-8'> {todo.gender} </span>
                  <div className="cart"><button onClick={() => handleClick(todo)}>+</button></div>
                </div>
              </div>
            </div>
          );
        })}
        <Teams carts={carts}/>
        </div>

  );
}
export default Pagination;
{/* <div key={todo.id} className="card margin-bottom">
<h5 className="card-header">
  <div className="card-header-flex">
    <span className="id">{`#${todo.id}`}</span>
  </div>
</h5>
<div className="card-body">
  <div className="card-text">
    <div className="card-body-flex">
      <span>{`Name: ${todo.first_name} `}</span>
      <span>{`: ${todo.email}`}</span>
    </div>
  </div>
</div>
</div> */}

// import "./App.css";
// import React, { useState,useEffect } from "react";
// import JsonData from "./heliverse_mock_data.json";
// import ReactPaginate from "react-paginate";

// function App() {
// //   let headers = new Headers();
// //   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// //   headers.append('Access-Control-Allow-Credentials', 'true');
// //   headers.append('Content-Type', 'application/json');
// //   headers.append('Accept', 'application/json');
// //   fetch("https://drive.google.com/file/d/1ibmr3WD7Jw6oLL6O_W390WojCLfCHw-k/view",{
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     credentials: 'include',
// // }).then((res) => res.json())
// //     .then((json) => {
// //         console.log("home data=",json);
// //     });

//   const [users, setUsers] = useState(JsonData);
//   const [pageNumber, setPageNumber] = useState(0);

//   const usersPerPage = 20;
//   const pagesVisited = pageNumber * usersPerPage;

//   const displayUsers = users
//     .slice(pagesVisited, pagesVisited + usersPerPage)
//     .map((user) => {
//       return (
//         <div className="user">
//           <h3>{user.first_name}</h3>
//           <h3>{user.last_name}</h3>
//           <h3>{user.email}</h3>
//           <img src={user.avatar}/>
//         </div>
//       );
//     });

//   const pageCount = Math.ceil(users.length / usersPerPage);

//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   return (
//     <div className="App">
//       {displayUsers}
//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         pageCount={pageCount}
//         onPageChange={changePage}
//         containerClassName={"paginationBttns"}
//         previousLinkClassName={"previousBttn"}
//         nextLinkClassName={"nextBttn"}
//         disabledClassName={"paginationDisabled"}
//         activeClassName={"paginationActive"}
//       />
//     </div>
//   );
// }

// export default App;


