var data = [];
function update(obj) {
    data.push(obj);
    React.render(
        <List/>,
        document.getElementById('left')
    );
}
function selected(obj) {
    React.render(
        <Detail data={obj}/>,
        document.getElementById('right')
    );
}