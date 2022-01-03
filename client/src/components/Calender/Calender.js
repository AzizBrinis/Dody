import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Button, Page, localeAr } from '@mobiscroll/react';

function Calender(props) {
    const [openPicker, setOpenPicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    
    const show = () => {
        setOpenPicker(true);
    };
    
    const onClose = () => {
        setOpenPicker(false);
    };
    
    const inputProps = {
        className: 'md-mobile-picker-input',
        placeholder: 'Please Select...'
    };
    
    const boxInputProps = {
        className: 'md-mobile-picker-box-label',
        inputStyle: 'box',
        placeholder: 'Please Select...'
    };
    const handledates = (e) => {
        if (e.value[0] && e.value[1]) {
        const date1 = new Date(e.value[1]);
        const date2 = new Date(e.value[0]);
        props.getDates((date1 - date2)/86400000)

    }else{
        props.getDates(0)
    }

    }
    
    return (
        <Page>
            <div className="md-mobile-picker-inline">
                <Datepicker returnFormat="iso8601" display="inline" controls={['calendar']} select="range" min={date} max={"2023-01-01"} onChange={(e) => handledates(e)} invalid={props.invalid}  />
            </div>
        </Page>
    ); 
}


export default Calender;