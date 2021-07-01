let data = [];
let count = 0;

const text = document.querySelector(".text");
const add = document.querySelector(".add");
const list = document.querySelector(".list");
const filter = document.querySelector(".filter");
const totalList = document.querySelector(".totalList");
const incomplete = document.querySelector(".incomplete");
const complete = document.querySelector(".complete");
const dataNum = document.querySelector(".dataNum");
const clear = document.querySelector(".clear");
const form = document.querySelector(".form");

// data number
if (data.length == 0) {
    form.classList.add("d-none");
};

function nowTab() {
    if (totalList.getAttribute("class").includes("show")) {
        init();
    } else if (incomplete.getAttribute("class").includes("show")) {
        incompleteList();
    } else if (complete.getAttribute("class").includes("show")) {
        completeList();
    }
};

// incomplete data number
function incompleteDataNum() {
    data.forEach(function(item) {
        if (item.complete == "yes") {
            return;
        }
        count += 1;
    })
    dataNum.textContent = `${count} 個待完成項目`
    count = 0;
};

incompleteDataNum();

// initial
function init() {
    let str = ""

    data.forEach(function(item, index) {
        if (item.complete == "yes") {
            str += `<li><a href="#" class="check text-info mx-2"><i class="fas fa-check fa-fw text-lightblue700" data-check="check" data-num="${index}"></i></a><span class="text-gray800"><s class="text-gray">${item.name}</s></span><a href="#" class="delete me-2" data-num="${index}"><i class="fas fa-trash-alt" data-delete="delete"></i></a></li>`;
        } else {
            str += `<li><a href="#" class="check text-gray mx-2"><i class="far fa-square fa-fw" data-check="check" data-num="${index}"></i></a><span class="text-gray800">${item.name}</span><a href="#" class="delete me-2" data-num="${index}"><i class="fas fa-trash-alt" data-delete="delete"></i></a></li>`;
        }
    });
    incompleteDataNum();
    list.innerHTML = str;

};

// incomplete list
function incompleteList() {
    let str = "";

    data.forEach(function(item, index) {
        if (item.complete == "no") {
            str += `<li><a href="#" class="check text-gray mx-2"><i class="far fa-square fa-fw" data-check="check" data-num="${index}"></i></a><span class="text-gray800">${item.name}</span><a href="#" class="delete me-2" data-num="${index}"><i class="fas fa-trash-alt" data-delete="delete"></i></a></li>`;
        }
    });
    incompleteDataNum();
    list.innerHTML = str;
};

// complete list
function completeList() {
    let str = "";

    data.forEach(function(item, index) {
        if (item.complete == "yes") {
            str += `<li><a href="#" class="check text-info mx-2"><i class="fas fa-check fa-fw text-lightblue700" data-check="check" data-num="${index}"></i></a><span class="text-gray800"><s class="text-gray">${item.name}</s></span><a href="#" class="delete me-2" data-num="${index}"><i class="fas fa-trash-alt" data-delete="delete"></i></a></li>`;
        }
    });
    incompleteDataNum();
    list.innerHTML = str;
};

// tab all
function tabTotal() {
    if (totalList.getAttribute("class").includes("show")) {
        return;
    } else {
        incomplete.classList.remove("show");
        complete.classList.remove("show");
        totalList.classList.toggle("show");
    }
    init();
};

// tab incomplete
function tabIncomplete() {
    if (incomplete.getAttribute("class").includes("show")) {
        return;
    } else {
        totalList.classList.remove("show");
        complete.classList.remove("show");
        incomplete.classList.toggle("show");
    }
    incompleteList();
}

// tab complete
function tabComplete() {
    if (complete.getAttribute("class").includes("show")) {
        return;
    } else {
        totalList.classList.remove("show");
        incomplete.classList.remove("show");
        complete.classList.toggle("show");
    }
    completeList();
}

// judge tab
function judgeTab() {
    if (complete.getAttribute("class").includes("show")) {
        completeList();
    } else if (incomplete.getAttribute("class").includes("show")) {
        incompleteList();
    } else {
        init();
    }
}

// add
add.addEventListener("click", function(e) {
    if (text.value == "") {
        return;
    }
    form.classList.remove("d-none");
    let info = {
        name: "",
        complete: "no"
    };
    info.name = text.value;
    data.push(info);
    nowTab();
    text.value = "";
});

// filter
filter.addEventListener("click", function(e) {
    if (e.target.textContent == "進行中") {
        tabIncomplete();

    } else if (e.target.textContent == "已完成") {
        tabComplete();

    } else {
        tabTotal()

    }
});

// delete & state exchange
list.addEventListener("click", function(e) {
    let num = "";

    if (e.target.getAttribute("data-delete") == "delete") {
        num = e.target.getAttribute("data-num");
        data.splice(num, 1);
        init();
    }

    if (e.target.getAttribute("data-check") == "check") {
        let num = "";
        num = e.target.getAttribute("data-num");
        if (data[num].complete == "yes") {
            data[num].complete = "no";
            judgeTab()
        } else if (data[num].complete == "no") {
            data[num].complete = "yes";
            judgeTab()
        }
    }
});

// clear complete
clear.addEventListener("click", function(e) {
    let newData = [];
    data.forEach(function(item, index) {
        if (item.complete == "no") {
            newData.push(item);
        };
    });
    data = newData;
    init();
    nowTab();
})