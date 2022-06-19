const dailyGL = document.querySelector(".dailyGL")

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
        var BalDr=0
        var BalCr=0
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
            </tr>`
            dailyGL.insertAdjacentHTML("beforeend",oneline)

            BalDr += Dr
            BalCr += Cr
            console.log(BalCr)             
        }
            const balanceline = `<tr>
            <td>Balance</td>
            <td>${BalDr}</td>
            <td>${BalCr}</td>
            <td>Memo</td>
            </tr>`

        dailyGL.insertAdjacentHTML("beforeend",balanceline)
    }
    file.readAsText(input.files[0],'utf8'); 

},false)