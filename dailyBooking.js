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
            var GL =lines[3]
            var Dr =parseInt(lines[6])
            var Cr =parseInt(lines[7])
            var Memo =lines[2]
            //插入的整列是可以被搬動的
            var oneline = `<tr draggable="true" class="dragGL"> 
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

// 直接在Memo Input按Enter可以產生新資料
txtMemo.addEventListener("keypress",(event)=>{
    if (event.key ==="Enter"){
        createNewTask()
    }    
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

// draggable and drop 使用
//https://www.bing.com/videos/search?q=html+drag+and+drop&docid=608043399548048957&mid=5ECE2E1E90E977A1654B5ECE2E1E90E977A1654B&view=detail&FORM=VIRE

//建立Btn for Balance check
btnBal.addEventListener("click",(e)=>{    

    //moveGL()
    //https://ithelp.ithome.com.tw/articles/10230686?sc=pt
    //querySelector and getElement的差異
    for (const dragGL of document.getElementsByClassName("dragGL")){
        dragGL.addEventListener("dragstart",(e)=>{
            e.dataTransfer.setData("text/plain", dragGL.className)
            console.log(e)
        })
    }
  

})
//JE6 的迴圈寫法~ for ... of
// 命名 dropZone

    for (const dropZone of document.querySelectorAll(".dropZone")){
        
        // when drag is over
        dropZone.addEventListener("dragover",e=>{
            e.preventDefault()
            dropZone.classList.add("drop-zone--over")
        })
        
        // when drag is drop
        dropZone.addEventListener("drop",e=>{
            e.preventDefault()
            const droppedElementName = e.dataTransfer.getData("text/plain")
            const droppedElement = document.getElementsByClassName(droppedElementName)
            
            //https://ithelp.ithome.com.tw/articles/10057106
            dropZone.append(droppedElement[0])
            
            console.log(droppedElement)
            console.log(typeof(droppedElement))
        })
    } 