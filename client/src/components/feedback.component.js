import React from 'react'



export default function FeedbackComponent() {
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2>
                        Thanks for your feedback! 🔄️
                    </h2>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSdj_ExrtqMHOT7Gjw4BlACxfbWxsz4batcraFiOomAWrkaejg/viewform?embedded=true"
                        width="640" height="1058" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
                </div>
            </div>
        </div>
    )
}