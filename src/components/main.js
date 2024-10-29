// src/components/Main.js
import React from 'react';

const Main = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p>friend</p>
                    <div className="d-flex justify-content-center">
                  
                        <div className="card" style={{ width: "30rem"}}>
                       
                            <div className="card-body">
                                <div className='d-flex align-items-center gap-2'>
                            <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                        height="50" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>tanaka-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text mu-5">Recommendention text </p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                
                                <div className='d-flex flex-row-reverse' >

                                
                                <a href="/comments" className='link-icon'>


                                 <i ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                                 </svg></i>
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                   
                    <br />
                    <div className="d-flex justify-content-center">
                        <div className="card" style={{ width: "30rem"}}>
                            <div className="card-body">
                            <div className='d-flex gap-2'>
                            <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                        height="50" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>b-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME</label>
                                <div className='d-flex flex-row-reverse'>

                                
                                <a href="/comments" className='link-icon' style={{backgroundcolor:"black"}}>
                                
                                
                                    <i ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                            </svg></i>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-none d-sm-block d-sm-none d-md-block">
                    <p>friend's friend</p>
                    <div className="d-flex justify-content-right">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                            <div className='d-flex gap-2'>
                            <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                        height="50" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>c-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                <div className='d-flex flex-row-reverse'>

                                
<a href="/comments" className='link-icon'>


    <i ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-chat" viewBox="0 0 16 16">
<path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
</svg></i>
</a>
</div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-right">
                        <div className="card" style={{ width: "25rem", height: "14rem" }}>
                            <div className="card-body">
                            <div className='d-flex gap-2'>
                            <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                        height="50" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>d-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                <div className='d-flex flex-row-reverse'>

                                
<a href="/comments" className='link-icon' >


    <i ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-chat" viewBox="0 0 16 16">
<path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
</svg></i>
</a>
</div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
