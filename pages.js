class Pages{
    static getWalletConnectionPage(hasConnectedSuccessfully){
        bgColor = 'salmon';
        title = 'Wallet Connection Failed!';
        message = 'Please make sure you complete the wallet connection process';
        if (hasConnectedSuccessfully) {
            bgColor = 'lightgreen';
            title = 'Wallet Connection Successful!';
            message = 'Please open the app to complete the transaction.';
        }
        return `
        <html>
            <head>
                <style>
                :root {
                    --black: #282828;
                    --point: ` + bgColor + `;
                    --point-light: lighten(var(--point), 5%);
                    --ratio: 1.618;
                    --card_width: 250px;
                    --card_height: var(--card_width) * var(--ratio);
                    --card_padding: 20px;
                    --card-bgcolor: white;
                    --card_margin: 5px;
                    --card_round: 10px;
                    --card-shadow: -20px -20px 0px 0px var(--point-light);
                    --card-padding-basis: 15px;
                    --card_head_padding: 0px 0px var(--card-padding-basis) 0px;
                }
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                body {
                    background-color: var(--point);
                }

                .container {
                    width: 80%;
                    min-height: 100vh;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;

                    margin-left: auto;
                    margin-right: auto;
                }

                .center {
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                }

                .card {
                    background-color: var(--card-bgcolor);
                    width: var(--card_width);
                    min-height: var(--card_height);

                    display: -webkit-box;

                    display: -ms-flexbox;

                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    padding: var(--card_padding);
                    margin: var(--card_margin);

                    -webkit-box-shadow: var(--card-shadow);

                    box-shadow: var(--card-shadow);
                    border-radius: var(--card_round);

                    -webkit-animation-name: shadow-show;
                    /* Safari 4.0 - 8.0 */
                    -webkit-animation-duration: 1.5s;
                    /* Safari 4.0 - 8.0 */
                    animation-name: shadow-show;
                    animation-duration: 1.5s;

                    -webkit-transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
                    -o-transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
                    transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
                }

                h1,
                h2,
                h3,
                h4,
                h5 {
                    margin: 0px;
                    padding: var(--card_head_padding);
                    font-family: 'Noto Sans KR', sans-serif;
                    font-size: 30px;
                    color: var(--black);
                }

                p {
                    margin: --card-padding-basis 0px 0px 0px;
                    font-family: 'Noto Sans KR', sans-serif;
                    font-weight: 100;
                    letter-spacing: -0.25px;
                    line-height: 1.25;
                    font-size: 16px;
                    color: --black;

                    -webkit-animation-name: p-show;
                    /* Safari 4.0 - 8.0 */
                    -webkit-animation-duration: 1.5s;
                    /* Safari 4.0 - 8.0 */
                    animation-name: p-show;
                    animation-duration: 1.5s;
                }

                hr {
                    display: block;
                    border: none;
                    height: 3px;
                    background-color: --point;
                    margin: 0px;

                    -webkit-animation-name: line-show;
                    /* Safari 4.0 - 8.0 */
                    -webkit-animation-duration: 0.3s;
                    /* Safari 4.0 - 8.0 */
                    animation-name: line-show;
                    animation-duration: 0.3s;
                    -webkit-transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
                    -o-transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
                    transition-timing-function: cubic-bezier(0.795, 0.000, 0.165, 1.000);
                    /* custom */
                }

                /* Safari 4.0 - 8.0 */
                @-webkit-keyframes line-show {
                    from {
                    margin: 0px 100px;
                    }

                    to {
                    margin: 0px;
                    }
                }

                /* Standard syntax */
                @keyframes line-show {
                    from {
                    margin: 0px 100px;
                    }

                    to {
                    margin: 0px;
                    }
                }

                /* Safari 4.0 - 8.0 */
                @-webkit-keyframes p-show {
                    from {
                    color: white;
                    }

                    to {
                    color: --black;
                    }
                }

                /* Standard syntax */
                @keyframes p-show {
                    from {
                    color: white;
                    }

                    to {
                    color: --black;
                    }
                }

                /* Safari 4.0 - 8.0 */
                @-webkit-keyframes shadow-show {
                    from {
                    -webkit-box-shadow: 0px 0px 0px 0px #e0e0e0;
                    box-shadow: 0px 0px 0px 0px #e0e0e0;
                    }

                    to {
                    -webkit-box-shadow: --card-shadow;
                    box-shadow: --card-shadow;
                    }
                }

                /* Standard syntax */
                @keyframes shadow-show {
                    from {
                    -webkit-box-shadow: 0px 0px 0px 0px #e0e0e0;
                    box-shadow: 0px 0px 0px 0px #e0e0e0;
                    }

                    to {
                    -webkit-box-shadow: --card-shadow;
                    box-shadow: --card-shadow;
                    }
                }
                </style>
            </head>
            <div class="container center">
                <div class="card">
                <h2>` + title + `</h2>
                <hr />
                <p` + message + `
                </p>
                </div>
            </div>

            </html>
        `;
    }
}