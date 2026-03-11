const board = document.getElementById('board');
const poolGrid = document.getElementById('pool-grid');
const tierTemplate = document.getElementById('tier-template');
const assetPool = document.getElementById('asset-pool');
const addTierBtn = document.getElementById('add-tier');
const reorderBtn = document.getElementById('reorder-tiers');
const resetBtn = document.getElementById('reset-board');
const contactBtn = document.getElementById('contact-author');
const uploadInput = document.getElementById('upload');
const authorModal = document.getElementById('author-modal');
const closeModalBtn = document.getElementById('close-modal');
const copyWechatBtn = document.getElementById('copy-wechat');

const defaultTiers = [
  ['S', '#ef4444'],
  ['A', '#f97316'],
  ['B', '#eab308'],
  ['C', '#22c55e'],
  ['D', '#3b82f6']
];

let dragData = null;
let rowDrag = null;

function clearRowState() {
  [...board.querySelectorAll('.tier-row')].forEach((row) => {
    row.classList.remove('row-target-top', 'row-target-bottom', 'row-over', 'row-dragging');
    const handle = row.querySelector('.row-handle');
    if (handle) handle.classList.remove('dragging');
  });
}

function bindItemDrag(img) {
  img.draggable = true;
  img.addEventListener('dragstart', (e) => {
    dragData = { item: img, source: img.parentElement };
    img.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', img.dataset.id);
  });

  img.addEventListener('dragend', () => {
    img.classList.remove('dragging');
    img.style.transform = '';
    dragData = null;
  });

  img.addEventListener('drag', () => {
    if (!dragData) return;
    const angle = (Math.random() - 0.5) * 4;
    img.style.transform = `scale(1.05) rotate(${angle}deg)`;
  });
}

function insertAtPointer(container, dragged, pointerX) {
  const items = [...container.querySelectorAll('.item:not(.dragging)')];
  const target = items.find((el) => pointerX < el.getBoundingClientRect().left + el.offsetWidth / 2);
  if (target) container.insertBefore(dragged, target);
  else container.appendChild(dragged);
}

function bindDropzone(zone, row) {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dragData) return;
    row.classList.add('row-over');
    insertAtPointer(zone, dragData.item, e.clientX);
  });

  zone.addEventListener('dragleave', () => row.classList.remove('row-over'));

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    row.classList.remove('row-over');
    if (!dragData) return;
    dragData.item.animate(
      [{ transform: 'scale(1.05)' }, { transform: 'scale(1) rotate(0deg)' }],
      { duration: 220, easing: 'cubic-bezier(0.2, 0.9, 0.2, 1.1)' }
    );
  });
}

function bindRowReorder(row) {
  const handle = row.querySelector('.row-handle');
  handle.draggable = true;

  handle.addEventListener('dragstart', (e) => {
    rowDrag = row;
    row.classList.add('row-dragging');
    handle.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', 'tier-row');
  });

  handle.addEventListener('dragend', () => {
    rowDrag = null;
    clearRowState();
  });

  row.addEventListener('dragover', (e) => {
    if (!rowDrag || rowDrag === row) return;
    e.preventDefault();
    clearRowState();
    const rect = row.getBoundingClientRect();
    const insertAfter = e.clientY > rect.top + rect.height / 2;
    row.classList.add(insertAfter ? 'row-target-bottom' : 'row-target-top');
    board.insertBefore(rowDrag, insertAfter ? row.nextSibling : row);
  });

  row.addEventListener('drop', (e) => {
    if (!rowDrag) return;
    e.preventDefault();
    clearRowState();
  });
}

