var data = [];

var indexOf = function (obj) {
    for (var i = 0; i < data.length; i++) {
        if (obj.uuid && obj.uuid == data[i].uuid) {
            return i;
        }
    }
    return -1;
};
function update(obj) {
    var index = indexOf(obj);
    if (index < 0) {
        data.push(obj);
    } else {
        data.splice(index, 1, obj);
    }
    React.render(
        <List/>,
        document.getElementById('left')
    );
}

function selected(obj) {
    React.render(
        <Detail className="detail" data={obj}/>,
        document.getElementById('right')
    );
}