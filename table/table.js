"use strict";

const popUpId = document.getElementById("popUp");

const favDialog = document.getElementById("favDialog");

let popUp = () => {
    if (typeof favDialog.showModal === "function") {
        favDialog.showModal();
    } else {
        alert("브라우저만 지원함");
    }
};

class Table {
    container = document.getElementById("container");

    tableRef = document.createElement("table");
    thRef = document.createElement("th");
    tdRef = document.createElement("td");
    trRef = this.tableRef.insertRow(-1);

    boards = [];
    cols = [];
    categorys = [];

    constructor(data) {
        this.boards = data.boards;
        this.cols = data.cols;
        this.categorys = data.categorys;

        this.init();
    }

    init(isReload = false) {
        if(isReload) {
            this.container.removeChild(document.getElementById(`booksTable`));
        }
        
        this.tableRef.setAttribute("id", `booksTable`);

        this.createHeader();
        this.createBody();
        this.newLineRow();
        this.container.appendChild(this.tableRef);
    }

    createHeader() {
        // 테이블 header set
        this.boards.forEach((board, idx) => {
            for (let key in this.boards[idx]) {
                if (this.cols.indexOf(key) === -1) {
                    this.cols.push(key);
                }
            }
        });

        this.cols.forEach((col) => {
            this.trRef.innerHTML += `<th>${col}</th>`;
        });
    }

    createBody() {
        for (let i = 0, cnt = this.boards.length; i < cnt; i++) {
            this.trRef = this.tableRef.insertRow(-1);

            for (let j = 0, cnt = this.cols.length; j < cnt; j++) {
                let tabCell = this.trRef.insertCell(-1);
                tabCell.innerHTML = this.boards[i][this.cols[j]];
            }

            this.tdRef = document.createElement("td");

            // 취소
            this.trRef.appendChild(this.tdRef);
            let lblCancel = document.createElement("label");
            lblCancel.innerHTML = "✖";
            lblCancel.setAttribute("onclick", "cancel()");
            lblCancel.setAttribute("style", "display:none;");
            lblCancel.setAttribute("title", "Cancel");
            lblCancel.setAttribute("id", "lbl" + i);
            lblCancel.addEventListener('click', this.cancel);
            this.tdRef.appendChild(lblCancel);

            // 저장
            this.trRef.appendChild(this.tdRef);
            let btSave = document.createElement("input");

            btSave.setAttribute("type", "button");
            btSave.setAttribute("value", "Save");
            btSave.setAttribute("id", "Save" + i);
            btSave.setAttribute("style", "display:none;");
            btSave.addEventListener('click', this.save);
            this.tdRef.appendChild(btSave);

            // 수정
            this.trRef.appendChild(this.tdRef);
            let btUpdate = document.createElement("input");

            btUpdate.setAttribute("type", "button");
            btUpdate.setAttribute("value", "Update");
            btUpdate.setAttribute("id", "Edit" + i);
            btUpdate.setAttribute("style", "background-color:#44CCEB;");
            btUpdate.addEventListener('click', this.update);
            this.tdRef.appendChild(btUpdate);

            // 삭제
            this.tdRef = document.createElement("td");
            this.trRef.appendChild(this.tdRef);
            let btDelete = document.createElement("input");
            btDelete.setAttribute("type", "button");
            btDelete.setAttribute("value", "Delete");
            btDelete.setAttribute("style", "background-color:#ED5650;");
            btDelete.addEventListener('click', this.remove);
            this.tdRef.appendChild(btDelete);
        }
    }

    newLineRow() {
        let newTr = this.tableRef.insertRow(-1);

        this.cols.forEach((col, idx) => {
            let newRow = newTr.insertCell(-1);

            if (idx >= 1) {
                if (idx == 2) {
                    let select = document.createElement("select");
                    select.innerHTML = '<option value=""></option>';
                    this.categorys.forEach((category) => {
                        select.innerHTML += `<option value=${category}>${category}</option>`;
                    });

                    newRow.appendChild(select);
                } else {
                    let tBox = document.createElement("input");
                    tBox.setAttribute("type", "text");
                    tBox.setAttribute("value", "");
                    // tBox.onclick = this.createNew();
                    newRow.appendChild(tBox);
                }
            }
        });

        this.tdRef = document.createElement("td");
        newTr.appendChild(this.tdRef);

        let btNew = document.createElement("input");
        btNew.setAttribute("type", "button");
        btNew.setAttribute("value", "Create");
        // btNew.setAttribute("id", "New" + i);
        btNew.setAttribute("id", "New");
        btNew.setAttribute("style", "background-color:#207DD1;");
        btNew.addEventListener('click', this.create);

        this.tdRef.appendChild(btNew);
    }

    // 클릭 이벤트에 해당하는 this는 현재 input값을 가리킨다.
    // DOM refresh는 어떻게하지...?

    cancel() {
        console.log("cancel");
    }
    
    save() {
        console.log("save");
    }
    
    update() {
        console.log("update");
    }
    
    remove() {
        console.log("remove", this);

        let activeRow = this.parentNode.parentNode.rowIndex;
        data.boards.splice((activeRow - 1), 1);
        table.init(true);
    }
    
    create() {
        console.log("create");
    }
}

class Data {
    boards = [
        {
            idx: "1",
            title: "하이",
            category: "유형1",
            money: 1000,
        },
        {
            idx: "2",
            title: "제목1",
            category: "유형2",
            money: 2000,
        },
        {
            idx: "3",
            title: "제목2",
            category: "유형3",
            money: 5000,
        },
    ];

    categorys = ["유형1", "유형2", "유형3", "유형4"];

    cols = [];
}

const data = new Data();
const table = new Table(data);
