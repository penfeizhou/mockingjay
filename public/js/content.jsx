var data = [];

var indexOf = function (obj) {
    if (!obj) {
        return -1;
    }
    for (var i = 0; i < data.length; i++) {
        if (obj.uuid && obj.uuid == data[i].uuid) {
            return i;
        }
    }
    return -1;
};
function update(obj) {
    if (obj) {
        var index = indexOf(obj);
        if (index < 0) {
            data.push(obj);
        } else {
            data.splice(index, 1, obj);
        }
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

function clearData() {
    if (data) {
        data.length = 0;
    }
    if (update) {
        update();
    }
}
React.render(
    <div>
        <h1>Mocking Joy</h1>
        <a id='clear'>Clear</a>
    </div>,
    document.getElementById('toolbar')
);
document.getElementById("clear").addEventListener("click", clearData);