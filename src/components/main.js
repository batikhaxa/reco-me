// src/components/Main.js
import React from 'react';

const Main = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p>friend</p>
                    <div className="d-flex justify-content-center">
                        <div className="card" style={{ width: "30rem", height: "15rem" }}>
                            <div className="card-body">
<<<<<<< Updated upstream
=======
                                <div className='d-flex align-items-center gap-2'>
                            <img src="https://i.pinimg.com/736x/d1/51/47/d151474e2d22d12412425632275f6cff.jpg" alt="" width="70"
                        height="70" className="rounded-circle me-2" />
>>>>>>> Stashed changes
                                <h5 className="card-title"><b>tanaka-san</b> is recommending <b>top gun</b></h5>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                <a href="/settings" className="link-icon">
                                    <i className="bi bi-gear"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                        <div className="card" style={{ width: "30rem", height: "15rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">XXX person is Recommending</h5>
                                <h6 className="card-subtitle mb-2 text-muted">What thing</h6>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                <a href="/comments" className="card-link mb-3">COMMENTS</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-none d-sm-block d-sm-none d-md-block">
                    <p>friend's friend</p>
                    <div className="d-flex justify-content-right">
                        <div className="card" style={{ width: "25rem", height: "10rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">XXX person is Recommending</h5>
                                <h6 className="card-subtitle mb-2 text-muted">What thing</h6>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                <a href="/comments" className="card-link mb-3">COMMENTS</a>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-right">
                        <div className="card" style={{ width: "25rem", height: "10rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">XXX person is Recommending</h5>
                                <h6 className="card-subtitle mb-2 text-muted">What thing</h6>
                                <p className="card-text">Recommendention text</p>
                                <label className="card-category mb-3">ANIME SF etc</label>
                                <a href="/comments" className="card-link mb-3">COMMENTS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
