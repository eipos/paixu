const board = document.getElementById('board');
const poolGrid = document.getElementById('pool-grid');
const addTierBtn = document.getElementById('add-tier');
const uploadInput = document.getElementById('upload');
const tierTemplate = document.getElementById('tier-template');
const assetPool = document.getElementById('asset-pool');

const defaults = [
  ['S', '#ef4444'],
  ['A', '#f97316'],
  ['B', '#eab308'],
  ['C', '#22c55e'],
  ['D', '#3b82f6']
];

let dragData = null;
let rowDrag = null;

function createTier(name, color) {
  const node = tierTemplate.content.firstElementChild.cloneNode(true);
  const nameInput = node.querySelector('.tier-name');
  const colorInput = node.querySelector('.tier-color');
  const deleteBtn = node.querySelector('.delete-tier');
  const dropzone = node.querySelector('.tier-dropzone');

  nameInput.value = name;
  colorInput.value = color;
  node.style.setProperty('--tier-color', color);

  colorInput.addEventListener('input', () => {
    node.style.setProperty('--tier-color', colorInput.value);
  });

  deleteBtn.addEventListener('click', () => {
    if (board.children.length > 1) node.remove();
  });

  bindDropzone(dropzone, node);
  bindRowReorder(node);
  board.appendChild(node);
}

function bindItemDrag(item) {
  item.draggable = true;
  item.addEventListener('dragstart', (e) => {
    dragData = { item, source: item.parentElement };
    item.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.dataset.id);
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    item.style.transform = '';
    dragData = null;
  });

  item.addEventListener('drag', () => {
    if (!dragData) return;
    const x = (Math.random() - 0.5) * 4;
    item.style.transform = `scale(1.05) rotate(${x}deg)`;
  });
}

function insertAtPointer(container, dragged) {
  const siblings = [...container.querySelectorAll('.item:not(.dragging):not(.placeholder)')];
  const centerX = window.event?.clientX ?? 0;
  const target = siblings.find((el) => centerX < el.getBoundingClientRect().left + el.offsetWidth / 2);
  if (target) container.insertBefore(dragged, target);
  else container.appendChild(dragged);
}

function bindDropzone(zone, row) {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dragData) return;
    row.classList.add('row-over');
    insertAtPointer(zone, dragData.item);
  });

  zone.addEventListener('dragleave', () => row.classList.remove('row-over'));

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    row.classList.remove('row-over');
    if (!dragData) return;
    dragData.item.animate(
      [{ transform: 'scale(1.05)' }, { transform: 'scale(1) rotate(0)' }],
      { duration: 260, easing: 'cubic-bezier(0.2, 0.9, 0.2, 1.1)' }
    );
  });
}

function bindRowReorder(row) {
  const handle = row.querySelector('.row-handle');
  handle.addEventListener('mousedown', () => {
    row.setAttribute('draggable', 'true');
  });

  row.addEventListener('dragstart', (e) => {
    if (e.target !== row) return;
    rowDrag = row;
    row.classList.add('dragging-row');
  });

  row.addEventListener('dragend', () => {
    row.classList.remove('dragging-row');
    row.removeAttribute('draggable');
    rowDrag = null;
  });

  row.addEventListener('dragover', (e) => {
    if (!rowDrag || rowDrag === row) return;
    e.preventDefault();
    const rect = row.getBoundingClientRect();
    const next = e.clientY > rect.top + rect.height / 2;
    board.insertBefore(rowDrag, next ? row.nextSibling : row);
  });
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
    .filter((file) => file.type.startsWith('image/'))
    .forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => addImage(e.target.result);
      reader.readAsDataURL(file);
    });
}

addTierBtn.addEventListener('click', () => {
  createTier(`Tier ${board.children.length + 1}`, '#a855f7');
});

uploadInput.addEventListener('change', (e) => readFiles(e.target.files));

assetPool.addEventListener('dragover', (e) => {
  e.preventDefault();
  assetPool.classList.add('drop-active');
  if (dragData?.item) insertAtPointer(poolGrid, dragData.item);
});

assetPool.addEventListener('dragleave', () => assetPool.classList.remove('drop-active'));
assetPool.addEventListener('drop', (e) => {
  e.preventDefault();
  assetPool.classList.remove('drop-active');
  if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files);
  if (dragData?.item) {
    dragData.item.animate(
      [{ transform: 'scale(1.05)' }, { transform: 'scale(1) rotate(0deg)' }],
      { duration: 180, easing: 'ease-out' }
    );
  }
});

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
});

defaults.forEach(([name, color]) => createTier(name, color));
