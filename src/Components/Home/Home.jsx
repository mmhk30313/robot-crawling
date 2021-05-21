import React from 'react';
import './Home.css';
const Home = ({links}) => {
    const handleInvokedOnce = (id)=>{
        console.log(id);
        document.getElementById("a-"+id).style.display = "none";
        document.getElementById("div-"+id).style.display = "block";
    }
    
    return (
        <div className="row justify-content-center">
            {
                links.length > 0 && links.map((link, idx) => <div key={link._id} onClick={() => handleInvokedOnce(link._id)} className="col-lg-2 col-md-3 col-sm-6 link">
                    {
                        idx === 0 
                        ?   <a href={`${link.href}`} id={`a-${link._id}`} className="card my-2 shadow pt-2 text-center text-decoration-none align-items-center" target="_blank" rel="noopener noreferrer">
                                <p>{link.href}</p>
                            </a>
                        :  <a href={`${link.href}`} id={`a-${link._id}`} className="card my-2 shadow pt-2 text-center text-decoration-none align-items-center" target="_blank" rel="noopener noreferrer">
                                <p>{link.text}</p>
                            </a> 
                    }
                    
                    <div id={`div-${link._id}`} className="card my-2 blur-unclick shadow pt-2 text-center text-decoration-none align-items-center" target="_blank" rel="noopener noreferrer">
                        <p className='text-light'>{link.text} is already seen</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Home;