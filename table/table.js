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

    boards = [];
    cols = [];
    categorys = [];
    data;

    constructor(data) {
        this.data = data;

        this.init();
    }

    init(isReload = false) {
        if(isReload) {
            this.container.removeChild(document.getElementById(`booksTable`));
            this.tableRef = undefined;
            this.tableRef = document.createElement("table");
        }
        
        this.tableRef.setAttribute("id", `booksTable`);

        this.boards = this.data.boards;
        this.categorys = this.data.categorys;

        this.createHeader();
        this.createBody();
        this.newLineRow();
        this.container.appendChild(this.tableRef);
    }

    createHeader() {
        let trRef = this.tableRef.insertRow(-1);

        // 테이블 header set
        this.boards.forEach((board, idx) => {
            for (let key in this.boards[idx]) {
                if (this.cols.indexOf(key) === -1) {
                    this.cols.push(key);
                }
            }
        });

        this.cols.forEach((col) => {
            trRef.innerHTML += `<th>${col}</th>`;
        });
    }

    createBody() {
        for (let i = 0, cnt = this.boards.length; i < cnt; i++) {
            let trRef = this.tableRef.insertRow(-1);

            for (let j = 0, cnt = this.cols.length; j < cnt; j++) {
                let tabCell = trRef.insertCell(-1);
                tabCell.innerHTML = this.boards[i][this.cols[j]];
            }

            let tdRef = document.createElement("td");

            // 취소
            trRef.appendChild(tdRef);
            let lblCancel = document.createElement("label");
            lblCancel.innerHTML = "✖";
            lblCancel.setAttribute("style", "display:none;");
            lblCancel.setAttribute("title", "Cancel");
            lblCancel.setAttribute("id", "lbl" + i);
            lblCancel.addEventListener('click', this.cancel);
            tdRef.appendChild(lblCancel);

            // 저장
            trRef.appendChild(tdRef);
            let btSave = document.createElement("input");

            btSave.setAttribute("type", "button");
            btSave.setAttribute("value", "Save");
            btSave.setAttribute("id", "Save" + i);
            btSave.setAttribute("style", "display:none;");
            btSave.addEventListener('click', this.save);
            trRef.appendChild(btSave);

            // 수정
            trRef.appendChild(tdRef);
            let btUpdate = document.createElement("input");

            btUpdate.setAttribute("type", "button");
            btUpdate.setAttribute("value", "Update");
            btUpdate.setAttribute("id", "Edit" + i);
            btUpdate.setAttribute("style", "background-color:#44CCEB;");
            btUpdate.addEventListener('click', this.update);
            tdRef.appendChild(btUpdate);

            // 삭제
            tdRef = document.createElement("td");
            trRef.appendChild(tdRef);
            let btDelete = document.createElement("input");
            btDelete.setAttribute("type", "button");
            btDelete.setAttribute("value", "Delete");
            btDelete.setAttribute("style", "background-color:#ED5650;");
            btDelete.addEventListener('click', this.remove);
            tdRef.appendChild(btDelete);
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
                    newRow.appendChild(tBox);
                }
            }
        });

        let tdRef = document.createElement("td");
        newTr.appendChild(tdRef);

        let btNew = document.createElement("input");
        btNew.setAttribute("type", "button");
        btNew.setAttribute("value", "Create");
        btNew.setAttribute("id", "New");
        btNew.setAttribute("style", "background-color:#207DD1;");
        btNew.addEventListener('click', this.create);

        tdRef.appendChild(btNew);
    }

    // 클릭 이벤트에 해당하는 this는 현재 input값을 가리킨다.
    cancel() {
        console.log("cancel");

        this.setAttribute('style', 'display:none; float:none;');

        let activeRow = this.parentNode.parentNode.rowIndex;

        let btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        let btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        let tab = document.getElementById('booksTable').rows[activeRow];

        table.cols.forEach((col, idx) => {
            let td = tab.getElementsByTagName("td")[idx];
            td.innerHTML = table.boards[(activeRow - 1)][col];
        })
    }
    
    save() {
        console.log("save");

        let activeRow = this.parentNode.rowIndex;
        let tab = document.getElementById('booksTable').rows[activeRow];

        table.cols.forEach((col, idx) => {
            let td = tab.getElementsByTagName("td")[idx];

            if(idx !== 0) {
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    data.boards[(activeRow - 1)][col] = td.childNodes[0].value; 
                }
            }
        })

        table.init(true);
    }
    
    update() {
        console.log("update");

        let activeRow = this.parentNode.parentNode.rowIndex;
        let tab = document.getElementById('booksTable').rows[activeRow];

        for(let idx = 0; idx < 4; idx++) {
            if (idx == 2) {
                let td = tab.getElementsByTagName("td")[idx];
                let ele = document.createElement('select');
                ele.innerHTML = `<option value="${td.innerText}">${td.innerText}</option>'`;
                data.categorys.forEach((categroy) => {
                    ele.innerHTML = `${ele.innerHTML}<option value="${categroy}">${categroy}</option>'`;
                })
                td.innerText = '';
                td.appendChild(ele);
            }
            else if(idx !== 0) {
                let td = tab.getElementsByTagName("td")[idx];
                let ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        let lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        let btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        this.setAttribute('style', 'display:none;');
    }
    
    remove() {
        console.log("remove");

        let activeRow = this.parentNode.parentNode.rowIndex;
        data.boards.splice((activeRow - 1), 1);
        table.init(true);
    }
    
    create() {
        console.log("create");

        let activeRow = this.parentNode.parentNode.rowIndex;
        let tab = document.getElementById('booksTable').rows[activeRow];
        let obj = {};

        table.cols.forEach((col, idx) => {
            let td = tab.getElementsByTagName("td")[idx];
            
            if(td.childNodes[0] !== undefined) {
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    let txtVal = td.childNodes[0].value;
                        if (txtVal != '') {
                            obj[col] = txtVal.trim();
                        }
                        else {
                            obj = '';
                            alert('입력하세요');
                        }
                }
            }
            else {
                obj[col] = table.boards.length + 1;   
            }
        })

        data.boards.push(obj);
        table.init(true);
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

export default table;