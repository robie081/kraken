
function kraken() {

    async function fetchTrades() {

        const response = await fetch('https://api.kraken.com/0/public/Trades?pair=XMR/USD&count=10');
        const data = await response.json();
        // console.log(data.result);
        const trades = data.result['XMR/USD'];
        // console.log(trades);

        let tradeDetails = trades.map(trade => {
            return {
                price: parseFloat(trade[0]).toFixed(2),
                amount: parseFloat(trade[1]).toFixed(3),
                value: (parseFloat(trade[0]).toFixed(2) * parseFloat(trade[1])).toFixed(2)
            }
        });

        tradeDetails = tradeDetails.reverse();

        // console.log(tradeDetails);

        // Compile Handlebars template

        const source = document.getElementById('trade-template').innerHTML;
        const template = Handlebars.compile(source);
        const context = { selectedTrades: tradeDetails };
        // console.log(context);

        // Render the table body with the template
        document.getElementById('table-body').innerHTML = template(context);
    }

    fetchTrades();
    setInterval(fetchTrades, 10000);
}

kraken();