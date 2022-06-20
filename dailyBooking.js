const dailyGL = document.querySelector(".dailyGL")
const btnInsert = document.querySelector(".btnInsert")
const btnBal = document.querySelector(".balance")
const txtGL = document.querySelector(".txtGL")
const numDr = document.querySelector(".numDr")
const numCr = document.querySelector(".numCr")
const txtMemo = document.querySelector(".txtMemo")

// https://www.youtube.com/watch?v=-AR-6X_98rM
const input = document.querySelector('input[type="file"]')
input.addEventListener('change',function(event){
    console.log(input.files)
    var file = new FileReader();
    
    file.onload = () => {
        //先將分行資料切開
        const lineAll = file.result.split(/\n/)
        console.log(lineAll)
        //用迴圈再次將Array的資料切開
        for(var i = 0;lineAll[i];i++){
            var lines = lineAll[i].split('|').map(function(line){
            return line.split(',')
            })
             console.log(lines)

        // 數值逐一賦予給對應欄位，最後在整條交易插入
            var GL =lines[0]
            var Dr =parseInt(lines[1])
            var Cr =parseInt(lines[2])
            var Memo =lines[3]
            var oneline = `<tr>
                <td>${GL}</td>
                <td>${Dr}</td>
                <td>${Cr}</td>
                <td>${Memo}</td>
                <td><button class="btnClose">X</button></td>
            </tr>`
            dailyGL.insertAdjacentHTML("beforeend",oneline)      
        }
    }
    file.readAsText(input.files[0],'utf8'); 

},false)

// 建立Btn for Delete
dailyGL.addEventListener("click",(e) =>{
    if (e.target.nodeName === "BUTTON"){
        e.target.parentNode.parentNode.remove()
    }
    
})

// 建立 Btn for Insert
btnAddNewTesk.addEventListener("click",()=>{
    createNewTask()
})

const createNewTask = ()=>{
    const GL = txtGL.value
    const Dr = numDr.value
    const Cr = numCr.value
    const Memo = txtMemo.value
    const newTask = `<tr>
    <td>${GL}</td>
    <td>${Dr}</td>
    <td>${Cr}</td>
    <td>${Memo}</td>
    <td><button class="btnClose">X</button></td>
</tr>`

    dailyGL.insertAdjacentHTML("beforeend",newTask)

    // 將資料洗白
    txtGL.value=""
    numDr.value=""
    numCr.value=""
    txtMemo.value=""
    txtGL.focus() // 重新放置文字箭頭

}

//當輸入enter時，即可直接插入


//建立Btn for Balance check
btnBal.addEventListener("click",(e)=>{

})