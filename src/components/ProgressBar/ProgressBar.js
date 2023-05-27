import { Col } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Step } from '../../Context/Context';

const ProgressBar = ({noOfSteps, progressBarType, formClass }) => {

    const {step} = useContext(Step);

    return (
        <>
            <Col>
                <h5>Please follow the steps to {progressBarType}.</h5>
                <div className="progressBar">
                    <ul id="progressbar" className='p-0'>
                        {
                        (noOfSteps === 3)?(
                            <>
                                <li className={(step === 1)?`active ${formClass}`:`${formClass}`} id="one"></li>
                                <li className={(step === 2)?`active ${formClass}`:`${formClass}`} id="two"></li>
                                <li className={(step === 3)?`active ${formClass}`:`${formClass}`} id="three"></li>
                            </>
                            ):(
                                <>
                                    <li className={(step === 1)?`active ${formClass}`:`${formClass}`} id="one"></li>
                                    <li className={(step === 2)?`active ${formClass}`:`${formClass}`} id="two"></li>
                                    <li className={(step === 3)?`active ${formClass}`:`${formClass}`} id="three"></li>
                                    <li className={(step === 4)?`active ${formClass}`:`${formClass}`} id="four"></li>
                                    <li className={(step === 5)?`active ${formClass}`:`${formClass}`} id="five"></li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </Col>
        </>
    );
};

export default ProgressBar;