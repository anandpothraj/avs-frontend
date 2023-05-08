import React from 'react';
import FailImg from '../../assets/img/Fail.png';
import { Image , Button } from 'react-bootstrap';

 const Fail = (props) =>  {

    const reload = () => {
        window.location.reload();
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-3">
                    <Image className="fit-image SuccessImg" src={FailImg} fluid  />
                </div>
            </div> 
            <br/>
            <div className="row justify-content-center">
                <div className="col-7 text-center"> 
                    <h5>{props.error}</h5>
                    <div className="buttonContainer">
                        <Button className="btn-danger" onClick={reload}>
                            Try again
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Fail;