function addTask() {
    const input = document.getElementById("input-box");
    const text = input.value.trim();
    if (text === "") {
        alert("You must write something")
        return};
    const list = document.querySelector(".vlnm .exercise");
    const div = document.createElement("div");
    div.className = "group border-[#f6f6f6] border px-5 py-4 flex justify-between items-center rounded-lg";
    const id = "task-" + Date.now();
    div.innerHTML = `
        <label for="${id}" class="cursor-pointer select-none">
            <input id="${id}" type="checkbox" class="hidden peer">
            <p class="peer-checked:hidden">${text}</p>
            <p class="hidden peer-checked:block line-through">${text}</p>
        </label>
        <i class="fa-regular fa-star hover:text-yellow-400 cursor-pointer"></i>
    `;
    list.appendChild(div);
    input.value = "";
}

function addTask2() {
    const input = document.getElementById("input-box-nmd");
    const text = input.value.trim();
    if (text === "") {
        alert("You must write something")
        return};
    const list = document.querySelector(".nmd .exercise");
    const div = document.createElement("div");
    div.className = "group border-[#f6f6f6] border px-5 py-4 flex justify-between items-center rounded-lg";
    const id = "task-" + Date.now();
    div.innerHTML = `
        <label for="${id}" class="cursor-pointer select-none">
            <input id="${id}" type="checkbox" class="hidden peer">
            <p class="peer-checked:hidden">${text}</p>
            <p class="hidden peer-checked:block line-through">${text}</p>
        </label>
        <i class="fa-regular fa-star hover:text-yellow-400 cursor-pointer"></i>
    `;
    list.appendChild(div);
    input.value = "";
}
