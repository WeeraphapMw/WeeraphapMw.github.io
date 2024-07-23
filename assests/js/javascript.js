// SERCH TEXT
function highlight() {
  var inputText = document.getElementById("inputText");
  var text = document.getElementById("highlighter").value;

  var innerHTML = inputText.innerHTML.replaceAll(/\<span class\=\"highlight\"\>(.*?)\<\/span\>/gi, "$1").replaceAll(text, '<span class="highlight">' + text + "</span>");
  inputText.innerHTML = innerHTML;
}


// GAME POINTS COIN

let points = 0; // ตัวแปรเก็บคะแนน
let lastClickTime = 0; // ตัวแปรเก็บเวลาการคลิกล่าสุด
let coinCreationTimeout; // ตัวแปรเก็บ timeout สำหรับการสร้างเหรียญ

const checkbox = document.querySelector('.checkbox_inp'); // ดึง element checkbox จาก DOM

function throttleClick() {
  const currentTime = Date.now(); // เวลาปัจจุบันในหน่วยมิลลิวินาที
  if (currentTime - lastClickTime < 3000) {
    checkbox.checked = !checkbox.checked; // ย้อนกลับสถานะของ checkbox ถ้าคลิกภายในเวลา 3 วินาที
    return;
  }

  lastClickTime = currentTime; // อัพเดตเวลาการคลิกล่าสุด

  if (checkbox.checked) {
    canCreateCoin = true; // อนุญาตให้สร้างเหรียญ
    createCoin(); // เรียกฟังก์ชัน createCoin เพื่อเริ่มการสร้างเหรียญ
  } else {
    canCreateCoin = false; // ไม่อนุญาตให้สร้างเหรียญ
    clearTimeout(coinCreationTimeout); // ยกเลิก timeout สำหรับการสร้างเหรียญ
    removeAllCoins(); // ลบเหรียญทั้งหมดเมื่อ checkbox ถูกปิด
  }
}

checkbox.addEventListener('change', throttleClick); // เพิ่ม event listener สำหรับการเปลี่ยนแปลงสถานะของ checkbox

function createCoin() {
  if (!canCreateCoin) return; // ถ้าไม่อนุญาตให้สร้างเหรียญให้ return ออกจากฟังก์ชัน

  const coin = document.createElement('div'); // สร้าง element div สำหรับเหรียญ
  coin.className = 'coin'; // เพิ่ม class 'coin' ให้กับ element div
  coin.style.left = `${Math.random() * 90}vw`; // ตั้งค่าตำแหน่งด้านซ้ายเป็นแบบสุ่มในหน่วย viewport width
  coin.style.animationDuration = `${Math.random() * 1 + 5}s`; // ตั้งค่าเวลาของ animation เป็นแบบสุ่ม
  document.body.appendChild(coin); // เพิ่ม element div เข้าไปใน body

  coin.addEventListener('animationend', () => {
    coin.remove(); // ลบ element div เมื่อ animation จบ
    if (canCreateCoin) {
      coinCreationTimeout = setTimeout(createCoin, 3000); // รอเวลา 3 วินาทีก่อนที่จะสร้างเหรียญใหม่
    }
  });

  coin.addEventListener('click', () => {
    points++; // เพิ่มคะแนน
    document.querySelector('.point-container #points').textContent = points; // อัพเดตคะแนนใน element ที่มี class 'point-container'
    coin.remove(); // ลบเหรียญเมื่อคลิก
    if (canCreateCoin) {
      coinCreationTimeout = setTimeout(createCoin, 3000); // รอเวลา 3 วินาทีก่อนที่จะสร้างเหรียญใหม่
    }
  });
}

function removeAllCoins() {
  const coins = document.querySelectorAll('.coin'); // ดึง element ทั้งหมดที่มี class 'coin'
  coins.forEach(coin => coin.remove()); // ลบ element เหล่านั้นทั้งหมด
}
