// src/components/Main.js
import React, { useState, useEffect } from 'react';

const Main = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Attempting to fetch user");
            try {
                const response = await fetch('/api/user');  // Only use the relative path
                const data = await response.json();  // This will parse the JSON response
                console.log('User data:', data);
                setUser(data);  // Update state with user data
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);
    return (
         <div className="scrollable-container m-4" data-bs-offset="0">
            <div className="container mt-4 mx-2 pt-1">
                <div className="Line1"></div>
                <div className="row">
                    <div className="col ms-5">
                        {/* Card 1 */}
                        <div className="d-flex justify-content-center">
                            <div className="card card-primary">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex gap-2">
                                        <img
                                            src="https://i.pinimg.com/736x/6b/46/30/6b46301a53a654d80e58f16234fd752b.jpg"
                                            alt=""
                                            width="70"
                                            height="70"
                                            className="rounded-circle me-2"
                                        />
                                        <h5 className="card-title">
                                            <b>{user ? user.user : 'Loading...'}</b> is recommending <b>『ストレンジャー・シングス』</b>
                                        </h5>
                                    </div>
                                    <div className="position-relative" style={{ padding: "1.5rem 0" }}>
                                        <p className="card-text">シーズン5がもうすぐ出るんだって！</p>
                                        <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1">
                                            <i className="bi bi-film"></i>ドラマ
                                        </label>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="/comments" className="link-icon">
                                                <i>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                        fill="black"
                                                        className="bi bi-chat-dots"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />

                        
                        <br />

                        {/* Card 2 */}
                        <div className="d-flex justify-content-center">
                            <div className="card card-primary">
                                <div className="card-body">
                                    <div className="d-flex gap-2">
                                        <img
                                            src="https://i.pinimg.com/736x/b7/a0/6b/b7a06b885290207e51688b77a1704d93.jpg"
                                            alt=""
                                            width="70"
                                            height="70"
                                            className="rounded-circle me-2"
                                        />
                                        <h5 className="card-title">
                                            <b>鈴木ちゃん</b> is recommending <b>ゼルダの伝説</b>
                                        </h5>
                                    </div>
                                    <div className="position-relative" style={{ padding: "1.5rem 0" }}>
                                        <p className="card-text">
                                            これ、めちゃくちゃ楽しいよ。オープンワールドが広大で、探索するものが山ほどある！『ブレス オブ ザ ワイルド』が好きなら、絶対ハマるはず。もう、本当にハイラルの世界にどっぷりハマっちゃうよ。
                                        </p>
                                        <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1">
                                            <i className="bi bi-controller"></i> ゲーム
                                        </label>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="/comments" className="link-icon">
                                                <i>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                        fill="black"
                                                        className="bi bi-chat-dots"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Friend's Friend Column */}
                    <div className="col d-none d-lg-block">
                        <div className="d-flex justify-content-end flex-column align-items-center gap-1">
                            {/* Card 3 */}
                            <div className="card card-secondary">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex gap-2">
                                        <img
                                            src="https://i.pinimg.com/736x/9e/7d/e1/9e7de1f500148992bb20a0ea81eb4352.jpg"
                                            alt=""
                                            width="70"
                                            height="70"
                                            className="rounded-circle me-2"
                                        />
                                        <h5 className="card-title">
                                            <b>オリビアさん</b> is recommending <b>アンダーテイル</b>
                                        </h5>
                                    </div>
                                    <div className="position-relative" style={{ padding: "1.5rem 0" }}>
                                        <p className="card-text">
                                            これプレイしたことある？ストーリーが心温まるし、かわいい音楽もたくさん入ってるよ。しかも今、Steamでセール中らしいから、ぜひ見てみて！
                                        </p>
                                        <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1">
                                            <i className="bi bi-controller"></i> ゲーム
                                        </label>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="/comments" className="link-icon">
                                                <i>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                        fill="black"
                                                        className="bi bi-chat-dots"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            {/* Card 5 */}
                            <div className="card card-secondary">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex gap-2">
                                        <img
                                            src="https://i.pinimg.com/736x/6c/fc/ae/6cfcae96b9b0d27c3061b276b0e42ef6.jpg"
                                            alt=""
                                            width="70"
                                            height="70"
                                            className="rounded-circle me-2"
                                        />
                                        <h5 className="card-title">
                                            <b>オンさん</b> is recommending <b>スパイファミリー</b>
                                        </h5>
                                    </div>
                                    <div className="position-relative" style={{ padding: "1.5rem 0" }}>
                                        <p className="card-text">
                                            笑えるし、心が温まるアニメなんだ。キャラクターがめっちゃ個性的で、あの偽の家族設定？最高すぎる。笑いたい時とか、ほっこりしたい時にぜひ見てみて！
                                        </p>
                                        <label className="card-category d-inline-flex mb-1 position-absolute start-0 bottom-1">
                                            <i className="bi bi-tv"></i> アニメ
                                        </label>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="/comments" className="link-icon">
                                                <i>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                        fill="black"
                                                        className="bi bi-chat-dots"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div> 

                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
