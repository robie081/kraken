
// Separated in indexHandlebars.html and indexHandlebars.js
// Fifth -- Fourth with Handlebars
// Works with indexHandlebars

// function kraken() {

//     async function fetchTrades() {

//         const response = await fetch('https://api.kraken.com/0/public/Trades?pair=XMR/USD&count=10');
//         const data = await response.json();
//         // console.log(data.result);
//         const trades = data.result['XMR/USD'];
//         // console.log(trades);

//         let tradeDetails = trades.map(trade => {
//             return {
//                 price: parseFloat(trade[0]).toFixed(2),
//                 amount: parseFloat(trade[1]).toFixed(3),
//                 value: (parseFloat(trade[0]).toFixed(2) * parseFloat(trade[1])).toFixed(2)
//             }
//         });

//         tradeDetails = tradeDetails.reverse();

//         // console.log(tradeDetails);

//         // Compile Handlebars template

//         const source = document.getElementById('trade-template').innerHTML;
//         const template = Handlebars.compile(source);
//         const context = { selectedTrades: tradeDetails };
//         // console.log(context);

//         // Render the table body with the template
//         document.getElementById('table-body').innerHTML = template(context);
//     }

//     fetchTrades();
//     setInterval(fetchTrades, 10000);
// }

// kraken();



// Fourth -- create table dynamically, fetches only the last 10 trades, every 10 seconds
// Works with index.html

function kraken() {

    async function fetchTrades() {

        const response = await fetch('https://api.kraken.com/0/public/Trades?pair=XMR/USD&count=10');
        const data = await response.json();
        // console.log(data.result);
        const trades = data.result['XMR/USD'];
        // console.log(trades);

        let tradeDetails = trades.map(trade => {
            // const value = (parseFloat(trade[0]).toFixed(2) * parseFloat(trade[1])).toFixed(2);
            // const formattedValue = parseFloat(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // const formattedValue = parseFloat(value).toLocaleString();
            // console.log(formattedValue);
            return {
                price: parseFloat(trade[0]).toFixed(2),
                amount: parseFloat(trade[1]).toFixed(3),
                value: parseFloat((parseFloat(trade[0]).toFixed(2) * parseFloat(trade[1])).toFixed(2)).toLocaleString()
                // value: formattedValue
            }
        });

        tradeDetails = tradeDetails.reverse();

        // console.log(tradeDetails);

        const table = document.querySelector('.table');
        // console.log(table);

        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        function addRow(trade) {
            const tr = document.createElement('tr');

            const tdPrice = document.createElement('td');
            tdPrice.textContent = `${trade.price}`;

            const tdAmount = document.createElement('td');
            tdAmount.textContent = `${trade.amount}`;

            const tdValue = document.createElement('td');
            tdValue.textContent = `${trade.value}`;

            tr.appendChild(tdPrice);
            tr.appendChild(tdAmount);
            tr.appendChild(tdValue);

            tbody.appendChild(tr);
        }

        tradeDetails.forEach(addRow);
    }

    fetchTrades();
    setInterval(fetchTrades, 10000);
}

kraken();


// Third -- Not Iterate through the new trades and add them if they are unique

// function kraken() {

//     let lastTimestamp = null;
//     let allTrades = [];

//     async function fetchTrades() {
//         let url = 'https://api.kraken.com/0/public/Trades?pair=XMR/USD&count=100';
//         const response = await fetch(url);
//         // console.log(response);
//         const data = await response.json();
//         // console.log(data);
//         // console.log(data.result);

//         if (lastTimestamp) {
//             url += `since=${lastTimestamp}`;
//         }
//         // console.log(url);

//         // Extract the trades and the last timestamp
//         const trades = data.result["XMR/USD"];
//         // console.log(trades);
//         // console.log(trades.length);
//         // console.log(trades[trades.length - 1][0]);  // last trade
//         lastTimestamp = data.result["last"];
//         // console.log(lastTimestamp);

//         allTrades = [...allTrades, ...trades];
//         // console.log(allTrades);

//         // Keep only the last 10 trades
//         if (allTrades.length > 10) {
//             allTrades = allTrades.slice(-10);
//         }
//         // console.log(allTrades);

//         const tradeDetails = allTrades.map(trade => 
//             // console.log(trade);
//             ({
//                 price: parseFloat(trade[0]).toFixed(2),
//                 amount: parseFloat(trade[1]).toFixed(3),
//                 value: (parseFloat(trade[0]).toFixed(2) * parseFloat(trade[1])).toFixed(2)
//             }));
//         // console.log(tradeDetails);

//         // Render the trades in a 10 rows table

//         let output = '';

//         tradeDetails.forEach(trade => 
//             output += `<tr>
//                             <td>${trade.price}</td>
//                             <td>${trade.amount}</td>
//                             <td>${trade.value}</td>
//                        </tr>`);

//         document.querySelector('.table').innerHTML = `
//             <tr>
//                 <th scope="col">Price ($)</th>
//                 <th scope="col">Amount</th>
//                 <th scope="col">Value ($)</th>
//             </tr> 
//             ${output}
//         `;
//     }

//     fetchTrades();
//     setInterval(fetchTrades, 10000);
// }

// kraken();

// Second 

// function kraken() {

