// src/components/Main.js
import React from 'react';

const Main = () => {
    return (

        
        <div className="container">
             <div className="scrollable-container pt-4" data-bs-spy="scroll" data-bs-offset="0" tabindex="0" style={{ width:"1200px",height: "700px", overflowY: "auto"}}>
           
            <div className="Line1"></div>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center">

                        <div className="card" style={{ width: "28rem", height:"17rem" }}>

                            <div className="card-body">
                                <div className='d-flex align-items-center gap-2'>
                                    <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                                        height="70" className="rounded-circle me-2" />
                                    <h5 className="card-title"><b>tanaka-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text mu-5">Recommendention text </p>


                                <label className="card-category d-inline-flex mb-1"><i class="bi bi-tv"></i>anime</label>




                                <div className='d-flex flex-row-reverse' >

                                    <a href="/comments" className='link-icon'>
                                        <i ><svg xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="black"
                                            class="bi bi-chat-dots"
                                            viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                        </svg></i>


                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="d-flex justify-content-center">
                        <div className="card" style={{ width: "28rem", height:"17rem" }}>
                            <div className="card-body">

                                <div className='d-flex gap-2'>
                                    <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                                        height="70" className="rounded-circle me-2" />
                                    <h5 className="card-title"><b>b-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category d-inline-flex mb-1"><i class="bi bi-tv"></i>anime</label>
                                <div className='d-flex flex-row-reverse'>


                                    <a href="/comments" className='link-icon'>
                                        <i ><svg xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="black"
                                            class="bi bi-chat-dots"
                                            viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                        </svg></i>


                                    </a>
                                </div>






                            </div>
                        </div>
                    </div>
                </div>

                <div className="col d-none d-sm-block d-sm-none d-md-block ">
                    <div className="freind_friends">
                        <div className="d-flex  justify-content-right col col-row-3">
                            <div className="card" style={{ width: "25rem", maxHeight: "24rem" }}>
                                <div className="card-body d-flex flex-column">
                                    <div className='d-flex gap-2'>
                                        <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="50"
                                            height="50" className="rounded-circle me-2" />
                                        <h5 className="card-title"><b>c-san</b> is recommending <b>Undertale</b></h5>
                                    </div>
                                    <div className="position-relative " style={{ paddingBottom: "1.5rem" }}>
                                        <p className="card-text">Have you played this one? the story was heartwarming and got a lot of
                                            cute soundtracks.Plus, it is on sale rn on stream. Check that out! </p>
                                        <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1"><i class="bi bi-controller"></i> game</label>

                                 
                                    <div className='d-flex flex-wrap justify-content-end '>


                                        <a href="/comments" className='link-icon'>


                                            <i ><svg xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="30"
                                                fill="black"
                                                class="bi bi-chat-dots"
                                                viewBox="0 0 16 16">
                                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                            </svg></i>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <br />


                        <div className="card" style={{ width: "25rem", maxHeight: "20rem" }}>
                            <div className="card-body d-flex flex-wrap">
                                <div className='d-flex gap-2'>
                                    <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="50"
                                        height="50" className="rounded-circle me-2" />
                                    <h5 className="card-title"><b>c-san</b> is recommending<b> Hayday</b></h5>
                                </div>
                                <div className="content-wrapper" style={{ paddingBottom: "1.5rem" }}>
                                    <p className="card-text">hope you download it.
                                        Then we can share some materials. </p>

                                    <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1 "> <i class="bi bi-controller"></i> game</label>
                                </div>

                                <div className='d-flex justify-content-end ms-auto'>


                                    <a href="/comments" className='link-icon'>


                                        <i ><svg xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="black"
                                            class="bi bi-chat-dots"
                                            viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                        </svg></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <br />



                    <div className="d-flex justify-content-right">
                        <div className="card" style={{ width: "25rem", maxHeight: "12rem" }}>
                            <div className="card-body">
                                <div className='d-flex gap-2'>
                                    <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="50"
                                        height="50" className="rounded-circle me-2" />
                                    <h5 className="card-title"><b>d-san</b> is recommending <b>top gun</b></h5>
                                </div>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1"><i class="bi bi-film"></i>SF</label>
                                <div className='d-flex flex-row-reverse'>


                                    <a href="/comments" className='link-icon' >
                                        <i ><svg xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="black"
                                            class="bi bi-chat-dots"
                                            viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                        </svg></i>


                                    </a>
                                </div>

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
