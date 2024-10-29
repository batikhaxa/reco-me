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
                        height="70" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>tanaka-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text mu-5">Recommendention text </p>
                                <label className="card-category mb-3"><i class="bi bi-tv"></i>ANIME</label>
                                
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
                        height="70" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>b-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3"><i class="bi bi-tv"></i>ANIME</label>
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
                        height="70" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>c-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
                                    <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z"/>
                                     <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27"/>
                                     </svg> game</label>
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
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-body">
                            <div className='d-flex gap-2'>
                            <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                        height="70" className="rounded-circle me-2" />
                                <h5 className="card-title"><b>d-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3"><i class="bi bi-film"></i>SF</label>
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