//     let lastTimestamp = null;
//     // let lastTimestamp = "1726042979835413793";
//     let allTrades = [];

//     async function fetchTrades() {

//         let url = 'https://api.kraken.com/0/public/Trades?pair=XMR/USD&count=100';
//         // let url = 'https://api.kraken.com/0/public/Trades?pair=XXBTZUSD&count=100';

//         // If a lastTimestamp exists, add it to the request URL as a query parameter
//         if (lastTimestamp) {
//             url += `&since=${lastTimestamp}`;
//         }
//         // console.log(url);

//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//         // console.log(data.result["XMR/USD"]);

//         // Extract the trades and the last timestamp
//         const trades = data.result["XMR/USD"];
//         // const trades = data.result["XXBTZUSD"];
//         lastTimestamp = data.result["last"];
//         // console.log(trades);

//         // console.log(allTrades);
//         // console.log(allTrades.length);

//         // Append the new trades to the allTrades array
//         // allTrades = [...allTrades, ...trades];

//         // Iterate through the new trades and add them if they are unique

//         trades.forEach(trade => {
//             // console.log(trade);
//             // console.log(trade[2]);

//             // Using the timestamp as a unique identifier (third element in the trade array)
//             const tradeId = trade[2];

//             const exists = allTrades.some(existingTrade => existingTrade[2] === tradeId);
//             // console.log(exists);
//             if (!exists) {
//                 allTrades.push(trade);
//             }
//             // console.log(allTrades);
//         });

//         // console.log(allTrades);

//         // Keep only the last 10 trades
//         if (allTrades.length > 10) {
//             allTrades = allTrades.slice(-10);
//         }

//         // Extract price and amount for each trade
//         const tradeDetails = allTrades.map(trade => {
//             const price = parseFloat(trade[0]).toFixed(2);
//             const amount = parseFloat(trade[1]).toFixed(4);
//             const value =  (price * amount).toFixed(2);
//             return { price, amount, value };
//         });

//         // console.log(tradeDetails);
//         // console.log(lastTimestamp);

//         // Render the last 10 trades in a list

//         // Clear the existing list
//         // let output = '';
        
//         // Render the last 10 trades as list items
//         // tradeDetails.forEach(trade => {
//         //     output += `<li>${trade.price}&nbsp;&nbsp;&nbsp;&nbsp;${trade.amount}&nbsp;&nbsp;&nbsp;&nbsp;${trade.value}$</li>`;
//         // });
//         // // console.log(output);
//         // // Update the HTML with the new list items
//         // document.querySelector('ul').innerHTML = output;
        
//         // Render the last 10 trades as table rows

//         // Clear the existing rows in the table (but keep the header)
//         let output = '';

//         tradeDetails.forEach(trade => {
//             output += `<tr>
//                             <td>${trade.price}</td><td>${trade.amount}</td><td>${trade.value}</td>
//                     </tr>`;
//         });

//         // console.log(output);

//         document.querySelector('.table').innerHTML = `
//                     <tr>
//                         <th scope="col">Price</th>
//                         <th scope="col">Amount</th>
//                         <th scope="col">Value ($)</th>
//                     </tr> 
//                     ${output}`;
//     }

//     fetchTrades();
//     setInterval(fetchTrades, 10000);

// }

// kraken();


// First

// async function kraken() {

//     const response = await fetch('https://api.kraken.com/0/public/Trades?pair=XMR/USD');
//     const data = await response.json();
//     // console.log(data);
//     // console.log(data.result["XMR/USD"][0][0], data.result["XMR/USD"][0][1]);

//     const trades = data.result["XMR/USD"];
//     // console.log(trades);

//     // for (let i = 0; i < 10; i++) {
//     //     // console.log(trades[i]);
//     //     console.log('random', trades[i][0], trades[i][1]);
//     // }

//     const last10Trades = trades.slice(-10);
//     // console.log(last10Trades);
//     // last10Trades.forEach(trade => console.log('last', trade[0], trade[1]));

//     // last10Trades.forEach(trade => {
//     //     const [price, amount] = trade;
//     //     // console.log({ price, amount});
//     //     console.log([price, amount]);
//     // });

//     const tradeDetails = last10Trades.map(trade => {
//         // console.log(trade);
//         // const [price, amount] = trade;
//         // console.log([price, amount]);
//         const [price, amount] = [Number(trade[0]).toFixed(2), Number(trade[1]).toFixed(4)];
//         // console.log([price, amount]);
//         // let price = Number(trade[0]).toFixed(2);
//         // let amount = Number(trade[1]).toFixed(4);
//         return { price, amount };
//     });

//     // console.log(tradeDetails);

//     let output = '';
//     tradeDetails.forEach(trade => {
//         // output += `
//         //     <p>${trade.price} ${trade.amount}</p>
//         // `
//         output += `<li>${trade.price}&nbsp;&nbsp;&nbsp;&nbsp;${trade.amount}</li>`;
//     });
//     // console.log(output);
//     document.querySelector('ul').innerHTML = output;
//     // document.querySelector('div').innerHTML = output;
//     // console.log(document.querySelector('ul'));
//     // console.log(document.querySelector('div'));

//     const lastTimeStamp = data.result["last"];
//     console.log(lastTimeStamp);
// }

// kraken();
