import { useEffect, useState } from "react";
import React from "react";


const MoviesList=()=>{
    const [start, setstart] = useState('');
    const [end, setend] = useState('');
    const [movies, setmovies] = useState([]);
    const [filtermovie, setfilter] = useState([]);

    const HandleSubmit=()=>{
         const filtered = movies.filter((item)=>{
            if(!start || !end){
                return true;
            }else{
                const released = new Date(item.Date);
                const Start = new Date(start);
                const End = new Date(end);
                return released >= Start && released <= End;
            }
         });
         setfilter(filtered);
         console.log(filtered);
    }

    const Getdata=()=>{
       fetch('https://raw.githubusercontent.com/gaddechiranjeevi/task/main/Movieslist.json')
       .then((Response) => Response.json())
       .then((data) =>{
         setmovies(data)
         setfilter(data)
       });
    };

    useEffect(()=>{
        Getdata();
    },[]);

    return(
        <div>
            <div>
            From <input type="date" value={start} onChange={(e)=>{setstart(e.target.value)}}/> To <input type="date" value={end} onChange={(e)=>{setend(e.target.value)}} />  <button onClick={HandleSubmit}>Submit</button>
            </div>
            <div>
                {
                    filtermovie.map((item)=>{
                        return(
                            <div className="card" key={item.Id}>
                            <div className='movie'>
                                <p>{item.Id}</p>
                                <p><img src={item.Image} alt={item.Name} width="150px" height="200px"/></p>
                                <p>{item.Rating}  Rate</p>
                                <p>{item.Name}</p>
                                <p>{item.Message}</p>
                                <p className='date'>{item.Date}</p>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
    
}

export default MoviesList;