function createTier(name, color) {
  const row = tierTemplate.content.firstElementChild.cloneNode(true);
  const nameInput = row.querySelector('.tier-name');
  const colorInput = row.querySelector('.tier-color');
  const deleteBtn = row.querySelector('.delete-tier');
  const zone = row.querySelector('.tier-dropzone');

  nameInput.value = name;
  colorInput.value = color;
  row.style.setProperty('--tier-color', color);

  colorInput.addEventListener('input', () => {
    row.style.setProperty('--tier-color', colorInput.value);
  });

  deleteBtn.addEventListener('click', () => {
    if (board.children.length > 1) row.remove();
  });

  bindDropzone(zone, row);
  bindRowReorder(row);
  board.appendChild(row);
}

function addImage(src) {
  const img = new Image();
  img.src = src;
  img.className = 'item';
  img.dataset.id = crypto.randomUUID();
  bindItemDrag(img);
  poolGrid.appendChild(img);
}

function readFiles(files) {
  [...files]
    .filter((f) => f.type.startsWith('image/'))
    .forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => addImage(e.target.result);
      reader.readAsDataURL(file);
    });
}

function resetBoard() {
  board.innerHTML = '';
  poolGrid.innerHTML = '';
  defaultTiers.forEach(([name, color]) => createTier(name, color));
}

function reshuffleToPool() {
  const allItems = [...document.querySelectorAll('.item')];
  allItems.forEach((item) => poolGrid.appendChild(item));

  // shuffle pool order
  const arr = [...poolGrid.children];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  arr.forEach((item, index) => {
    poolGrid.appendChild(item);
    item.animate(
      [
        { transform: 'translateY(-8px)', opacity: 0.8 },
        { transform: 'translateY(0)', opacity: 1 }
      ],
      { duration: 180 + index * 8, easing: 'ease-out' }
    );
  });
}

addTierBtn.addEventListener('click', () => createTier(`Tier ${board.children.length + 1}`, '#a855f7'));
reorderBtn.addEventListener('click', reshuffleToPool);
resetBtn.addEventListener('click', () => {
  const ok = window.confirm('确认重置到初始状态？会清空当前图片和自定义等级。');
  if (ok) resetBoard();
});

contactBtn.addEventListener('click', () => authorModal.showModal());
closeModalBtn.addEventListener('click', () => authorModal.close());
authorModal.addEventListener('click', (e) => {
  if (e.target === authorModal) authorModal.close();
});

copyWechatBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('cvsooo');
    copyWechatBtn.textContent = '已复制';
    setTimeout(() => {
      copyWechatBtn.textContent = '复制微信号';
    }, 1200);
  } catch {
    alert('微信号：cvsooo');
  }
});

uploadInput.addEventListener('change', (e) => readFiles(e.target.files));

assetPool.addEventListener('dragover', (e) => {
  e.preventDefault();
  assetPool.classList.add('drop-active');
  if (dragData?.item) insertAtPointer(poolGrid, dragData.item, e.clientX);
});

assetPool.addEventListener('dragleave', () => assetPool.classList.remove('drop-active'));
assetPool.addEventListener('drop', (e) => {
  e.preventDefault();
  assetPool.classList.remove('drop-active');

  // only import files when this is an external file drop, not internal item move
  if (!dragData && e.dataTransfer.files.length) {
    readFiles(e.dataTransfer.files);
  }

  if (dragData?.item) {
    poolGrid.appendChild(dragData.item);
    dragData.item.animate(
      [{ transform: 'scale(1.05)' }, { transform: 'scale(1) rotate(0deg)' }],
      { duration: 180, easing: 'ease-out' }
    );
  }
});

document.body.addEventListener('dragover', (e) => e.preventDefault());
document.body.addEventListener('drop', (e) => {
  const valid = e.target.closest('.tier-dropzone, #asset-pool');

  if (!valid && dragData?.item) {
    e.preventDefault();
    dragData.source.appendChild(dragData.item);
    dragData.item.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 220, easing: 'ease-out' }
    );
  }

  if (!valid && !dragData && e.dataTransfer?.files?.length) {
    readFiles(e.dataTransfer.files);
  }
});

resetBoard();
