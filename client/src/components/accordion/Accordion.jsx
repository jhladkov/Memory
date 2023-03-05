import React, {useState} from 'react';
import './accordion.scss'
import AddIcon from "../../assets/icons/AddIcon";
import Arrow from "../../assets/icons/Arrow";
import {useLocation, useNavigate} from "react-router-dom";

const initData = {
    id: 131231232,
    title: 'Collections',
    body: [{id: 343234, title: 'First el', data: 'some text'}]
}
const Accordion = ({data = initData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        console.log(location)
        if (!isOpen) {
            navigate(`/${data.title}`)
        }
        setIsOpen(!isOpen)
    }

    return (
        <section className='section accordion' onClick={handleClick}>
            <div className="accordion__header">
                <h4 className='accordion__title'>{data.title}</h4>
                <div className="accordion__wrapper">
                    <svg viewBox="0 0 24 24">
                        <AddIcon/>
                    </svg>
                    <svg viewBox="0 0 24 24">
                        <Arrow/>
                    </svg>
                </div>
            </div>
            <div className={`accordion__content content ${!isOpen ? 'closed' : 'open'}`}>
                <h4 className='content__title'>{data.title}</h4>
            </div>
        </section>
    );
};

export default Accordion;