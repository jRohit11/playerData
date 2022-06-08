import React, { useState,useEffect } from "react";
import axios from "axios"; 
import { Button, Row } from 'react-bootstrap';
import ClickableRowTable from "react-clickable-row-table";

function Players() {

    

    const[tennisPlayers,setTennisPlayers] = useState([]);
    const[pageNo,setPageNo] = useState(1);
    const[pageSize,setPageSize] = useState(10);
    const[sortField,setSortField] = useState("name");
    const[sortDirection,setSortDirection] = useState("asc");
    const[totalElements,setTotalElements] = useState();
    const[totalPages,setTotalPages] = useState();
    const[sortToggle,setSortToggle]= useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/page?pageNo="+pageNo+"&pageSize="+pageSize+"&sortField="+sortField+"&sortDirection="+sortDirection)
        .then((response)=> response.data)
        .then((data)=>{
            setTennisPlayers(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
            
        })
    },[pageNo])

    const showPrev = () => setPageNo(prevPageNo => prevPageNo-1);
    const showNext = () => setPageNo(prevPageNo => prevPageNo+1);
    
    const showFirst = () => setPageNo(1);
    const showLast = () => setPageNo(totalPages);
    

 
    
  
    return(
        <div>
            
            <h1 className="text-center mt-5 ">List of Players</h1>
            <div className="container mt-5">
                < table className="table table-bordered border-info shadow">
                    <thead>
                        <tr >

                            <th >Name</th>
                            <th >Ranking</th>
                            <th >DOB</th>
                            <th >Points</th>
                            </tr>
                    </thead>
                    <tbody>
                        {tennisPlayers.length===0?
                            <tr align="center"><td colSpan="5">No Record Found</td></tr>:
                            tennisPlayers.map(
                                (tennisPlayers,index) =>(
                                    
                                    <tr key = {tennisPlayers.id}>
                                            
                                            <td>{tennisPlayers.name}</td>
                                            <td>{tennisPlayers.playerRanking}</td>
                                            <td>{tennisPlayers.dateOfBirth}</td>
                                            <td>{tennisPlayers.points}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <table className="table">
                    <div style={{float:'left',fontFamily: 'monospace',color: '#0275d8'}}>
                        Page {pageNo} of {pageSize}
                    </div>
                    <div style={{float:'right'}}>
                    <div class="clearfix"></div>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a type="button" class="page-link"  disabled={pageNo===1?true:false} onClick={showPrev} >Previous</a></li>
                        <li class="page-item"><a type="button" class="page-link"  disabled={pageNo===1?true:false } onClick={showFirst}>First</a></li>
                        <li class="page-item"><a type="button" class="page-link"  disabled={pageNo===totalPages?true:false } onClick={showNext}>Next</a></li>
                        <li class="page-item"><a type="button" class="page-link"  disabled={pageNo===totalPages?true:false} onClick={showLast}>Last</a></li>
                    </ul>
                    </nav>
                    </div>
                </table> 
            </div>
        </div>
    );
}
export default Players;